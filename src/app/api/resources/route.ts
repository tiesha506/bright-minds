import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

// ---------------------------------------------------------------------------
// GET /api/resources
//
// Student-facing mode  ?assignmentId=X&studentId=Y
//   Verifies the student is a target of the assignment (seated in its
//   classroom + studentIds/groupName/whole-class logic identical to
//   /api/student/assignments), then returns the resources with fresh access
//   URLs: source="link" → url; source="upload" → short-lived signed URL
//   (300 s, server-side via the private "content" bucket). Resources the
//   student is not entitled to NEVER resolve — authorization fails 404
//   before any URL is minted. Includes this student's ResourceView state.
//
// Teacher-facing mode  ?materialId=X  (or TEACHER + ?assignmentId=X)
//   Management view of the teacher's own resources with view counts.
//   No signed URLs are returned here.
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

/** "video"|"audio"|"link"|"doc"|"image"|"file" → friendly kind for UI. */
const KINDS = new Set(["video", "audio", "link", "doc", "image", "file"]);

function safeKind(kind: string): string {
  return KINDS.has(kind) ? kind : "file";
}

/**
 * True when the student is a target of the assignment:
 * seated in its classroom AND (in studentIds selection | matching group seat |
 * whole class when neither a selection nor a group is set).
 */
async function studentTargetsAssignment(studentId: string, assignmentId: string) {
  const assignment = await db.assignment.findUnique({
    where: { id: assignmentId },
    include: { resources: { orderBy: { createdAt: "asc" } } },
  });
  if (!assignment) return null;
  const seat = await db.classroomStudent.findUnique({
    where: { classroomId_studentId: { classroomId: assignment.classroomId, studentId } },
  });
  if (!seat) return null;
  const selected: string[] = JSON.parse(assignment.studentIds || "[]");
  const targeted =
    selected.length > 0
      ? selected.includes(studentId)
      : assignment.groupName
        ? seat.groupName === assignment.groupName
        : true;
  return targeted ? assignment : null;
}

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const params = new URL(req.url).searchParams;
  const assignmentId = params.get("assignmentId") ?? "";
  const materialId = params.get("materialId") ?? "";
  const studentId = params.get("studentId") ?? "";

  // ------------------------------ teacher mode -----------------------------
  if (materialId || (assignmentId && (user.role === "TEACHER" || user.role === "ADMIN"))) {
    const where = materialId
      ? { materialId }
      : { assignmentId };
    const resources = await db.contentResource.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: { views: { select: { studentId: true, completedAt: true } } },
    });

    // Ownership: every resource must belong to this teacher (ADMIN: any).
    if (user.role !== "ADMIN") {
      const ownerOk =
        resources.length === 0 ||
        (materialId
          ? resources.every((r) => r.teacherId === user.id)
          : (await db.assignment.findUnique({
              where: { id: assignmentId },
              select: { teacherId: true },
            }))?.teacherId === user.id);
      if (!ownerOk) {
        return Response.json({ error: "Not your material" }, { status: 403 });
      }
    }

    return Response.json({
      scope: "manage",
      resources: resources.map((r) => ({
        id: r.id,
        kind: safeKind(r.kind),
        source: r.source === "link" ? "link" : "upload",
        title: r.title,
        url: r.source === "link" ? r.url : "", // no signed URLs in manage view
        fileName: r.fileName,
        mimeType: r.mimeType,
        teacherId: r.teacherId,
        materialId: r.materialId,
        assignmentId: r.assignmentId,
        createdAt: r.createdAt.toISOString(),
        viewCount: r.views.length,
        completedCount: r.views.filter((v) => v.completedAt !== null).length,
      })),
    });
  }

  // ------------------------------ student mode -----------------------------
  if (!assignmentId) {
    return Response.json(
      { error: "Missing assignmentId or materialId" },
      { status: 400 }
    );
  }
  if (!studentId) {
    return Response.json({ error: "Missing studentId" }, { status: 400 });
  }

  const student = await db.student.findUnique({ where: { id: studentId } });
  if (!student) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }
  // Students ride their guardian's session (see /api/auth/student-login), and
  // parents may fetch on behalf of their child — both are user.id === parentId.
  if (student.parentId !== user.id) {
    return Response.json({ error: "Not your child's profile" }, { status: 403 });
  }

  const assignment = await studentTargetsAssignment(studentId, assignmentId);
  if (!assignment) {
    // Not seated / not targeted — do not reveal the resource list at all.
    return Response.json({ error: "Assignment not found for this student" }, { status: 404 });
  }

  const views = await db.resourceView.findMany({
    where: { studentId, resourceId: { in: assignment.resources.map((r) => r.id) } },
  });
  const viewByResource = new Map(views.map((v) => [v.resourceId, v]));

  const resources = await Promise.all(
    assignment.resources.map(async (r) => {
      const view = viewByResource.get(r.id);
      const url =
        r.source === "link"
          ? r.url || null
          : await signContentUrl(r.fileKey);
      return {
        id: r.id,
        kind: safeKind(r.kind),
        source: r.source === "link" ? "link" : "upload",
        title: r.title,
        url,
        fileName: r.fileName,
        mimeType: r.mimeType,
        openedAt: view?.openedAt.toISOString() ?? null,
        completedAt: view?.completedAt?.toISOString() ?? null,
      };
    })
  );

  return Response.json({ scope: "student", resources });
}
