import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/server/auth";

/**
 * POST /api/auth/student-login — child login with their class/family code + PIN.
 * Body: { code, pin }
 * Returns the child's profile so the student app can hydrate.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = String(body?.code ?? "").trim().toUpperCase();
    const pin = String(body?.pin ?? "").trim();

    if (!code || !/^\d{4}$/.test(pin)) {
      return Response.json({ error: "Enter your code and 4-digit PIN" }, { status: 400 });
    }

    const student = await db.student.findUnique({ where: { loginCode: code } });
    if (!student || !student.pin || student.pin !== pin) {
      return Response.json({ error: "That code or PIN doesn't match" }, { status: 401 });
    }

    // Child sessions ride on the parent account (or a dedicated owner) when present,
    // otherwise we mint a lightweight guardian session bound to the child record.
    let userId = student.parentId;
    if (!userId) {
      const guardian = await db.user.upsert({
        where: { email: `guardian+${student.id}@brightminds.local` },
        update: {},
        create: {
          email: `guardian+${student.id}@brightminds.local`,
          passwordHash: "external:code-login",
          name: `${student.name}'s Guardian`,
          role: "PARENT",
        },
      });
      userId = guardian.id;
      await db.student.update({ where: { id: student.id }, data: { parentId: guardian.id } });
    }

    const token = await createSession(userId);
    return Response.json({
      token,
      user: {
        id: userId,
        email: "",
        name: student.name,
        role: "STUDENT",
      },
      student: {
        id: student.id,
        name: student.name,
        age: student.age,
        theme: student.theme,
        ageGroup: student.ageGroup,
        avatar: student.avatar,
        avatarColor: student.avatarColor,
        xp: student.xp,
      },
    });
  } catch {
    return Response.json({ error: "Could not sign in" }, { status: 500 });
  }
}
