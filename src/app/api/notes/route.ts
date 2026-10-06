import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { NOTE_CONTENT_MAX, NOTE_TITLE_MAX } from "@/lib/notepad-types";

// ---------------------------------------------------------------------------
// GET /api/notes?q= — the signed-in user's private notes (any role).
// Notes are strictly private: every query filters userId = session user id,
// so another user's note id is indistinguishable from a non-existent one.
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";

  const notes = await db.note.findMany({
    where: {
      userId: user.id,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { content: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
  });

  return Response.json({ notes });
}

/**
 * POST /api/notes — create a note for the signed-in user.
 * Body: { title?, content? }
 */
export async function POST(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { title, content } = (body ?? {}) as { title?: unknown; content?: unknown };

  const safeTitle =
    typeof title === "string" && title.trim() !== ""
      ? title.trim().slice(0, NOTE_TITLE_MAX)
      : "Untitled note";
  const safeContent =
    typeof content === "string" ? content.slice(0, NOTE_CONTENT_MAX) : "";

  const note = await db.note.create({
    data: { userId: user.id, title: safeTitle, content: safeContent },
  });

  return Response.json({ note }, { status: 201 });
}
