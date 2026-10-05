import { db } from "@/lib/db";

/** POST /api/auth/logout — destroy the current session. */
export async function POST(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Bearer ")) {
    const token = header.slice(7).trim();
    await db.session.deleteMany({ where: { token } });
  }
  return Response.json({ ok: true });
}
