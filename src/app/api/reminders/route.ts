import { db } from "@/lib/db";
import { getSessionUser, unauthorized } from "@/lib/server/auth";
import { REMINDER_NOTES_MAX, REMINDER_TITLE_MAX } from "@/lib/notepad-types";

const REPEATS = new Set(["none", "daily", "weekly", "monthly"]);

// ---------------------------------------------------------------------------
// GET /api/reminders?scope=pending|done|all (default: all)
// The signed-in user's private reminders. Pending (incl. overdue) first,
// sorted by dueAt ascending; done ones last, most recently due first.
// Every row is scoped userId = session user id — reminders are private.
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  const scopeParam = new URL(req.url).searchParams.get("scope") ?? "all";
  const scope = ["pending", "done", "all"].includes(scopeParam) ? scopeParam : "all";

  const reminders = await db.reminder.findMany({
    where: {
      userId: user.id,
      ...(scope === "pending" ? { done: false } : scope === "done" ? { done: true } : {}),
    },
  });

  const now = Date.now();
  const items = reminders
    .map((r) => ({
      id: r.id,
      title: r.title,
      dueAt: r.dueAt.toISOString(),
      repeat: r.repeat,
      notes: r.notes,
      done: r.done,
      overdue: !r.done && r.dueAt.getTime() < now,
      createdAt: r.createdAt.toISOString(),
    }))
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1; // pending first
      if (a.done) return b.dueAt.localeCompare(a.dueAt); // done: latest first
      return a.dueAt.localeCompare(b.dueAt); // pending: soonest first
    });

  return Response.json({ reminders: items });
}

/**
 * POST /api/reminders — create a reminder.
 * Body: { title, dueAt (ISO), repeat?, notes? }
 */
export async function POST(req: Request) {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { title, dueAt, repeat, notes } = (body ?? {}) as {
    title?: unknown;
    dueAt?: unknown;
    repeat?: unknown;
    notes?: unknown;
  };

  if (typeof title !== "string" || title.trim() === "") {
    return Response.json({ error: "Give your reminder a title" }, { status: 400 });
  }
  const due = typeof dueAt === "string" ? new Date(dueAt) : null;
  if (!due || Number.isNaN(due.getTime())) {
    return Response.json({ error: "Pick a valid date and time" }, { status: 400 });
  }
  const safeRepeat = typeof repeat === "string" && REPEATS.has(repeat) ? repeat : "none";
  const safeNotes = typeof notes === "string" ? notes.slice(0, REMINDER_NOTES_MAX) : "";

  const reminder = await db.reminder.create({
    data: {
      userId: user.id,
      title: title.trim().slice(0, REMINDER_TITLE_MAX),
      dueAt: due,
      repeat: safeRepeat,
      notes: safeNotes,
    },
  });

  return Response.json(
    {
      reminder: {
        id: reminder.id,
        title: reminder.title,
        dueAt: reminder.dueAt.toISOString(),
        repeat: reminder.repeat,
        notes: reminder.notes,
        done: reminder.done,
        overdue: reminder.dueAt.getTime() < Date.now(),
        createdAt: reminder.createdAt.toISOString(),
      },
    },
    { status: 201 }
  );
}
