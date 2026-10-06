import { db } from "@/lib/db";
import { cleanPhotoUrl } from "@/lib/server/photo";
import {
  AVATAR_COLOR_KEYS,
  THEME_IDS,
  ageToGroup,
  asInt,
  cleanAvatar,
  cleanEnum,
  cleanName,
  requireParent,
  requireOwnChild,
} from "../../_shared";

// ---------------------------------------------------------------------------
// PATCH  /api/parent/children/[childId] — edit profile + upsert learning goal.
// DELETE /api/parent/children/[childId] — remove the child (cascades progress).
// Every route verifies the child belongs to the signed-in parent.
// ---------------------------------------------------------------------------

const SUBJECT_IDS = ["math", "english", "science", "reading"];

type RouteContext = { params: Promise<{ childId: string }> };

export async function PATCH(req: Request, ctx: RouteContext) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;
    const { childId } = await ctx.params;

    const child = await requireOwnChild(user.id, childId);
    if (child instanceof Response) return child;

    const body = await req.json().catch(() => ({}));
    const data: {
      name?: string;
      age?: number;
      ageGroup?: string;
      avatar?: string;
      avatarColor?: string;
      theme?: string;
      photoUrl?: string;
    } = {};

    if (body?.name !== undefined) {
      const name = cleanName(body.name);
      if (!name) {
        return Response.json({ error: "Name must be 1-40 characters." }, { status: 400 });
      }
      data.name = name;
    }
    if (body?.age !== undefined) {
      const age = asInt(body.age, 6, 15);
      if (age === null) {
        return Response.json({ error: "Age must be between 6 and 15." }, { status: 400 });
      }
      data.age = age;
      data.ageGroup = ageToGroup(age); // keep the content level in sync
    }
    if (body?.avatar !== undefined) {
      const avatar = cleanAvatar(body.avatar);
      if (avatar === null) {
        return Response.json({ error: "Invalid avatar." }, { status: 400 });
      }
      data.avatar = avatar;
    }
    if (body?.avatarColor !== undefined) {
      const color = cleanEnum(body.avatarColor, AVATAR_COLOR_KEYS);
      if (!color) {
        return Response.json({ error: "Invalid colour." }, { status: 400 });
      }
      data.avatarColor = color;
    }
    if (body?.photoUrl !== undefined) {
      const photo = cleanPhotoUrl(body.photoUrl, process.env.NEXT_PUBLIC_SUPABASE_URL);
      if (photo === null) {
        return Response.json({ error: "Invalid photo." }, { status: 400 });
      }
      data.photoUrl = photo;
    }
    if (body?.theme !== undefined) {
      const theme = cleanEnum(body.theme, THEME_IDS);
      if (!theme) {
        return Response.json({ error: "Invalid theme." }, { status: 400 });
      }
      data.theme = theme;
    }

    // ---------------------------- learning goal ----------------------------
    if (body?.goal !== undefined) {
      const goal = body.goal ?? {};
      const goalData: {
        dailyMinutes?: number;
        weeklyLessonTarget?: number;
        prioritySubjects?: string;
        note?: string;
      } = {};
      if (goal.dailyMinutes !== undefined) {
        const minutes = asInt(goal.dailyMinutes, 5, 60);
        if (minutes === null) {
          return Response.json(
            { error: "Daily minutes must be between 5 and 60." },
            { status: 400 }
          );
        }
        goalData.dailyMinutes = minutes;
      }
      if (goal.weeklyLessonTarget !== undefined) {
        const target = asInt(goal.weeklyLessonTarget, 1, 21);
        if (target === null) {
          return Response.json(
            { error: "Weekly lesson target must be between 1 and 21." },
            { status: 400 }
          );
        }
        goalData.weeklyLessonTarget = target;
      }
      if (goal.prioritySubjects !== undefined) {
        if (
          !Array.isArray(goal.prioritySubjects) ||
          goal.prioritySubjects.some((s) => !SUBJECT_IDS.includes(s))
        ) {
          return Response.json({ error: "Invalid subjects." }, { status: 400 });
        }
        goalData.prioritySubjects = JSON.stringify(
          SUBJECT_IDS.filter((s) => goal.prioritySubjects!.includes(s))
        );
      }
      if (goal.note !== undefined) {
        if (typeof goal.note !== "string" || goal.note.length > 500) {
          return Response.json({ error: "Note must be under 500 characters." }, { status: 400 });
        }
        goalData.note = goal.note.trim();
      }

      const existing = await db.goal.findUnique({ where: { studentId: child.id } });
      if (existing) {
        await db.goal.update({ where: { studentId: child.id }, data: goalData });
      } else {
        await db.goal.create({ data: { studentId: child.id, ...goalData } });
      }
    }

    const updated =
      Object.keys(data).length > 0
        ? await db.student.update({ where: { id: child.id }, data })
        : child;

    return Response.json({
      ok: true,
      child: {
        id: updated.id,
        name: updated.name,
        age: updated.age,
        ageGroup: updated.ageGroup,
        avatar: updated.avatar,
        avatarColor: updated.avatarColor,
        photoUrl: updated.photoUrl,
        theme: updated.theme,
      },
    });
  } catch (err) {
    console.error("PATCH /api/parent/children/[childId] failed", err);
    return Response.json({ error: "Could not save changes right now" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: RouteContext) {
  try {
    const user = await requireParent(req);
    if (user instanceof Response) return user;
    const { childId } = await ctx.params;

    const child = await requireOwnChild(user.id, childId);
    if (child instanceof Response) return child;

    // Progress, activity, goals, classroom seats and results cascade.
    await db.student.delete({ where: { id: child.id } });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/parent/children/[childId] failed", err);
    return Response.json({ error: "Could not remove your child right now" }, { status: 500 });
  }
}
