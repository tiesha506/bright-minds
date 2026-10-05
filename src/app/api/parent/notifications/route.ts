import { db } from "@/lib/db";
import { requireParent } from "../_shared";

// ---------------------------------------------------------------------------
// GET /api/parent/notifications — latest 30 (unread first) + unread count.
// Notifications are created automatically by /api/progress when the child
// finishes lessons, quizzes or assignments; this route only reads them.
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;

    const [rows, unreadCount] = await Promise.all([
      db.notification.findMany({
        where: { userId: user.id },
        orderBy: [{ read: "asc" }, { createdAt: "desc" }],
        take: 30,
      }),
      db.notification.count({ where: { userId: user.id, read: false } }),
    ]);

    return Response.json({
      notifications: rows.map((n) => ({
        id: n.id,
        childId: n.childId,
        childName: n.childName,
        kind: n.kind,
        text: n.text,
        read: n.read,
        createdAt: n.createdAt.toISOString(),
      })),
      unreadCount,
    });
  } catch (err) {
    console.error("GET /api/parent/notifications failed", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
