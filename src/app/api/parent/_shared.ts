import { db } from "@/lib/db";
import {
  forbidden,
  getSessionUser,
  unauthorized,
  type SessionUser,
} from "@/lib/server/auth";

// ---------------------------------------------------------------------------
// Shared server helpers for every /api/parent route:
// auth guard, child ownership guard, and the date/streak/average math.
// ---------------------------------------------------------------------------

export const AVATAR_COLOR_KEYS = ["rose", "amber", "emerald", "teal", "violet", "orange"];
export const THEME_IDS = ["pink", "blue", "neutral"];

/** Verifies the session belongs to a signed-in PARENT. */
export async function requireParent(req: Request): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();
  if (user.role !== "PARENT") return forbidden();
  return user;
}

/** Loads a child ONLY if it belongs to this parent (privacy guarantee). */
export function findOwnChild(parentId: string, childId: string) {
  if (!childId || typeof childId !== "string") return null;
  return db.student.findFirst({ where: { id: childId, parentId } });
}

/** 403 unless the child exists AND belongs to the parent. */
export async function requireOwnChild(parentId: string, childId: string) {
  const child = await findOwnChild(parentId, childId);
  if (!child) return forbidden();
  return child;
}

// ------------------------------- dates ------------------------------------

/** Local YYYY-MM-DD key — matches how /api/activity stores days. */
export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function daysAgoKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return dayKey(d);
}

/** Last 7 calendar days (oldest → newest, ending today). */
export function lastNDays(n: number): { key: string; date: Date }[] {
  const out: { key: string; date: Date }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ key: dayKey(d), date: d });
  }
  return out;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "Mon" for the weekly chart, "Mar 3" for the monthly chart. */
export function dayLabel(date: Date, includeMonth: boolean): string {
  if (includeMonth) return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;
  return WEEKDAY_SHORT[date.getDay()];
}

/**
 * Consecutive-day streak from a list of local day keys.
 * A missing today does NOT break the streak (the day isn't over yet),
 * but anything older than yesterday does.
 */
export function computeStreak(dayKeys: string[]): number {
  const set = new Set(dayKeys);
  const cursor = new Date();
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  for (;;) {
    const k = dayKey(cursor);
    if (!set.has(k)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function avgOf(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

// ------------------------------ validation ---------------------------------

export function asInt(value: unknown, min: number, max: number): number | null {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < min || n > max) return null;
  return n;
}

export function cleanName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 40) return null;
  return name;
}

export function cleanAvatar(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  // An emoji (or short glyph) chosen from the picker — anything longer is junk.
  if (trimmed.length === 0 || trimmed.length > 8) return null;
  return trimmed;
}

export function cleanEnum<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

/** Maps an age (6-15) to the age group used by the content registry. */
export function ageToGroup(age: number): "early" | "primary" | "intermediate" | "teen" {
  if (age <= 8) return "early";
  if (age <= 11) return "primary";
  if (age <= 13) return "intermediate";
  return "teen";
}
