import { db } from "@/lib/db";
import { ensureAppBuckets, listBucketIds, storageConfigured } from "@/lib/server/storage";

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

interface UrlShape {
  quoted: boolean; // value was pasted with surrounding quote marks
  protocol: string | null; // postgresql / postgres / file / null (unparseable)
  host: string | null;
  isPooler: boolean; // *.pooler.supabase.com (works from serverless)
  isDirect: boolean; // db.<ref>.supabase.co (IPv6 — unreachable from Vercel!)
  hasCredentials: boolean;
  hasPassword: boolean;
  params: string[]; // e.g. ["pgbouncer", "connection_limit"]
  port: string | null;
}

interface HealthReport {
  ok: boolean;
  time: string;
  database: {
    configured: boolean;
    connected: boolean;
    error: string | null;
    urlShape: UrlShape | null;
  };
  schema: {
    synced: boolean | null; // null = could not determine (non-SQL database?)
    missingTables: string[];
  };
  admin: {
    exists: boolean | null; // null = could not check
  };
  storage: {
    configured: boolean;
    reachable: boolean | null;
    buckets: { content: boolean; reports: boolean; avatars: boolean } | null;
  };
  actions: string[];
}

/**
 * Inspect the DATABASE_URL value and describe its shape WITHOUT ever
 * returning the credentials themselves. This pinpoints the classic
 * copy/paste mistakes (quotes left in, direct instead of pooler host,
 * missing pgbouncer param, no password).
 */
function describeUrl(raw: string): UrlShape {
  const trimmed = raw.trim();
  const quoted = /^".*"$|^'.*'$/.test(trimmed);
  const cleaned = quoted ? trimmed.slice(1, -1) : trimmed;

  let protocol: string | null = null;
  let host: string | null = null;
  let port: string | null = null;
  let hasCredentials = false;
  let hasPassword = false;
  let params: string[] = [];

  try {
    const u = new URL(cleaned);
    protocol = u.protocol.replace(":", "");
    host = u.hostname;
    port = u.port || null;
    hasCredentials = !!u.username;
    hasPassword = !!u.password;
    params = [...u.searchParams.keys()];
  } catch {
    protocol = null;
  }

  return {
    quoted,
    protocol,
    host,
    isPooler: !!host && host.endsWith("pooler.supabase.com"),
    isDirect: !!host && /^db\.[a-z0-9]+\.supabase\.co$/.test(host),
    hasCredentials,
    hasPassword,
    params,
    port,
  };
}

export async function GET() {
  const report: HealthReport = {
    ok: false,
    time: new Date().toISOString(),
    database: { configured: false, connected: false, error: null, urlShape: null },
    schema: { synced: null, missingTables: [] },
    admin: { exists: null },
    storage: { configured: false, reachable: null, buckets: null },
    actions: [],
  };

  const dbUrl = process.env.DATABASE_URL ?? "";
  report.database.configured = dbUrl.length > 0 && !dbUrl.startsWith("file:");
  if (report.database.configured) {
    const shape = describeUrl(dbUrl);
    report.database.urlShape = shape;
    if (shape.quoted) {
      report.actions.push(
        'DATABASE_URL starts and ends with quote marks — remove the quotes in Vercel → Environment Variables (quotes belong only in .env files, not in dashboard fields).'
      );
    }
    if (shape.protocol !== "postgresql" && shape.protocol !== "postgres") {
      report.actions.push(
        `DATABASE_URL does not parse as a postgres connection string (detected protocol: ${shape.protocol ?? "unparseable"}). It should start with postgresql:// — copy the Transaction pooler string from Supabase → Settings → Database → Connection string.`
      );
    }
    if (shape.isDirect) {
      report.actions.push(
        "DATABASE_URL points at the direct database host (db.<ref>.supabase.co). Vercel serverless functions cannot reach it (IPv6 only). Use the POOLER host instead: aws-0-us-west-2.pooler.supabase.com (Transaction pooler, port 6543, with ?pgbouncer=true&connection_limit=1)."
      );
    }
    if (shape.hasCredentials && !shape.hasPassword) {
      report.actions.push(
        "DATABASE_URL has a username but no password — the password placeholder was not replaced. Re-copy the string and insert your real database password."
      );
    }
    if (shape.port === "6543" && !shape.params.includes("pgbouncer")) {
      report.actions.push(
        "DATABASE_URL uses port 6543 (transaction pooler) but is missing the ?pgbouncer=true&connection_limit=1 parameters — queries may fail unpredictably. Append them to the URL."
      );
    }
  }

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
    const scrubbed = message.replace(/:\/\/[^@\s]*@/g, "://***@").slice(0, 300);
    report.database.error = code ? `${code}: ${scrubbed}` : scrubbed;

    if (/did not initialize yet|prisma generate/i.test(message)) {
      report.actions.push(
        "The Prisma client was not generated during the build. Redeploy — the build now runs `prisma generate` automatically."
      );
    } else if (report.database.urlShape && (report.database.urlShape.quoted || !report.database.urlShape.isPooler || (report.database.urlShape.hasCredentials && !report.database.urlShape.hasPassword))) {
      report.actions.push(
        "The connection failed and the DATABASE_URL shape above shows problems — fix those first, then redeploy."
      );
    } else {
      report.actions.push(
        "The server cannot reach the database. Check that: the Supabase project is not paused; the password in the connection string is URL-encoded (@ → %40, # → %23, : → %3A); DATABASE_URL uses the Transaction pooler (:6543) and DIRECT_URL the Session pooler (:5432)."
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

  // ---- 4. File storage (Supabase buckets) ----------------------------------
  report.storage.configured = storageConfigured();
  if (!report.storage.configured) {
    report.actions.push(
      "File uploads are disabled: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set on the server. In Vercel → Settings → Environment Variables, add NEXT_PUBLIC_SUPABASE_URL = your Supabase project URL (https://<ref>.supabase.co) and SUPABASE_SERVICE_ROLE_KEY = the service_role key (Supabase → Project Settings → API), then redeploy. The needed storage buckets are created automatically afterwards."
    );
  } else {
    try {
      await ensureAppBuckets(); // self-heal missing buckets on every health check
      const ids = await listBucketIds();
      report.storage.reachable = ids !== null;
      if (ids) {
        const has = (b: string) => ids.includes(b);
        report.storage.buckets = {
          content: has("content"),
          reports: has("reports"),
          avatars: has("avatars"),
        };
        const missing = Object.entries(report.storage.buckets)
          .filter(([, ok]) => !ok)
          .map(([b]) => b);
        if (missing.length > 0) {
          report.actions.push(
            `Storage bucket(s) ${missing.join(", ")} could not be created — check that SUPABASE_SERVICE_ROLE_KEY is the service_role key (not anon) and Storage is enabled on the Supabase project.`
          );
        }
      } else {
        report.actions.push(
          "Supabase Storage could not be reached with the service key — check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY values."
        );
      }
    } catch (err) {
      report.storage.reachable = false;
      console.error("[health] storage check failed:", err);
    }
  }

  report.ok =
    report.database.connected &&
    report.schema.synced === true &&
    report.admin.exists !== false &&
    report.storage.configured === true &&
    report.storage.reachable === true &&
    !!report.storage.buckets &&
    report.storage.buckets.content &&
    report.storage.buckets.reports &&
    report.storage.buckets.avatars;

  if (report.ok) {
    report.actions.push("All checks passed — sign-up and login are fully operational. ✅");
  }

  return Response.json(report, { status: report.ok ? 200 : 503 });
}
