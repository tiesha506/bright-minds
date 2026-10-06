import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../_util";
import type {
  AdminRole,
  AdminStudentRow,
  AdminUserRow,
  UsersData,
} from "@/lib/admin-types";

const VALID_ROLES = new Set(["PARENT", "TEACHER", "ADMIN", "STUDENT"]);

/**
 * GET /api/admin/users?role=PARENT|TEACHER|ADMIN|STUDENT&q=<search>
 *
 * role=STUDENT lists child profiles (Student rows) — name/age/parent/hasCode.
 * Any other role (or no role) lists User accounts; parents carry
 * childrenCount, teachers carry classroomCount. `q` searches name/email
 * case-insensitively (SQLite has no insensitive mode, so filter in memory —
 * account volume on this platform is small).
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const roleParam = req.nextUrl.searchParams.get("role") ?? "";
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();

  if (roleParam === "STUDENT") {
    const rows = await db.student.findMany({
      orderBy: { createdAt: "desc" },
      include: { parent: { select: { name: true } } },
    });
    let students: AdminStudentRow[] = rows.map((s) => ({
      id: s.id,
      name: s.name,
      age: s.age,
      ageGroup: s.ageGroup,
      parentName: s.parent?.name ?? null,
      hasCode: Boolean(s.loginCode),
      createdAt: s.createdAt.toISOString(),
    }));
    if (q) {
      students = students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.parentName ?? "").toLowerCase().includes(q)
      );
    }
    const data: UsersData = { users: [], students };
    return Response.json(data);
  }

  const [users, childGroups, classroomGroups] = await Promise.all([
    db.user.findMany({ orderBy: { createdAt: "desc" } }),
    db.student.groupBy({ by: ["parentId"], _count: { _all: true } }),
    db.classroom.groupBy({ by: ["teacherId"], _count: { _all: true } }),
  ]);

  const childrenByParent = new Map<string, number>();
  for (const g of childGroups) {
    if (g.parentId) childrenByParent.set(g.parentId, g._count._all);
  }
  const classroomsByTeacher = new Map<string, number>();
  for (const g of classroomGroups) {
    classroomsByTeacher.set(g.teacherId, g._count._all);
  }

  let list: AdminUserRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as AdminRole,
    createdAt: u.createdAt.toISOString(),
    lastSeenAt: u.lastSeenAt ? u.lastSeenAt.toISOString() : null,
    childrenCount: childrenByParent.get(u.id) ?? 0,
    classroomCount: classroomsByTeacher.get(u.id) ?? 0,
  }));

  if (VALID_ROLES.has(roleParam)) {
    list = list.filter((u) => u.role === roleParam);
  }
  if (q) {
    list = list.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  const data: UsersData = { users: list, students: [] };
  return Response.json(data);
}
