import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/progress — upsert a lesson progress entry and sync XP.
 * Body: { studentId, subjectId, lessonId, score?, xp }
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

    const [entry] = await Promise.all([
      db.progress.upsert({
        where: { studentId_lessonId: { studentId, lessonId } },
        update: {
          subjectId,
          score:
            safeScore !== null
              ? Math.max(
                  safeScore,
                  (
                    await db.progress.findUnique({
                      where: { studentId_lessonId: { studentId, lessonId } },
                    })
                  )?.score ?? 0
                )
              : undefined,
        },
        create: { studentId, subjectId, lessonId, score: safeScore },
      }),
      typeof xp === "number" && xp >= 0
        ? db.student.update({ where: { id: studentId }, data: { xp: Math.floor(xp) } })
        : Promise.resolve(null),
    ]);

    return NextResponse.json({ entry });
  } catch (err) {
    console.error("POST /api/progress failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
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
