import { db } from "@/lib/db";
import { requireTeacher, ownedClassroom } from "../_server";
import { getLesson } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import {
  ASSIGNMENT_TYPES,
  DIFFICULTIES,
  SUBJECT_IDS,
  CONTENT_STATUSES,
} from "@/lib/teacher-types";

const AGE_GROUPS: AgeGroup[] = ["early", "primary", "intermediate", "teen"];

/** Compute per-assignment completion stats. */
function statsFor(results: { status: string; score: number | null }[]) {
  const completed = results.filter((r) => r.status === "completed");
  const scored = completed.map((r) => r.score).filter((s): s is number => typeof s === "number");
  const avg =
    scored.length === 0
      ? null
      : Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
  return { targetCount: results.length, completedCount: completed.length, avgScore: avg };
}

/**
 * GET /api/teacher/assignments?classroomId=… — the teacher's assignments with
 * completion stats and classroom names.
 */
export async function GET(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const url = new URL(req.url);
  const classroomId = url.searchParams.get("classroomId") ?? undefined;

  if (classroomId) {
    const classroom = await ownedClassroom(auth.id, classroomId);
    if (!classroom) {
      return Response.json({ error: "Classroom not found" }, { status: 404 });
    }
  }

  const assignments = await db.assignment.findMany({
    where: { teacherId: auth.id, ...(classroomId ? { classroomId } : {}) },
    include: { classroom: { select: { name: true } }, results: true },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({
    assignments: assignments.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      subjectId: a.subjectId,
      lessonId: a.lessonId,
      lessonTitle:
        a.subjectId && a.lessonId ? (getLesson(a.subjectId, a.lessonId)?.title ?? null) : null,
      customActivityId: a.customActivityId,
      classroomId: a.classroomId,
      classroomName: a.classroom.name,
      level: a.level,
      difficulty: a.difficulty,
      questionCount: a.questionCount,
      dueDate: a.dueDate,
      instructions: a.instructions,
      groupName: a.groupName,
      studentIds: JSON.parse(a.studentIds || "[]") as string[],
      createdAt: a.createdAt.toISOString(),
      ...statsFor(a.results),
    })),
  });
}

/**
 * POST /api/teacher/assignments — create an assignment and "assigned" result
 * rows for the targeted students (whole class / a group / a selection).
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
  const b = (body ?? {}) as Record<string, unknown>;

  const classroomId = typeof b.classroomId === "string" ? b.classroomId : "";
  const classroom = await ownedClassroom(auth.id, classroomId);
  if (!classroom) {
    return Response.json({ error: "Choose one of your classrooms" }, { status: 400 });
  }

  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (title.length < 2 || title.length > 120) {
    return Response.json({ error: "Title must be 2-120 characters" }, { status: 400 });
  }

  const type = typeof b.type === "string" ? b.type : "";
  if (!(ASSIGNMENT_TYPES as readonly string[]).includes(type)) {
    return Response.json({ error: "Invalid assignment type" }, { status: 400 });
  }

  const level = typeof b.level === "string" ? b.level : "";
  if (!(AGE_GROUPS as string[]).includes(level)) {
    return Response.json({ error: "Level must be an age group" }, { status: 400 });
  }

  const difficulty = typeof b.difficulty === "string" ? b.difficulty : "standard";
  if (!(DIFFICULTIES as readonly string[]).includes(difficulty)) {
    return Response.json({ error: "Difficulty must be mild, standard or tricky" }, { status: 400 });
  }

  const questionCount =
    b.questionCount === undefined ? 8 : Math.round(Number(b.questionCount));
  if (!Number.isFinite(questionCount) || questionCount < 1 || questionCount > 50) {
    return Response.json({ error: "Question count must be 1-50" }, { status: 400 });
  }

  const dueDate = typeof b.dueDate === "string" ? b.dueDate.trim() : "";
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    return Response.json({ error: "Due date must be YYYY-MM-DD" }, { status: 400 });
  }

  const instructions = typeof b.instructions === "string" ? b.instructions.trim() : "";
  if (instructions.length > 1000) {
    return Response.json({ error: "Instructions must be under 1000 characters" }, { status: 400 });
  }

  // Subject / lesson / custom activity resolution.
  let subjectId = typeof b.subjectId === "string" ? b.subjectId : "";
  let lessonId = typeof b.lessonId === "string" && b.lessonId ? b.lessonId : null;
  let customActivityId =
    typeof b.customActivityId === "string" && b.customActivityId ? b.customActivityId : null;

  if (type === "custom") {
    if (!customActivityId) {
      return Response.json(
        { error: "A custom activity is required for custom assignments" },
        { status: 400 }
      );
    }
    const activity = await db.customActivity.findFirst({
      where: { id: customActivityId, teacherId: auth.id },
    });
    if (!activity) {
      return Response.json({ error: "Custom activity not found" }, { status: 404 });
    }
    customActivityId = activity.id;
    subjectId = activity.subjectId;
    lessonId = null;
  } else {
    customActivityId = null;
    if (!(SUBJECT_IDS as readonly string[]).includes(subjectId)) {
      return Response.json({ error: "Choose a subject" }, { status: 400 });
    }
    if (!lessonId) {
      return Response.json({ error: "Choose a lesson" }, { status: 400 });
    }
    const lesson = getLesson(subjectId, lessonId);
    if (!lesson) {
      return Response.json({ error: "Lesson not found for this subject" }, { status: 400 });
    }
    if (lessonId.split("-")[1] !== level) {
      return Response.json(
        { error: "The chosen lesson does not belong to the selected level" },
        { status: 400 }
      );
    }
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

  // Target students: selection > group > whole class.
  const rawIds = Array.isArray(b.studentIds) ? b.studentIds.filter((x): x is string => typeof x === "string") : [];
  const seatRows = await db.classroomStudent.findMany({
    where: { classroomId: classroom.id },
    select: { studentId: true, groupName: true },
  });
  let targetIds: string[];
  if (rawIds.length > 0) {
    const seatSet = new Set(seatRows.map((s) => s.studentId));
    targetIds = Array.from(new Set(rawIds.filter((id) => seatSet.has(id))));
    if (targetIds.length === 0) {
      return Response.json(
        { error: "Selected students must belong to this classroom" },
        { status: 400 }
      );
    }
  } else if (groupName) {
    targetIds = seatRows.filter((s) => s.groupName === groupName).map((s) => s.studentId);
  } else {
    targetIds = seatRows.map((s) => s.studentId);
  }
  if (targetIds.length === 0) {
    return Response.json(
      { error: "No students match this assignment target" },
      { status: 400 }
    );
  }

  const assignment = await db.assignment.create({
    data: {
      teacherId: auth.id,
      classroomId: classroom.id,
      title,
      type,
      subjectId,
      lessonId,
      customActivityId,
      level,
      difficulty,
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

  // Custom activities move to "assigned" once they are sent to students.
  if (customActivityId) {
    const activity = await db.customActivity.findUnique({ where: { id: customActivityId } });
    if (activity && (CONTENT_STATUSES as readonly string[]).includes(activity.status)) {
      await db.customActivity.update({
        where: { id: customActivityId },
        data: { status: "assigned" },
      });
    }
  }

  return Response.json({
    assignment: {
      id: assignment.id,
      title: assignment.title,
      type: assignment.type,
      subjectId,
      lessonId,
      classroomId: classroom.id,
      classroomName: classroom.name,
      level,
      difficulty,
      questionCount,
      dueDate,
      instructions,
      groupName,
      createdAt: assignment.createdAt.toISOString(),
      ...statsFor([]),
    },
    assignedCount: targetIds.length,
  });
}
