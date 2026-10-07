import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { REMINDER_NOTES_MAX, REMINDER_TITLE_MAX } from "@/lib/notepad-types";

type RouteContext = { params: Promise<{ id: string }> };

const REPEATS = new Set(["none", "daily", "weekly", "monthly"]);

/** Rolls a due date forward one repeat interval. */
function addInterval(due: Date, repeat: string): Date {
  const next = new Date(due);
  if (repeat === "daily") next.setDate(next.getDate() + 1);
  else if (repeat === "weekly") next.setDate(next.getDate() + 7);
  else if (repeat === "monthly") next.setMonth(next.getMonth() + 1);
  return next;
}

/**
 * PATCH /api/reminders/[id] — update the signed-in user's own reminder.
 * Body: { title?, dueAt?, repeat?, notes?, done? }
 *
 * Real recurrence: marking a repeating reminder done does NOT store done=true.
 * Instead dueAt rolls forward by its interval (repeated until it lands in the
 * future, so long-overdue ones catch up) and the reminder stays pending.
 */
export async function PATCH(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await db.reminder.findFirst({ where: { id, userId: user.id } });
  if (!existing) {
    return Response.json({ error: "Reminder not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { title, dueAt, repeat, notes, done } = (body ?? {}) as {
    title?: unknown;
    dueAt?: unknown;
    repeat?: unknown;
    notes?: unknown;
    done?: unknown;
  };

  const data: {
    title?: string;
    dueAt?: Date;
    repeat?: string;
    notes?: string;
    done?: boolean;
  } = {};

  if (typeof title === "string" && title.trim() !== "") {
    data.title = title.trim().slice(0, REMINDER_TITLE_MAX);
  }
  if (typeof dueAt === "string") {
    const due = new Date(dueAt);
    if (Number.isNaN(due.getTime())) {
      return Response.json({ error: "Invalid date" }, { status: 400 });
    }
    data.dueAt = due;
  }
  if (typeof repeat === "string") {
    if (!REPEATS.has(repeat)) {
      return Response.json({ error: "Invalid repeat option" }, { status: 400 });
    }
    data.repeat = repeat;
  }
  if (typeof notes === "string") {
    data.notes = notes.slice(0, REMINDER_NOTES_MAX);
  }

  if (typeof done === "boolean") {
    const effectiveRepeat = data.repeat ?? existing.repeat;
    if (done && effectiveRepeat !== "none") {
      // Recurring: roll the due date forward, keep it pending.
      let next = data.dueAt ?? existing.dueAt;
      next = addInterval(next, effectiveRepeat);
      // Catch up long-overdue repeating reminders (bounded loop).
      for (let i = 0; i < 1000 && next.getTime() <= Date.now(); i++) {
        next = addInterval(next, effectiveRepeat);
      }
      data.dueAt = next;
      data.done = false;
    } else {
      data.done = done;
    }
  }

  if (Object.keys(data).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await db.reminder.update({ where: { id: existing.id }, data });
  return Response.json({
    reminder: {
      id: updated.id,
      title: updated.title,
      dueAt: updated.dueAt.toISOString(),
      repeat: updated.repeat,
      notes: updated.notes,
      done: updated.done,
      overdue: !updated.done && updated.dueAt.getTime() < Date.now(),
      createdAt: updated.createdAt.toISOString(),
    },
  });
}

/** DELETE /api/reminders/[id] */
export async function DELETE(req: Request, { params }: RouteContext) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await db.reminder.findFirst({ where: { id, userId: user.id } });
  if (!existing) {
    return Response.json({ error: "Reminder not found" }, { status: 404 });
  }

  await db.reminder.delete({ where: { id: existing.id } });
  return Response.json({ ok: true });
}
