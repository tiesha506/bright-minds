import { NextRequest } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { requireTeacher } from "../_server";
import { CONTENT_TYPES, SUBJECT_IDS } from "@/lib/teacher-types";
import type { AgeGroup } from "@/lib/content/types";

const AGE_GROUPS: AgeGroup[] = ["early", "primary", "intermediate", "teen"];
const AGE_GROUP_LABELS: Record<string, string> = {
  early: "early learners (ages 6-8)",
  primary: "primary students (ages 9-11)",
  intermediate: "intermediate students (ages 12-13)",
  teen: "teen students (ages 14-15, exam level)",
};

// Simple in-memory rate limit: 40 generations per teacher per day.
const RATE = new Map<string, { day: string; count: number }>();
function rateLimited(teacherId: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const entry = RATE.get(teacherId);
  if (!entry || entry.day !== today) {
    RATE.set(teacherId, { day: today, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > 40;
}

const SYSTEM = `You are "Teacher Helper", an expert teaching assistant for professional teachers using the BrightMinds learning platform. You draft classroom-ready materials and instructional advice.

Age-group calibration (always applies):
- early (ages 6-8): playful, very short sentences, familiar objects, numbers within 20, one idea per question.
- primary (ages 9-11): friendly and concrete, numbers within 1000, short multi-step tasks.
- intermediate (ages 12-13): clear and structured, real-world contexts, multi-step reasoning.
- teen (ages 14-15): exam-level precision, rigorous vocabulary and multi-step reasoning.

Non-negotiable rules:
1. Content must be curriculum-sane, factually correct and safe for children. No violence, scary themes, adult content, brand names or personal data.
2. Every answer you provide must be correct — verify each one before responding.
3. For structured modes, reply with STRICT JSON only: no markdown fences, no commentary before or after the JSON object.
4. Every question must be self-contained and age-appropriate.`;

/** Pull the outermost JSON object out of an LLM reply (fences tolerated). */
function extractJson(text: string): unknown | null {
  let t = text.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(t.slice(start, end + 1));
  } catch {
    return null;
  }
}

/** Minimal shape checks so the UI editors get what they expect. */
function shapeOk(mode: string, draft: unknown): boolean {
  if (typeof draft !== "object" || draft === null) return false;
  const d = draft as Record<string, unknown>;
  const isStrArr = (v: unknown) => Array.isArray(v) && v.every((x) => typeof x === "string");
  switch (mode) {
    case "worksheet":
      return typeof d.title === "string" && Array.isArray(d.items) && d.items.length > 0;
    case "quiz":
      return (
        typeof d.title === "string" &&
        Array.isArray(d.questions) &&
        d.questions.length > 0 &&
        (d.questions as unknown[]).every(
          (q) => typeof q === "object" && q !== null && Array.isArray((q as Record<string, unknown>).options)
        )
      );
    case "reading":
      return (
        typeof d.title === "string" &&
        typeof d.passage === "string" &&
        Array.isArray(d.questions) &&
        d.questions.length > 0
      );
    case "differentiate":
      return isStrArr(d.advanced) && isStrArr(d.onLevel) && isStrArr(d.support);
    default:
      return true;
  }
}

function buildPrompt(mode: string, p: Record<string, unknown>): string | null {
  const topic = typeof p.topic === "string" ? p.topic.trim().slice(0, 120) : "";
  const subject = typeof p.subject === "string" ? p.subject.trim().slice(0, 40) : "general";
  const ageGroup = typeof p.ageGroup === "string" && (AGE_GROUPS as string[]).includes(p.ageGroup)
    ? p.ageGroup
    : "primary";
  const ageLabel = AGE_GROUP_LABELS[ageGroup];
  const count = Math.min(20, Math.max(1, Math.round(Number(p.count)) || 8));
  const difficulty =
    typeof p.difficulty === "string" && ["mild", "standard", "tricky"].includes(p.difficulty)
      ? p.difficulty
      : "standard";

  switch (mode) {
    case "worksheet":
      if (!topic) return null;
      return `Create a ${count}-question ${difficulty} printable worksheet on "${topic}" for ${subject}, for ${ageLabel}.
Reply with STRICT JSON exactly in this shape:
{"title": "Worksheet title", "items": [{"prompt": "Question text", "answer": "model answer", "hint": "optional hint"}]}
Include exactly ${count} items. "answer" is the correct answer used in the teacher's answer key. Vary the question styles and keep every question self-contained.`;
    case "quiz":
      if (!topic) return null;
      return `Write a ${count}-question ${difficulty} multiple-choice quiz on "${topic}" for ${subject}, for ${ageLabel}.
Reply with STRICT JSON exactly in this shape:
{"title": "Quiz title", "questions": [{"question": "Question text", "options": ["A", "B", "C", "D"], "answerIndex": 0, "explanation": "Why the answer is right"}]}
Include exactly ${count} questions, each with exactly 4 options and the 0-based answerIndex of the correct option.`;
    case "reading":
      if (!topic) return null;
      return `Write an original reading comprehension passage on "${topic}" for ${ageLabel}.
Reply with STRICT JSON exactly in this shape:
{"title": "Passage title", "passage": "The full passage text", "questions": [{"question": "Comprehension question", "options": ["A", "B", "C", "D"], "answerIndex": 0}]}
The passage should be 150-400 words and age-appropriate. Include exactly 5 comprehension questions, each with exactly 4 options.`;
    case "strategies": {
      if (!topic) return null;
      return `Give practical, evidence-informed teaching strategies for the topic: "${topic}". Write markdown with short headings and bullet points, maximum 350 words. Focus on concrete classroom moves a teacher can try tomorrow.`;
    }
    case "differentiate":
      if (!topic) return null;
      return `Differentiate instruction for teaching "${topic}" (${subject}) to ${ageLabel}.
Reply with STRICT JSON exactly in this shape:
{"advanced": ["activity", "activity", "activity"], "onLevel": ["activity", "activity", "activity"], "support": ["activity", "activity", "activity"]}
Each entry is one concrete classroom activity description (1-3 sentences). "advanced" stretches strong students, "onLevel" fits the middle, "support" scaffolds students who are struggling.`;
    case "free": {
      const question = typeof p.question === "string" ? p.question.trim().slice(0, 800) : "";
      if (!question) return null;
      return `A teacher asks: ${question}

Answer in markdown (short headings and bullets where helpful, maximum 400 words). Be practical and specific for a classroom teacher.`;
    }
    default:
      return null;
  }
}

/**
 * POST /api/teacher/helper — the AI "Teacher Helper". Backend only; drafts are
 * returned to the client as EDITABLE suggestions and are never auto-assigned.
 * Body: { mode, params, save? }
 */
export async function POST(req: NextRequest) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  if (rateLimited(auth.id)) {
    return Response.json(
      { error: "Generation limit reached for today — try again tomorrow." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const b = (raw ?? {}) as Record<string, unknown>;
  const mode = typeof b.mode === "string" ? b.mode : "";
  if (!["worksheet", "quiz", "reading", "strategies", "differentiate", "free"].includes(mode)) {
    return Response.json({ error: "Unknown helper mode" }, { status: 400 });
  }
  const params =
    typeof b.params === "object" && b.params !== null
      ? (b.params as Record<string, unknown>)
      : {};
  const save = b.save === true;

  const userPrompt = buildPrompt(mode, params);
  if (userPrompt === null) {
    return Response.json(
      { error: "Fill in the required fields for this mode first." },
      { status: 400 }
    );
  }

  try {
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
      thinking: { type: "disabled" },
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return Response.json(
        { error: "Teacher Helper returned nothing — please try again." },
        { status: 502 }
      );
    }

    // Structured modes try JSON; text modes stay markdown.
    let draft: unknown = null;
    let failedJson = false;
    if (mode !== "strategies" && mode !== "free") {
      draft = extractJson(text);
      if (draft === null || !shapeOk(mode, draft)) {
        failedJson = true;
        draft = null;
      }
    }

    // Optional: save straight to Content as an editable draft.
    let saved: { id: string; title: string; type: string; status: string } | null = null;
    if (save) {
      const subjectRaw = typeof params.subject === "string" ? params.subject : "";
      const subjectId = (SUBJECT_IDS as readonly string[]).includes(subjectRaw)
        ? subjectRaw
        : mode === "reading"
          ? "reading"
          : "math";
      const ageRaw = typeof params.ageGroup === "string" ? params.ageGroup : "";
      const ageGroup = (AGE_GROUPS as string[]).includes(ageRaw) ? ageRaw : "primary";
      const type = mode === "worksheet" || mode === "quiz" || mode === "reading" ? mode : "lesson";
      if (!(CONTENT_TYPES as readonly string[]).includes(type)) {
        return Response.json({ error: "Invalid activity type" }, { status: 500 });
      }
      const title =
        draft && typeof draft === "object" && typeof (draft as Record<string, unknown>).title === "string"
          ? String((draft as Record<string, unknown>).title).slice(0, 120)
          : `${mode === "free" ? "Teacher note" : mode === "strategies" ? "Strategies" : "Helper draft"} — ${new Date().toLocaleDateString()}`;
      const bodyJson = draft !== null ? JSON.stringify(draft) : JSON.stringify({ text });
      const activity = await db.customActivity.create({
        data: {
          teacherId: auth.id,
          title,
          type,
          subjectId,
          ageGroup,
          status: "draft",
          body: bodyJson,
        },
      });
      saved = { id: activity.id, title: activity.title, type: activity.type, status: activity.status };
    }

    return Response.json({
      ok: true,
      mode,
      ...(draft !== null ? { draft } : {}),
      ...(failedJson ? { raw: text } : {}),
      ...(mode === "strategies" || mode === "free" ? { raw: text } : {}),
      ...(saved ? { saved } : {}),
    });
  } catch (err) {
    console.error("teacher helper failed", err);
    return Response.json(
      { error: "Teacher Helper could not reach the AI service. Please try again in a moment." },
      { status: 502 }
    );
  }
}
