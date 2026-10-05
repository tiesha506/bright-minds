import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

// ------------------------------ Passwords ---------------------------------

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// ------------------------------- Sessions ---------------------------------

export type Role = "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  await db.session.create({ data: { token, userId } });
  return token;
}

function extractToken(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Bearer ")) return header.slice(7).trim();
  return null;
}

/** Returns the authenticated user for this request, or null. */
export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const token = extractToken(req);
  if (!token) return null;
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session) return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role as Role,
  };
}

/** 401 response helper. */
export function unauthorized() {
  return Response.json({ error: "Not signed in" }, { status: 401 });
}

/** 403 response helper. */
export function forbidden() {
  return Response.json({ error: "Not allowed for your role" }, { status: 403 });
}

// ------------------------------- Helpers ----------------------------------

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion

export function generateLoginCode(): string {
  const pick = () =>
    Array.from(
      { length: 4 },
      () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
    ).join("");
  return `${pick()}-${pick()}`;
}

export function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
}

export function isValidPassword(password: string): boolean {
  return typeof password === "string" && password.length >= 8 && password.length <= 100;
}
