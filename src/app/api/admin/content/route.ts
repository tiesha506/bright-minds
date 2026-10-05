import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { subjects } from "@/lib/content";
import { requireAdmin } from "../_util";
import type { ContentData, StatusCount, SubjectLessonStat } from "@/lib/admin-types";

/**
 * GET /api/admin/content — real lesson counts per subject and age group
 * (from the content registry), plus custom-activity counts by status and
 * assignment counts by type.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const [customGroups, assignmentGroups] = await Promise.all([
    db.customActivity.groupBy({ by: ["status"], _count: { _all: true } }),
    db.assignment.groupBy({ by: ["type"], _count: { _all: true } }),
  ]);

  const subjectsStats: SubjectLessonStat[] = subjects.map((s) => {
    const byGroup = {
      early: s.lessons.early.length,
      primary: s.lessons.primary.length,
      intermediate: s.lessons.intermediate.length,
      teen: s.lessons.teen.length,
    };
    return {
      subjectId: s.id,
      name: s.name,
      emoji: s.emoji,
      byGroup,
      total: byGroup.early + byGroup.primary + byGroup.intermediate + byGroup.teen,
    };
  });

  const statusLabels: Record<string, string> = {
    draft: "Draft",
    private: "Private",
    assigned: "Assigned",
  };
  const customActivities: StatusCount[] = ["draft", "private", "assigned"].map((status) => ({
    label: statusLabels[status] ?? status,
    value: customGroups.find((g) => g.status === status)?._count._all ?? 0,
  }));

  const typeLabels: Record<string, string> = {
    lesson: "Lesson",
    quiz: "Quiz",
    worksheet: "Worksheet",
    reading: "Reading",
    custom: "Custom activity",
  };
  const knownTypes = ["lesson", "quiz", "worksheet", "reading", "custom"];
  const extraTypes = assignmentGroups
    .map((g) => g.type)
    .filter((t) => !knownTypes.includes(t));
  const assignmentsByType: StatusCount[] = [...knownTypes, ...extraTypes].map((type) => ({
    label: typeLabels[type] ?? type,
    value: assignmentGroups.find((g) => g.type === type)?._count._all ?? 0,
  }));

  const data: ContentData = {
    subjects: subjectsStats,
    lessonsTotal: subjectsStats.reduce((n, s) => n + s.total, 0),
    customActivities,
    customActivitiesTotal: customActivities.reduce((n, r) => n + r.value, 0),
    assignmentsByType,
    assignmentsTotal: assignmentsByType.reduce((n, r) => n + r.value, 0),
  };

  return Response.json(data);
}
