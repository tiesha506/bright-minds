import { db } from "@/lib/db";
import type { ReportItem, ReportsListResponse } from "@/lib/report-types";
import { requireUser } from "./_util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Report has no Prisma relation to Student, so names are joined manually. */
async function studentNameMap(studentIds: string[]): Promise<Map<string, string>> {
  const unique = Array.from(new Set(studentIds));
  const rows =
    unique.length > 0
      ? await db.student.findMany({
          where: { id: { in: unique } },
          select: { id: true, name: true },
        })
      : [];
  return new Map(rows.map((s) => [s.id, s.name]));
}

/**
 * GET /api/reports — role-aware listing (privacy enforced by the where clauses,
 * never by the UI):
 *   TEACHER  → reports they uploaded (optional ?studentId= filter).
 *   ADMIN    → latest 100 reports across the platform.
 *   PARENT   → reports with a ReportAccess row for this parent, across all
 *              their children. No other parent's reports can ever match.
 *   STUDENT  → child devices ride the family session, so the client sends
 *              ?studentId=<own id>; the student must belong to the session
 *              user AND the row must carry a ReportAccess row for it.
 */
export async function GET(req: Request) {
  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;

  const url = new URL(req.url);
  const studentIdFilter = url.searchParams.get("studentId") ?? "";

  // ------------------------------- TEACHER ---------------------------------
  if (auth.role === "TEACHER") {
    const rows = await db.report.findMany({
      where: {
        uploadedById: auth.id,
        ...(studentIdFilter ? { studentId: studentIdFilter } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        access: { include: { parent: { select: { id: true, name: true } } } },
      },
    });
    const names = await studentNameMap(rows.map((r) => r.studentId));
    const reports: ReportItem[] = rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      studentName: names.get(r.studentId) ?? "Student",
      term: r.term,
      description: r.description,
      fileName: r.fileName,
      mimeType: r.mimeType,
      createdAt: r.createdAt.toISOString(),
      uploadedBy: auth.name,
      parents: r.access.map((a) => ({ parentUserId: a.parent.id, parentName: a.parent.name })),
    }));
    const payload: ReportsListResponse = { reports };
    return Response.json(payload);
  }

  // -------------------------------- ADMIN ----------------------------------
  if (auth.role === "ADMIN") {
    const rows = await db.report.findMany({
      where: studentIdFilter ? { studentId: studentIdFilter } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        uploader: { select: { name: true } },
        access: { include: { parent: { select: { id: true, name: true } } } },
      },
    });
    const names = await studentNameMap(rows.map((r) => r.studentId));
    const reports: ReportItem[] = rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      studentName: names.get(r.studentId) ?? "Student",
      term: r.term,
      description: r.description,
      fileName: r.fileName,
      mimeType: r.mimeType,
      createdAt: r.createdAt.toISOString(),
      uploadedBy: r.uploader.name,
      parents: r.access.map((a) => ({ parentUserId: a.parent.id, parentName: a.parent.name })),
    }));
    const payload: ReportsListResponse = { reports };
    return Response.json(payload);
  }

  // --------------------------- PARENT / STUDENT -----------------------------
  // Child sessions share the family account, so the student identity is the
  // client's own student id — exactly the /api/student/bootstrap pattern.
  if (auth.role === "PARENT" || auth.role === "STUDENT") {
    if (studentIdFilter) {
      const student = await db.student.findUnique({
        where: { id: studentIdFilter },
        select: { id: true, parentId: true },
      });
      if (!student) {
        return Response.json({ error: "Student not found" }, { status: 404 });
      }
      if (student.parentId !== auth.id) {
        return Response.json({ error: "Not your child's profile" }, { status: 403 });
      }
    }

    const rows = await db.report.findMany({
      // Hard privacy boundary: a row is returned ONLY when an explicit
      // ReportAccess row exists for THIS user id.
      where: {
        access: { some: { parentUserId: auth.id } },
        ...(studentIdFilter ? { studentId: studentIdFilter } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        uploader: { select: { name: true } },
        access: { include: { parent: { select: { id: true, name: true } } } },
      },
    });
    const names = await studentNameMap(rows.map((r) => r.studentId));
    const reports: ReportItem[] = rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      studentName: names.get(r.studentId) ?? "Student",
      term: r.term,
      description: r.description,
      fileName: r.fileName,
      mimeType: r.mimeType,
      createdAt: r.createdAt.toISOString(),
      uploadedBy: r.uploader.name,
      parents: r.access.map((a) => ({ parentUserId: a.parent.id, parentName: a.parent.name })),
    }));
    const payload: ReportsListResponse = { reports };
    return Response.json(payload);
  }

  return Response.json({ error: "Not allowed for your role" }, { status: 403 });
}
