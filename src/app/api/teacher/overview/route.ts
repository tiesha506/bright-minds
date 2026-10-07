import { db } from "@/lib/db";
import {
  requireTeacher,
  seatsForTeacher,
  aggregateStudents,
  dayKey,
  dayLabel,
  avgOf,
  subjectStats,
  needsSupport,
} from "../_server";
import { SUBJECT_IDS } from "@/lib/teacher-types";

/**
 * GET /api/teacher/overview — headline totals for the teacher dashboard.
 * All data is scoped to the signed-in teacher's own classrooms.
 */
export async function GET(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;
  const teacherId = auth.id;

  const seats = await seatsForTeacher(teacherId);

  // Distinct students across classrooms.
  const seen = new Set<string>();
  const students = seats
    .filter((s) => (seen.has(s.student.id) ? false : (seen.add(s.student.id), true)))
    .map((s) => s.student.id);

  const [aggregates, assignments, activity, classrooms] = await Promise.all([
    aggregateStudents(students),
    db.assignment.findMany({
      where: { teacherId },
      include: { results: true },
      orderBy: { createdAt: "desc" },
    }),
    db.activityLog.findMany({ where: { studentId: { in: students } } }),
    db.classroom.findMany({
      where: { teacherId },
      include: { _count: { select: { seats: true, assignments: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const today = dayKey(0);
  const since7 = dayKey(6);
  const todayMs = new Date(`${today}T12:00:00`).getTime();

  // -------- per-student roll-up --------
  let activeStudents = 0;
  const supportList: { studentId: string; name: string; reason: string }[] = [];
  const studentAvgs: number[] = [];
  const allScores: number[] = [];
  const readingScores: number[] = [];
  const subjectScores = new Map<string, number[]>();
  const subjectLessons = new Map<string, number>();
  for (const sid of SUBJECT_IDS) {
    subjectScores.set(sid, []);
    subjectLessons.set(sid, 0);
  }
  const datedReading: { t: number; score: number }[] = [];

  const nameById = new Map<string, string>();
  for (const seat of seats) nameById.set(seat.student.id, seat.student.name);

  for (const id of students) {
    const agg = aggregates.get(id);
    const rows = agg?.rows ?? [];
    if (agg?.lastActive && agg.lastActive >= since7 && agg.lastActive <= today) {
      activeStudents += 1;
    }
    const reason = needsSupport(rows);
    if (reason) supportList.push({ studentId: id, name: nameById.get(id) ?? id, reason });
    if (agg?.avg != null) studentAvgs.push(agg.avg);

    for (const row of rows) {
      if (typeof row.score === "number") {
        allScores.push(row.score);
        if (row.subjectId === "reading") {
          readingScores.push(row.score);
          datedReading.push({ t: row.completedAt.getTime(), score: row.score });
        }
      }
      if (subjectScores.has(row.subjectId)) {
        if (typeof row.score === "number") subjectScores.get(row.subjectId)!.push(row.score);
        subjectLessons.set(row.subjectId, (subjectLessons.get(row.subjectId) ?? 0) + 1);
      }
    }
  }

  // -------- assignments --------
  let resultTotal = 0;
  let resultCompleted = 0;
  for (const a of assignments) {
    for (const r of a.results) {
      resultTotal += 1;
      if (r.status === "completed") resultCompleted += 1;
    }
  }

  // -------- activity (last 7 days) --------
  let recentActivityCount = 0;
  let recentMinutes = 0;
  const weeklyMinutes = Array.from({ length: 7 }, (_, i) => ({
    label: i === 6 ? "Today" : dayLabel(6 - i),
    value: 0,
  }));
  for (const a of activity) {
    if (a.day >= since7 && a.day <= today) {
      recentActivityCount += 1;
      recentMinutes += a.minutes;
      const dayMs = new Date(`${a.day}T12:00:00`).getTime();
      const idx = 6 - Math.round((todayMs - dayMs) / 86400000);
      if (idx >= 0 && idx <= 6) weeklyMinutes[idx].value += a.minutes;
    }
  }

  // -------- quiz score distribution --------
  const buckets: [string, number, number][] = [
    ["<50", 0, 49],
    ["50-59", 50, 59],
    ["60-69", 60, 69],
    ["70-79", 70, 79],
    ["80-89", 80, 89],
    ["90+", 90, 100],
  ];
  const distribution = buckets.map(([label, min, max]) => ({
    label,
    value: allScores.filter((s) => s >= min && s <= max).length,
  }));

  // -------- reading trend (last 6 weekly buckets) --------
  const readingTrend: { label: string; value: number }[] = [];
  for (let w = 5; w >= 0; w--) {
    const end = todayMs - w * 7 * 86400000;
    const start = end - 7 * 86400000;
    const scores = datedReading.filter((r) => r.t > start && r.t <= end).map((r) => r.score);
    const avg = avgOf(scores);
    readingTrend.push({
      label: new Date(end - 3 * 86400000).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      }),
      value: avg === null ? 0 : Math.round(avg),
    });
  }

  const allRows = students.flatMap((id) => aggregates.get(id)?.rows ?? []);

  return Response.json({
    totalStudents: students.length,
    activeStudents,
    studentsNeedingSupport: supportList.length,
    avgClassProgress: avgOf(studentAvgs) === null ? 0 : Math.round(avgOf(studentAvgs)!),
    assignmentCompletionPct:
      resultTotal === 0 ? 0 : Math.round((resultCompleted / resultTotal) * 100),
    quizAverage: avgOf(allScores) === null ? null : Math.round(avgOf(allScores)!),
    readingAvg: avgOf(readingScores) === null ? null : Math.round(avgOf(readingScores)!),
    subjectAverages: SUBJECT_IDS.map((sid) => {
      const st = subjectStats(allRows, sid);
      return {
        subjectId: sid,
        avg: st.avg === null ? null : Math.round(st.avg),
        lessonsDone: subjectLessons.get(sid) ?? 0,
      };
    }),
    recentActivityCount,
    recentMinutes,
    supportList: supportList.slice(0, 12),
    weeklyMinutes,
    distribution,
    readingTrend,
    classrooms: classrooms.map((c) => ({
      id: c.id,
      name: c.name,
      studentCount: c._count.seats,
    })),
  });
}
