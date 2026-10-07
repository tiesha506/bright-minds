// ---------------------------------------------------------------------------
// /api/teacher/materials/[id]/resources — multimedia + links attached to a
// material.
//   GET  — list resources (signed URLs for uploads)
//   POST — attach: JSON { kind, source:"link", title, url } OR multipart
//          { file, kind, title } stored in the private "content" bucket.
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import {
  requireTeacherOrAdmin,
  ownedMaterial,
  uploadToContentBucket,
  signedUrlForContent,
  contentStorageConfigured,
  sanitizeFileName,
} from "@/lib/server/extract";
import {
  RESOURCE_KINDS,
  RESOURCE_UPLOAD_ALLOWLIST,
  MAX_MATERIAL_MB,
  fileExtension,
  isValidHttpUrl,
} from "@/lib/teacher-materials";
import type { ResourceKind } from "@/lib/teacher-materials";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function validKind(value: unknown): value is ResourceKind {
  return typeof value === "string" && (RESOURCE_KINDS as readonly string[]).includes(value);
}

/** GET — resources for this material with fresh signed URLs. */
export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });

  const resources = await db.contentResource.findMany({
    where: { materialId: material.id },
    orderBy: { createdAt: "asc" },
  });

  return Response.json({
    resources: await Promise.all(
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
    ),
  });
}

/** POST — attach a link or upload a multimedia file to the material. */
export async function POST(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });

  const contentType = req.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  let kind: ResourceKind | null = null;
  let title = "";
  let url = "";
  let upload: { bytes: Uint8Array; fileName: string; mimeType: string } | null = null;

  if (isMultipart) {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return Response.json({ error: "Invalid upload." }, { status: 400 });
    }
    kind = form.get("kind") as ResourceKind | null;
    if (!validKind(kind)) kind = null;
    title = String(form.get("title") ?? "").trim();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Choose a file to attach." }, { status: 400 });
    }
    if (file.size === 0) return Response.json({ error: "That file is empty." }, { status: 400 });
    if (file.size > MAX_MATERIAL_MB * 1024 * 1024) {
      return Response.json({ error: `Files must be under ${MAX_MATERIAL_MB} MB.` }, { status: 400 });
    }
    const ext = fileExtension(file.name || "file");
    if (!(RESOURCE_UPLOAD_ALLOWLIST as readonly string[]).includes(ext)) {
      return Response.json(
        { error: "Unsupported file type. Use PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, WebP, MP4, MP3, WAV, TXT or MD." },
        { status: 400 }
      );
    }
    upload = {
      bytes: new Uint8Array(await file.arrayBuffer()),
      fileName: file.name || "file",
      mimeType: file.type || "application/octet-stream",
    };
    if (!kind) {
      // Auto-kind from extension: video/audio/image/doc.
      const e = ext;
      kind = ["mp4", "webm", "mov"].includes(e)
        ? "video"
        : ["mp3", "wav", "m4a", "ogg"].includes(e)
          ? "audio"
          : ["jpg", "jpeg", "png", "webp", "gif"].includes(e)
            ? "image"
            : "file";
    }
  } else {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
    kind = body.kind as ResourceKind | null;
    if (!validKind(kind)) kind = "link";
    title = typeof body.title === "string" ? body.title.trim() : "";
    url = typeof body.url === "string" ? body.url.trim() : "";
    if (!url) return Response.json({ error: "Paste a link (https://…)." }, { status: 400 });
    if (!isValidHttpUrl(url)) {
      return Response.json({ error: "Links must start with http:// or https://" }, { status: 400 });
    }
  }

  const finalTitle = (title || (upload ? upload.fileName : url)).slice(0, 160);

  // ------------------------------ storage ----------------------------------
  let fileKey = "";
  let fileName = "";
  let mimeType = "";
  if (upload) {
    if (!contentStorageConfigured()) {
      return Response.json({ error: "File storage is not configured." }, { status: 500 });
    }
    const rid = `res-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const safe = sanitizeFileName(upload.fileName);
    fileKey = `resources/${auth.id}/${rid}-${safe}`;
    try {
      await uploadToContentBucket(fileKey, upload.bytes, upload.mimeType);
    } catch (err) {
      console.error("[resources] storage error:", err);
      return Response.json({ error: "Could not store the file. Please try again." }, { status: 502 });
    }
    fileName = upload.fileName;
    mimeType = upload.mimeType;
  }

  const resource = await db.contentResource.create({
    data: {
      kind: kind ?? "link",
      source: upload ? "upload" : "link",
      title: finalTitle,
      url,
      fileKey,
      fileName,
      mimeType,
      teacherId: auth.id,
      materialId: material.id,
    },
  });

  return Response.json({
    resource: {
      id: resource.id,
      kind: resource.kind,
      source: resource.source,
      title: resource.title,
      url: resource.url,
      fileName: resource.fileName,
      mimeType: resource.mimeType,
      fileUrl: resource.source === "upload" ? await signedUrlForContent(resource.fileKey) : "",
      createdAt: resource.createdAt.toISOString(),
    },
  });
}
