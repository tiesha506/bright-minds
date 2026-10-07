import { db } from "@/lib/db";
import { requireTeacher, ownedClassroom, aggregateStudents } from "../../_server";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/teacher/classrooms/[id] — classroom detail with roster and
 * per-student aggregates (avg%, math avg, reading avg, last active).
 */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const classroom = await ownedClassroom(auth.id, id);
  if (!classroom) {
    return Response.json({ error: "Classroom not found" }, { status: 404 });
  }

  const studentIds = classroom.seats.map((s) => s.studentId);
  const aggregates = await aggregateStudents(studentIds);

  const students = classroom.seats
    .map((seat) => {
      const agg = aggregates.get(seat.studentId);
      return {
        seatId: seat.id,
        studentId: seat.studentId,
        name: seat.student.name,
        age: seat.student.age,
        ageGroup: seat.student.ageGroup,
        avatar: seat.student.avatar,
        avatarColor: seat.student.avatarColor,
        photoUrl: seat.student.photoUrl,
        loginCode: seat.student.loginCode,
        groupName: seat.groupName,
        avg: agg?.avg ?? null,
        mathAvg: agg?.mathAvg ?? null,
        readingAvg: agg?.readingAvg ?? null,
        quizAvg: agg?.quizAvg ?? null,
        lessonsDone: agg?.lessonsDone ?? 0,
        lastActive: agg?.lastActive ?? null,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const groupCounts = new Map<string, number>();
  for (const s of students) {
    const g = s.groupName || "—";
    groupCounts.set(g, (groupCounts.get(g) ?? 0) + 1);
  }

  const assignmentCount = await db.assignment.count({ where: { classroomId: classroom.id } });

  return Response.json({
    classroom: {
      id: classroom.id,
      name: classroom.name,
      gradeLabel: classroom.gradeLabel,
      createdAt: classroom.createdAt.toISOString(),
    },
    studentCount: students.length,
    assignmentCount,
    students,
    groups: Array.from(groupCounts.entries())
      .filter(([g]) => g !== "—")
      .map(([group, count]) => ({ group, count })),
  });
}

/** PATCH /api/teacher/classrooms/[id] — rename / re-label the classroom. */
export async function PATCH(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const classroom = await ownedClassroom(auth.id, id);
  if (!classroom) {
    return Response.json({ error: "Classroom not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { name, gradeLabel } = (body ?? {}) as { name?: unknown; gradeLabel?: unknown };

  const data: { name?: string; gradeLabel?: string } = {};
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
      return Response.json({ error: "Name must be 2-80 characters" }, { status: 400 });
    }
    data.name = name.trim();
  }
  if (gradeLabel !== undefined) {
    if (typeof gradeLabel !== "string" || gradeLabel.length > 60) {
      return Response.json({ error: "gradeLabel must be a short string" }, { status: 400 });
    }
    data.gradeLabel = gradeLabel.trim();
  }
  if (Object.keys(data).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await db.classroom.update({ where: { id: classroom.id }, data });
  return Response.json({
    classroom: {
      id: updated.id,
      name: updated.name,
      gradeLabel: updated.gradeLabel,
      createdAt: updated.createdAt.toISOString(),
    },
  });
}

/** DELETE /api/teacher/classrooms/[id] — deletes the classroom (seats cascade). */
export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const classroom = await ownedClassroom(auth.id, id);
  if (!classroom) {
    return Response.json({ error: "Classroom not found" }, { status: 404 });
  }
  await db.classroom.delete({ where: { id: classroom.id } });
  return Response.json({ ok: true });
}
