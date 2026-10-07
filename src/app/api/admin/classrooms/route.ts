import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../_util";
import type { ClassroomRow } from "@/lib/admin-types";

/**
 * GET /api/admin/classrooms — every classroom with its teacher, seat count
 * and assignment count.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const rows = await db.classroom.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: { select: { name: true, email: true } },
      _count: { select: { seats: true, assignments: true } },
    },
  });

  const classrooms: ClassroomRow[] = rows.map((c) => ({
    id: c.id,
    name: c.name,
    gradeLabel: c.gradeLabel,
    teacherName: c.teacher.name,
    teacherEmail: c.teacher.email,
    seatCount: c._count.seats,
    assignmentCount: c._count.assignments,
    createdAt: c.createdAt.toISOString(),
  }));

  return Response.json({ classrooms });
}
