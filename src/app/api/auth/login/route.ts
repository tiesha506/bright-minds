import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/server/auth";
import { dbErrorResponse } from "@/lib/server/db-errors";

/**
 * POST /api/auth/login — PARENT / TEACHER / ADMIN email login.
 * Body: { email, password }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return Response.json({ error: "Wrong email or password" }, { status: 401 });
    }

    const token = await createSession(user.id);
    return Response.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (e) {
    return dbErrorResponse("login", e);
  }
}
