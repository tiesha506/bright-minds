import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { generateLoginCode, generatePin } from "@/lib/server/auth";
import type { ChildSummary } from "@/lib/parent-types";
import {
  AVATAR_COLOR_KEYS,
  THEME_IDS,
  ageToGroup,
  asInt,
  avgOf,
  cleanAvatar,
  cleanEnum,
  cleanName,
  computeStreak,
  daysAgoKey,
  dayKey,
  lastNDays,
  requireParent,
} from "../_shared";

// ---------------------------------------------------------------------------
// GET /api/parent/children — the parent's children with real progress stats.
// POST /api/parent/children — create a child (returns login code + PIN).
// ---------------------------------------------------------------------------

type ProgressRow = { studentId: string; subjectId: string; score: number | null };
type ActivityRow = { studentId: string; day: string; minutes: number };

function buildSummary(
  student: {
    id: string;
    name: string;
    age: number;
    ageGroup: string;
    avatar: string;
    avatarColor: string;
    theme: string;
    xp: number;
    loginCode: string | null;
    pin: string | null;
    worksheetsDone: number;
  },
  progress: ProgressRow[],
  activity: ActivityRow[]
): ChildSummary {
  const mine = progress.filter((p) => p.studentId === student.id);
  const myActivity = activity.filter((a) => a.studentId === student.id);

  const subjectAverages: Record<string, number | null> = {};
  for (const subjectId of ["math", "english", "science", "reading"]) {
    const scores = mine
      .filter((p) => p.subjectId === subjectId && p.score !== null)
      .map((p) => p.score as number);
    subjectAverages[subjectId] = avgOf(scores);
  }

  const last7 = new Set(lastNDays(7).map((d) => d.key));
  const weeklyMinutes = myActivity
    .filter((a) => last7.has(a.day))
    .reduce((sum, a) => sum + a.minutes, 0);
  const todayMinutes = myActivity
    .filter((a) => a.day === dayKey(new Date()))
    .reduce((sum, a) => sum + a.minutes, 0);

  const scored = Object.values(subjectAverages).filter((v): v is number => v !== null);
  const avgScore = scored.length > 0 ? scored.reduce((a, b) => a + b, 0) / scored.length : null;
  const overallPct =
    scored.length > 0
      ? Math.round((avgScore as number) * 0.7 + Math.min(100, (mine.length / 12) * 100) * 0.3)
      : null;

  return {
    id: student.id,
    name: student.name,
    age: student.age,
    ageGroup: student.ageGroup,
    avatar: student.avatar,
    avatarColor: student.avatarColor,
    theme: student.theme,
    xp: student.xp,
    loginCode: student.loginCode,
    pin: student.pin,
    lessonsDone: mine.length,
    worksheetsDone: student.worksheetsDone,
    streak: computeStreak(myActivity.map((a) => a.day)),
    weeklyMinutes,
    todayMinutes,
    overallPct,
    subjectAverages,
  };
}

export async function GET(req: Request) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;

    const children = await db.student.findMany({
      where: { parentId: user.id },
      orderBy: { createdAt: "asc" },
    });

    const ids = children.map((c) => c.id);
    const [progress, activity] = await Promise.all([
      ids.length
        ? db.progress.findMany({
            where: { studentId: { in: ids } },
            select: { studentId: true, subjectId: true, score: true },
          })
        : Promise.resolve([] as ProgressRow[]),
      ids.length
        ? db.activityLog.findMany({
            where: { studentId: { in: ids }, day: { gte: daysAgoKey(60) } },
            select: { studentId: true, day: true, minutes: true },
          })
        : Promise.resolve([] as ActivityRow[]),
    ]);

    return Response.json({
      children: children.map((c) => buildSummary(c, progress, activity)),
    });
  } catch (err) {
    console.error("GET /api/parent/children failed", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;

    const body = await req.json().catch(() => ({}));
    const name = cleanName(body?.name);
    const age = asInt(body?.age, 6, 15);
    const avatar = body?.avatar === undefined ? "" : cleanAvatar(body?.avatar);
    const avatarColor = cleanEnum(body?.avatarColor ?? "amber", AVATAR_COLOR_KEYS) ?? "amber";
    const theme = cleanEnum(body?.theme ?? "neutral", THEME_IDS) ?? "neutral";

    if (!name) {
      return Response.json(
        { error: "Please give your child a name (up to 40 characters)." },
        { status: 400 }
      );
    }
    if (age === null) {
      return Response.json({ error: "Age must be between 6 and 15." }, { status: 400 });
    }
    if (avatar === null) {
      return Response.json({ error: "Invalid avatar." }, { status: 400 });
    }

    // Login codes are unique — retry in the rare collision case.
    let loginCode = generateLoginCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      const clash = await db.student.findUnique({ where: { loginCode } });
      if (!clash) break;
      loginCode = generateLoginCode();
    }

    const id = `child-${randomBytes(10).toString("hex")}`;
    const student = await db.student.create({
      data: {
        id,
        name,
        age,
        ageGroup: ageToGroup(age),
        avatar,
        avatarColor,
        theme,
        loginCode,
        pin: generatePin(),
        parentId: user.id,
      },
    });

    return Response.json(
      {
        child: buildSummary(student, [], []),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/parent/children failed", err);
    return Response.json({ error: "Could not add your child right now" }, { status: 500 });
  }
}
