import { db } from "@/lib/db";
import { deleteReportObject, requireUser } from "../_util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * DELETE /api/reports/[id] — remove a report permanently.
 * Only the uploading TEACHER or an ADMIN may delete. The private storage
 * object and the ReportAccess rows (cascade) are removed with it.
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireUser(req, ["TEACHER", "ADMIN"]);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  if (!id) {
    return Response.json({ error: "Missing report id" }, { status: 400 });
  }

  const report = await db.report.findUnique({
    where: { id },
    select: { id: true, fileKey: true, uploadedById: true },
  });
  if (!report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }
  if (auth.role === "TEACHER" && report.uploadedById !== auth.id) {
    return Response.json({ error: "You can only delete reports you uploaded." }, { status: 403 });
  }

  // DB first (access rows cascade), storage object best-effort afterwards.
  await db.report.delete({ where: { id: report.id } });
  await deleteReportObject(report.fileKey);

  return Response.json({ ok: true });
}
