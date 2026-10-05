import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { subjects } from "@/lib/content";
import { requireAdmin, dayKey } from "../_util";
import type { AnalyticsData, CountRow } from "@/lib/admin-types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ROLE_LABELS: Record<string, string> = {
  PARENT: "Parents",
  TEACHER: "Teachers",
  ADMIN: "Admins",
};

const GROUP_LABELS: Record<string, string> = {
  early: "Early (6–8)",
  primary: "Primary (9–11)",
  intermediate: "Intermediate (12–13)",
  teen: "Teen (14–15)",
};

const TYPE_LABELS: Record<string, string> = {
  lesson: "Lesson",
  quiz: "Quiz",
  worksheet: "Worksheet",
  reading: "Reading",
  custom: "Custom activity",
};

/**
 * GET /api/admin/analytics — aggregates for the admin charts: users by role,
 * students per age group, progress rows per subject, assignments by type and
 * distinct active students per day over the last 14 days (from ActivityLog).
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const since14 = dayKey(13);
  const [userGroups, studentGroups, progressGroups, assignmentGroups, activityRows] =
    await Promise.all([
      db.user.groupBy({ by: ["role"], _count: { _all: true } }),
      db.student.groupBy({ by: ["ageGroup"], _count: { _all: true } }),
      db.progress.groupBy({ by: ["subjectId"], _count: { _all: true } }),
      db.assignment.groupBy({ by: ["type"], _count: { _all: true } }),
      db.activityLog.findMany({
        where: { day: { gte: since14 } },
        select: { day: true, studentId: true },
      }),
    ]);

  const usersByRole: CountRow[] = ["PARENT", "TEACHER", "ADMIN", "STUDENT"]
    .map((role) => ({
      label: ROLE_LABELS[role] ?? role,
      value: userGroups.find((g) => g.role === role)?._count._all ?? 0,
    }))
    .filter((r) => r.value > 0);

  const studentsPerAgeGroup: CountRow[] = ["early", "primary", "intermediate", "teen"].map(
    (group) => ({
      label: GROUP_LABELS[group] ?? group,
      value: studentGroups.find((g) => g.ageGroup === group)?._count._all ?? 0,
    })
  );

  const subjectName = new Map(subjects.map((s) => [s.id, s.name]));
  const progressSubjectIds = progressGroups.map((g) => g.subjectId);
  const extraSubjects = progressSubjectIds.filter((id) => !subjectName.has(id));
  const progressPerSubject: CountRow[] = [
    ...subjects.filter((s) => progressSubjectIds.includes(s.id)).map((s) => s.id),
    ...extraSubjects,
  ].map((subjectId) => ({
    label: subjectName.get(subjectId) ?? subjectId,
    value: progressGroups.find((g) => g.subjectId === subjectId)?._count._all ?? 0,
  }));

  const knownTypes = ["worksheet", "lesson", "quiz", "reading", "custom"];
  const extraTypes = assignmentGroups
    .map((g) => g.type)
    .filter((t) => !knownTypes.includes(t));
  const assignmentsByType: CountRow[] = [...knownTypes, ...extraTypes].map((type) => ({
    label: TYPE_LABELS[type] ?? type,
    value: assignmentGroups.find((g) => g.type === type)?._count._all ?? 0,
  }));

  // Distinct active students per local day, ascending, last 14 days.
  const activeByDay = new Map<string, Set<string>>();
  for (const row of activityRows) {
    let set = activeByDay.get(row.day);
    if (!set) {
      set = new Set();
      activeByDay.set(row.day, set);
    }
    set.add(row.studentId);
  }
  const dailyActive: { label: string; value: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(i);
    dailyActive.push({
      label: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
      value: activeByDay.get(key)?.size ?? 0,
    });
  }

  const data: AnalyticsData = {
    usersByRole,
    studentsPerAgeGroup,
    progressPerSubject,
    assignmentsByType,
    dailyActive,
  };
  return Response.json(data);
}
