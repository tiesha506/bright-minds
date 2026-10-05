import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../../_util";

const VALID_ROLES = new Set(["STUDENT", "PARENT", "TEACHER", "ADMIN"]);

/**
 * PATCH /api/admin/users/[id] — change an account's role.
 * Body: { role: "STUDENT" | "PARENT" | "TEACHER" | "ADMIN" }
 * Self-protection: an admin can never change their own role.
 */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  if (id === auth.id) {
    return Response.json({ error: "You cannot change your own role" }, { status: 400 });
  }

  let role: unknown;
  try {
    const body = await req.json();
    role = body?.role;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (typeof role !== "string" || !VALID_ROLES.has(role)) {
    return Response.json(
      { error: "Role must be STUDENT, PARENT, TEACHER or ADMIN" },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  const updated = await db.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });
  return Response.json({ user: updated });
}

/**
 * DELETE /api/admin/users/[id] — permanently delete an account and all of its
 * dependent data (sessions, classrooms → seats/assignments → results,
 * custom activities, notifications and the parent's child profiles).
 * Self-protection: an admin can never delete their own account.
 */
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const { id } = await ctx.params;
  if (id === auth.id) {
    return Response.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  await db.$transaction(async (tx) => {
    // Remove the parent's child profiles explicitly so their progress,
    // activity, seats, results and goals cascade away too (User→Student is
    // SetNull, so without this the profiles would survive as orphans).
    const childIds = (
      await tx.student.findMany({ where: { parentId: id }, select: { id: true } })
    ).map((s) => s.id);
    if (childIds.length > 0) {
      await tx.student.deleteMany({ where: { id: { in: childIds } } });
    }
    // Cascades: Session, Classroom (→ ClassroomStudent, Assignment →
    // AssignmentResult), CustomActivity, Notification.
    await tx.user.delete({ where: { id } });
  });

  return Response.json({ ok: true });
}
