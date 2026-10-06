// ---------------------------------------------------------------------------
// POST /api/ai/generate — grounded question generation from a teacher
// material. The extracted text is THE primary source; the prompt forbids
// introducing anything not in (or directly following from) the material.
// Body: { materialId, kind, count, difficulty, level, topic?, instructions?,
//         mode? } → { items: [{question, answer, options, hint}], basedOn }
// DRAFT ONLY: nothing is sent to students automatically.
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  requireTeacherOrAdmin,
  ownedMaterial,
  generateGroundedItems,
} from "@/lib/server/extract";
import { parseMaterialAnalysis } from "@/lib/teacher-materials";
import type { GenerateKind, GenerateMode } from "@/lib/teacher-materials";
import { SUBJECT_IDS } from "@/lib/teacher-types";
import type { SubjectId } from "@/lib/teacher-types";

export const runtime = "nodejs";
export const maxDuration = 120;

const KINDS: GenerateKind[] = ["questions", "examples", "quiz", "worksheet", "reading"];
const MODES: GenerateMode[] = ["simplify", "challenge", "practice"];

export async function POST(req: Request) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const materialId = typeof body.materialId === "string" ? body.materialId : "";
  const material = await ownedMaterial(materialId, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });

  const kind = KINDS.includes(body.kind as GenerateKind) ? (body.kind as GenerateKind) : "questions";
  const mode = MODES.includes(body.mode as GenerateMode) ? (body.mode as GenerateMode) : undefined;

  const countRaw = Number(body.count);
  const count = Number.isFinite(countRaw) ? Math.min(20, Math.max(1, Math.round(countRaw))) : 8;

  const difficulty =
    body.difficulty === "mild" || body.difficulty === "tricky" ? (body.difficulty as "mild" | "tricky") : "standard";

  const level = typeof body.level === "string" && ["early", "primary", "intermediate", "teen"].includes(body.level)
    ? body.level
    : "primary";

  // The assignment subject is ALWAYS the teacher-selected subject; the
  // generation prompt keeps every item inside it.
  const subjectId = (SUBJECT_IDS as readonly string[]).includes(String(material.subjectId))
    ? (material.subjectId as SubjectId)
    : "math";

  try {
    const result = await generateGroundedItems({
      extractedText: material.extractedText,
      analysis: parseMaterialAnalysis(material.analysisJson),
      kind,
      count,
      difficulty,
      level,
      subjectId,
      topic: typeof body.topic === "string" ? body.topic : material.topic,
      instructions: typeof body.instructions === "string" ? body.instructions : "",
      mode,
    });
    return Response.json({ items: result.items, basedOn: result.basedOn });
  } catch (err) {
    console.error("[ai/generate] failed:", err);
    const message = err instanceof Error ? err.message : "The AI could not generate content right now. Please try again.";
    return Response.json({ error: message }, { status: 502 });
  }
}
