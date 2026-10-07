// ---------------------------------------------------------------------------
// POST /api/teacher/upload — multipart upload of a teaching material.
// Stores the file in the PRIVATE "content" bucket, extracts text NOW for
// text-ish files, runs the AI content analysis NOW, and saves a
// TeacherMaterial row (status "draft"). Video/audio skip extraction.
// Auth: TEACHER (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  extractText,
  analyzeMaterialText,
  uploadToContentBucket,
  contentStorageConfigured,
  sanitizeFileName,
  requireTeacherOrAdmin,
} from "@/lib/server/extract";
import {
  MAX_MATERIAL_MB,
  MATERIAL_ALLOWLIST,
  fileExtension,
  materialFileKind,
  parseMaterialAnalysis,
} from "@/lib/teacher-materials";
import type { SubjectId } from "@/lib/teacher-types";
import { SUBJECT_IDS } from "@/lib/teacher-types";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = MAX_MATERIAL_MB * 1024 * 1024;

export async function POST(req: Request) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  if (!contentStorageConfigured()) {
    return Response.json({ error: "File storage is not configured. Please contact support." }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Expected a file upload (multipart form data)." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a file to upload." }, { status: 400 });
  }
  if (file.size === 0) {
    return Response.json({ error: "That file is empty." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: `Files must be under ${MAX_MATERIAL_MB} MB.` }, { status: 400 });
  }

  const fileName = file.name || "material";
  const ext = fileExtension(fileName);
  if (!(MATERIAL_ALLOWLIST as readonly string[]).includes(ext)) {
    return Response.json(
      { error: "Unsupported file type. Use PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, WebP, MP4, MP3, WAV, TXT or MD." },
      { status: 400 }
    );
  }

  const subjectId = String(form.get("subjectId") ?? "math") as SubjectId;
  if (!(SUBJECT_IDS as readonly string[]).includes(subjectId)) {
    return Response.json({ error: "Choose a subject: Math, English, Science or Reading." }, { status: 400 });
  }

  const teacherTitle = String(form.get("title") ?? "").trim();
  const title = (teacherTitle || fileName.replace(/\.[^.]+$/, "")).slice(0, 160);

  // ------------------------------ store file -------------------------------
  const id = `mat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const safeName = sanitizeFileName(fileName);
  const fileKey = `materials/${auth.id}/${id}-${safeName}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    await uploadToContentBucket(fileKey, bytes, file.type || "application/octet-stream");
  } catch (err) {
    console.error("[upload] storage error:", err);
    return Response.json({ error: "Could not store the file. Please try again." }, { status: 502 });
  }

  // --------------------------- extract + analyse ---------------------------
  const kind = materialFileKind(fileName);
  let extractedText = "";
  let extractionNote = "";
  let analysisJson = "{}";
  let aiNote = "";
  let finalSubject: SubjectId = subjectId;
  let topic = "";

  if (kind === "multimedia") {
    extractionNote = "Video/audio material — no text extraction. Attach resources and add instructions instead.";
  } else {
    const extracted = await extractText(fileName, file.type, Buffer.from(bytes));
    extractedText = extracted.text;
    extractionNote = extracted.note;

    if (extractedText.trim().length > 0) {
      try {
        const ai = await analyzeMaterialText(extractedText, subjectId);
        finalSubject = ai.subject;
        topic = ai.topic;
        analysisJson = JSON.stringify({
          objectives: ai.objectives,
          concepts: ai.concepts,
          vocabulary: ai.vocabulary,
          questions: ai.questions,
          difficulty: ai.difficulty,
          summary: ai.summary,
        });
      } catch (err) {
        console.error("[upload] AI analysis failed:", err);
        aiNote = "AI analysis could not run right now — you can press Re-scan in a moment.";
        analysisJson = "{}";
      }
    } else {
      aiNote = "No readable text was found, so AI analysis was skipped. Open the material and press 'Try AI page reading' to scan the pages with OCR.";
    }
  }

  // ------------------------------- save row --------------------------------
  const material = await db.teacherMaterial.create({
    data: {
      teacherId: auth.id,
      title,
      subjectId: finalSubject,
      topic,
      extractedText,
      analysisJson,
      fileKey,
      fileName,
      mimeType: file.type || "application/octet-stream",
      status: "draft",
    },
  });

  return Response.json({
    material: {
      id: material.id,
      title: material.title,
      subjectId: material.subjectId,
      topic: material.topic,
      status: material.status,
      analysis: parseMaterialAnalysis(material.analysisJson),
      hasFile: true,
      fileName: material.fileName,
      mimeType: material.mimeType,
      fileKind: kind,
      extractedChars: extractedText.length,
      resourceCount: 0,
      createdAt: material.createdAt.toISOString(),
      updatedAt: material.updatedAt.toISOString(),
      extractionNote: [extractionNote, aiNote].filter(Boolean).join(" "),
    },
  });
}
