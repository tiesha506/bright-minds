import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../../_util";

/**
 * DELETE /api/admin/students/[id] — permanently delete a child profile.
 * Cascades to Progress, ActivityLog, classroom seats, AssignmentResults
 * and the student's Goal.
 */
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  const student = await db.student.findUnique({ where: { id } });
  if (!student) {
    return Response.json({ error: "Student profile not found" }, { status: 404 });
  }

  await db.student.delete({ where: { id } });
  return Response.json({ ok: true });
}
