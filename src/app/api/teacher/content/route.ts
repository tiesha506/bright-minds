import { db } from "@/lib/db";
import { requireTeacher } from "../_server";
import { CONTENT_TYPES, CONTENT_STATUSES, SUBJECT_IDS } from "@/lib/teacher-types";
import type { AgeGroup } from "@/lib/content/types";

const AGE_GROUPS: AgeGroup[] = ["early", "primary", "intermediate", "teen"];
const MAX_BODY_CHARS = 50_000;

export function parseBody(raw: string): unknown {
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

/** Validate + normalise the activity body (a JSON string). */
export function validateBody(body: unknown): { ok: true; json: string } | { ok: false; error: string } {
  if (typeof body !== "string" || body.trim() === "") {
    return { ok: false, error: "Activity body is required" };
  }
  if (body.length > MAX_BODY_CHARS) {
    return { ok: false, error: "Activity body is too large (max 50 KB)" };
  }
  const parsed = parseBody(body);
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "Body must be a JSON object" };
  }
  const obj = parsed as Record<string, unknown>;
  // The structured editor produces { instructions?, sections?, items? }.
  if (obj.items !== undefined) {
    if (!Array.isArray(obj.items)) return { ok: false, error: "items must be an array" };
    for (const item of obj.items) {
      if (typeof item !== "object" || item === null) {
        return { ok: false, error: "Each item must be an object" };
      }
      const it = item as Record<string, unknown>;
      if (typeof it.prompt !== "string" || it.prompt.length === 0 || it.prompt.length > 500) {
        return { ok: false, error: "Each item needs a prompt (max 500 chars)" };
      }
    }
  }
  if (obj.instructions !== undefined && typeof obj.instructions !== "string") {
    return { ok: false, error: "instructions must be a string" };
  }
  return { ok: true, json: JSON.stringify(obj) };
}

function serialize(activity: {
  id: string;
  title: string;
  type: string;
  subjectId: string;
  ageGroup: string;
  status: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  const parsed = parseBody(activity.body);
  const itemCount =
    parsed && typeof parsed === "object" && Array.isArray((parsed as Record<string, unknown>).items)
      ? ((parsed as Record<string, unknown>).items as unknown[]).length
      : 0;
  return {
    id: activity.id,
    title: activity.title,
    type: activity.type,
    subjectId: activity.subjectId,
    ageGroup: activity.ageGroup,
    status: activity.status,
    body: parsed,
    itemCount,
    createdAt: activity.createdAt.toISOString(),
    updatedAt: activity.updatedAt.toISOString(),
  };
}

/** GET /api/teacher/content — the teacher's custom activities (drafts). */
export async function GET(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const activities = await db.customActivity.findMany({
    where: { teacherId: auth.id },
    orderBy: { updatedAt: "desc" },
  });
  return Response.json({ activities: activities.map(serialize) });
}

/** POST /api/teacher/content — create a custom activity draft. */
export async function POST(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const b = (raw ?? {}) as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (title.length < 2 || title.length > 120) {
    return Response.json({ error: "Title must be 2-120 characters" }, { status: 400 });
  }
  const type = typeof b.type === "string" ? b.type : "";
  if (!(CONTENT_TYPES as readonly string[]).includes(type)) {
    return Response.json({ error: "Invalid activity type" }, { status: 400 });
  }
  const subjectId = typeof b.subjectId === "string" ? b.subjectId : "";
  if (!(SUBJECT_IDS as readonly string[]).includes(subjectId)) {
    return Response.json({ error: "Choose a subject" }, { status: 400 });
  }
  const ageGroup = typeof b.ageGroup === "string" ? b.ageGroup : "";
  if (!(AGE_GROUPS as string[]).includes(ageGroup)) {
    return Response.json({ error: "Choose an age group" }, { status: 400 });
  }
  const status = typeof b.status === "string" && b.status ? b.status : "draft";
  if (!(CONTENT_STATUSES as readonly string[]).includes(status)) {
    return Response.json({ error: "Status must be draft, private or assigned" }, { status: 400 });
  }
  const checked = validateBody(b.body);
  if (!checked.ok) {
    return Response.json({ error: checked.error }, { status: 400 });
  }

  const activity = await db.customActivity.create({
    data: {
      teacherId: auth.id,
      title,
      type,
      subjectId,
      ageGroup,
      status,
      body: checked.json,
    },
  });
  return Response.json({ activity: serialize(activity) });
}

/** PATCH /api/teacher/content — update title/type/subject/ageGroup/body/status. */
export async function PATCH(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const b = (raw ?? {}) as Record<string, unknown>;
  const id = typeof b.id === "string" ? b.id : "";
  if (!id) return Response.json({ error: "Activity id is required" }, { status: 400 });

  const activity = await db.customActivity.findFirst({ where: { id, teacherId: auth.id } });
  if (!activity) {
    return Response.json({ error: "Activity not found" }, { status: 404 });
  }

  const data: {
    title?: string;
    type?: string;
    subjectId?: string;
    ageGroup?: string;
    status?: string;
    body?: string;
  } = {};

  if (b.title !== undefined) {
    const title = typeof b.title === "string" ? b.title.trim() : "";
    if (title.length < 2 || title.length > 120) {
      return Response.json({ error: "Title must be 2-120 characters" }, { status: 400 });
    }
    data.title = title;
  }
  if (b.type !== undefined) {
    if (typeof b.type !== "string" || !(CONTENT_TYPES as readonly string[]).includes(b.type)) {
      return Response.json({ error: "Invalid activity type" }, { status: 400 });
    }
    data.type = b.type;
  }
  if (b.subjectId !== undefined) {
    if (typeof b.subjectId !== "string" || !(SUBJECT_IDS as readonly string[]).includes(b.subjectId)) {
      return Response.json({ error: "Choose a subject" }, { status: 400 });
    }
    data.subjectId = b.subjectId;
  }
  if (b.ageGroup !== undefined) {
    if (typeof b.ageGroup !== "string" || !(AGE_GROUPS as string[]).includes(b.ageGroup)) {
      return Response.json({ error: "Choose an age group" }, { status: 400 });
    }
    data.ageGroup = b.ageGroup;
  }
  if (b.status !== undefined) {
    if (typeof b.status !== "string" || !(CONTENT_STATUSES as readonly string[]).includes(b.status)) {
      return Response.json({ error: "Status must be draft, private or assigned" }, { status: 400 });
    }
    data.status = b.status;
  }
  if (b.body !== undefined) {
    const checked = validateBody(b.body);
    if (!checked.ok) {
      return Response.json({ error: checked.error }, { status: 400 });
    }
    data.body = checked.json;
  }
  if (Object.keys(data).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await db.customActivity.update({ where: { id: activity.id }, data });
  return Response.json({ activity: serialize(updated) });
}

/** DELETE /api/teacher/content?id=… — delete a draft activity. */
export async function DELETE(req: Request) {
  const auth = await requireTeacher(req);
  if (auth instanceof Response) return auth;

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!id) return Response.json({ error: "Activity id is required" }, { status: 400 });

  const activity = await db.customActivity.findFirst({ where: { id, teacherId: auth.id } });
  if (!activity) {
    return Response.json({ error: "Activity not found" }, { status: 404 });
  }
  await db.customActivity.delete({ where: { id: activity.id } });
  return Response.json({ ok: true });
}
