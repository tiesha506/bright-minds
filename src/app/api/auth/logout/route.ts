import { db } from "@/lib/db";
import { dbErrorResponse } from "@/lib/server/db-errors";

/** POST /api/auth/logout — destroy the current session. */
export async function POST(req: Request) {
  try {
    const header = req.headers.get("authorization") ?? "";
    if (header.startsWith("Bearer ")) {
      const token = header.slice(7).trim();
      await db.session.deleteMany({ where: { token } });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return dbErrorResponse("logout", e);
  }
}
