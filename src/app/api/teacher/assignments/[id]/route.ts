import { db } from "@/lib/db";
import { requireTeacher } from "../../_server";

type RouteContext = { params: Promise<{ id: string }> };

/** DELETE /api/teacher/assignments/[id] — remove an assignment and its results. */
export async function DELETE(req: Request, { params }: RouteContext) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const assignment = await db.assignment.findUnique({ where: { id } });
  if (!assignment || assignment.teacherId !== auth.id) {
    return Response.json({ error: "Assignment not found" }, { status: 404 });
  }
  await db.assignment.delete({ where: { id } });
  return Response.json({ ok: true });
}
