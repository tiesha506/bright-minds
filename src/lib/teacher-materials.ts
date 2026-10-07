// ---------------------------------------------------------------------------
// BrightMinds — Teacher Materials (Content Upload + Intelligent Scanning).
// Client-safe shared types + labels + normalisers. NO server imports here:
// server-only helpers live in @/lib/server/extract.
// ---------------------------------------------------------------------------

import type { Difficulty, SubjectId } from "@/lib/teacher-types";

// ----------------------------- AI analysis shape ---------------------------

/**
 * Result of the AI "scan" of an uploaded document. Stored as JSON in
 * TeacherMaterial.analysisJson and edited inline by the teacher.
 */
export interface MaterialAnalysis {
  objectives: string[];
  concepts: string[];
  vocabulary: string[];
  /** Questions found in the document itself (not generated). */
  questions: string[];
  difficulty: Difficulty;
  summary: string;
}

export const EMPTY_ANALYSIS: MaterialAnalysis = {
  objectives: [],
  concepts: [],
  vocabulary: [],
  questions: [],
  difficulty: "standard",
  summary: "",
};

/** Defensive parse of the analysisJson column — never throws. */
export function parseMaterialAnalysis(raw: string | null | undefined): MaterialAnalysis {
  if (!raw) return { ...EMPTY_ANALYSIS, objectives: [], concepts: [], vocabulary: [], questions: [] };
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ...EMPTY_ANALYSIS };
  }
  if (!data || typeof data !== "object") return { ...EMPTY_ANALYSIS };
  const o = data as Record<string, unknown>;
  const strArr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim().length > 0) : [];
  const difficulty: Difficulty =
    o.difficulty === "mild" || o.difficulty === "tricky" ? o.difficulty : "standard";
  return {
    objectives: strArr(o.objectives),
    concepts: strArr(o.concepts),
    vocabulary: strArr(o.vocabulary),
    questions: strArr(o.questions),
    difficulty,
    summary: typeof o.summary === "string" ? o.summary : "",
  };
}

// ------------------------------ Material rows ------------------------------

export interface MaterialResource {
  id: string;
  kind: string; // video | audio | link | doc | image | file
  source: string; // upload | link
  title: string;
  url: string; // external URL for source=link
  fileName: string;
  mimeType: string;
  /** Short-lived signed URL for uploads (empty for links). */
  fileUrl: string;
  createdAt: string;
}

export interface MaterialSummary {
  id: string;
  title: string;
  subjectId: SubjectId;
  topic: string;
  status: string; // draft | ready
  analysis: MaterialAnalysis;
  hasFile: boolean;
  fileName: string;
  mimeType: string;
  /** multimedia = video/audio file (no text extraction) */
  fileKind: "document" | "image" | "multimedia" | "none";
  extractedChars: number;
  resourceCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialDetail extends MaterialSummary {
  /** First ~1200 chars of the extracted text (preview in the scan step). */
  extractedPreview: string;
  /** Short-lived signed URL to download the original file ("" if none). */
  fileUrl: string;
  extractionNote: string;
  resources: MaterialResource[];
}

// ------------------------------ File uploads -------------------------------

export const MAX_MATERIAL_MB = 50;

/** Extensions accepted for the ORIGINAL material upload. */
export const MATERIAL_ALLOWLIST = [
  "pdf", "doc", "docx", "ppt", "pptx", "jpg", "jpeg", "png", "webp",
  "mp4", "mp3", "wav", "txt", "md",
] as const;

export const MATERIAL_ACCEPT_ATTR =
  ".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.mp4,.mp3,.wav,.txt,.md";

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

export function materialFileKind(fileName: string): "document" | "image" | "multimedia" | "none" {
  const ext = fileExtension(fileName);
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  if (["mp4", "mp3", "wav"].includes(ext)) return "multimedia";
  if (MATERIAL_ALLOWLIST.includes(ext as (typeof MATERIAL_ALLOWLIST)[number])) return "document";
  return "none";
}

// ------------------------------ AI generation -------------------------------

export type GenerateKind = "questions" | "examples" | "quiz" | "worksheet" | "reading";

export const GENERATE_KINDS: { value: GenerateKind; label: string; emoji: string; hint: string }[] = [
  { value: "questions", label: "Questions", emoji: "❓", hint: "Open practice questions grounded in the material" },
  { value: "examples", label: "Examples", emoji: "💡", hint: "Worked examples with step-by-step answers" },
  { value: "quiz", label: "Quiz", emoji: "🧩", hint: "Multiple-choice quiz (4 options each)" },
  { value: "worksheet", label: "Worksheet", emoji: "✏️", hint: "Printable worksheet items (fill-in / short answer)" },
  { value: "reading", label: "Reading Questions", emoji: "📖", hint: "Comprehension questions about the text" },
];

export const GENERATE_MODES = [
  { value: "simplify", label: "Simplify", emoji: "🌱" },
  { value: "challenge", label: "Make More Challenging", emoji: "🔥" },
  { value: "practice", label: "Create More Practice", emoji: "🔁" },
] as const;

export type GenerateMode = (typeof GENERATE_MODES)[number]["value"];

export interface GeneratedItem {
  question: string;
  answer: string;
  /** Present for quiz items: 4 choices, one of which === answer. */
  options: string[];
  hint: string;
}

export interface GenerateResult {
  items: GeneratedItem[];
  basedOn: string;
}

/** Defensive parse of the /api/ai/generate response — never throws. */
export function parseGenerateResult(data: unknown): GenerateResult {
  const out: GenerateResult = { items: [], basedOn: "" };
  if (!data || typeof data !== "object") return out;
  const o = data as Record<string, unknown>;
  if (typeof o.basedOn === "string") out.basedOn = o.basedOn;
  if (!Array.isArray(o.items)) return out;
  for (const raw of o.items) {
    if (!raw || typeof raw !== "object") continue;
    const it = raw as Record<string, unknown>;
    const question = typeof it.question === "string" ? it.question.trim() : "";
    if (!question) continue;
    const options = Array.isArray(it.options)
      ? it.options.filter((x): x is string => typeof x === "string" && x.trim().length > 0)
      : [];
    out.items.push({
      question,
      answer: typeof it.answer === "string" ? it.answer : "",
      options: options.length >= 2 ? options : [],
      hint: typeof it.hint === "string" ? it.hint : "",
    });
  }
  return out;
}

// ------------------------------ Resources ----------------------------------

export const RESOURCE_KINDS = ["video", "audio", "link", "doc", "image", "file"] as const;
export type ResourceKind = (typeof RESOURCE_KINDS)[number];

export const RESOURCE_KIND_META: Record<ResourceKind, { label: string; emoji: string }> = {
  video: { label: "Video", emoji: "🎬" },
  audio: { label: "Audio", emoji: "🎧" },
  link: { label: "Link", emoji: "🔗" },
  doc: { label: "Document", emoji: "📄" },
  image: { label: "Image", emoji: "🖼️" },
  file: { label: "File", emoji: "📎" },
};

/** Extensions accepted for attached multimedia resources (uploads). */
export const RESOURCE_UPLOAD_ALLOWLIST = [
  "pdf", "doc", "docx", "ppt", "pptx", "jpg", "jpeg", "png", "webp", "mp4", "mp3", "wav", "txt", "md",
] as const;

/** Guess a resource kind from a URL or file name. */
export function guessResourceKind(nameOrUrl: string): ResourceKind {
  const lower = nameOrUrl.toLowerCase().split("?")[0];
  const ext = fileExtension(lower);
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["mp3", "wav", "m4a", "ogg"].includes(ext)) return "audio";
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (["pdf", "doc", "docx", "ppt", "pptx", "txt", "md"].includes(ext)) return "doc";
  return "link";
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// ------------------------------ Assignments --------------------------------

export interface AssignMaterialPayload {
  classroomId: string;
  groupName?: string | null;
  studentIds?: string[];
  level: string; // early | primary | intermediate | teen
  difficulty: Difficulty;
  questionCount: number;
  dueDate?: string;
  instructions?: string;
  title?: string;
  /** Teacher-reviewed generated items (questions only reach students). */
  generated: GenerateResult;
}
