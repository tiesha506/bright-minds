import { db } from "@/lib/db";
import {
  requireTeacher,
  ownedClassroom,
  aggregateStudents,
  dayKey,
  avgOf,
  subjectStats,
} from "../../_server";
import { SUBJECT_IDS, SUBJECT_LABELS, READING_SKILLS, ageGroupForAge } from "@/lib/teacher-types";

type RouteContext = { params: Promise<{ classroomId: string }> };

/**
 * GET /api/teacher/report/[classroomId] — printable class report: roster with
 * per-student subject averages, assignment completion, quiz/reading averages,
 * skills needing intervention, plus class-level aggregates.
 */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { classroomId } = await params;
  const classroom = await ownedClassroom(auth.id, classroomId);
  if (!classroom) {
    return Response.json({ error: "Classroom not found" }, { status: 404 });
  }

  const teacher = await db.user.findUnique({
    where: { id: auth.id },
    select: { name: true },
  });

  const studentIds = classroom.seats.map((s) => s.studentId);
  const [aggregates, resultRows] = await Promise.all([
    aggregateStudents(studentIds),
    db.assignmentResult.findMany({
      where: { assignment: { classroomId: classroom.id } },
      select: { studentId: true, status: true },
    }),
  ]);

  const today = dayKey(0);
  const since7 = dayKey(6);

  const roster = classroom.seats
    .map((seat) => {
      const agg = aggregates.get(seat.studentId);
      const rows = agg?.rows ?? [];
      const subjectAverages: Record<string, number | null> = {};
      for (const sid of SUBJECT_IDS) {
        const st = subjectStats(rows, sid);
        subjectAverages[sid] = st.avg === null ? null : Math.round(st.avg);
      }
      const mine = resultRows.filter((r) => r.studentId === seat.studentId);
      const completed = mine.filter((r) => r.status === "completed").length;

      const interventions: string[] = [];
      for (const sid of SUBJECT_IDS) {
        const st = subjectStats(rows, sid);
        if (st.avg !== null && st.avg < 60) {
          interventions.push(`${SUBJECT_LABELS[sid]} average ${Math.round(st.avg)}%`);
        }
      }
      if (agg?.quizAvg != null && agg.quizAvg < 60) {
        interventions.push(`Quiz average ${Math.round(agg.quizAvg)}%`);
      }
      const ageGroup = ageGroupForAge(seat.student.age);
      for (const r of rows.filter(
        (x) => x.subjectId === "reading" && typeof x.score === "number" && x.score! < 60
      ).slice(0, 2)) {
        const n = Number(r.lessonId.match(/-(\d+)$/)?.[1] ?? 0);
        const skill = READING_SKILLS[ageGroup]?.[n];
        if (skill) interventions.push(`${skill} (${r.score}%)`);
      }
      if (rows.length === 0) interventions.push("No learning activity recorded yet");

      return {
        studentId: seat.studentId,
        name: seat.student.name,
        groupName: seat.groupName,
        subjectAverages,
        quizAvg: agg?.quizAvg != null ? Math.round(agg.quizAvg) : null,
        readingAvg: agg?.readingAvg != null ? Math.round(agg.readingAvg) : null,
        lessonsDone: rows.length,
        assignmentCompletion: mine.length > 0 ? { completed, total: mine.length } : null,
        lastActive: agg?.lastActive ?? null,
        interventions,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // -------- class aggregates --------
  const allRows = studentIds.flatMap((id) => aggregates.get(id)?.rows ?? []);
  const subjectAverages: Record<string, number | null> = {};
  for (const sid of SUBJECT_IDS) {
    const st = subjectStats(allRows, sid);
    subjectAverages[sid] = st.avg === null ? null : Math.round(st.avg);
  }
  const allResults = resultRows.length;
  const completedResults = resultRows.filter((r) => r.status === "completed").length;
  const activeLast7 = roster.filter(
    (r) => r.lastActive && r.lastActive >= since7 && r.lastActive <= today
  ).length;
  const quizAvg = avgOf(allRows.map((r) => r.score).filter((s): s is number => typeof s === "number"));

  const interventionList = roster
    .filter((r) => r.interventions.length > 0)
    .map((r) => ({ name: r.name, focus: r.interventions.join(" · ") }));

  return Response.json({
    classroom: {
      id: classroom.id,
      name: classroom.name,
      gradeLabel: classroom.gradeLabel,
    },
    teacherName: teacher?.name ?? auth.name,
    generatedAt: new Date().toISOString(),
    roster,
    aggregates: {
      students: roster.length,
      subjectAverages,
      quizAvg: quizAvg === null ? null : Math.round(quizAvg),
      readingAvg: subjectAverages.reading,
      assignmentCompletionPct:
        allResults === 0 ? null : Math.round((completedResults / allResults) * 100),
      activeLast7,
    },
    interventionList,
  });
}
