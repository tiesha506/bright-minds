// ---------------------------------------------------------------------------
// BrightMinds — server-only helpers for the Teacher Materials pipeline:
//   1. Text extraction (PDF / DOCX / PPTX / TXT / image OCR)
//   2. Private Supabase Storage ("content" bucket) upload / signed URLs
//   3. AI helpers (content analysis + grounded question generation) via
//      z-ai-web-dev-sdk — BACKEND ONLY, never import from client code.
//   4. Auth guard (TEACHER with ADMIN override)
// Every parser/AI call is failure-tolerant: extraction problems must never
// 500 an upload — callers receive best-effort text plus a human note.
// ---------------------------------------------------------------------------

import { getSessionUser, unauthorized, forbidden, type SessionUser } from "@/lib/server/auth";
import { db } from "@/lib/db";
import type { Difficulty, SubjectId } from "@/lib/teacher-types";
import type { GeneratedItem, MaterialAnalysis } from "@/lib/teacher-materials";

// ============================ 1. Text extraction ===========================

export interface ExtractResult {
  /** Best-effort extracted text ("" when unavailable). */
  text: string;
  /** Human-friendly note for the teacher (shown in the UI). */
  note: string;
  method: "pdf" | "docx" | "pptx" | "text" | "ocr" | "none" | "unsupported" | "failed";
}

const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp"];
const TEXT_EXTS = ["txt", "md"];
const DOC_EXTS = ["pdf", "doc", "docx", "ppt", "pptx"];

export function fileExt(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** PDF text via pdf-parse v2 (PDFParse class — avoids the v1 debug shim). */
export async function extractPdfText(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    return (result?.text ?? "").replace(/\u0000/g, "").trim();
  } finally {
    await parser.destroy().catch(() => {});
  }
}

/** DOCX text via mammoth (raw text, no styles). */
export async function extractDocxText(buffer: Buffer): Promise<string> {
  // mammoth ships without TypeScript types — narrow the surface we need.
  const mammoth = (await import("mammoth")) as unknown as {
    extractRawText(input: { buffer: Buffer }): Promise<{ value: string }>;
  };
  const result = await mammoth.extractRawText({ buffer });
  return (result?.value ?? "").trim();
}

/** PPTX text via JSZip: read ppt/slides/slideN.xml and keep <a:t> runs. */
export async function extractPptxText(buffer: Buffer): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(buffer);
  const slideFiles = Object.keys(zip.files)
    .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
    .sort((a, b) => {
      const na = Number(a.match(/slide(\d+)\.xml/)?.[1] ?? 0);
      const nb = Number(b.match(/slide(\d+)\.xml/)?.[1] ?? 0);
      return na - nb;
    });
  const slides: string[] = [];
  for (const path of slideFiles) {
    const xml = await zip.files[path].async("string");
    const runs = xml.match(/<a:t>([\s\S]*?)<\/a:t>/g) ?? [];
    const line = runs
      .map((r) => r.replace(/<a:t>/, "").replace(/<\/a:t>/, "").trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (line) slides.push(line);
  }
  return slides.join("\n\n").trim();
}

/** Plain text / markdown files. */
export function extractPlainText(buffer: Buffer): string {
  return buffer.toString("utf8").replace(/\u0000/g, "").trim();
}

/**
 * OCR an image with the vision model: return ALL text exactly as written.
 * Throws on failure — the dispatcher catches and degrades gracefully.
 */
export async function ocrImage(buffer: Buffer, mimeType: string): Promise<string> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();
  const dataUrl = `data:${mimeType || "image/png"};base64,${buffer.toString("base64")}`;
  const completion = await zai.chat.completions.createVision({
    model: "glm-4.5v",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract ALL text from this image exactly as written, preserving reading order and line breaks. Output only the extracted text with no commentary. If the image contains no readable text, output exactly: NO_TEXT_FOUND",
          },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ],
    thinking: { type: "disabled" },
  });
  const text = String(completion?.choices?.[0]?.message?.content ?? "").trim();
  if (!text || text === "NO_TEXT_FOUND") return "";
  return text;
}

/**
 * Dispatcher: extract text from any supported upload. NEVER throws —
 * every parser is wrapped so a bad file degrades to "" + a note.
 */
export async function extractText(fileName: string, mimeType: string, buffer: Buffer): Promise<ExtractResult> {
  const ext = fileExt(fileName);
  try {
    if (ext === "pdf" || mimeType === "application/pdf") {
      const text = await extractPdfText(buffer);
      return {
        text,
        note: text ? `Extracted ${text.length.toLocaleString()} characters from the PDF.` : "No text layer found in this PDF (it may be scanned images). You can still attach it and add resources.",
        method: "pdf",
      };
    }
    if (ext === "docx") {
      const text = await extractDocxText(buffer);
      return { text, note: text ? `Extracted ${text.length.toLocaleString()} characters from the Word document.` : "The document appears to be empty.", method: "docx" };
    }
    if (ext === "pptx") {
      const text = await extractPptxText(buffer);
      return { text, note: text ? `Extracted ${text.length.toLocaleString()} characters from the presentation.` : "No readable text found on the slides.", method: "pptx" };
    }
    if (ext === "doc" || ext === "ppt") {
      return {
        text: "",
        note: `Legacy .${ext} files don't support automatic text extraction. The file is attached as a downloadable resource — for AI scanning, save it as .docx/.pptx/.pdf or upload photos of the pages.`,
        method: "unsupported",
      };
    }
    if (IMAGE_EXTS.includes(ext) || mimeType.startsWith("image/")) {
      const text = await ocrImage(buffer, mimeType);
      return { text, note: text ? `Read ${text.length.toLocaleString()} characters from the image (OCR).` : "No readable text found in the image.", method: "ocr" };
    }
    if (TEXT_EXTS.includes(ext) || mimeType.startsWith("text/")) {
      const text = extractPlainText(buffer);
      return { text, note: text ? `Loaded ${text.length.toLocaleString()} characters of text.` : "The file appears to be empty.", method: "text" };
    }
    return { text: "", note: "No text extraction for this file type.", method: "none" };
  } catch (err) {
    console.error(`[extract] failed for ${fileName} (${ext}):`, err);
    const why = DOC_EXTS.includes(ext)
      ? "Automatic text extraction failed for this file. It is still attached as a downloadable resource."
      : "Automatic text extraction is not available for this file. It is still attached as a downloadable resource.";
    return { text: "", note: why, method: "failed" };
  }
}

// ====================== 2. Supabase "content" bucket ========================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const CONTENT_BUCKET = "content";

export function contentStorageConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_ROLE);
}

/** Sanitize a user-supplied file name for use inside a storage key. */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "file";
  const clean = base
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 80);
  return clean || "file";
}

/** Upload bytes to the private "content" bucket. Throws on failure. */
export async function uploadToContentBucket(key: string, bytes: Uint8Array, mimeType: string): Promise<void> {
  if (!contentStorageConfigured()) throw new Error("File storage is not configured");
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${CONTENT_BUCKET}/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": mimeType || "application/octet-stream",
      "x-upsert": "true",
    },
    body: new Uint8Array(bytes),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[storage] upload failed:", res.status, detail.slice(0, 300));
    throw new Error("File upload failed");
  }
}

/** Create a short-lived signed URL for a private object ("" when unavailable). */
export async function signedUrlForContent(key: string, expiresIn = 300): Promise<string> {
  if (!key || !contentStorageConfigured()) return "";
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/${CONTENT_BUCKET}/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn }),
    });
    if (!res.ok) return "";
    const data = (await res.json()) as { signedURL?: string };
    if (!data.signedURL) return "";
    return `${SUPABASE_URL}/storage/v1${data.signedURL}`;
  } catch (err) {
    console.error("[storage] signed URL failed:", err);
    return "";
  }
}

/** Best-effort delete of a private object (never throws). */
export async function deleteContentObject(key: string): Promise<void> {
  if (!key || !contentStorageConfigured()) return;
  try {
    await fetch(`${SUPABASE_URL}/storage/v1/object/${CONTENT_BUCKET}/${key}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${SERVICE_ROLE}` },
    });
  } catch (err) {
    console.error("[storage] delete failed:", err);
  }
}

// =============================== 3. AI helpers ==============================

/** Max characters of material text sent to the model (token control). */
const ANALYSIS_TEXT_LIMIT = 16_000;
const GENERATION_TEXT_LIMIT = 24_000;

interface ChatLike {
  chat: {
    completions: {
      create: (body: {
        messages: { role: "system" | "user" | "assistant"; content: string }[];
        thinking?: { type: "enabled" | "disabled" };
      }) => Promise<unknown>;
      createVision: (body: unknown) => Promise<unknown>;
    };
  };
}

async function getZai(): Promise<ChatLike> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  return (await ZAI.create()) as unknown as ChatLike;
}

/** Pull the assistant text out of a chat completion response. */
function chatText(completion: unknown): string {
  const c = completion as { choices?: { message?: { content?: unknown } }[] } | null;
  const content = c?.choices?.[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Robust JSON extraction: strips markdown fences and grabs the outermost
 * {...} block before parsing. Throws with a friendly message on failure.
 */
export function parseLooseJson<T>(raw: string): T {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("The AI response could not be read. Please try again.");
  }
  try {
    return JSON.parse(s.slice(first, last + 1)) as T;
  } catch {
    throw new Error("The AI response could not be read. Please try again.");
  }
}

function cleanStringArray(value: unknown, max = 30): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((x): x is string => typeof x === "string" && x.trim().length > 0)
    .map((x) => x.trim().slice(0, 300))
    .slice(0, max);
}

export type { MaterialAnalysis };

export interface MaterialAiAnalysis extends MaterialAnalysis {
  subject: SubjectId; // best guess from content (teacher can override)
  topic: string;
}

const ANALYSIS_SYSTEM =
  "You are an expert primary/secondary school curriculum analyst for the BrightMinds learning platform. " +
  "You analyse teacher-supplied lesson material and respond with STRICT JSON only — no prose, no markdown fences.";

/**
 * Analyse extracted material text: subject guess, topic, objectives,
 * concepts, vocabulary, detected questions, difficulty, summary.
 */
export async function analyzeMaterialText(
  text: string,
  teacherSubject: SubjectId
): Promise<MaterialAiAnalysis> {
  const trimmed = text.slice(0, ANALYSIS_TEXT_LIMIT);
  const zai = await getZai();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: ANALYSIS_SYSTEM },
      {
        role: "user",
        content:
          `Analyse this teaching material and return STRICT JSON with EXACTLY these keys:\n` +
          `{\n` +
          `  "subject": "math" | "english" | "science" | "reading",   // best guess from the CONTENT\n` +
          `  "topic": string,            // short topic name, max 8 words\n` +
          `  "objectives": string[],     // 2-6 learning objectives ("Students will be able to …")\n` +
          `  "concepts": string[],       // 2-8 key concepts or skills covered\n` +
          `  "vocabulary": string[],     // 0-12 important subject words/terms to teach\n` +
          `  "questions": string[],      // 0-10 questions that literally appear in the material (verbatim)\n` +
          `  "difficulty": "mild" | "standard" | "tricky",  // mild=easier, standard=on level, tricky=stretch\n` +
          `  "summary": string           // 1-3 sentence summary of the material\n` +
          `}\n\n` +
          `Rules: every string must be plain text (no markdown). If the material seems to belong to a different\n` +
          `subject than "${teacherSubject}", still set "subject" to the best guess from the content.\n` +
          `If the text is too short or unclear, use empty arrays and a summary explaining that.\n\n` +
          `MATERIAL:\n"""\n${trimmed}\n"""`,
      },
    ],
    thinking: { type: "disabled" },
  });

  const raw = chatText(completion);
  if (!raw.trim()) throw new Error("The AI returned an empty analysis");
  const parsed = parseLooseJson<Record<string, unknown>>(raw);
  const subjectRaw = typeof parsed.subject === "string" ? parsed.subject : "";
  const subject: SubjectId = (["math", "english", "science", "reading"] as const).includes(
    subjectRaw as SubjectId
  )
    ? (subjectRaw as SubjectId)
    : teacherSubject;
  const difficultyRaw = typeof parsed.difficulty === "string" ? parsed.difficulty : "";
  const difficulty: Difficulty =
    difficultyRaw === "mild" || difficultyRaw === "tricky" ? difficultyRaw : "standard";
  return {
    subject,
    topic: typeof parsed.topic === "string" ? parsed.topic.trim().slice(0, 120) : "",
    objectives: cleanStringArray(parsed.objectives, 8),
    concepts: cleanStringArray(parsed.concepts, 10),
    vocabulary: cleanStringArray(parsed.vocabulary, 14),
    questions: cleanStringArray(parsed.questions, 12),
    difficulty,
    summary: typeof parsed.summary === "string" ? parsed.summary.trim().slice(0, 800) : "",
  };
}

export type GenerateKind = "questions" | "examples" | "quiz" | "worksheet" | "reading";
export type GenerateMode = "simplify" | "challenge" | "practice";

const LEVEL_GUIDANCE: Record<string, string> = {
  early:
    "early learners (ages 6-8): very short simple sentences, everyday words only, one clear step per question, friendly concrete examples",
  primary:
    "primary students (ages 9-11): clear simple language, concrete examples, 1-2 step problems, age-appropriate vocabulary",
  intermediate:
    "intermediate students (ages 12-13): clear age-appropriate language, some multi-step questions, subject vocabulary introduced in the material may be used",
  teen:
    "teen students (ages 14-15): mature but accessible language, multi-step and higher-order questions, precise subject vocabulary",
};

const KIND_GUIDANCE: Record<GenerateKind, string> = {
  questions:
    "Short practice questions the student answers in writing or out loud. Mix recall and application. Leave \"options\" as an empty array.",
  examples:
    "Worked examples: each item shows a fully worked example — the \"question\" states the example, the \"answer\" gives the worked solution step by step. Leave \"options\" as an empty array.",
  quiz:
    "Multiple-choice quiz items. Each item MUST include exactly 4 options in \"options\" with exactly one correct; \"answer\" must be the exact text of the correct option.",
  worksheet:
    "Printable worksheet items: a mix of fill-in-the-blank, short computation and short-answer prompts, written to fit on a printed page. Leave \"options\" as an empty array.",
  reading:
    "Reading comprehension questions about the passage(s) in the material: literal recall first, then inference and vocabulary-in-context. Leave \"options\" as an empty array.",
};

const MODE_GUIDANCE: Record<GenerateMode, string> = {
  simplify:
    "Simplify: use the simplest possible wording, add scaffolding, break multi-step work into single steps, keep the same underlying content.",
  challenge:
    "Make more challenging: extend slightly beyond the baseline difficulty with multi-step reasoning and application questions — but still strictly from the material.",
  practice:
    "More practice: fresh variations at the same difficulty level, so the student gets additional repetition of the same skills.",
};

const GENERATION_SYSTEM =
  "You are an expert teacher-assistant on the BrightMinds learning platform. You generate classroom-ready " +
  "learning content STRICTLY grounded in the teacher's material. You respond with STRICT JSON only — no prose, no markdown fences.";

export interface GenerateArgs {
  extractedText: string;
  analysis: MaterialAnalysis;
  kind: GenerateKind;
  count: number; // 1..20
  difficulty: Difficulty;
  level: string; // early | primary | intermediate | teen
  subjectId: SubjectId;
  topic?: string;
  instructions?: string;
  mode?: GenerateMode;
}

/**
 * Grounded generation from a teacher material. The extracted text is THE
 * primary source — the prompt forbids introducing anything that does not
 * appear in (or directly follow from) the material.
 */
export async function generateGroundedItems(args: GenerateArgs): Promise<{
  items: GeneratedItem[];
  basedOn: string;
}> {
  const text = args.extractedText.slice(0, GENERATION_TEXT_LIMIT);
  if (!text.trim()) {
    throw new Error(
      "This material has no readable text to generate from. Upload a document with text (PDF/DOCX/PPTX/TXT) or a photo, or re-scan it."
    );
  }
  const anchors: string[] = [];
  if (args.analysis.concepts.length > 0) anchors.push(`Key concepts: ${args.analysis.concepts.join("; ")}`);
  if (args.analysis.vocabulary.length > 0) anchors.push(`Vocabulary to draw from: ${args.analysis.vocabulary.join("; ")}`);
  if (args.topic) anchors.push(`Topic focus: ${args.topic}`);

  const modeLine = args.mode ? `\n- Variant: ${MODE_GUIDANCE[args.mode]}` : "";
  const instructionLine = args.instructions?.trim()
    ? `\n- Extra teacher instructions (follow them, but never violate the grounding rule): ${args.instructions.trim().slice(0, 500)}`
    : "";
  const quizReminder =
    args.kind === "quiz"
      ? `\n\nIMPORTANT: every item is multiple choice — "options" MUST contain exactly 4 strings and "answer" MUST be exactly equal to one of them.`
      : "";

  const zai = await getZai();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: GENERATION_SYSTEM },
      {
        role: "user",
        content:
          `Generate ${args.count} ${KIND_GUIDANCE[args.kind]}\n\n` +
          `STRICT GROUNDING RULE: Generate these items STRICTLY based on the following teacher material. ` +
          `Do NOT introduce topics, concepts, formulas, characters or vocabulary that do not appear in or directly follow from the material.\n\n` +
          `Requirements:\n` +
          `- Subject: ${args.subjectId} — every item must stay within this subject.\n` +
          `- Audience: ${LEVEL_GUIDANCE[args.level] ?? LEVEL_GUIDANCE.primary}\n` +
          `- Difficulty: ${args.difficulty} (mild=easier confidence-building, standard=on level, tricky=stretch)\n` +
          `- Count: exactly ${args.count} items.\n` +
          (anchors.length > 0 ? `- Anchors from the material analysis:\n  ${anchors.join("\n  ")}\n` : "") +
          modeLine +
          instructionLine +
          quizReminder +
          `\n\nReturn STRICT JSON exactly like:\n` +
          `{"items":[{"question":"...","answer":"...","options":[],"hint":"..."}],"basedOn":"<short topic label>"}` +
          `\n"options" must be an empty array EXCEPT for quiz items (exactly 4 strings, one correct).` +
          `\n"hint" is one short friendly sentence of help (max 15 words).` +
          `\n"basedOn" is a 2-6 word label of what the items are based on.\n\n` +
          `TEACHER MATERIAL:\n"""\n${text}\n"""`,
      },
    ],
    thinking: { type: "disabled" },
  });

  const raw = chatText(completion);
  if (!raw.trim()) throw new Error("The AI returned no content. Please try again.");
  const parsed = parseLooseJson<{ items?: unknown; basedOn?: unknown }>(raw);

  const items: GeneratedItem[] = [];
  if (Array.isArray(parsed.items)) {
    for (const rawItem of parsed.items) {
      if (!rawItem || typeof rawItem !== "object") continue;
      const it = rawItem as Record<string, unknown>;
      const question = typeof it.question === "string" ? it.question.trim() : "";
      if (!question) continue;
      const options = Array.isArray(it.options)
        ? it.options.filter((x): x is string => typeof x === "string" && x.trim().length > 0).map((x) => x.trim())
        : [];
      items.push({
        question: question.slice(0, 1200),
        answer: typeof it.answer === "string" ? it.answer.trim().slice(0, 1200) : "",
        options: options.length >= 2 ? options.slice(0, 6) : [],
        hint: typeof it.hint === "string" ? it.hint.trim().slice(0, 200) : "",
      });
      if (items.length >= args.count) break;
    }
  }
  if (items.length === 0) throw new Error("The AI could not generate questions from this material. Try re-scanning or adding more text.");
  return {
    items,
    basedOn: typeof parsed.basedOn === "string" && parsed.basedOn.trim() ? parsed.basedOn.trim().slice(0, 120) : args.topic || args.subjectId,
  };
}

// ============================ 4. Auth + misc ================================

/** TEACHER guard with ADMIN override (materials pipeline). */
export async function requireTeacherOrAdmin(req: Request): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();
  if (user.role !== "TEACHER" && user.role !== "ADMIN") return forbidden();
  return user;
}

/** Load a teacher-owned material (ADMIN may access any). */
export async function ownedMaterial(id: string, auth: SessionUser) {
  if (!id) return null;
  const material = await db.teacherMaterial.findUnique({ where: { id } });
  if (!material) return null;
  if (auth.role !== "ADMIN" && material.teacherId !== auth.id) return null;
  return material;
}

export function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? Math.round(value) : Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
