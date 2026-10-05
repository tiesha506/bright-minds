import { db } from "@/lib/db";
import {
  requireTeacher,
  ownedClassroom,
} from "../../../_server";
import { generateLoginCode, generatePin } from "@/lib/server/auth";
import { ageGroupForAge, AVATAR_COLOR_KEYS } from "@/lib/teacher-types";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/teacher/classrooms/[id]/students — enrol a new student.
 * Body: { name, age, avatar?, avatarColor?, groupName? }
 * Creates the Student (with generated login code + PIN) and the seat, then
 * returns the credentials so the teacher can hand them to the family.
 */
export async function POST(req: Request, { params }: RouteContext) {
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
  const { name, age, avatar, avatarColor, groupName } = (body ?? {}) as {
    name?: unknown;
    age?: unknown;
    avatar?: unknown;
    avatarColor?: unknown;
    groupName?: unknown;
  };

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
    return Response.json({ error: "Student name must be 2-60 characters" }, { status: 400 });
  }
  const ageNum = typeof age === "number" ? Math.round(age) : NaN;
  if (!Number.isFinite(ageNum) || ageNum < 5 || ageNum > 16) {
    return Response.json({ error: "Age must be between 5 and 16" }, { status: 400 });
  }
  if (avatar !== undefined && (typeof avatar !== "string" || avatar.length > 8)) {
    return Response.json({ error: "Invalid avatar" }, { status: 400 });
  }
  if (
    avatarColor !== undefined &&
    (typeof avatarColor !== "string" || !(AVATAR_COLOR_KEYS as readonly string[]).includes(avatarColor))
  ) {
    return Response.json({ error: "Invalid avatar colour" }, { status: 400 });
  }
  if (
    groupName !== undefined &&
    groupName !== null &&
    (typeof groupName !== "string" || !["A", "B", "C", ""].includes(groupName))
  ) {
    return Response.json({ error: "Group must be A, B or C" }, { status: 400 });
  }

  // Generate a unique login code.
  let loginCode = generateLoginCode();
  for (let i = 0; i < 10; i++) {
    const clash = await db.student.findUnique({ where: { loginCode } });
    if (!clash) break;
    loginCode = generateLoginCode();
  }
  const pin = generatePin();

  const student = await db.student.create({
    data: {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `stu-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      name: name.trim(),
      age: ageNum,
      ageGroup: ageGroupForAge(ageNum),
      theme: "neutral",
      avatar: typeof avatar === "string" && avatar ? avatar : "🙂",
      avatarColor: typeof avatarColor === "string" && avatarColor ? avatarColor : "teal",
      loginCode,
      pin,
    },
  });

  await db.classroomStudent.create({
    data: {
      classroomId: classroom.id,
      studentId: student.id,
      groupName: typeof groupName === "string" ? groupName : "",
    },
  });

  return Response.json({
    student: {
      id: student.id,
      name: student.name,
      age: student.age,
      avatar: student.avatar,
      avatarColor: student.avatarColor,
      groupName: typeof groupName === "string" ? groupName : "",
    },
    loginCode,
    pin,
  });
}
