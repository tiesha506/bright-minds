import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

export const runtime = "nodejs";

/**
 * PATCH /api/auth/profile — update your own account profile.
 * Body: { name?: string, photoUrl?: string | null }
 * (`photoUrl: null` clears the photo back to the emoji avatar.)
 */
export async function PATCH(req: Request) {
  const auth = await getSessionUser(req);
  if (!auth) return unauthorized();

  let body: { name?: unknown; photoUrl?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: { name?: string; photoUrl?: string } = {};

  if (body?.name !== undefined) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (name.length < 2 || name.length > 40) {
      return Response.json({ error: "Name must be 2-40 characters." }, { status: 400 });
    }
    data.name = name;
  }

  if (body?.photoUrl !== undefined) {
    if (body.photoUrl === null || body.photoUrl === "") {
      data.photoUrl = "";
    } else if (typeof body.photoUrl === "string" && body.photoUrl.startsWith("http")) {
      // Only accept URLs from our own storage bucket.
      const prefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public/avatars/`;
      if (!body.photoUrl.startsWith(prefix)) {
        return Response.json({ error: "Photo must be uploaded through the app." }, { status: 400 });
      }
      data.photoUrl = body.photoUrl.slice(0, 500);
    } else {
      return Response.json({ error: "Invalid photo." }, { status: 400 });
    }
  }

  if (Object.keys(data).length === 0) {
    return Response.json({ error: "Nothing to update." }, { status: 400 });
  }

  const user = await db.user.update({
    where: { id: auth.id },
    data,
    select: { id: true, name: true, photoUrl: true },
  });
  return Response.json({ ok: true, user });
}
