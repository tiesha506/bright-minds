import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

// ---------------------------------------------------------------------------
// GET /api/certificates[?studentId=<id>]
//
// Scopes (mirrors how every other student-scoped API authorises):
//  - student session (rides on the parent account) + studentId → that child's
//    certificates; authorised because the session user IS the child's parent.
//  - parent session → all of their children's certificates.
//  - teacher session → certificates of students seated in their classrooms.
//  - admin session → platform-wide counts (no full export).
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId");

  // ---- Scoped to one child (student device or the parent picking a child) --
  if (studentId) {
    const student = await db.student.findUnique({
      where: { id: studentId },
      include: { certificates: { orderBy: { earnedAt: "desc" } } },
    });
    if (!student) {
      return Response.json({ error: "Student not found" }, { status: 404 });
    }
    if (student.parentId !== user.id) {
      return Response.json({ error: "Not your child's profile" }, { status: 403 });
    }
    return Response.json({
      certificates: student.certificates.map((c) => ({
        id: c.id,
        serial: c.serial,
        title: c.title,
        kind: c.kind,
        description: c.description,
        earnedAt: c.earnedAt.toISOString(),
        studentId: student.id,
        studentName: student.name,
      })),
    });
  }

  // ---- Parent: every child they look after ---------------------------------
  if (user.role === "PARENT") {
    const children = await db.student.findMany({
      where: { parentId: user.id },
      include: { certificates: { orderBy: { earnedAt: "desc" } } },
    });
    const certificates = children.flatMap((child) =>
      child.certificates.map((c) => ({
        id: c.id,
        serial: c.serial,
        title: c.title,
        kind: c.kind,
        description: c.description,
        earnedAt: c.earnedAt.toISOString(),
        studentId: child.id,
        studentName: child.name,
      }))
    );
    certificates.sort((a, b) => b.earnedAt.localeCompare(a.earnedAt));
    return Response.json({ certificates });
  }

  // ---- Teacher: students seated in their classrooms -------------------------
  if (user.role === "TEACHER") {
    const seats = await db.classroomStudent.findMany({
      where: { classroom: { teacherId: user.id } },
      select: { studentId: true },
    });
    const studentIds = [...new Set(seats.map((s) => s.studentId))];
    if (studentIds.length === 0) return Response.json({ certificates: [] });

    const students = await db.student.findMany({
      where: { id: { in: studentIds } },
      include: { certificates: { orderBy: { earnedAt: "desc" } } },
    });
    const certificates = students.flatMap((child) =>
      child.certificates.map((c) => ({
        id: c.id,
        serial: c.serial,
        title: c.title,
        kind: c.kind,
        description: c.description,
        earnedAt: c.earnedAt.toISOString(),
        studentId: child.id,
        studentName: child.name,
      }))
    );
    certificates.sort((a, b) => b.earnedAt.localeCompare(a.earnedAt));
    return Response.json({ certificates });
  }

  // ---- Admin: honest platform-wide counts -----------------------------------
  if (user.role === "ADMIN") {
    const [total, grouped, recent] = await Promise.all([
      db.certificate.count(),
      db.certificate.groupBy({ by: ["kind"], _count: { _all: true } }),
      db.certificate.findMany({
        orderBy: { earnedAt: "desc" },
        take: 10,
        include: { student: { select: { name: true } } },
      }),
    ]);
    const byKind: Record<string, number> = {};
    for (const g of grouped) byKind[g.kind] = g._count._all;
    return Response.json({
      counts: { total, byKind },
      recent: recent.map((c) => ({
        id: c.id,
        serial: c.serial,
        title: c.title,
        kind: c.kind,
        earnedAt: c.earnedAt.toISOString(),
        studentName: c.student.name,
      })),
    });
  }

  return Response.json({ error: "Not allowed for your role" }, { status: 403 });
}
