import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  createSession,
  hashPassword,
  isValidEmail,
  isValidPassword,
} from "@/lib/server/auth";
import { dbErrorResponse } from "@/lib/server/db-errors";

/**
 * POST /api/auth/signup — create a PARENT or TEACHER account.
 * Body: { name, email, password, role: "PARENT" | "TEACHER" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body ?? {};

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.length > 60 ||
      !isValidEmail(String(email)) ||
      !isValidPassword(String(password)) ||
      (role !== "PARENT" && role !== "TEACHER")
    ) {
      return Response.json(
        { error: "Please check your details (password needs 8+ characters)." },
        { status: 400 }
      );
    }

    const registrationOpen =
      (await db.platformSetting.findUnique({ where: { key: "registrationOpen" } }))?.value !==
      "false";
    if (!registrationOpen) {
      return Response.json(
        { error: "New registrations are currently closed. Please contact the school." },
        { status: 403 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return Response.json(
        { error: "An account with this email already exists. Try logging in." },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashPassword(String(password)),
        name: name.trim(),
        role,
      },
    });

    const token = await createSession(user.id);
    return Response.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (e) {
    return dbErrorResponse("signup", e);
  }
}
