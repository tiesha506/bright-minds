// ---------------------------------------------------------------------------
// POST /api/teacher/materials/[id]/assign — the ONLY assignment creation path
// for material-based work. Body:
//   { classroomId, groupName?, studentIds?, level, difficulty, questionCount,
//     dueDate?, instructions?, title?, generated: { items:[...], basedOn } }
// Creates: Assignment (type "custom", materialId set, subjectId = the
// material's subject), ContentResource rows linking the material's original
// file + attached multimedia to the assignment, and AssignmentResult rows
// (status "assigned") for the targeted students.
// The teacher MUST review the generated items first — questions (without
// answers) are embedded in the instructions the student sees.
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import { requireTeacherOrAdmin, ownedMaterial } from "@/lib/server/extract";
import { parseGenerateResult } from "@/lib/teacher-materials";
import type { GeneratedItem } from "@/lib/teacher-materials";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

const LEVELS = ["early", "primary", "intermediate", "teen"];
const DIFFICULTIES = ["mild", "standard", "tricky"];

/** Teacher-approved questions → numbered list for the student instructions. */
function questionsBlock(items: GeneratedItem[]): string {
  return items.map((it, i) => `${i + 1}. ${it.question}`).join("\n");
}

export async function POST(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ------------------------------ classroom --------------------------------
  const classroomId = typeof body.classroomId === "string" ? body.classroomId : "";
  const classroom = await db.classroom.findFirst({
    where: { id: classroomId, teacherId: auth.id },
    include: { seats: { select: { studentId: true, groupName: true } } },
  });
  if (!classroom) {
    return Response.json({ error: "Choose one of your classrooms" }, { status: 400 });
  }

  // ------------------------------- target ----------------------------------
  const groupName =
    body.groupName === null || body.groupName === undefined || body.groupName === ""
      ? null
      : typeof body.groupName === "string" && ["A", "B", "C"].includes(body.groupName)
        ? body.groupName
        : null;
  if (body.groupName && groupName === null) {
    return Response.json({ error: "Group must be A, B or C" }, { status: 400 });
  }

  const rawIds = Array.isArray(body.studentIds)
    ? body.studentIds.filter((x): x is string => typeof x === "string")
    : [];
  let targetIds: string[];
  if (rawIds.length > 0) {
    const seatSet = new Set(classroom.seats.map((s) => s.studentId));
    targetIds = Array.from(new Set(rawIds.filter((sid) => seatSet.has(sid))));
    if (targetIds.length === 0) {
      return Response.json({ error: "Selected students must belong to this classroom" }, { status: 400 });
    }
  } else if (groupName) {
    targetIds = classroom.seats.filter((s) => s.groupName === groupName).map((s) => s.studentId);
  } else {
    targetIds = classroom.seats.map((s) => s.studentId);
  }
  if (targetIds.length === 0) {
    return Response.json({ error: "No students match this target" }, { status: 400 });
  }

  // ------------------------------ validation --------------------------------
  const level = typeof body.level === "string" && LEVELS.includes(body.level) ? body.level : "";
  if (!level) {
    return Response.json({ error: "Choose an age group (early, primary, intermediate or teen)" }, { status: 400 });
  }
  const difficulty =
    typeof body.difficulty === "string" && DIFFICULTIES.includes(body.difficulty) ? body.difficulty : "standard";

  const generated = parseGenerateResult(body.generated);
  if (generated.items.length === 0) {
    return Response.json(
      { error: "Nothing to assign yet — generate questions in Step 3 and review them first." },
      { status: 400 }
    );
  }

  let questionCount = generated.items.length;
  if (body.questionCount !== undefined) {
    const n = Number(body.questionCount);
    if (Number.isFinite(n) && n >= 1 && n <= 50) questionCount = Math.round(n);
  }

  if (typeof body.dueDate === "string" && body.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(body.dueDate)) {
    return Response.json({ error: "Due date must be YYYY-MM-DD" }, { status: 400 });
  }
  const dueDate = typeof body.dueDate === "string" ? body.dueDate : "";

  const teacherTitle = typeof body.title === "string" && body.title.trim() ? body.title.trim().slice(0, 160) : "";
  const title = teacherTitle || material.title;

  const extraInstructions =
    typeof body.instructions === "string" && body.instructions.trim() ? body.instructions.trim().slice(0, 800) : "";

  // Student-visible instructions: teacher note + the reviewed questions
  // (answers/hints stay on the teacher side, never shipped to students).
  const instructions = [extraInstructions, questionsBlock(generated.items)].filter(Boolean).join("\n\n").slice(0, 4000);

  // ------------------------------ create rows -------------------------------
  const assignment = await db.assignment.create({
    data: {
      teacherId: auth.id,
      classroomId: classroom.id,
      title,
      type: "custom",
      subjectId: material.subjectId, // ALWAYS the teacher-selected subject
      level,
      difficulty,
      questionCount,
      dueDate,
      instructions,
      groupName,
      studentIds: JSON.stringify(rawIds.length > 0 ? targetIds : []),
      materialId: material.id,
    },
  });

  // Link the material's original file + attached multimedia to the assignment.
  const resourceRows: {
    kind: string;
    source: string;
    title: string;
    url: string;
    fileKey: string;
    fileName: string;
    mimeType: string;
    teacherId: string;
    assignmentId: string;
  }[] = [];
  if (material.fileKey) {
    const ext = material.fileName.split(".").pop()?.toLowerCase() ?? "";
    const kind = ["mp4", "webm", "mov"].includes(ext)
      ? "video"
      : ["mp3", "wav", "m4a", "ogg"].includes(ext)
        ? "audio"
        : ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
          ? "image"
          : ["pdf", "doc", "docx", "ppt", "pptx", "txt", "md"].includes(ext)
            ? "doc"
            : "file";
    resourceRows.push({
      kind,
      source: "upload",
      title: material.title,
      url: "",
      fileKey: material.fileKey,
      fileName: material.fileName,
      mimeType: material.mimeType,
      teacherId: auth.id,
      assignmentId: assignment.id,
    });
  }
  const materialResources = await db.contentResource.findMany({
    where: { materialId: material.id },
    select: { kind: true, source: true, title: true, url: true, fileKey: true, fileName: true, mimeType: true },
  });
  for (const r of materialResources) {
    resourceRows.push({
      kind: r.kind,
      source: r.source,
      title: r.title,
      url: r.url,
      fileKey: r.fileKey,
      fileName: r.fileName,
      mimeType: r.mimeType,
      teacherId: auth.id,
      assignmentId: assignment.id,
    });
  }
  if (resourceRows.length > 0) {
    await db.contentResource.createMany({ data: resourceRows });
  }

  await db.assignmentResult.createMany({
    data: targetIds.map((studentId) => ({
      assignmentId: assignment.id,
      studentId,
      status: "assigned",
    })),
  });

  // Mark the material as ready once it has been assigned at least once.
  if (material.status !== "ready") {
    await db.teacherMaterial.update({ where: { id: material.id }, data: { status: "ready" } });
  }

  return Response.json({
    assignment: {
      id: assignment.id,
      title: assignment.title,
      type: assignment.type,
      subjectId: assignment.subjectId,
      classroomId: classroom.id,
      classroomName: classroom.name,
      questionCount,
      targetCount: targetIds.length,
      resourceCount: materialResources.length,
    },
  });
}
