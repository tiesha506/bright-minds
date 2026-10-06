import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { NOTE_CONTENT_MAX, NOTE_TITLE_MAX } from "@/lib/notepad-types";

type RouteContext = { params: Promise<{ id: string }> };

// ---------------------------------------------------------------------------
// /api/notes/[id] — PATCH / DELETE for the signed-in user's OWN note.
// Ownership is enforced by looking the note up with BOTH id and userId, so
// touching someone else's note id returns 404 exactly like a missing note.
// ---------------------------------------------------------------------------

/** PATCH /api/notes/[id] — body: { title?, content? } */
export async function PATCH(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await db.note.findFirst({ where: { id, userId: user.id } });
  if (!existing) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { title, content } = (body ?? {}) as { title?: unknown; content?: unknown };

  const data: { title?: string; content?: string } = {};
  if (typeof title === "string") {
    const t = title.trim();
    data.title = t === "" ? "Untitled note" : t.slice(0, NOTE_TITLE_MAX);
  }
  if (typeof content === "string") {
    data.content = content.slice(0, NOTE_CONTENT_MAX);
  }
  if (Object.keys(data).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const note = await db.note.update({ where: { id: existing.id }, data });
  return Response.json({ note });
}

/** DELETE /api/notes/[id] */
export async function DELETE(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await db.note.findFirst({ where: { id, userId: user.id } });
  if (!existing) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  await db.note.delete({ where: { id: existing.id } });
  return Response.json({ ok: true });
}
