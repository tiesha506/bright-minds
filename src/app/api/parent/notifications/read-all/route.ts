import { db } from "@/lib/db";
import { requireParent } from "../../_shared";

// ---------------------------------------------------------------------------
// POST /api/parent/notifications/read-all — mark every notification read.
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;

    const result = await db.notification.updateMany({
      where: { userId: user.id, read: false },
      data: { read: true },
    });

    return Response.json({ ok: true, updated: result.count });
  } catch (err) {
    console.error("POST /api/parent/notifications/read-all failed", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
