import { getSessionUser, unauthorized, forbidden, type SessionUser } from "@/lib/server/auth";

// Shared helpers for /api/admin/** routes (not a route file itself).

/** Every admin route must pass through this guard: valid session + role ADMIN. */
export async function requireAdmin(req: Request): Promise<SessionUser | Response> {
  const me = await getSessionUser(req);
  if (!me) return unauthorized();
  if (me.role !== "ADMIN") return forbidden();
  return me;
}

/** Local-day key (YYYY-MM-DD) `offsetDays` days ago — matches ActivityLog.day. */
export function dayKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
