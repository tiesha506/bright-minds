import { db } from "@/lib/db";
import { getLesson, subjects, type AgeGroup } from "@/lib/content";
import type { QuizResultItem, ReportResponse, SubjectProgress } from "@/lib/parent-types";
import {
  avgOf,
  computeStreak,
  dayKey,
  dayLabel,
  lastNDays,
  requireParent,
  requireOwnChild,
} from "../../_shared";

// ---------------------------------------------------------------------------
// GET /api/parent/report/[childId]?range=week|month — printable report payload.
// ---------------------------------------------------------------------------

type RouteContext = { params: Promise<{ childId: string }> };

export async function GET(req: Request, ctx: RouteContext) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;
    const { childId } = await ctx.params;

    const child = await requireOwnChild(user.id, childId);
    if (child instanceof Response) return child;

    const rangeParam = req instanceof Request ? new URL(req.url).searchParams.get("range") : null;
    const range: "week" | "month" = rangeParam === "month" ? "month" : "week";
    const days = range === "week" ? 7 : 30;
    const period = lastNDays(days);
    const startKey = period[0].key;
    const endKey = period[period.length - 1].key;
    const startDate = new Date(period[0].date);
    startDate.setHours(0, 0, 0, 0);

    const group = child.ageGroup as AgeGroup;

    const [progress, activity, goalRow] = await Promise.all([
      db.progress.findMany({
        where: { studentId: child.id },
        orderBy: { completedAt: "desc" },
      }),
      db.activityLog.findMany({
        where: { studentId: child.id },
        select: { day: true, minutes: true },
      }),
      db.goal.findUnique({ where: { studentId: child.id } }),
    ]);

    // --------------------------- subject progress ---------------------------
    const subjectProgress: SubjectProgress[] = subjects.map((s) => {
      const rows = progress.filter((p) => p.subjectId === s.id);
      const scores = rows.map((p) => p.score).filter((v): v is number => v !== null);
      return {
        subjectId: s.id,
        label: s.name,
        emoji: s.emoji,
        avgScore: avgOf(scores),
        lessonsDone: rows.length,
        lessonsTotal: s.lessons[group]?.length ?? 0,
      };
    });

    // --------------------------- minutes per day ----------------------------
    const minutesPerDay = period.map(({ key, date }) => ({
      day: dayLabel(date, days > 7),
      date: key,
      minutes: activity
        .filter((a) => a.day === key)
        .reduce((sum, a) => sum + a.minutes, 0),
    }));
    const totalMinutes = minutesPerDay.reduce((n, d) => n + d.minutes, 0);

    // ------------------------------ quiz results ----------------------------
    const inPeriod = progress.filter((p) => p.completedAt >= startDate);
    const quizRows = inPeriod
      .filter((p) => p.score !== null)
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
    const quizAverage = avgOf(progress
      .map((p) => p.score)
      .filter((v): v is number => v !== null));

    const toQuizItem = (p: (typeof progress)[number]): QuizResultItem => {
      const lesson = getLesson(p.subjectId, p.lessonId);
      return {
        lessonId: p.lessonId,
        lessonTitle: lesson?.title ?? p.lessonId,
        subjectId: p.subjectId,
        emoji: lesson?.emoji ?? "📚",
        score: p.score as number,
        date: p.completedAt.toISOString(),
      };
    };

    // Skills are a state (not an event) — computed over all finished quizzes.
    const allScored = progress
      .filter((p) => p.score !== null)
      .slice() // never mutate the source array
      .sort((a, b) => (b.score as number) - (a.score as number));
    const skillsMastered = allScored.filter((p) => (p.score as number) >= 80).map(toQuizItem);
    const lowestThree = allScored
      .slice(-3)
      .reverse()
      .filter((p) => (p.score as number) < 80);
    const needsPracticeSet = new Set(
      allScored.filter((p) => (p.score as number) < 60).map((p) => p.lessonId)
    );
    const skillsNeedingPractice = [
      ...allScored.filter((p) => (p.score as number) < 60),
      ...lowestThree.filter((p) => !needsPracticeSet.has(p.lessonId)),
    ].map(toQuizItem);

    // ------------------------------- reading --------------------------------
    const readingRows = allScored
      .filter((p) => p.subjectId === "reading")
      .slice()
      .sort(
        (a, b) =>
          a.completedAt.getTime() - b.completedAt.getTime() ||
          (a.lessonId < b.lessonId ? -1 : a.lessonId > b.lessonId ? 1 : 0)
      );
    const readingScores = readingRows.map((p) => p.score as number);
    const readingAvg = avgOf(readingScores);

    // ------------------------------- summary --------------------------------
    const strongest = subjectProgress
      .filter((s): s is SubjectProgress & { avgScore: number } => s.avgScore !== null)
      .reduce<SubjectProgress & { avgScore: number } | null>(
        (best, s) => (best === null || s.avgScore > best.avgScore ? s : best),
        null
      );
    const watchSubject = subjectProgress
      .filter((s): s is SubjectProgress & { avgScore: number } => s.avgScore !== null)
      .reduce<SubjectProgress & { avgScore: number } | null>(
        (low, s) => (low === null || s.avgScore < low.avgScore ? s : low),
        null
      );

    const summary: string[] = [
      `${child.name} spent ${totalMinutes} minutes learning over the ${range === "week" ? "past week" : "past month"} and completed ${inPeriod.length} lesson${inPeriod.length === 1 ? "" : "s"}.`,
    ];
    if (strongest && watchSubject && strongest.subjectId === watchSubject.subjectId) {
      summary.push(
        `${strongest.label} is the standout subject right now, with an average score of ${strongest.avgScore}%.`
      );
    } else {
      if (strongest) {
        summary.push(`The strongest subject is ${strongest.label} (${strongest.avgScore}% average).`);
      }
      if (watchSubject && watchSubject.avgScore < 75) {
        summary.push(
          `${watchSubject.label} (${watchSubject.avgScore}%) is the area where a little extra practice may help most.`
        );
      }
    }
    if (quizAverage !== null) {
      summary.push(`Overall quiz average: ${quizAverage}%.`);
    }

    const payload: ReportResponse = {
      profile: {
        id: child.id,
        name: child.name,
        age: child.age,
        ageGroup: child.ageGroup,
        avatar: child.avatar,
        avatarColor: child.avatarColor,
      },
      range,
      rangeStart: startKey,
      rangeEnd: endKey === dayKey(new Date()) ? dayKey(new Date()) : endKey,
      generatedAt: new Date().toISOString(),
      summary,
      subjectProgress,
      minutesPerDay,
      totalMinutes,
      lessonsCompleted: progress.length,
      lessonsThisPeriod: inPeriod.length,
      worksheetsCompleted: child.worksheetsDone,
      quizAverage,
      quizResults: quizRows.slice(0, 12).map(toQuizItem),
      skillsMastered,
      skillsNeedingPractice,
      readingScores,
      readingAvg,
      streakDays: computeStreak(activity.map((a) => a.day)),
      goal: {
        dailyMinutes: goalRow?.dailyMinutes ?? 15,
        weeklyLessonTarget: goalRow?.weeklyLessonTarget ?? 3,
        prioritySubjects: safeParseArray(goalRow?.prioritySubjects),
        note: goalRow?.note ?? "",
      },
    };

    return Response.json(payload);
  } catch (err) {
    console.error("GET /api/parent/report failed", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

function safeParseArray(raw: string | undefined | null): string[] {
  try {
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
