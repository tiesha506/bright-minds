import { db } from "@/lib/db";
import { requireTeacher, ownedClassroom } from "../../../../_server";

type RouteContext = { params: Promise<{ id: string; studentId: string }> };

/** Shared: load the seat for this student inside an owned classroom. */
async function seatFor(teacherId: string, classroomId: string, studentId: string) {
  const classroom = await ownedClassroom(teacherId, classroomId);
  if (!classroom) return null;
  const seat = await db.classroomStudent.findUnique({
    where: { classroomId_studentId: { classroomId: classroom.id, studentId } },
    include: { student: true },
  });
  if (!seat) return null;
  return { classroom, seat };
}

/**
 * PATCH /api/teacher/classrooms/[id]/students/[studentId] — move the student
 * to a different differentiated group. Body: { groupName: "A" | "B" | "C" | "" }
 */
export async function PATCH(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id, studentId } = await params;
  const found = await seatFor(auth.id, id, studentId);
  if (!found) {
    return Response.json({ error: "Student not found in this classroom" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { groupName } = (body ?? {}) as { groupName?: unknown };
  if (typeof groupName !== "string" || !["A", "B", "C", ""].includes(groupName)) {
    return Response.json({ error: "Group must be A, B, C or empty" }, { status: 400 });
  }

  const updated = await db.classroomStudent.update({
    where: { id: found.seat.id },
    data: { groupName },
  });
  return Response.json({ seat: { id: updated.id, groupName: updated.groupName } });
}

/**
 * DELETE /api/teacher/classrooms/[id]/students/[studentId] — remove the seat.
 * The student record itself is kept (they may sit in another classroom).
 */
export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id, studentId } = await params;
  const found = await seatFor(auth.id, id, studentId);
  if (!found) {
    return Response.json({ error: "Student not found in this classroom" }, { status: 404 });
  }
  await db.classroomStudent.delete({ where: { id: found.seat.id } });
  return Response.json({ ok: true });
}
