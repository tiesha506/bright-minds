// ---------------------------------------------------------------------------
// POST /api/teacher/materials/analyze — re-run / refresh the AI content
// analysis for a material (Re-scan). Body:
//   { materialId, subjectId?, topic?, allowSubjectOverride? }
// Uses the LLM with a STRICT JSON prompt over the stored extracted text.
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  analyzeMaterialText,
  downloadContentObject,
  extractText,
  requireTeacherOrAdmin,
  ownedMaterial,
} from "@/lib/server/extract";
import { parseMaterialAnalysis, materialFileKind } from "@/lib/teacher-materials";
import { SUBJECT_IDS } from "@/lib/teacher-types";
import type { SubjectId } from "@/lib/teacher-types";

export const runtime = "nodejs";
export const maxDuration = 120;

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
  let material = await ownedMaterial(materialId, auth);
  if (!material) {
    return Response.json({ error: "Material not found" }, { status: 404 });
  }

  const wantRescan = body.rescan === true;
  let recoveryNote = "";
  if (!material.extractedText.trim()) {
    if (wantRescan && material.fileKey && material.fileName) {
      // Text recovery: re-download the stored file and run the full
      // extraction chain again (pdf-parse → poppler → AI page scanning).
      const bytes = await downloadContentObject(material.fileKey);
      const extracted = bytes
        ? await extractText(material.fileName, material.mimeType, bytes).catch(() => null)
        : null;
      if (extracted && extracted.text.trim()) {
        await db.teacherMaterial.update({
          where: { id: material.id },
          data: { extractedText: extracted.text },
        });
        material = { ...material, extractedText: extracted.text };
        recoveryNote = extracted.note;
      } else {
        return Response.json(
          {
            error:
              "Still no readable text could be recovered from this file (it may contain only pictures). Try uploading clearer photos of the pages, or attach it as a downloadable resource.",
          },
          { status: 422 }
        );
      }
    } else {
      return Response.json(
        {
          error:
            "This material has no extracted text to analyse (video/audio and legacy files can't be scanned). Upload a document with readable text or add photos of the pages.",
        },
        { status: 400 }
      );
    }
  }

  // Teacher-selected subject is the fallback + the subject the AI keeps if
  // its guess is not one of the four allowed subjects.
  const requestedSubject = typeof body.subjectId === "string" ? body.subjectId : material.subjectId;
  if (!(SUBJECT_IDS as readonly string[]).includes(requestedSubject)) {
    return Response.json({ error: "Subject must be math, english, science or reading" }, { status: 400 });
  }

  let ai;
  try {
    ai = await analyzeMaterialText(material.extractedText, requestedSubject as SubjectId);
  } catch (err) {
    console.error("[analyze] AI failed:", err);
    return Response.json(
      { error: "The AI scan could not complete right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  // Subject override: only when the teacher explicitly allows the AI's
  // content-based guess to replace their selected subject.
  const allowOverride = body.allowSubjectOverride === true;
  const nextSubject = (allowOverride ? ai.subject : (requestedSubject as SubjectId)) as SubjectId;

  const teacherTopic = typeof body.topic === "string" && body.topic.trim() ? body.topic.trim().slice(0, 120) : "";
  const topic = teacherTopic || ai.topic;

  const analysisJson = JSON.stringify({
    objectives: ai.objectives,
    concepts: ai.concepts,
    vocabulary: ai.vocabulary,
    questions: ai.questions,
    difficulty: ai.difficulty,
    summary: ai.summary,
  });

  const updated = await db.teacherMaterial.update({
    where: { id: material.id },
    data: { analysisJson, topic, subjectId: nextSubject },
  });

  return Response.json({
    material: {
      id: updated.id,
      title: updated.title,
      subjectId: updated.subjectId as SubjectId,
      topic: updated.topic,
      status: updated.status,
      analysis: parseMaterialAnalysis(updated.analysisJson),
      hasFile: Boolean(updated.fileKey),
      fileName: updated.fileName,
      mimeType: updated.mimeType,
      fileKind: updated.fileKey ? materialFileKind(updated.fileName) : "none",
      extractedChars: updated.extractedText.length,
      resourceCount: await db.contentResource.count({ where: { materialId: updated.id } }),
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    },
    aiSubjectGuess: ai.subject,
    recoveryNote,
  });
}
