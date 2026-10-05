import { db } from "@/lib/db";
import { getLesson, subjects, type AgeGroup, type Lesson } from "@/lib/content";
import type {
  AssignmentStatusItem,
  OverviewResponse,
  QuizResultItem,
  Recommendation,
  SubjectProgress,
} from "@/lib/parent-types";
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
// GET /api/parent/overview/[childId] — the full dashboard payload for ONE child
// (authorised: the child must belong to the signed-in parent).
// ---------------------------------------------------------------------------

type RouteContext = { params: Promise<{ childId: string }> };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function GET(req: Request, ctx: RouteContext) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;
    const { childId } = await ctx.params;

    const child = await requireOwnChild(user.id, childId);
    if (child instanceof Response) return child;

    const group = child.ageGroup as AgeGroup;

    const [progress, activity, goalRow, resultRows] = await Promise.all([
      db.progress.findMany({
        where: { studentId: child.id },
        orderBy: { completedAt: "desc" },
      }),
      db.activityLog.findMany({
        where: { studentId: child.id },
        select: { day: true, minutes: true },
      }),
      db.goal.findUnique({ where: { studentId: child.id } }),
      db.assignmentResult.findMany({
        where: { studentId: child.id },
        orderBy: { updatedAt: "desc" },
        take: 6,
        include: { assignment: { include: { classroom: { select: { name: true } } } } },
      }),
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

    const scoredSubjects = subjectProgress.filter(
      (s): s is SubjectProgress & { avgScore: number } => s.avgScore !== null
    );
    const avgOfAvgs =
      scoredSubjects.length > 0
        ? scoredSubjects.reduce((sum, s) => sum + s.avgScore, 0) / scoredSubjects.length
        : null;
    const lessonsTotalAll = subjectProgress.reduce((n, s) => n + s.lessonsTotal, 0);
    const doneRatio = lessonsTotalAll > 0 ? (progress.length / lessonsTotalAll) * 100 : 0;
    const overallPct =
      avgOfAvgs !== null ? Math.round(avgOfAvgs * 0.6 + doneRatio * 0.4) : Math.round(doneRatio);

    // ------------------------------- minutes --------------------------------
    const week = lastNDays(7);
    const prevWeek = lastNDays(14).slice(0, 7);
    const weekKeys = new Set(week.map((d) => d.key));
    const prevWeekKeys = new Set(prevWeek.map((d) => d.key));

    const weeklyMinutes = week.map(({ key, date }) => ({
      day: dayLabel(date, false),
      date: key,
      minutes: activity
        .filter((a) => a.day === key)
        .reduce((sum, a) => sum + a.minutes, 0),
    }));
    const weekSum = weeklyMinutes.reduce((n, d) => n + d.minutes, 0);
    const prevSum = activity
      .filter((a) => prevWeekKeys.has(a.day))
      .reduce((sum, a) => sum + a.minutes, 0);
    const monthStart = lastNDays(30)[0].key;
    const monthlyMinutes = activity
      .filter((a) => a.day >= monthStart)
      .reduce((sum, a) => sum + a.minutes, 0);
    const todayKey = dayKey(new Date());
    const todayMinutes = activity
      .filter((a) => a.day === todayKey)
      .reduce((sum, a) => sum + a.minutes, 0);

    // ------------------------------ quiz data -------------------------------
    const quizRows = progress.filter((p) => p.score !== null);
    const quizAverage = avgOf(quizRows.map((p) => p.score as number));

    const recentQuizResults: QuizResultItem[] = quizRows.slice(0, 8).map((p) => {
      const lesson = getLesson(p.subjectId, p.lessonId);
      return {
        lessonId: p.lessonId,
        lessonTitle: lesson?.title ?? p.lessonId,
        subjectId: p.subjectId,
        emoji: lesson?.emoji ?? "📚",
        score: p.score as number,
        date: p.completedAt.toISOString(),
      };
    });

    const readingRows = quizRows
      .filter((p) => p.subjectId === "reading")
      .slice()
      .sort(
        (a, b) =>
          a.completedAt.getTime() - b.completedAt.getTime() ||
          (a.lessonId < b.lessonId ? -1 : a.lessonId > b.lessonId ? 1 : 0)
      );
    const readingScores = readingRows.map((p) => p.score as number);
    const readingAvg = avgOf(readingScores);

    // --------------------- strengths / needs practice -----------------------
    const topOverall =
      scoredSubjects.length > 0
        ? scoredSubjects.reduce((best, s) => (s.avgScore > best.avgScore ? s : best))
        : null;
    const strongOnes = subjectProgress.filter(
      (s): s is SubjectProgress & { avgScore: number } =>
        s.avgScore !== null && s.avgScore >= 80
    );
    const strengths = strongOnes.length > 0 ? strongOnes : topOverall ? [topOverall] : [];

    const needsPractice = subjectProgress
      .filter((s) => s.avgScore !== null && s.avgScore < 70)
      .map((s) => ({
        subjectId: s.subjectId,
        label: s.label,
        emoji: s.emoji,
        avgScore: s.avgScore as number | null,
        lessonTitles: progress
          .filter(
            (p) => p.subjectId === s.subjectId && p.score !== null && (p.score as number) < 60
          )
          .slice(0, 3)
          .map((p) => getLesson(p.subjectId, p.lessonId)?.title ?? p.lessonId),
      }));

    // ------------------------------- goal -----------------------------------
    const goal = {
      dailyMinutes: goalRow?.dailyMinutes ?? 15,
      weeklyLessonTarget: goalRow?.weeklyLessonTarget ?? 3,
      prioritySubjects: safeParseArray(goalRow?.prioritySubjects),
      note: goalRow?.note ?? "",
    };

    // --------------------------- recommendations ----------------------------
    const lessonsThisWeek = progress.filter((p) => Date.now() - p.completedAt.getTime() < WEEK_MS)
      .length;
    const recommendations = buildRecommendations({
      childName: child.name,
      group,
      subjectProgress,
      progressRows: progress.map((p) => ({ subjectId: p.subjectId, lessonId: p.lessonId, score: p.score })),
      hasData: progress.length > 0,
      readingAvg,
      goal,
      todayMinutes,
      weeklyLessonCount: lessonsThisWeek,
    });

    // ------------------------------ assignments -----------------------------
    const assignments: AssignmentStatusItem[] = resultRows.map((r) => ({
      title: r.assignment.title,
      type: r.assignment.type,
      status: r.status,
      score: r.score,
      dueDate: r.assignment.dueDate,
      classroomName: r.assignment.classroom.name,
    }));

    const payload: OverviewResponse = {
      profile: {
        id: child.id,
        name: child.name,
        age: child.age,
        ageGroup: child.ageGroup,
        avatar: child.avatar,
        avatarColor: child.avatarColor,
        xp: child.xp,
      },
      goal,
      subjectProgress,
      overallPct,
      weeklyMinutes,
      monthlyMinutes,
      weeklyDelta: weekSum - prevSum,
      todayMinutes,
      lessonsCompleted: progress.length,
      lessonsThisWeek,
      worksheetsCompleted: child.worksheetsDone,
      quizAverage,
      recentQuizResults,
      readingScores,
      readingAvg,
      streakDays: computeStreak(activity.map((a) => a.day)),
      strengths,
      needsPractice,
      recommendations: recommendations.slice(0, 5),
      assignments,
    };

    return Response.json(payload);
  } catch (err) {
    console.error("GET /api/parent/overview failed", err);
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

// -------------------------- recommendation engine ---------------------------
// Plain, warm suggestions computed from REAL data — each references an actual
// lesson from the content registry whenever one is needed.

function firstUndoneLesson(
  subjectId: string,
  group: AgeGroup,
  doneLessonIds: Set<string>
): Lesson | undefined {
  const lessons = subjects.find((s) => s.id === subjectId)?.lessons[group] ?? [];
  return lessons.find((l) => !doneLessonIds.has(l.id));
}

function lowestScoredLesson(
  subjectId: string,
  rows: { subjectId: string; lessonId: string; score: number | null }[]
): Lesson | undefined {
  const scored = rows
    .filter((r) => r.subjectId === subjectId && r.score !== null)
    .sort((a, b) => (a.score as number) - (b.score as number));
  for (const row of scored) {
    const lesson = getLesson(subjectId, row.lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function buildRecommendations(input: {
  childName: string;
  group: AgeGroup;
  subjectProgress: SubjectProgress[];
  progressRows: { subjectId: string; lessonId: string; score: number | null }[];
  hasData: boolean;
  readingAvg: number | null;
  goal: OverviewResponse["goal"];
  todayMinutes: number;
  weeklyLessonCount: number;
}): Recommendation[] {
  const {
    childName,
    group,
    subjectProgress,
    progressRows,
    hasData,
    readingAvg,
    goal,
    todayMinutes,
    weeklyLessonCount,
  } = input;
  const recs: Recommendation[] = [];
  const doneSet = new Set(progressRows.map((r) => r.lessonId));

  const withData = subjectProgress.filter(
    (s): s is SubjectProgress & { avgScore: number } => s.avgScore !== null
  );
  const weakest =
    withData.length > 0
      ? withData.reduce((low, s) => (s.avgScore < low.avgScore ? s : low))
      : null;
  const strongest =
    withData.length > 0
      ? withData.reduce((high, s) => (s.avgScore > high.avgScore ? s : high))
      : null;

  // 1) Practice the weakest subject — with a real, not-yet-done lesson.
  if (weakest && weakest.avgScore < 85) {
    const pick =
      firstUndoneLesson(weakest.subjectId, group, doneSet) ??
      lowestScoredLesson(weakest.subjectId, progressRows);
    if (pick) {
      recs.push({
        icon: "🎯",
        title: `Practise ${weakest.label} for 10 minutes today`,
        detail: `"${pick.title}" is a good next step — short and friendly, and it builds on what ${childName} already knows.`,
        subjectId: weakest.subjectId,
        lessonId: pick.id,
      });
    }
  }

  // 2) Reading a little low? Suggest reading together (offline, no lesson).
  if (readingAvg !== null && readingAvg < 70) {
    recs.push({
      icon: "📖",
      title: "Read together for 15 minutes",
      detail: `Reading scores are hovering around ${readingAvg}%. Ten or fifteen quiet minutes with a book ${childName} enjoys can make a real difference.`,
    });
  }

  // 3) Daily minutes goal vs reality.
  if (todayMinutes < goal.dailyMinutes) {
    const remaining = goal.dailyMinutes - todayMinutes;
    recs.push({
      icon: "⏰",
      title: `${remaining} more minute${remaining === 1 ? "" : "s"} to reach today's goal`,
      detail: `${todayMinutes === 0 ? `${childName} hasn't started yet today` : `${childName} has done ${todayMinutes} minutes today`} — the goal is ${goal.dailyMinutes}. A short session now would do it.`,
    });
  }

  // 4) Weekly lesson target check on the priority subject.
  if (weeklyLessonCount < goal.weeklyLessonTarget) {
    const priorityId = goal.prioritySubjects[0];
    const targetSubject =
      subjectProgress.find((s) => s.subjectId === priorityId) ??
      subjectProgress.find((s) => s.lessonsDone < s.lessonsTotal);
    const pick = targetSubject
      ? firstUndoneLesson(targetSubject.subjectId, group, doneSet)
      : undefined;
    recs.push({
      icon: "🎈",
      title: `${goal.weeklyLessonTarget - weeklyLessonCount} more lesson${goal.weeklyLessonTarget - weeklyLessonCount === 1 ? "" : "s"} to hit the weekly target`,
      detail: pick
        ? `One idea: "${pick.title}" — it counts toward the ${goal.weeklyLessonTarget}-lesson weekly goal.`
        : `The weekly goal is ${goal.weeklyLessonTarget} lessons and ${childName} has done ${weeklyLessonCount} so far.`,
      ...(pick && targetSubject ? { subjectId: targetSubject.subjectId, lessonId: pick.id } : {}),
    });
  }

  // 5) Celebrate the strongest subject — encouragement plus a gentle stretch.
  if (strongest && strongest.avgScore >= 80) {
    const lesson = firstUndoneLesson(strongest.subjectId, group, doneSet);
    recs.push({
      icon: "🌟",
      title: `${childName} is doing really well in ${strongest.label}`,
      detail: lesson
        ? `An average of ${strongest.avgScore}%! "${lesson.title}" would be a fun challenge to keep the momentum going.`
        : `An average of ${strongest.avgScore}% — worth celebrating together tonight!`,
      ...(lesson ? { subjectId: strongest.subjectId, lessonId: lesson.id } : {}),
    });
  }

  // 6) Brand-new child: help the parent get started for real.
  if (!hasData) {
    recs.unshift({
      icon: "🔑",
      title: `Set up ${childName}'s device`,
      detail: `Open "My Children" to find ${childName}'s login code, then try the first lesson together — a great way to see how BrightMinds works.`,
    });
  }

  // 7) Top up so there are always at least three helpful ideas.
  if (recs.length < 3) {
    recs.push({
      icon: "💬",
      title: "Ask about today's learning",
      detail: `A simple "what did you learn today?" over dinner keeps ${childName} talking about the wins (and the tricky bits).`,
    });
    recs.push({
      icon: "🗓️",
      title: "Keep a regular learning time",
      detail: `A predictable 10-15 minute slot each day beats one long weekend session — and keeps the streak alive.`,
    });
  }

  return recs;
}
