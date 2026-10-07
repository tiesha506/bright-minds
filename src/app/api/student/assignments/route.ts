import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { getLesson } from "@/lib/content";

/**
 * GET /api/student/assignments?studentId=<id>
 * Assignments for this child with live status, enriched with lesson metadata
 * (title, emoji, subject, minutes) so the student UI can render nice cards.
 */
export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId");
  if (!studentId) {
    return Response.json({ error: "Missing studentId" }, { status: 400 });
  }

  const student = await db.student.findUnique({ where: { id: studentId } });
  if (!student || student.parentId !== user.id) {
    return Response.json({ error: "Not your child's profile" }, { status: 403 });
  }

  const seats = await db.classroomStudent.findMany({
    where: { studentId },
    select: { classroomId: true, groupName: true },
  });
  const classroomIds = seats.map((s) => s.classroomId);

  const assignments = await db.assignment.findMany({
    where: classroomIds.length > 0 ? { classroomId: { in: classroomIds } } : { id: "__none__" },
    orderBy: { createdAt: "desc" },
    include: { results: { where: { studentId } } },
  });

  const visible = assignments.filter((a) => {
    const selected: string[] = JSON.parse(a.studentIds || "[]");
    if (selected.length > 0) return selected.includes(studentId);
    if (a.groupName) {
      return seats.some(
        (s) => s.classroomId === a.classroomId && s.groupName === a.groupName
      );
    }
    return true;
  });

  const today = new Date().toISOString().slice(0, 10);
  const items = visible.map((a) => {
    const result = a.results[0];
    const lesson = a.lessonId
      ? getLesson(a.subjectId, a.lessonId)
      : undefined;
    const overdue =
      !result?.completedAt && a.dueDate !== "" && a.dueDate < today;
    return {
      id: a.id,
      title: a.title,
      type: a.type,
      subjectId: a.subjectId,
      lessonId: a.lessonId,
      lessonTitle: lesson?.title ?? null,
      lessonEmoji: lesson?.emoji ?? null,
      minutes: lesson?.minutes ?? null,
      difficulty: a.difficulty,
      questionCount: a.questionCount,
      dueDate: a.dueDate,
      instructions: a.instructions,
      status: result?.status ?? "assigned",
      score: result?.score ?? null,
      overdue,
    };
  });

  return Response.json({ assignments: items });
}
