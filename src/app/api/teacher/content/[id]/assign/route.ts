import { db } from "@/lib/db";
import { requireTeacher } from "../../../_server";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/teacher/content/[id]/assign — wrap a custom activity as an
 * Assignment (type "custom") and create "assigned" result rows for the
 * targeted students (whole class / a group / a selection).
 */
export async function POST(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const activity = await db.customActivity.findFirst({ where: { id, teacherId: auth.id } });
  if (!activity) {
    return Response.json({ error: "Activity not found" }, { status: 404 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const b = (raw ?? {}) as Record<string, unknown>;

  const classroomId = typeof b.classroomId === "string" ? b.classroomId : "";
  const classroom = await db.classroom.findFirst({
    where: { id: classroomId, teacherId: auth.id },
    include: { seats: { select: { studentId: true, groupName: true } } },
  });
  if (!classroom) {
    return Response.json({ error: "Choose one of your classrooms" }, { status: 400 });
  }

  const groupName =
    b.groupName === null || b.groupName === undefined || b.groupName === ""
      ? null
      : typeof b.groupName === "string" && ["A", "B", "C"].includes(b.groupName)
        ? b.groupName
        : null;
  if (b.groupName && groupName === null) {
    return Response.json({ error: "Group must be A, B or C" }, { status: 400 });
  }

  const rawIds = Array.isArray(b.studentIds)
    ? b.studentIds.filter((x): x is string => typeof x === "string")
    : [];
  let targetIds: string[];
  if (rawIds.length > 0) {
    const seatSet = new Set(classroom.seats.map((s) => s.studentId));
    targetIds = Array.from(new Set(rawIds.filter((sid) => seatSet.has(sid))));
    if (targetIds.length === 0) {
      return Response.json(
        { error: "Selected students must belong to this classroom" },
        { status: 400 }
      );
    }
  } else if (groupName) {
    targetIds = classroom.seats.filter((s) => s.groupName === groupName).map((s) => s.studentId);
  } else {
    targetIds = classroom.seats.map((s) => s.studentId);
  }
  if (targetIds.length === 0) {
    return Response.json({ error: "No students match this target" }, { status: 400 });
  }

  // Item count doubles as the question count for custom work.
  let questionCount = 8;
  try {
    const parsed = JSON.parse(activity.body) as Record<string, unknown>;
    if (Array.isArray(parsed.items) && parsed.items.length > 0) questionCount = parsed.items.length;
    if (Array.isArray(parsed.questions) && parsed.questions.length > 0)
      questionCount = parsed.questions.length;
  } catch {
    // keep default
  }
  if (typeof b.dueDate === "string" && b.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(b.dueDate)) {
    return Response.json({ error: "Due date must be YYYY-MM-DD" }, { status: 400 });
  }
  const dueDate = typeof b.dueDate === "string" ? b.dueDate : "";
  const instructions =
    typeof b.instructions === "string" && b.instructions.trim()
      ? b.instructions.trim().slice(0, 1000)
      : "";

  const assignment = await db.assignment.create({
    data: {
      teacherId: auth.id,
      classroomId: classroom.id,
      title: activity.title,
      type: "custom",
      subjectId: activity.subjectId,
      customActivityId: activity.id,
      level: activity.ageGroup,
      difficulty: "standard",
      questionCount,
      dueDate,
      instructions,
      groupName,
      studentIds: JSON.stringify(rawIds.length > 0 ? targetIds : []),
    },
  });

  await db.assignmentResult.createMany({
    data: targetIds.map((studentId) => ({
      assignmentId: assignment.id,
      studentId,
      status: "assigned",
    })),
  });

  await db.customActivity.update({ where: { id: activity.id }, data: { status: "assigned" } });

  return Response.json({
    assignment: {
      id: assignment.id,
      title: assignment.title,
      classroomId: classroom.id,
      classroomName: classroom.name,
      targetCount: targetIds.length,
    },
  });
}
