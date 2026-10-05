import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "../_util";
import type { SettingsData } from "@/lib/admin-types";

const KEY = "registrationOpen";

/**
 * GET /api/admin/settings — current platform settings.
 * { registrationOpen: boolean } — the PlatformSetting value is the string
 * "false" when closed; anything else (or a missing row) means open.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const row = await db.platformSetting.findUnique({ where: { key: KEY } });
  const data: SettingsData = { registrationOpen: row?.value !== "false" };
  return Response.json(data);
}

/**
 * PUT /api/admin/settings — upsert { registrationOpen: boolean }.
 * The signup route enforces this on every new account immediately.
 */
export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  let open: unknown;
  try {
    const body = await req.json();
    open = body?.registrationOpen;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (typeof open !== "boolean") {
    return Response.json(
      { error: "registrationOpen must be true or false" },
      { status: 400 }
    );
  }

  await db.platformSetting.upsert({
    where: { key: KEY },
    update: { value: open ? "true" : "false" },
    create: { key: KEY, value: open ? "true" : "false" },
  });

  const data: SettingsData = { registrationOpen: open };
  return Response.json(data);
}
