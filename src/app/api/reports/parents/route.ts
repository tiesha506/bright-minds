import { db } from "@/lib/db";
import type { ReportParentOption } from "@/lib/report-types";
import { canManageStudent, requireUser } from "../_util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/reports/parents?studentId=<id> — TEACHER/ADMIN route that powers
 * the upload dialog's "select parent" step. Returns the ACTIVE parent account
 * linked to the student (Student.parentId). A student without a linked parent
 * returns an empty list — uploads are denied for them (no recipient possible).
 */
export async function GET(req: Request) {
  const auth = await requireUser(req, ["TEACHER", "ADMIN"]);
  if (auth instanceof Response) return auth;

  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId") ?? "";
  if (!studentId) {
    return Response.json({ error: "Missing studentId" }, { status: 400 });
  }

  const student = await db.student.findUnique({
    where: { id: studentId },
    select: { id: true, parentId: true, parent: { select: { id: true, name: true, email: true } } },
  });
  if (!student) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }
  if (!(await canManageStudent(auth, studentId))) {
    return Response.json(
      { error: "You can only view parents for students in your classrooms." },
      { status: 403 }
    );
  }

  const parents: ReportParentOption[] = student.parent
    ? [{ id: student.parent.id, name: student.parent.name, email: student.parent.email }]
    : [];

  return Response.json({ parents });
}
