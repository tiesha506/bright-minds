import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/health — deployment & database diagnostics (no secrets returned).
 *
 * Public on purpose: the user needs to be able to open this URL after a
 * deploy and see, in plain language, exactly why sign-up/login might be
 * failing. It never reveals connection strings or user data.
 */

const EXPECTED_TABLES = [
  "User",
  "Session",
  "Student",
  "Classroom",
  "ClassroomStudent",
  "Assignment",
  "AssignmentResult",
  "Progress",
  "PlatformSetting",
  "Note",
  "Reminder",
  "Notification",
  "Certificate",
  "Goal",
  "CustomActivity",
  "TeacherMaterial",
  "ContentResource",
  "ResourceView",
  "Report",
  "ReportAccess",
  "ActivityLog",
];

interface HealthReport {
  ok: boolean;
  time: string;
  database: {
    configured: boolean;
    connected: boolean;
    error: string | null;
  };
  schema: {
    synced: boolean | null; // null = could not determine (non-SQL database?)
    missingTables: string[];
  };
  admin: {
    exists: boolean | null; // null = could not check
  };
  actions: string[];
}

export async function GET() {
  const report: HealthReport = {
    ok: false,
    time: new Date().toISOString(),
    database: { configured: false, connected: false, error: null },
    schema: { synced: null, missingTables: [] },
    admin: { exists: null },
    actions: [],
  };

  const dbUrl = process.env.DATABASE_URL ?? "";
  report.database.configured = dbUrl.length > 0 && !dbUrl.startsWith("file:");

  if (!report.database.configured) {
    report.actions.push(
      "DATABASE_URL is missing on the server. In Vercel: Settings → Environment Variables → add DATABASE_URL (Transaction pooler string) and DIRECT_URL (Session pooler string) from Supabase → Project Settings → Database, then redeploy."
    );
    return Response.json(report, { status: 503 });
  }

  // ---- 1. Connectivity -----------------------------------------------------
  try {
    await db.$queryRaw`SELECT 1`;
    report.database.connected = true;
  } catch (e) {
    const code = (e as { code?: string })?.code ?? "";
    const message = e instanceof Error ? e.message : String(e);
    console.error(`[health] connectivity: ${code} ${message}`);
    report.database.error = code ? `${code}: ${message.slice(0, 300)}` : message.slice(0, 300);

    if (/did not initialize yet|prisma generate/i.test(message)) {
      report.actions.push(
        "The Prisma client was not generated during the build. Redeploy — the build now runs `prisma generate` automatically."
      );
    } else {
      report.actions.push(
        "The server cannot reach the database. Check that: the Supabase project is not paused; the password in the connection string is URL-encoded (@ → %40); DATABASE_URL uses the Transaction pooler (:6543) and DIRECT_URL the Session pooler (:5432)."
      );
    }
    return Response.json(report, { status: 503 });
  }

  // ---- 2. Schema sync (Postgres: information_schema; fallback per-model) ----
  try {
    const rows = await db.$queryRawUnsafe<{ table_name: string }[]>(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_type = 'BASE TABLE'`
    );
    const present = new Set(rows.map((r) => r.table_name));
    report.schema.missingTables = EXPECTED_TABLES.filter((t) => !present.has(t));
    report.schema.synced = report.schema.missingTables.length === 0;
  } catch {
    // Non-SQL database (local SQLite) — probe one newer table instead.
    try {
      await db.platformSetting.findFirst();
      report.schema.synced = true;
    } catch {
      report.schema.synced = false;
      report.schema.missingTables = ["PlatformSetting (and possibly others)"];
    }
  }

  if (report.schema.synced === false) {
    report.actions.push(
      "The database schema is out of date. The deployment pipeline now runs `prisma db push` automatically on every deploy — trigger a redeploy (push any commit or use Vercel → Deployments → Redeploy) and it will create the missing tables."
    );
  }

  // ---- 3. Admin account ----------------------------------------------------
  try {
    const admin = await db.user.findFirst({
      where: { role: "ADMIN" },
      select: { email: true },
    });
    report.admin.exists = !!admin;
    if (!admin) {
      report.actions.push(
        "No admin account exists yet. Set ADMIN_BOOTSTRAP_PASSWORD in the hosting environment variables and redeploy — the build will create brightminds@admin with that password automatically."
      );
    }
  } catch {
    report.admin.exists = null; // schema problems already reported above
  }

  report.ok =
    report.database.connected && report.schema.synced === true && report.admin.exists !== false;

  if (report.ok) {
    report.actions.push("All checks passed — sign-up and login are fully operational. ✅");
  }

  return Response.json(report, { status: report.ok ? 200 : 503 });
}
