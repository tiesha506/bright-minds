import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { subjects } from "@/lib/content";
import { requireAdmin, dayKey } from "../_util";
import type {
  OverviewData,
  SubjectLessonStat,
  AdminRole,
  RecentSignup,
  TopXpStudent,
} from "@/lib/admin-types";

interface OverviewRawRow {
  students_total: number;
  classrooms_total: number;
  assignments_total: number;
  completed_assignments: number;
  custom_activities_total: number;
  progress_rows: number;
  users_total: number;
  online_users: number;
  certificates_issued: number;
  xp_total: number;
  registration_open: string | null;
  user_roles: { r: string; n: number }[];
  act_7d: { st: string; m: number }[];
  prog_7d: { st: string }[];
  view_7d: { st: string }[];
  res_7d: { st: string }[];
  recent_users: { id: string; name: string; email: string; role: string; c: string }[];
  top_xp: {
    id: string;
    name: string;
    xp: number;
    ag: string;
    av: string;
    pu: string;
    ac: string;
  }[];
}

/**
 * GET /api/admin/overview — headline counts for the admin dashboard.
 *
 * Every number is computed live from the database; nothing is cached or
 * fabricated. The scalar counts + 7-day activity unions are fetched in ONE
 * raw SQL round trip (the Postgres pooler here runs connection_limit=1, so
 * fanning out dozens of Prisma queries would time out the pool).
 *
 * Definitions:
 * - Online = lastSeenAt within the last 5 minutes (maintained by the auth layer).
 * - Active students (7d) = distinct students with any ActivityLog / Progress /
 *   ResourceView / AssignmentResult activity in the last 7 days.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const since7Date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const since7 = dayKey(6);

  const rawRows = await db.$queryRaw<OverviewRawRow[]>`
      SELECT
        (SELECT COUNT(*)::int FROM "Student")                                   AS students_total,
        (SELECT COUNT(*)::int FROM "Classroom")                                 AS classrooms_total,
        (SELECT COUNT(*)::int FROM "Assignment")                                AS assignments_total,
        (SELECT COUNT(*)::int FROM "AssignmentResult" WHERE "status" = 'completed') AS completed_assignments,
        (SELECT COUNT(*)::int FROM "CustomActivity")                            AS custom_activities_total,
        (SELECT COUNT(*)::int FROM "Progress")                                  AS progress_rows,
        (SELECT COUNT(*)::int FROM "User")                                      AS users_total,
        (SELECT COUNT(*)::int FROM "User" WHERE "lastSeenAt" >= ${fiveMinAgo})  AS online_users,
        (SELECT COUNT(*)::int FROM "Certificate")                               AS certificates_issued,
        (SELECT COALESCE(SUM("xp"), 0)::int FROM "Student")                     AS xp_total,
        (SELECT "value" FROM "PlatformSetting" WHERE "key" = 'registrationOpen') AS registration_open,
        (SELECT COALESCE(json_agg(json_build_object('r', k, 'n', n)), '[]'::json)
           FROM (SELECT "role" AS k, COUNT(*)::int AS n FROM "User" GROUP BY "role") t) AS user_roles,
        (SELECT COALESCE(json_agg(json_build_object('st', "studentId", 'm', "minutes")), '[]'::json)
           FROM "ActivityLog" WHERE "day" >= ${since7})                         AS act_7d,
        (SELECT COALESCE(json_agg(json_build_object('st', "studentId")), '[]'::json)
           FROM "Progress" WHERE "completedAt" >= ${since7Date})                AS prog_7d,
        (SELECT COALESCE(json_agg(json_build_object('st', "studentId")), '[]'::json)
           FROM "ResourceView" WHERE "openedAt" >= ${since7Date})               AS view_7d,
        (SELECT COALESCE(json_agg(json_build_object('st', "studentId")), '[]'::json)
           FROM "AssignmentResult" WHERE "updatedAt" >= ${since7Date})          AS res_7d,
        (SELECT COALESCE(json_agg(json_build_object('id', "id", 'name', "name", 'email', "email", 'role', "role", 'c', "createdAt")), '[]'::json)
           FROM (SELECT "id", "name", "email", "role", "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 10) t) AS recent_users,
        (SELECT COALESCE(json_agg(json_build_object('id', "id", 'name', "name", 'xp', "xp", 'ag', "ageGroup", 'av', "avatar", 'pu', "photoUrl", 'ac', "avatarColor")), '[]'::json)
           FROM (SELECT "id", "name", "xp", "ageGroup", "avatar", "photoUrl", "avatarColor"
                   FROM "Student" WHERE "xp" > 0
                   ORDER BY "xp" DESC, "createdAt" ASC LIMIT 5) t)              AS top_xp`;
  const raw = rawRows[0];

  const usersByRole: Record<AdminRole, number> = {
    STUDENT: 0,
    PARENT: 0,
    TEACHER: 0,
    ADMIN: 0,
  };
  for (const g of raw.user_roles) {
    if (g.r === "STUDENT" || g.r === "PARENT" || g.r === "TEACHER" || g.r === "ADMIN") {
      usersByRole[g.r] = g.n;
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

  const recentSignups: RecentSignup[] = raw.recent_users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as AdminRole,
    createdAt: new Date(u.c).toISOString(),
  }));

  const activeStudentIds = new Set<string>();
  let activityMinutes7d = 0;
  for (const r of raw.act_7d) {
    activeStudentIds.add(r.st);
    activityMinutes7d += r.m;
  }
  for (const r of raw.prog_7d) activeStudentIds.add(r.st);
  for (const r of raw.view_7d) activeStudentIds.add(r.st);
  for (const r of raw.res_7d) activeStudentIds.add(r.st);

  const topStudents: TopXpStudent[] = raw.top_xp.map((s) => ({
    id: s.id,
    name: s.name,
    xp: s.xp,
    ageGroup: s.ag,
    avatar: s.av,
    photoUrl: s.pu,
    avatarColor: s.ac,
  }));

  const usersTotal = raw.users_total;

  const data: OverviewData = {
    usersByRole,
    usersTotal,
    studentsTotal: raw.students_total,
    parentsTotal: usersByRole.PARENT,
    teachersTotal: usersByRole.TEACHER,
    classroomsTotal: raw.classrooms_total,
    assignmentsTotal: raw.assignments_total,
    completedAssignments: raw.completed_assignments,
    customActivitiesTotal: raw.custom_activities_total,
    progressRows: raw.progress_rows,
    activityMinutes7d,
    activeStudents7d: activeStudentIds.size,
    onlineUsers: raw.online_users,
    offlineUsers: Math.max(0, usersTotal - raw.online_users),
    certificatesIssued: raw.certificates_issued,
    achievements: {
      xpTotal: raw.xp_total,
      topStudents,
    },
    lessonsPerSubject,
    lessonsTotal: lessonsPerSubject.reduce((n, s) => n + s.total, 0),
    registrationOpen: raw.registration_open !== "false",
    recentSignups,
  };

  return Response.json(data);
}
