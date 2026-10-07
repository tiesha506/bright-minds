import { db } from "@/lib/db";
import { requireTeacher, seatsForTeacher, aggregateStudents } from "../_server";

/**
 * GET /api/teacher/classrooms — the teacher's classrooms plus a flattened
 * roster (per-student aggregates) for the Students table.
 */
export async function GET(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const [classrooms, seats] = await Promise.all([
    db.classroom.findMany({
      where: { teacherId: auth.id },
      include: { _count: { select: { seats: true, assignments: true } } },
      orderBy: { createdAt: "asc" },
    }),
    seatsForTeacher(auth.id),
  ]);

  const distinctIds = Array.from(new Set(seats.map((s) => s.student.id)));
  const aggregates = await aggregateStudents(distinctIds);

  const students = seats.map((seat) => {
    const agg = aggregates.get(seat.student.id);
    return {
      seatId: seat.seatId,
      studentId: seat.student.id,
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
      classroomId: seat.classroomId,
      classroomName: seat.classroomName,
    };
  });

  return Response.json({
    classrooms: classrooms.map((c) => ({
      id: c.id,
      name: c.name,
      gradeLabel: c.gradeLabel,
      studentCount: c._count.seats,
      assignmentCount: c._count.assignments,
      createdAt: c.createdAt.toISOString(),
    })),
    students,
  });
}

/**
 * POST /api/teacher/classrooms — create a classroom.
 * Body: { name, gradeLabel? }
 */
export async function POST(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { name, gradeLabel } = (body ?? {}) as { name?: unknown; gradeLabel?: unknown };

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
    return Response.json(
      { error: "Classroom name must be between 2 and 80 characters" },
      { status: 400 }
    );
  }
  if (gradeLabel !== undefined && typeof gradeLabel !== "string") {
    return Response.json({ error: "gradeLabel must be a string" }, { status: 400 });
  }

  const classroom = await db.classroom.create({
    data: {
      name: name.trim(),
      gradeLabel: typeof gradeLabel === "string" ? gradeLabel.trim().slice(0, 60) : "",
      teacherId: auth.id,
    },
  });

  return Response.json({
    classroom: {
      id: classroom.id,
      name: classroom.name,
      gradeLabel: classroom.gradeLabel,
      studentCount: 0,
      assignmentCount: 0,
      createdAt: classroom.createdAt.toISOString(),
    },
  });
}
