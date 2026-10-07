import { db } from "@/lib/db";
import { getSessionUser, unauthorized, forbidden } from "@/lib/server/auth";

// ---------------------------------------------------------------------------
// GET /api/status — live "My Students" status for the signed-in TEACHER
// (ADMIN sees every student). One row per student, merged across classrooms.
//
// How online/offline is derived (honest account of the data model):
// · Students do NOT get their own User row. /api/auth/student-login (code+PIN)
//   creates a Session for the student's parent/guardian User (or a minted
//   `guardian+<studentId>@brightminds.local` user when the child is
//   parentless). The client is told role=STUDENT, but the underlying account
//   is the guardian's.
// · Every authenticated API call heartbeats that account's User.lastSeenAt
//   (throttled to 1/min in lib/server/auth.ts). When a child is using the app
//   on the family device, this heartbeat fires — so:
//       online  = guardian.lastSeenAt within 5 min
//                 OR student-specific activity within 5 min
//   Caveat: siblings sharing one parent login show as online together.
// · lastActive = newest student-specific timestamp we can find:
//   Progress.completedAt · AssignmentResult.updatedAt · ResourceView.openedAt
//   · ActivityLog day (noon of that local day). null when the student has
//   never produced server-side activity.
// ---------------------------------------------------------------------------

const ONLINE_WINDOW_MS = 5 * 60 * 1000;

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();
  if (user.role !== "TEACHER" && user.role !== "ADMIN") return forbidden();

  const seats = await db.classroomStudent.findMany({
    where:
      user.role === "ADMIN" ? {} : { classroom: { teacherId: user.id } },
    include: {
      student: { select: { id: true, name: true } },
      classroom: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // Merge seats per student (a child can sit in several classrooms/groups).
  const byStudent = new Map<
    string,
    { studentId: string; name: string; groups: Set<string>; classrooms: Set<string>; parentIds: Set<string> }
  >();
  for (const seat of seats) {
    let entry = byStudent.get(seat.student.id);
    if (!entry) {
      entry = {
        studentId: seat.student.id,
        name: seat.student.name,
        groups: new Set(),
        classrooms: new Set(),
        parentIds: new Set(),
      };
      byStudent.set(seat.student.id, entry);
    }
    if (seat.groupName !== "") entry.groups.add(seat.groupName);
    entry.classrooms.add(seat.classroom.name);
  }
  const studentIds = [...byStudent.keys()];

  // Guardian accounts (for the lastSeenAt heartbeat signal).
  const students = studentIds.length
    ? await db.student.findMany({
        where: { id: { in: studentIds } },
        select: { id: true, parentId: true },
      })
    : [];
  const guardianIds = [...new Set(students.map((s) => s.parentId).filter((p): p is string => !!p))];
  const guardians = guardianIds.length
    ? await db.user.findMany({
        where: { id: { in: guardianIds } },
        select: { id: true, lastSeenAt: true },
      })
    : [];
  const guardianByUser = new Map(guardians.map((g) => [g.id, g.lastSeenAt]));
  const guardianOfStudent = new Map(students.map((s) => [s.id, s.parentId ?? null]));

  // Student-specific activity timestamps.
  const [progress, results, views, activity] = await Promise.all([
    studentIds.length
      ? db.progress.findMany({
          where: { studentId: { in: studentIds } },
          select: { studentId: true, completedAt: true },
        })
      : Promise.resolve([]),
    studentIds.length
      ? db.assignmentResult.findMany({
          where: { studentId: { in: studentIds } },
          select: { studentId: true, updatedAt: true },
        })
      : Promise.resolve([]),
    studentIds.length
      ? db.resourceView.findMany({
          where: { studentId: { in: studentIds } },
          select: { studentId: true, openedAt: true },
        })
      : Promise.resolve([]),
    studentIds.length
      ? db.activityLog.findMany({
          where: { studentId: { in: studentIds } },
          select: { studentId: true, day: true },
        })
      : Promise.resolve([]),
  ]);

  const lastActive = new Map<string, Date>();
  const bump = (studentId: string, at: Date | null) => {
    if (!at || Number.isNaN(at.getTime())) return;
    const prev = lastActive.get(studentId);
    if (!prev || at.getTime() > prev.getTime()) lastActive.set(studentId, at);
  };
  progress.forEach((p) => bump(p.studentId, p.completedAt));
  results.forEach((r) => bump(r.studentId, r.updatedAt));
  views.forEach((v) => bump(v.studentId, v.openedAt));
  activity.forEach((a) => bump(a.studentId, new Date(`${a.day}T12:00:00`)));

  const now = Date.now();
  const rows = [...byStudent.values()]
    .map((entry) => {
      const guardianSeen = guardianByUser.get(guardianOfStudent.get(entry.studentId) ?? "");
      const studentSeen = lastActive.get(entry.studentId);
      const online =
        (guardianSeen !== undefined &&
          guardianSeen !== null &&
          now - guardianSeen.getTime() <= ONLINE_WINDOW_MS) ||
        (studentSeen !== undefined && now - studentSeen.getTime() <= ONLINE_WINDOW_MS);
      return {
        studentId: entry.studentId,
        name: entry.name,
        groupName: [...entry.groups].join(", "),
        classroomNames: [...entry.classrooms],
        online,
        lastActive: studentSeen ? studentSeen.toISOString() : null,
      };
    })
    .sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1; // online first
      return a.name.localeCompare(b.name);
    });

  return Response.json({ students: rows, onlineWindowMinutes: 5 });
}
