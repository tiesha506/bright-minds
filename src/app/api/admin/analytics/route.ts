import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { subjects } from "@/lib/content";
import { requireAdmin } from "../_util";
import type {
  AnalyticsRange,
  AnalyticsBucketSize,
  AnalyticsBucket,
  AnalyticsPoint,
  AnalyticsNullablePoint,
  SubjectUsageRow,
  AnalyticsTotals,
  AnalyticsSeries,
  AnalyticsData,
  CountRow,
} from "@/lib/admin-types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DAY_MS = 24 * 60 * 60 * 1000;

const VALID_RANGES = new Set(["today", "7d", "30d", "3m", "6m", "12m", "custom"]);

const pad = (n: number) => String(n).padStart(2, "0");

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function firstOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Local-day key (YYYY-MM-DD) — matches ActivityLog.day. */
function dayKeyOf(d: Date): string {
  return dateKey(d);
}

interface BucketSet {
  keys: string[];
  labels: string[];
  /** Bucket start timestamps (ms). */
  starts: number[];
}

function buildBuckets(size: AnalyticsBucketSize, from: Date, to: Date): BucketSet {
  const keys: string[] = [];
  const labels: string[] = [];
  const starts: number[] = [];

  if (size === "month") {
    let d = firstOfMonth(from);
    while (d.getTime() <= to.getTime()) {
      starts.push(d.getTime());
      keys.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}`);
      labels.push(`${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`);
      d = addMonths(d, 1);
    }
  } else {
    const step = size === "week" ? 7 : 1;
    let d = startOfDay(from);
    while (d.getTime() <= to.getTime()) {
      starts.push(d.getTime());
      keys.push(dateKey(d));
      labels.push(`${d.getDate()} ${MONTHS[d.getMonth()]}`);
      d = addDays(d, step);
    }
  }
  return { keys, labels, starts };
}

function makeBucketIndex(bucket: BucketSet): (ts: number) => number {
  const { starts } = bucket;
  return (ts: number) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= ts) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };
}

const zeroPoints = (bucket: BucketSet): AnalyticsPoint[] =>
  bucket.keys.map((key, i) => ({ key, label: bucket.labels[i], value: 0 }));

const nullPoints = (bucket: BucketSet): AnalyticsNullablePoint[] =>
  bucket.keys.map((key, i) => ({ key, label: bucket.labels[i], value: null }));

/** "YYYY-MM-DD" ActivityLog day → local midnight timestamp. */
function dayToTs(day: string): number {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
}

interface ResolvedRange {
  range: AnalyticsRange;
  from: Date;
  to: Date;
  size: AnalyticsBucketSize;
}

function resolveRange(req: NextRequest): ResolvedRange | Response {
  const params = req.nextUrl.searchParams;
  const rangeParam = (params.get("range") ?? "7d").toLowerCase();
  if (!VALID_RANGES.has(rangeParam)) {
    return Response.json(
      { error: "Invalid range. Use today | 7d | 30d | 3m | 6m | 12m | custom." },
      { status: 400 }
    );
  }
  const now = new Date();

  if (rangeParam === "custom") {
    const fromRaw = params.get("from");
    const toRaw = params.get("to");
    if (!fromRaw || !toRaw) {
      return Response.json(
        { error: "Custom range requires `from` and `to` query params (ISO dates)." },
        { status: 400 }
      );
    }
    const fromDate = new Date(fromRaw);
    const toDate = new Date(toRaw);
    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
      return Response.json({ error: "Invalid `from`/`to` dates." }, { status: 400 });
    }
    // Date-only inputs ("YYYY-MM-DD") cover the whole day.
    const from = fromRaw.length <= 10 ? startOfDay(fromDate) : fromDate;
    const to = toRaw.length <= 10 ? endOfDay(toDate) : toDate;
    if (from.getTime() > to.getTime()) {
      return Response.json({ error: "`from` must be before `to`." }, { status: 400 });
    }
    const spanDays = (to.getTime() - from.getTime()) / DAY_MS;
    if (spanDays > 366) {
      return Response.json(
        { error: "Custom range is limited to 366 days." },
        { status: 400 }
      );
    }
    const size: AnalyticsBucketSize =
      spanDays <= 62 ? "day" : spanDays <= 217 ? "week" : "month";
    return { range: "custom", from, to, size };
  }

  switch (rangeParam) {
    case "today":
      return { range: "today", from: startOfDay(now), to: now, size: "day" };
    case "7d":
      return {
        range: "7d",
        from: startOfDay(addDays(now, -6)),
        to: now,
        size: "day",
      };
    case "30d":
      return {
        range: "30d",
        from: startOfDay(addDays(now, -29)),
        to: now,
        size: "day",
      };
    case "3m":
      return {
        range: "3m",
        from: startOfDay(addDays(now, -90)),
        to: now,
        size: "week",
      };
    case "6m":
      return { range: "6m", from: addMonths(firstOfMonth(now), -5), to: now, size: "month" };
    default:
      return { range: "12m", from: addMonths(firstOfMonth(now), -11), to: now, size: "month" };
  }
}

interface AnalyticsRawRow {
  students_created: { c: string; p: string | null }[];
  users_created: { r: string; c: string }[];
  activity_rows: { d: string; s: string; m: number; st: string }[];
  progress_rows: { st: string; s: string; c: string }[];
  assignments_created: { t: string; c: string }[];
  result_rows: { s: string; sc: number | null; cc: string | null; ty: string; ac: string }[];
  certificate_rows: { e: string }[];
  parent_notification_users: string[];
  user_roles: { k: string; n: number }[];
  age_groups: { k: string; n: number }[];
  assignment_types: { k: string; n: number }[];
}

/**
 * GET /api/admin/analytics?range=today|7d|30d|3m|6m|12m|custom&from=&to=
 *
 * Real time-series aggregates over the selected window. Every number is a
 * database aggregation — empty windows are zero-filled (still real data),
 * and quiz averages are null for buckets without completed quizzes.
 *
 * The whole payload is fetched in ONE raw SQL round trip (json_agg per
 * section) because the Postgres pooler here runs connection_limit=1 —
 * fanning out many Prisma queries would queue past the pool timeout.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const resolved = resolveRange(req);
  if (resolved instanceof Response) return resolved;
  const { range, from, to, size } = resolved;

  const fromDay = dayKeyOf(from);
  const toDay = dayKeyOf(to);

  const [rawRows] = await Promise.all([
    db.$queryRaw<AnalyticsRawRow[]>`
      SELECT
        (SELECT COALESCE(json_agg(json_build_object('c', "createdAt", 'p', "parentId")), '[]'::json)
           FROM "Student"
           WHERE "createdAt" >= ${from} AND "createdAt" <= ${to})          AS students_created,
        (SELECT COALESCE(json_agg(json_build_object('r', "role", 'c', "createdAt")), '[]'::json)
           FROM "User"
           WHERE "role" IN ('PARENT','TEACHER')
             AND "createdAt" >= ${from} AND "createdAt" <= ${to})          AS users_created,
        (SELECT COALESCE(json_agg(json_build_object('d', "day", 's', "subjectId", 'm', "minutes", 'st', "studentId")), '[]'::json)
           FROM "ActivityLog"
           WHERE "day" >= ${fromDay} AND "day" <= ${toDay})                AS activity_rows,
        (SELECT COALESCE(json_agg(json_build_object('st', "studentId", 's', "subjectId", 'c', "completedAt")), '[]'::json)
           FROM "Progress"
           WHERE "completedAt" >= ${from} AND "completedAt" <= ${to})      AS progress_rows,
        (SELECT COALESCE(json_agg(json_build_object('t', "teacherId", 'c', "createdAt")), '[]'::json)
           FROM "Assignment"
           WHERE "createdAt" >= ${from} AND "createdAt" <= ${to})          AS assignments_created,
        (SELECT COALESCE(json_agg(json_build_object('s', r."status", 'sc', r."score", 'cc', r."completedAt", 'ty', a."type", 'ac', a."createdAt")), '[]'::json)
           FROM "AssignmentResult" r
           JOIN "Assignment" a ON a."id" = r."assignmentId"
           WHERE (r."completedAt" >= ${from} AND r."completedAt" <= ${to})
              OR (a."createdAt" >= ${from} AND a."createdAt" <= ${to}))    AS result_rows,
        (SELECT COALESCE(json_agg(json_build_object('e', "earnedAt")), '[]'::json)
           FROM "Certificate"
           WHERE "earnedAt" >= ${from} AND "earnedAt" <= ${to})            AS certificate_rows,
        (SELECT COALESCE(json_agg(DISTINCT n."userId"), '[]'::json)
           FROM "Notification" n
           JOIN "User" u ON u."id" = n."userId"
           WHERE n."createdAt" >= ${from} AND n."createdAt" <= ${to}
             AND u."role" = 'PARENT')                                      AS parent_notification_users,
        (SELECT COALESCE(json_agg(json_build_object('k', k, 'n', n)), '[]'::json)
           FROM (SELECT "role" AS k, COUNT(*)::int AS n FROM "User" GROUP BY "role") t) AS user_roles,
        (SELECT COALESCE(json_agg(json_build_object('k', k, 'n', n)), '[]'::json)
           FROM (SELECT "ageGroup" AS k, COUNT(*)::int AS n FROM "Student" GROUP BY "ageGroup") t) AS age_groups,
        (SELECT COALESCE(json_agg(json_build_object('k', k, 'n', n)), '[]'::json)
           FROM (SELECT "type" AS k, COUNT(*)::int AS n FROM "Assignment" GROUP BY "type") t) AS assignment_types`,
  ]);
  const raw = rawRows[0];

  const bucket = buildBuckets(size, from, to);
  if (bucket.keys.length === 0) {
    // Defensive: cannot happen with the ranges above, but never divide by zero.
    return Response.json({ error: "Range produced no buckets." }, { status: 400 });
  }
  const idxOf = makeBucketIndex(bucket);
  const fromTs = from.getTime();
  const toTs = to.getTime();
  const inRange = (ts: number) => ts >= fromTs && ts <= toTs;

  // ---------------------------------------------------------------- registrations
  const studentRegistrations = zeroPoints(bucket);
  for (const s of raw.students_created) {
    const ts = new Date(s.c).getTime();
    if (inRange(ts)) studentRegistrations[idxOf(ts)].value += 1;
  }

  const parentRegistrations = zeroPoints(bucket);
  const teacherRegistrations = zeroPoints(bucket);
  let parentRegs = 0;
  let teacherRegs = 0;
  for (const u of raw.users_created) {
    const ts = new Date(u.c).getTime();
    if (!inRange(ts)) continue;
    const idx = idxOf(ts);
    if (u.r === "PARENT") {
      parentRegistrations[idx].value += 1;
      parentRegs += 1;
    } else if (u.r === "TEACHER") {
      teacherRegistrations[idx].value += 1;
      teacherRegs += 1;
    }
  }

  // ------------------------------------------------- activity / minutes / reading
  const activeStudents = zeroPoints(bucket);
  const activeSets: Set<string>[] = bucket.keys.map(() => new Set<string>());
  const activityMinutes = zeroPoints(bucket);
  const readingMinutes = zeroPoints(bucket);
  const minutesBySubject = new Map<string, number>();
  const allActiveStudents = new Set<string>();

  for (const row of raw.activity_rows) {
    const idx = idxOf(dayToTs(row.d));
    activeSets[idx].add(row.st);
    allActiveStudents.add(row.st);
    activityMinutes[idx].value += row.m;
    minutesBySubject.set(row.s, (minutesBySubject.get(row.s) ?? 0) + row.m);
    if (row.s === "reading") readingMinutes[idx].value += row.m;
  }
  const lessonsBySubject = new Map<string, number>();
  for (const row of raw.progress_rows) {
    const idx = idxOf(new Date(row.c).getTime());
    activeSets[idx].add(row.st);
    allActiveStudents.add(row.st);
    lessonsBySubject.set(row.s, (lessonsBySubject.get(row.s) ?? 0) + 1);
  }
  for (let i = 0; i < activeSets.length; i++) activeStudents[i].value = activeSets[i].size;

  // ------------------------------------------------------------ teacher activity
  const teacherAssignments = zeroPoints(bucket);
  const activeTeachers = new Set<string>();
  for (const a of raw.assignments_created) {
    const ts = new Date(a.c).getTime();
    if (!inRange(ts)) continue;
    teacherAssignments[idxOf(ts)].value += 1;
    activeTeachers.add(a.t);
  }

  // -------------------------------------------------- completion + quiz averages
  const completionCompleted = zeroPoints(bucket);
  const completionAssigned = zeroPoints(bucket);
  const quizScoresPerBucket: (number[] | null)[] = bucket.keys.map(() => null);

  let completedResults = 0;
  let assignedResults = 0;
  let quizScoreSum = 0;
  let quizScoreCount = 0;

  for (const r of raw.result_rows) {
    const assignedTs = new Date(r.ac).getTime();
    if (inRange(assignedTs)) {
      completionAssigned[idxOf(assignedTs)].value += 1;
      assignedResults += 1;
    }
    if (r.s === "completed" && r.cc) {
      const ts = new Date(r.cc).getTime();
      if (inRange(ts)) {
        completionCompleted[idxOf(ts)].value += 1;
        completedResults += 1;
        if (r.ty === "quiz" && r.sc != null) {
          const idx = idxOf(ts);
          quizScoresPerBucket[idx] ??= [];
          quizScoresPerBucket[idx]!.push(r.sc);
          quizScoreSum += r.sc;
          quizScoreCount += 1;
        }
      }
    }
  }
  const quizAvg = nullPoints(bucket);
  for (let i = 0; i < quizAvg.length; i++) {
    const scores = quizScoresPerBucket[i];
    if (scores && scores.length > 0) {
      quizAvg[i].value = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
    }
  }

  // --------------------------------------------------------------- certificates
  const certificates = zeroPoints(bucket);
  for (const c of raw.certificate_rows) {
    const ts = new Date(c.e).getTime();
    if (inRange(ts)) certificates[idxOf(ts)].value += 1;
  }

  // -------------------------------------------------------------- subject usage
  const subjectName = new Map(subjects.map((s) => [s.id, s.name]));
  const usageIds = new Set<string>([...minutesBySubject.keys(), ...lessonsBySubject.keys()]);
  const subjectUsage: SubjectUsageRow[] = [...usageIds]
    .map((subjectId) => ({
      subjectId,
      label: subjectName.get(subjectId) ?? subjectId,
      lessons: lessonsBySubject.get(subjectId) ?? 0,
      minutes: minutesBySubject.get(subjectId) ?? 0,
    }))
    .sort(
      (a, b) =>
        b.minutes + b.lessons * 5 - (a.minutes + a.lessons * 5) // rough activity weight
    );

  // -------------------------------------------------------------- parent activity
  const activeParents = new Set<string>(raw.parent_notification_users);
  for (const s of raw.students_created) if (s.p) activeParents.add(s.p);

  // ---------------------------------------------------------------------- totals
  const totals: AnalyticsTotals = {
    studentRegistrations: raw.students_created.length,
    parentRegistrations: parentRegs,
    teacherRegistrations: teacherRegs,
    activeStudents: allActiveStudents.size,
    assignmentsCreated: raw.assignments_created.length,
    activeTeachers: activeTeachers.size,
    activeParents: activeParents.size,
    completedResults,
    assignedResults,
    certificates: raw.certificate_rows.length,
    activityMinutes: raw.activity_rows.reduce((n, r) => n + r.m, 0),
    quizAvg:
      quizScoreCount > 0 ? Math.round((quizScoreSum / quizScoreCount) * 10) / 10 : null,
  };

  // ------------------------------------------------- all-time context (real data)
  const ROLE_LABELS: Record<string, string> = {
    PARENT: "Parents",
    TEACHER: "Teachers",
    ADMIN: "Admins",
    STUDENT: "Student accounts",
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

  const usersByRole: CountRow[] = ["PARENT", "TEACHER", "ADMIN", "STUDENT"]
    .map((role) => ({
      label: ROLE_LABELS[role] ?? role,
      value: raw.user_roles.find((g) => g.k === role)?.n ?? 0,
    }))
    .filter((r) => r.value > 0);

  const studentsPerAgeGroup: CountRow[] = ["early", "primary", "intermediate", "teen"].map(
    (group) => ({
      label: GROUP_LABELS[group] ?? group,
      value: raw.age_groups.find((g) => g.k === group)?.n ?? 0,
    })
  );

  const knownTypes = ["worksheet", "lesson", "quiz", "reading", "custom"];
  const extraTypes = raw.assignment_types.map((g) => g.k).filter((t) => !knownTypes.includes(t));
  const assignmentsByType: CountRow[] = [...knownTypes, ...extraTypes].map((type) => ({
    label: TYPE_LABELS[type] ?? type,
    value: raw.assignment_types.find((g) => g.k === type)?.n ?? 0,
  }));

  const series: AnalyticsSeries = {
    studentRegistrations,
    parentRegistrations,
    teacherRegistrations,
    activeStudents,
    teacherAssignments,
    completionCompleted,
    completionAssigned,
    quizAvg,
    subjectUsage,
    readingMinutes,
    certificates,
    activityMinutes,
  };

  const data: AnalyticsData = {
    range,
    from: from.toISOString(),
    to: to.toISOString(),
    bucketSize: size,
    buckets: bucket.keys.map((key, i) => ({ key, label: bucket.labels[i] })),
    series,
    totals,
    allTime: { usersByRole, studentsPerAgeGroup, assignmentsByType },
  };
  return Response.json(data);
}
