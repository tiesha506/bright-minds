import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

type RouteContext = { params: Promise<{ id: string }> };

// ---------------------------------------------------------------------------
// /api/resources/[id]/view — student engagement tracking for one resource.
//
// POST { studentId }              → upsert ResourceView (openedAt = now) and
//                                   return a fresh access URL (signed for
//                                   uploads, 300 s). The student must be a
//                                   target of the resource's assignment or
//                                   the call 404s — no URL is minted otherwise.
// PATCH { studentId, completed }  → set completedAt (upsert first so "mark as
//                                   done" works even if POST was skipped).
// ---------------------------------------------------------------------------

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** Mints a 5-minute signed URL for an object in the private "content" bucket. */
async function signContentUrl(fileKey: string): Promise<string | null> {
  if (!SUPABASE_URL || !SERVICE_ROLE || !fileKey) return null;
  try {
    const path = fileKey.split("/").map(encodeURIComponent).join("/");
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/content/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: 300 }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { signedURL?: string };
    return data.signedURL ? `${SUPABASE_URL}/storage/v1${data.signedURL}` : null;
  } catch {
    return null;
  }
}

/** Resolves the resource + verifies the student is an authorized target. */
async function authorize(studentId: string, resourceId: string) {
  const student = await db.student.findUnique({ where: { id: studentId } });
  if (!student) return { error: "Student not found", status: 404 as const };

  const resource = await db.contentResource.findUnique({
    where: { id: resourceId },
    include: { assignment: true },
  });
  if (!resource) return { error: "Resource not found", status: 404 as const };
  if (!resource.assignment) return { error: "Resource not available", status: 404 as const };

  const seat = await db.classroomStudent.findUnique({
    where: {
      classroomId_studentId: {
        classroomId: resource.assignment.classroomId,
        studentId,
      },
    },
  });
  if (!seat) return { error: "Resource not found", status: 404 as const };

  const selected: string[] = JSON.parse(resource.assignment.studentIds || "[]");
  const targeted =
    selected.length > 0
      ? selected.includes(studentId)
      : resource.assignment.groupName
        ? seat.groupName === resource.assignment.groupName
        : true;
  if (!targeted) return { error: "Resource not found", status: 404 as const };

  return { resource };
}

async function accessUrl(resource: {
  source: string;
  url: string;
  fileKey: string;
}): Promise<string | null> {
  return resource.source === "link" ? resource.url || null : signContentUrl(resource.fileKey);
}

export async function POST(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const studentId = String((body as { studentId?: unknown })?.studentId ?? "");
  if (!studentId) {
    return Response.json({ error: "Missing studentId" }, { status: 400 });
  }

  const student = await db.student.findUnique({ where: { id: studentId } });
  if (!student || student.parentId !== user.id) {
    return Response.json({ error: "Not your child's profile" }, { status: 403 });
  }

  const auth = await authorize(studentId, id);
  if ("error" in auth) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  const view = await db.resourceView.upsert({
    where: { resourceId_studentId: { resourceId: id, studentId } },
    update: {}, // openedAt stays at first open
    create: { resourceId: id, studentId },
  });

  return Response.json({
    ok: true,
    view: {
      openedAt: view.openedAt.toISOString(),
      completedAt: view.completedAt?.toISOString() ?? null,
    },
    url: await accessUrl(auth.resource),
  });
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { studentId, completed } = (body ?? {}) as {
    studentId?: unknown;
    completed?: unknown;
  };
  const sid = String(studentId ?? "");
  if (!sid || completed !== true) {
    return Response.json(
      { error: "Missing studentId or completed flag" },
      { status: 400 }
    );
  }

  const student = await db.student.findUnique({ where: { id: sid } });
  if (!student || student.parentId !== user.id) {
    return Response.json({ error: "Not your child's profile" }, { status: 403 });
  }

  const auth = await authorize(sid, id);
  if ("error" in auth) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  const view = await db.resourceView.upsert({
    where: { resourceId_studentId: { resourceId: id, studentId: sid } },
    update: { completedAt: new Date() },
    create: { resourceId: id, studentId: sid, completedAt: new Date() },
  });

  return Response.json({
    ok: true,
    view: {
      openedAt: view.openedAt.toISOString(),
      completedAt: view.completedAt?.toISOString() ?? null,
    },
  });
}
