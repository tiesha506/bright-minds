import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

/**
 * GET /api/student/bootstrap?studentId=<id>
 * Returns the child's server-side progress + profile so a signed-in student
 * device can hydrate (best-score merge). Only the child's parent/guardian
 * account may read it.
 */
export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId");
  if (!studentId) {
    return Response.json({ error: "Missing studentId" }, { status: 400 });
  }

  const student = await db.student.findUnique({
    where: { id: studentId },
    include: { progress: true },
  });
  if (!student) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }
  // Authorisation: the session user must be the child's guardian.
  if (student.parentId !== user.id) {
    return Response.json({ error: "Not your child's profile" }, { status: 403 });
  }

  return Response.json({
    student: {
      id: student.id,
      name: student.name,
      age: student.age,
      theme: student.theme,
      ageGroup: student.ageGroup,
      avatar: student.avatar,
      avatarColor: student.avatarColor,
      photoUrl: student.photoUrl,
      xp: student.xp,
    },
    progress: student.progress.map((p) => ({
      subjectId: p.subjectId,
      lessonId: p.lessonId,
      score: p.score,
      completedAt: p.completedAt.toISOString(),
    })),
  });
}
