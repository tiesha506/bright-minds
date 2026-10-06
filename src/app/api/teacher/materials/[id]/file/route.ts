// ---------------------------------------------------------------------------
// GET /api/teacher/materials/[id]/file — 302 redirect to a short-lived
// signed URL for the material's original file (private "content" bucket).
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { requireTeacherOrAdmin, ownedMaterial, signedUrlForContent } from "@/lib/server/extract";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });
  if (!material.fileKey) {
    return Response.json({ error: "This material has no attached file." }, { status: 404 });
  }

  const signed = await signedUrlForContent(material.fileKey, 300);
  if (!signed) {
    return Response.json({ error: "Could not create a download link. Please try again." }, { status: 502 });
  }
  return Response.redirect(signed, 302);
}
