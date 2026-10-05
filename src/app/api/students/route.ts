import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID_THEMES = new Set(["pink", "blue", "neutral"]);
const VALID_GROUPS = new Set(["early", "primary", "intermediate", "teen"]);

/**
 * POST /api/students — create or update a student profile.
 * Body: { id, name, age, theme, ageGroup, xp? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, age, theme, ageGroup } = body ?? {};

    if (
      typeof id !== "string" ||
      id.length < 8 ||
      typeof name !== "string" ||
      name.trim().length === 0 ||
      name.length > 40 ||
      typeof age !== "number" ||
      age < 4 ||
      age > 20 ||
      !VALID_THEMES.has(theme) ||
      !VALID_GROUPS.has(ageGroup)
    ) {
      return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
    }

    const xp = typeof body.xp === "number" && body.xp >= 0 ? Math.floor(body.xp) : 0;

    const student = await db.student.upsert({
      where: { id },
      update: { name: name.trim(), age, theme, ageGroup, xp },
      create: { id, name: name.trim(), age, theme, ageGroup, xp },
    });

    return NextResponse.json({ student });
  } catch (err) {
    console.error("POST /api/students failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/**
 * GET /api/students?id=<studentId> — fetch profile + progress.
 */
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const student = await db.student.findUnique({
      where: { id },
      include: { progress: true },
    });
    if (!student) {
      return NextResponse.json({ student: null }, { status: 404 });
    }
    return NextResponse.json({ student });
  } catch (err) {
    console.error("GET /api/students failed", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
