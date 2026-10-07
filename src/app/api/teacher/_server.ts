// ---------------------------------------------------------------------------
// Shared server helpers for /api/teacher routes.
// Every teacher route must go through requireTeacher() and ownership checks.
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  getSessionUser,
  unauthorized,
  forbidden,
  type SessionUser,
} from "@/lib/server/auth";
import { getLessons } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import { ageGroupForAge, SUBJECT_IDS } from "@/lib/teacher-types";

// ------------------------------- Auth guard --------------------------------

/** Returns the TEACHER session user, or a Response to return immediately. */
export async function requireTeacher(req: Request): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();
  if (user.role !== "TEACHER") return forbidden();
  return user;
}

/** Fetch a classroom and verify the teacher owns it, else null. */
export async function ownedClassroom(teacherId: string, classroomId: string) {
  if (!classroomId || typeof classroomId !== "string") return null;
  const classroom = await db.classroom.findUnique({
    where: { id: classroomId },
    include: { seats: { include: { student: true } } },
  });
  if (!classroom || classroom.teacherId !== teacherId) return null;
  return classroom;
}

/** Verify a student sits in one of this teacher's classrooms, else null. */
export async function accessibleStudent(teacherId: string, studentId: string) {
  if (!studentId || typeof studentId !== "string") return null;
  const seats = await db.classroomStudent.findMany({
    where: { studentId, classroom: { teacherId } },
    include: { classroom: true },
  });
  if (seats.length === 0) return null;
  const student = await db.student.findUnique({ where: { id: studentId } });
  if (!student) return null;
  return { student, seats };
}

// ------------------------------ Date helpers -------------------------------

export function dayKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** "Mon" style label for a day N days ago. */
export function dayLabel(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

// ----------------------------- Progress math -------------------------------

export interface ProgressRow {
  subjectId: string;
  lessonId: string;
  score: number | null;
  completedAt: Date;
}

export function avgOf(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function subjectStats(rows: ProgressRow[], subjectId: string) {
  const list = rows.filter((r) => r.subjectId === subjectId);
  const scores = list.map((r) => r.score).filter((s): s is number => typeof s === "number");
  return { lessonsDone: list.length, avg: avgOf(scores) };
}

/** Mean of the per-subject score averages (subjects with data only). */
export function overallStudentAvg(rows: ProgressRow[]): number | null {
  const perSubject: number[] = [];
  for (const sid of SUBJECT_IDS) {
    const st = subjectStats(rows, sid);
    if (st.avg !== null) perSubject.push(st.avg);
  }
  return avgOf(perSubject);
}

export function quizAvgOf(rows: ProgressRow[]): number | null {
  return avgOf(rows.map((r) => r.score).filter((s): s is number => typeof s === "number"));
}

/** Total lessons available to this age group across the four subjects. */
export function totalLessonsFor(ageGroup: string): number {
  const group = (["early", "primary", "intermediate", "teen"].includes(ageGroup)
    ? ageGroup
    : "primary") as AgeGroup;
  return SUBJECT_IDS.reduce((n, sid) => n + getLessons(sid, group).length, 0);
}

/** "Needs support" = avg quiz score < 60, or no progress at all. */
export function needsSupport(rows: ProgressRow[]): string | null {
  if (rows.length === 0) return "No learning activity yet";
  const avg = overallStudentAvg(rows);
  if (avg !== null && avg < 60) return `Average score ${Math.round(avg)}%`;
  return null;
}

// --------------------------- Roster aggregation ----------------------------

export interface SeatWithStudent {
  seatId: string;
  groupName: string;
  student: {
    id: string;
    name: string;
    age: number;
    ageGroup: string;
    avatar: string;
    avatarColor: string;
    photoUrl: string;
    loginCode: string | null;
  };
  classroomId: string;
  classroomName: string;
}

export async function seatsForTeacher(teacherId: string): Promise<SeatWithStudent[]> {
  const seats = await db.classroomStudent.findMany({
    where: { classroom: { teacherId } },
    include: { student: true, classroom: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });
  return seats.map((s) => ({
    seatId: s.id,
    groupName: s.groupName,
    student: {
      id: s.student.id,
      name: s.student.name,
      age: s.student.age,
      ageGroup: s.student.ageGroup,
      avatar: s.student.avatar,
      avatarColor: s.student.avatarColor,
      photoUrl: s.student.photoUrl,
      loginCode: s.student.loginCode,
    },
    classroomId: s.classroom.id,
    classroomName: s.classroom.name,
  }));
}

export interface StudentAggregate {
  rows: ProgressRow[];
  avg: number | null;
  quizAvg: number | null;
  readingAvg: number | null;
  mathAvg: number | null;
  lessonsDone: number;
  lastActive: string | null;
  lastActiveDate: Date | null;
}

/** Aggregate progress + activity for a set of student ids. */
export async function aggregateStudents(
  studentIds: string[]
): Promise<Map<string, StudentAggregate>> {
  const map = new Map<string, StudentAggregate>();
  if (studentIds.length === 0) return map;
  const [progress, activity] = await Promise.all([
    db.progress.findMany({
      where: { studentId: { in: studentIds } },
      orderBy: { completedAt: "asc" },
    }),
    db.activityLog.findMany({ where: { studentId: { in: studentIds } } }),
  ]);

  const byStudentProgress = new Map<string, ProgressRow[]>();
  for (const p of progress) {
    const list = byStudentProgress.get(p.studentId) ?? [];
    list.push({
      subjectId: p.subjectId,
      lessonId: p.lessonId,
      score: p.score,
      completedAt: p.completedAt,
    });
    byStudentProgress.set(p.studentId, list);
  }
  const lastActive = new Map<string, string>();
  const lastActiveDate = new Map<string, Date>();
  const minutes7 = new Map<string, number>();
  const since = dayKey(6);
  for (const a of activity) {
    const prevDay = lastActive.get(a.studentId);
    if (!prevDay || a.day > prevDay) {
      lastActive.set(a.studentId, a.day);
      const d = new Date(`${a.day}T12:00:00`);
      if (!Number.isNaN(d.getTime())) lastActiveDate.set(a.studentId, d);
    }
    if (a.day >= since) {
      minutes7.set(a.studentId, (minutes7.get(a.studentId) ?? 0) + a.minutes);
    }
  }

  for (const id of studentIds) {
    const rows = byStudentProgress.get(id) ?? [];
    map.set(id, {
      rows,
      avg: overallStudentAvg(rows),
      quizAvg: quizAvgOf(rows),
      readingAvg: subjectStats(rows, "reading").avg,
      mathAvg: subjectStats(rows, "math").avg,
      lessonsDone: rows.length,
      lastActive: lastActive.get(id) ?? null,
      lastActiveDate: lastActiveDate.get(id) ?? null,
    });
  }
  return map;
}

/** True when the student has ActivityLog minutes within the last 7 days. */
export function isActiveWithin7(agg: StudentAggregate | undefined, todayKey: string): boolean {
  if (!agg) return false;
  const since = dayKey(6);
  return agg.lastActive !== null && agg.lastActive >= since && agg.lastActive <= todayKey;
}

export { ageGroupForAge };
