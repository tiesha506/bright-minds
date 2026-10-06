import { db } from "@/lib/db";
import { createSignedReportUrl, requireUser } from "../../_util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/reports/[id]/file[?download=1] — secure read path for a report.
 *
 * Authorisation (server-side, 403 otherwise):
 *   ADMIN            → any report
 *   TEACHER          → only reports they uploaded themselves
 *   PARENT / STUDENT → only when an explicit ReportAccess row exists for the
 *                      session user (child devices share the family session)
 *
 * On success the browser is redirected (302) to a FRESH short-lived signed
 * URL (expires in 300s). Signed URLs are never stored, logged or returned in
 * JSON — the report id alone is useless without a valid session.
 */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  if (!id) {
    return Response.json({ error: "Missing report id" }, { status: 400 });
  }

  const report = await db.report.findUnique({
    where: { id },
    select: { id: true, fileKey: true, fileName: true, uploadedById: true },
  });
  if (!report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  let allowed = false;
  if (auth.role === "ADMIN") {
    allowed = true;
  } else if (auth.role === "TEACHER") {
    allowed = report.uploadedById === auth.id;
  } else if (auth.role === "PARENT" || auth.role === "STUDENT") {
    const access = await db.reportAccess.findUnique({
      where: {
        reportId_parentUserId: { reportId: report.id, parentUserId: auth.id },
      },
      select: { id: true },
    });
    allowed = access !== null;
  }
  if (!allowed) {
    return Response.json({ error: "You do not have access to this report." }, { status: 403 });
  }

  const wantsDownload = new URL(req.url).searchParams.get("download") === "1";
  const signed = await createSignedReportUrl(
    report.fileKey,
    wantsDownload ? report.fileName : undefined
  );
  if (!signed) {
    return Response.json({ error: "Could not open the report file." }, { status: 502 });
  }

  // 302 to the fresh signed URL — no caching anywhere.
  return new Response(null, {
    status: 302,
    headers: { Location: signed, "Cache-Control": "no-store" },
  });
}
