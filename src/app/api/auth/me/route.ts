import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";

/** GET /api/auth/me — validate the session token. */
export async function GET(req: Request) {
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
        ageGroup: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return Response.json({ user, children });
  }
  return Response.json({ user });
}
