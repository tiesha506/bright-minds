import { NextRequest } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/activity — log learning minutes per student/subject/day.
 * Body: { studentId, subjectId, minutes, day? } (day = local YYYY-MM-DD)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, subjectId, minutes } = body ?? {};
    const day =
      typeof body?.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.day)
        ? body.day
        : new Date().toISOString().slice(0, 10);

    if (
      typeof studentId !== "string" ||
      studentId.length < 8 ||
      typeof subjectId !== "string" ||
      typeof minutes !== "number" ||
      minutes <= 0 ||
      minutes > 120
    ) {
      return Response.json({ error: "Invalid activity data" }, { status: 400 });
    }

    const safeMinutes = Math.round(minutes);
    const existing = await db.activityLog.findUnique({
      where: { studentId_day_subjectId: { studentId, day, subjectId } },
    });

    if (existing) {
      // Cap per day/subject so a stuck timer can't inflate reports.
      const updated = await db.activityLog.update({
        where: { id: existing.id },
        data: { minutes: Math.min(180, existing.minutes + safeMinutes) },
      });
      return Response.json({ entry: updated });
    }

    const entry = await db.activityLog.create({
      data: { studentId, day, subjectId, minutes: safeMinutes },
    });
    return Response.json({ entry });
  } catch (err) {
    console.error("POST /api/activity failed", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
