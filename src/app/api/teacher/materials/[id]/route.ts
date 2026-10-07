// ---------------------------------------------------------------------------
// /api/teacher/materials/[id]
//   GET    — full detail (extracted-text preview, signed file URL, resources)
//   PATCH  — teacher edits: title, topic, subjectId, status, analysisJson
//   DELETE — remove material (+ storage object; resources cascade)
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  requireTeacherOrAdmin,
  ownedMaterial,
  signedUrlForContent,
  deleteContentObject,
} from "@/lib/server/extract";
import {
  parseMaterialAnalysis,
  materialFileKind,
} from "@/lib/teacher-materials";
import { SUBJECT_IDS } from "@/lib/teacher-types";
import type { SubjectId } from "@/lib/teacher-types";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

/** GET — detail for the wizard (scan step + resources + file download URL). */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) {
    return Response.json({ error: "Material not found" }, { status: 404 });
  }

  const [resources, fileUrl] = await Promise.all([
    db.contentResource.findMany({ where: { materialId: material.id }, orderBy: { createdAt: "asc" } }),
    signedUrlForContent(material.fileKey),
  ]);

  const resourcesOut = await Promise.all(
    resources.map(async (r) => ({
      id: r.id,
      kind: r.kind,
      source: r.source,
      title: r.title,
      url: r.url,
      fileName: r.fileName,
      mimeType: r.mimeType,
      fileUrl: r.source === "upload" ? await signedUrlForContent(r.fileKey) : "",
      createdAt: r.createdAt.toISOString(),
    }))
  );

  return Response.json({
    material: {
      id: material.id,
      title: material.title,
      subjectId: material.subjectId as SubjectId,
      topic: material.topic,
      status: material.status,
      analysis: parseMaterialAnalysis(material.analysisJson),
      hasFile: Boolean(material.fileKey),
      fileName: material.fileName,
      mimeType: material.mimeType,
      fileKind: material.fileKey ? materialFileKind(material.fileName) : "none",
      extractedChars: material.extractedText.length,
      extractedPreview: material.extractedText.slice(0, 1200),
      fileUrl,
      extractionNote: "",
      resources: resourcesOut,
      createdAt: material.createdAt.toISOString(),
      updatedAt: material.updatedAt.toISOString(),
    },
  });
}

/** PATCH — teacher corrections after reviewing the AI scan. */
export async function PATCH(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) {
    return Response.json({ error: "Material not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data: Record<string, string> = {};

  if (body.title !== undefined) {
    const t = String(body.title).trim();
    if (t.length < 1 || t.length > 160) {
      return Response.json({ error: "Title must be 1-160 characters" }, { status: 400 });
    }
    data.title = t;
  }
  if (body.topic !== undefined) {
    data.topic = String(body.topic).trim().slice(0, 120);
  }
  if (body.subjectId !== undefined) {
    const s = String(body.subjectId);
    if (!(SUBJECT_IDS as readonly string[]).includes(s)) {
      return Response.json({ error: "Subject must be math, english, science or reading" }, { status: 400 });
    }
    data.subjectId = s;
  }
  if (body.status !== undefined) {
    const st = String(body.status);
    if (st !== "draft" && st !== "ready") {
      return Response.json({ error: "Status must be draft or ready" }, { status: 400 });
    }
    data.status = st;
  }
  if (body.analysis !== undefined) {
    // Teacher-reviewed analysis object → normalise then store as JSON string.
    const a = parseMaterialAnalysis(JSON.stringify(body.analysis));
    data.analysisJson = JSON.stringify(a);
  } else if (body.analysisJson !== undefined && typeof body.analysisJson === "string") {
    data.analysisJson = JSON.stringify(parseMaterialAnalysis(body.analysisJson));
  }

  const updated = await db.teacherMaterial.update({ where: { id: material.id }, data });

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
  });
}

/** DELETE — removes the row, its storage object and (cascade) resources. */
export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) {
    return Response.json({ error: "Material not found" }, { status: 404 });
  }

  // Collect resource storage keys before the cascade delete.
  const resources = await db.contentResource.findMany({
    where: { materialId: material.id },
    select: { fileKey: true },
  });

  await db.teacherMaterial.delete({ where: { id: material.id } });

  // Best-effort storage cleanup (row is already gone either way).
  if (material.fileKey) await deleteContentObject(material.fileKey);
  for (const r of resources) {
    if (r.fileKey) await deleteContentObject(r.fileKey);
  }

  return Response.json({ ok: true });
}
