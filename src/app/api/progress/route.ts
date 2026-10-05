import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLesson } from "@/lib/content";

/**
 * POST /api/progress — upsert a lesson progress entry and sync XP.
 * Body: { studentId, subjectId, lessonId, score?, xp }
 *
 * This is the heart of the connected experience:
 *  1. Saves the lesson progress row.
 *  2. Auto-completes any matching teacher assignment for this student.
 *  3. Creates a notification for the child's parent (deduped per day).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, subjectId, lessonId, score, xp } = body ?? {};

    if (
      typeof studentId !== "string" ||
      typeof subjectId !== "string" ||
      typeof lessonId !== "string" ||
      studentId.length < 8
    ) {
      return NextResponse.json({ error: "Invalid progress data" }, { status: 400 });
    }

    const student = await db.student.findUnique({ where: { id: studentId } });
    if (!student) {
      // The client profile may not exist server-side yet (e.g. offline first visit).
      return NextResponse.json({ ok: false, reason: "unknown-student" }, { status: 202 });
    }

    const safeScore =
      typeof score === "number" && score >= 0 && score <= 100
        ? Math.round(score)
        : null;

    const previous = await db.progress.findUnique({
      where: { studentId_lessonId: { studentId, lessonId } },
    });

    const [entry] = await Promise.all([
      db.progress.upsert({
        where: { studentId_lessonId: { studentId, lessonId } },
        update: {
          subjectId,
          score:
            safeScore !== null
              ? Math.max(safeScore, previous?.score ?? 0)
              : undefined,
        },
        create: { studentId, subjectId, lessonId, score: safeScore },
      }),
      typeof xp === "number" && xp >= 0
        ? db.student.update({ where: { id: studentId }, data: { xp: Math.floor(xp) } })
        : Promise.resolve(null),
    ]);

    // ---------------- connected experience side effects ----------------
    try {
      const lesson = getLesson(subjectId, lessonId);
      const lessonTitle = lesson?.title ?? lessonId;

      // 1) Auto-complete matching assignments (whole class, group or selection).
      const classrooms = await db.classroomStudent.findMany({
        where: { studentId },
        select: { classroomId: true, groupName: true },
      });
      if (classrooms.length > 0) {
        const candidateAssignments = await db.assignment.findMany({
          where: { lessonId, classroomId: { in: classrooms.map((c) => c.classroomId) } },
        });
        for (const assignment of candidateAssignments) {
          const selected: string[] = JSON.parse(assignment.studentIds || "[]");
          const targeted =
            selected.length > 0
              ? selected.includes(studentId)
              : assignment.groupName
                ? classrooms.some(
                    (c) =>
                      c.classroomId === assignment.classroomId &&
                      c.groupName === assignment.groupName
                  )
                : true; // whole class
          if (!targeted) continue;
          await db.assignmentResult.upsert({
            where: {
              assignmentId_studentId: { assignmentId: assignment.id, studentId },
            },
            update: {
              status: "completed",
              score: safeScore ?? undefined,
              completedAt: new Date(),
            },
            create: {
              assignmentId: assignment.id,
              studentId,
              status: "completed",
              score: safeScore,
              completedAt: new Date(),
            },
          });
          if (student.parentId) {
            await notifyParent({
              userId: student.parentId,
              childId: student.id,
              childName: student.name,
              kind: "assignment",
              text: `${student.name} completed the assignment "${assignment.title}".`,
            });
          }
        }
      }

      // 2) Parent notifications (once per child/lesson/day).
      if (student.parentId) {
        if (safeScore !== null && safeScore >= 85 && safeScore !== previous?.score) {
          await notifyParent({
            userId: student.parentId,
            childId: student.id,
            childName: student.name,
            kind: "score",
            text: `${student.name} scored ${safeScore}% on the ${lessonTitle} quiz. Great work!`,
          });
        } else if (
          safeScore !== null &&
          safeScore < 50 &&
          safeScore === previous?.score
        ) {
          await notifyParent({
            userId: student.parentId,
            childId: student.id,
            childName: student.name,
            kind: "suggestion",
            text: `${student.name} may benefit from reviewing "${lessonTitle}" — a short practice session could help.`,
          });
        } else if (!previous) {
          await notifyParent({
            userId: student.parentId,
            childId: student.id,
            childName: student.name,
            kind: "completion",
            text: `${student.name} completed the ${lessonTitle} lesson.`,
          });
        }
      }
    } catch (sideEffectError) {
      // Progress is saved; connected side effects must never break the request.
      console.error("progress side-effects failed", sideEffectError);
    }

    return NextResponse.json({ entry });
  } catch (err) {
    console.error("POST /api/progress failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function notifyParent(data: {
  userId: string;
  childId: string;
  childName: string;
  kind: string;
  text: string;
}) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const dupe = await db.notification.findFirst({
    where: { userId: data.userId, text: data.text, createdAt: { gte: startOfDay } },
  });
  if (dupe) return;
  await db.notification.create({ data });
}

/**
 * GET /api/progress?studentId=<id> — list progress entries.
 */
export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get("studentId");
    if (!studentId) {
      return NextResponse.json({ error: "Missing studentId" }, { status: 400 });
    }
    const entries = await db.progress.findMany({ where: { studentId } });
    return NextResponse.json({ entries });
  } catch (err) {
    console.error("GET /api/progress failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
