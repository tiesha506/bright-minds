import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { ensureBucket } from "@/lib/server/storage";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const BUCKET = "avatars";
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB hard cap (client pre-resizes to ~256px JPEG)
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

/**
 * POST /api/upload/avatar — multipart/form-data
 *   file:       image (jpeg/png/webp)
 *   targetType: "user" | "student"
 *   targetId:   Student id when targetType = "student" (ignored for "user")
 *
 * Permissions:
 *   user    → only yourself (any role)
 *   student → STUDENT: own profile · PARENT: own child ·
 *             TEACHER: a student seated in one of your classrooms · ADMIN: any
 *
 * Stores the image in the public Supabase Storage bucket "avatars" at a fixed
 * path per entity (overwrites on re-upload, so no orphaned objects) and
 * returns the public URL (cache-busted).
 */
export async function POST(req: Request) {
  const auth = await getSessionUser(req);
  if (!auth) return unauthorized();

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return Response.json({ error: "Photo storage is not configured." }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const file = form.get("file");
  const targetType = String(form.get("targetType") ?? "");
  const targetId = String(form.get("targetId") ?? "");

  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a photo to upload." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return Response.json({ error: "Photos must be JPG, PNG or WebP." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Photos must be under 2 MB." }, { status: 400 });
  }
  if (targetType !== "user" && targetType !== "student") {
    return Response.json({ error: "Invalid upload target." }, { status: 400 });
  }

  // ------------------------------ permission -------------------------------
  let path: string;
  if (targetType === "user") {
    if (targetId && targetId !== auth.id) {
      return Response.json({ error: "You can only change your own photo." }, { status: 403 });
    }
    path = `users/${auth.id}.jpg`;
  } else {
    if (!targetId) {
      return Response.json({ error: "Missing student." }, { status: 400 });
    }
    const student = await db.student.findUnique({
      where: { id: targetId },
      select: {
        id: true,
        parentId: true,
        seats: { select: { classroom: { select: { teacherId: true } } } },
      },
    });
    if (!student) return Response.json({ error: "Student not found." }, { status: 404 });

    const isSelf = auth.role === "STUDENT" && auth.id === student.id;
    const isParent =
      auth.role === "PARENT" && !!student.parentId && student.parentId === auth.id;
    const isTeacher =
      auth.role === "TEACHER" && student.seats.some((s) => s.classroom.teacherId === auth.id);

    if (!isSelf && !isParent && !isTeacher && auth.role !== "ADMIN") {
      return Response.json({ error: "You are not allowed to change this photo." }, { status: 403 });
    }
    path = `students/${student.id}.jpg`;
  }

  // ------------------------------- upload ----------------------------------
  const bytes = Buffer.from(await file.arrayBuffer());
  await ensureBucket(BUCKET, true); // self-heal a missing bucket
  const up = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": file.type,
      "x-upsert": "true",
      "cache-control": "3600",
    },
    body: new Uint8Array(bytes),
  });
  if (!up.ok) {
    const detail = await up.text().catch(() => "");
    console.error("avatar upload failed:", up.status, detail.slice(0, 300));
    return Response.json({ error: "Photo upload failed. Please try again." }, { status: 502 });
  }

  const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}?v=${Date.now()}`;
  return Response.json({ ok: true, url });
}
