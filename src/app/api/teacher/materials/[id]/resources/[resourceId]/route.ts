// ---------------------------------------------------------------------------
// DELETE /api/teacher/materials/[id]/resources/[resourceId] — detach a
// resource (deletes the storage object best-effort; the DB row cascades).
// Auth: TEACHER owner (ADMIN override).
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import { requireTeacherOrAdmin, ownedMaterial, deleteContentObject } from "@/lib/server/extract";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string; resourceId: string }> };

export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireTeacherOrAdmin(req);
  if (auth instanceof Response) return auth;

  const { id, resourceId } = await params;
  const material = await ownedMaterial(id, auth);
  if (!material) return Response.json({ error: "Material not found" }, { status: 404 });

  const resource = await db.contentResource.findFirst({
    where: { id: resourceId, materialId: material.id },
  });
  if (!resource) return Response.json({ error: "Resource not found" }, { status: 404 });

  await db.contentResource.delete({ where: { id: resource.id } });
  if (resource.fileKey) await deleteContentObject(resource.fileKey);

  return Response.json({ ok: true });
}
