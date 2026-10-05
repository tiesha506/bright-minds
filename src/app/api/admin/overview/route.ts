import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { subjects } from "@/lib/content";
import { requireAdmin, dayKey } from "../_util";
import type {
  OverviewData,
  SubjectLessonStat,
  AdminRole,
  RecentSignup,
} from "@/lib/admin-types";

/**
 * GET /api/admin/overview — headline counts for the admin dashboard.
 * Returns user counts by role, learner/classroom/assignment totals, learning
 * minutes for the last 7 days, real lesson counts per subject (content
 * registry) and the 10 most recent signups.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const since7 = dayKey(6);
  const [userGroups, studentsTotal, classroomsTotal, assignmentsTotal, customActivitiesTotal, progressRows, recentUsers, activityRows, registrationSetting] =
    await Promise.all([
      db.user.groupBy({ by: ["role"], _count: { _all: true } }),
      db.student.count(),
      db.classroom.count(),
      db.assignment.count(),
      db.customActivity.count(),
      db.progress.count(),
      db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
      db.activityLog.findMany({
        where: { day: { gte: since7 } },
        select: { minutes: true, studentId: true },
      }),
      db.platformSetting.findUnique({ where: { key: "registrationOpen" } }),
    ]);

  const usersByRole: Record<AdminRole, number> = {
    STUDENT: 0,
    PARENT: 0,
    TEACHER: 0,
    ADMIN: 0,
  };
  for (const g of userGroups) {
    if (g.role === "STUDENT" || g.role === "PARENT" || g.role === "TEACHER" || g.role === "ADMIN") {
      usersByRole[g.role] = g._count._all;
    }
  }

  const lessonsPerSubject: SubjectLessonStat[] = subjects.map((s) => {
    const byGroup = {
      early: s.lessons.early.length,
      primary: s.lessons.primary.length,
      intermediate: s.lessons.intermediate.length,
      teen: s.lessons.teen.length,
    };
    return {
      subjectId: s.id,
      name: s.name,
      emoji: s.emoji,
      byGroup,
      total: byGroup.early + byGroup.primary + byGroup.intermediate + byGroup.teen,
    };
  });

  const recentSignups: RecentSignup[] = recentUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as AdminRole,
    createdAt: u.createdAt.toISOString(),
  }));

  const data: OverviewData = {
    usersByRole,
    usersTotal: usersByRole.STUDENT + usersByRole.PARENT + usersByRole.TEACHER + usersByRole.ADMIN,
    studentsTotal,
    classroomsTotal,
    assignmentsTotal,
    customActivitiesTotal,
    progressRows,
    activityMinutes7d: activityRows.reduce((n, r) => n + r.minutes, 0),
    activeStudents7d: new Set(activityRows.map((r) => r.studentId)).size,
    lessonsPerSubject,
    lessonsTotal: lessonsPerSubject.reduce((n, s) => n + s.total, 0),
    registrationOpen: registrationSetting?.value !== "false",
    recentSignups,
  };

  return Response.json(data);
}
