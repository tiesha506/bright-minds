import { db } from "@/lib/db";
import { requireTeacher, accessibleStudent, aggregateStudents, dayKey, dayLabel } from "../../_server";
import { getLesson, getLessons } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import { SUBJECT_IDS, SUBJECT_LABELS, READING_SKILLS, ageGroupForAge } from "@/lib/teacher-types";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/teacher/students/[id] — full profile for a student who sits in one
 * of the signed-in teacher's classrooms.
 */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const found = await accessibleStudent(auth.id, id);
  if (!found) {
    return Response.json({ error: "Student not found in your classrooms" }, { status: 404 });
  }
  const { student, seats } = found;

  const [aggregates, results, activity] = await Promise.all([
    aggregateStudents([student.id]),
    db.assignmentResult.findMany({
      where: { studentId: student.id, assignment: { teacherId: auth.id } },
      include: { assignment: { include: { classroom: { select: { name: true } } } } },
      orderBy: { updatedAt: "desc" },
    }),
    db.activityLog.findMany({ where: { studentId: student.id } }),
  ]);
  const agg = aggregates.get(student.id)!;
  const rows = agg.rows;
  const ageGroup = ageGroupForAge(student.age) as AgeGroup;

  // -------- per-subject stats with lesson totals from the registry --------
  const subjects = SUBJECT_IDS.map((subjectId) => {
    const list = rows.filter((r) => r.subjectId === subjectId);
    const scores = list.map((r) => r.score).filter((s): s is number => typeof s === "number");
    const avg =
      scores.length === 0 ? null : Math.round((scores.reduce((a, b) => a + b, 0) / scores.length));
    return {
      subjectId,
      avg,
      lessonsDone: list.length,
      total: getLessons(subjectId, ageGroup).length,
    };
  });

  // -------- quiz results (scored lessons, newest first) --------
  const titleFor = (subjectId: string, lessonId: string) => {
    const lesson = getLesson(subjectId, lessonId);
    return lesson ? lesson.title : lessonId;
  };
  const emojiFor = (subjectId: string, lessonId: string) =>
    getLesson(subjectId, lessonId)?.emoji ?? "📘";

  const quizResults = rows
    .filter((r) => typeof r.score === "number")
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
    .slice(0, 40)
    .map((r) => ({
      lessonId: r.lessonId,
      subjectId: r.subjectId,
      lessonTitle: titleFor(r.subjectId, r.lessonId),
      emoji: emojiFor(r.subjectId, r.lessonId),
      score: r.score as number,
      date: r.completedAt.toISOString(),
    }));

  const readingDetail = rows
    .filter((r) => r.subjectId === "reading")
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
    .map((r) => ({
      lessonId: r.lessonId,
      subjectId: r.subjectId,
      lessonTitle: titleFor(r.subjectId, r.lessonId),
      emoji: emojiFor(r.subjectId, r.lessonId),
      score: r.score,
      date: r.completedAt.toISOString(),
    }));

  // -------- skills mastered / needs practice --------
  const toSkill = (r: (typeof rows)[number]) => {
    const match = r.lessonId.match(/-(\d+)$/);
    const n = match ? Number(match[1]) : 0;
    const skill =
      r.subjectId === "reading"
        ? (READING_SKILLS[ageGroup]?.[n] ?? titleFor(r.subjectId, r.lessonId))
        : titleFor(r.subjectId, r.lessonId);
    return {
      lessonId: r.lessonId,
      skill,
      title: `${SUBJECT_LABELS[r.subjectId] ?? r.subjectId} · ${titleFor(r.subjectId, r.lessonId)}`,
      score: r.score ?? 0,
    };
  };
  const skillsMastered = rows.filter((r) => typeof r.score === "number" && r.score! >= 80).map(toSkill);
  const needsPractice = rows.filter((r) => typeof r.score === "number" && r.score! < 60).map(toSkill);

  // -------- last 14 days of learning minutes --------
  const today = dayKey(0);
  const minutesByDay = new Map<string, number>();
  for (const a of activity) minutesByDay.set(a.day, (minutesByDay.get(a.day) ?? 0) + a.minutes);
  const activity14 = Array.from({ length: 14 }, (_, i) => {
    const d = 13 - i;
    const key = (() => {
      const date = new Date(`${today}T12:00:00`);
      date.setDate(date.getDate() - d);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;
    })();
    return { label: d === 0 ? "Today" : d <= 6 ? dayLabel(d) : key.slice(5), value: minutesByDay.get(key) ?? 0 };
  });

  // -------- assignment history --------
  const assignments = results.map((r) => ({
    assignmentId: r.assignmentId,
    title: r.assignment.title,
    type: r.assignment.type,
    status: r.status,
    score: r.score,
    dueDate: r.assignment.dueDate,
    classroomName: r.assignment.classroom.name,
  }));

  return Response.json({
    student: {
      id: student.id,
      name: student.name,
      age: student.age,
      ageGroup,
      avatar: student.avatar,
      avatarColor: student.avatarColor,
      loginCode: student.loginCode,
      worksheetsDone: student.worksheetsDone,
      xp: student.xp,
    },
    classrooms: seats.map((s) => ({
      id: s.classroom.id,
      name: s.classroom.name,
      groupName: s.groupName,
    })),
    subjects,
    quizResults,
    readingDetail,
    skillsMastered,
    needsPractice,
    activity14,
    assignments,
    overallAvg: agg.avg === null ? null : Math.round(agg.avg),
    quizAvg: agg.quizAvg === null ? null : Math.round(agg.quizAvg),
    readingAvg: agg.readingAvg === null ? null : Math.round(agg.readingAvg),
  });
}
