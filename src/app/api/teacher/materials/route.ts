// ---------------------------------------------------------------------------
// GET /api/teacher/materials — list the teacher's materials with their AI
// analysis (parsed), file metadata and resource counts.
// Auth: TEACHER (ADMIN sees all).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import { requireTeacherOrAdmin } from "@/lib/server/extract";
import {
  parseMaterialAnalysis,
  materialFileKind,
  isValidHttpUrl,
} from "@/lib/teacher-materials";
import { SUBJECT_IDS } from "@/lib/teacher-types";
import type { SubjectId } from "@/lib/teacher-types";

export const runtime = "nodejs";

/** GET — list the teacher's materials with parsed AI analysis. */
export async function GET(req: Request) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const materials = await db.teacherMaterial.findMany({
    where: auth.role === "ADMIN" ? {} : { teacherId: auth.id },
    include: { _count: { select: { resources: true, assignments: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({
    materials: materials.map((m) => {
      const analysis = parseMaterialAnalysis(m.analysisJson);
      return {
        id: m.id,
        title: m.title,
        subjectId: m.subjectId as SubjectId,
        topic: m.topic,
        status: m.status,
        analysis,
        hasFile: Boolean(m.fileKey),
        fileName: m.fileName,
        mimeType: m.mimeType,
        fileKind: m.fileKey ? materialFileKind(m.fileName) : "none",
        extractedChars: m.extractedText.length,
        resourceCount: m._count.resources,
        assignmentCount: m._count.assignments,
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.updatedAt.toISOString(),
      };
    }),
  });
}

/**
 * POST /api/teacher/materials — create a LINK-ONLY material (no file):
 * body { title, subjectId, topic?, link?: { kind, title, url } }.
 * The teacher can attach video/audio/site links as resources right away;
 * AI scanning will politely refuse until a text document is uploaded.
 */
export async function POST(req: Request) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim().slice(0, 160) : "";
  if (title.length < 1) {
    return Response.json({ error: "Give the material a title" }, { status: 400 });
  }
  const subjectId = String(body.subjectId ?? "math");
  if (!(SUBJECT_IDS as readonly string[]).includes(subjectId)) {
    return Response.json({ error: "Choose a subject: Math, English, Science or Reading." }, { status: 400 });
  }
  const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, 120) : "";

  const link =
    body.link && typeof body.link === "object" ? (body.link as Record<string, unknown>) : null;
  let linkData: { kind: string; title: string; url: string } | null = null;
  if (link) {
    const url = typeof link.url === "string" ? link.url.trim() : "";
    if (!url || !isValidHttpUrl(url)) {
      return Response.json({ error: "Links must start with http:// or https://" }, { status: 400 });
    }
    const kind = typeof link.kind === "string" && ["video", "audio", "link"].includes(link.kind) ? link.kind : "link";
    linkData = {
      kind,
      title: typeof link.title === "string" && link.title.trim() ? link.title.trim().slice(0, 160) : url,
      url,
    };
  }

  const material = await db.teacherMaterial.create({
    data: { teacherId: auth.id, title, subjectId, topic, extractedText: "", analysisJson: "{}" },
  });

  if (linkData) {
    await db.contentResource.create({
      data: {
        kind: linkData.kind,
        source: "link",
        title: linkData.title,
        url: linkData.url,
        teacherId: auth.id,
        materialId: material.id,
      },
    });
  }

  return Response.json({
    material: {
      id: material.id,
      title: material.title,
      subjectId: material.subjectId as SubjectId,
      topic: material.topic,
      status: material.status,
      analysis: parseMaterialAnalysis(material.analysisJson),
      hasFile: false,
      fileName: "",
      mimeType: "",
      fileKind: "none",
      extractedChars: 0,
      resourceCount: linkData ? 1 : 0,
      createdAt: material.createdAt.toISOString(),
      updatedAt: material.updatedAt.toISOString(),
      extractionNote: linkData
        ? "Link-only material — no text to scan. Generate from other materials, or attach a document."
        : "No file attached yet — upload a document to scan it.",
    },
  });
}
