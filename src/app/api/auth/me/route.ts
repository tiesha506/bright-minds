import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { dbErrorResponse } from "@/lib/server/db-errors";

/** GET /api/auth/me — validate the session token. */
export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req);
    if (!user) return unauthorized();

    if (user.role === "PARENT") {
      const children = await db.student.findMany({
        where: { parentId: user.id },
        select: {
          id: true,
          name: true,
          age: true,
          avatar: true,
          avatarColor: true,
          photoUrl: true,
          ageGroup: true,
        },
        orderBy: { createdAt: "asc" },
      });
      return Response.json({ user, children });
    }
    return Response.json({ user });
  } catch (e) {
    return dbErrorResponse("auth/me", e);
  }
}
