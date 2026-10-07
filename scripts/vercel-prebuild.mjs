/**
 * Vercel prebuild — makes every deployment self-healing for the database.
 *
 * Problem it solves: the live Vercel deployment pointed at the Supabase
 * Postgres database, but the schema there had drifted behind the code
 * (older tables/columns). Sign-up and login then failed with generic 500
 * errors like "Could not create the account" because Prisma could not find
 * newer tables (PlatformSetting) or columns (User.lastSeenAt, User.photoUrl).
 *
 * What it does on each deploy (in order, all best-effort for resilience):
 *   1. Skips entirely when DATABASE_URL is absent or a local SQLite file —
 *      so local builds are untouched.
 *   2. `prisma generate` — guarantees the client matches the committed schema.
 *   3. `prisma db push --accept-data-loss` — syncs the schema to the database
 *      (uses DIRECT_URL — the session pooler — and falls back to DATABASE_URL).
 *   4. Optionally bootstraps the admin account when ADMIN_BOOTSTRAP_PASSWORD
 *      is set and no ADMIN user exists yet (password never stored in the repo).
 *
 * Any failure prints clear guidance and exits 0 so the deployment still
 * completes — the /api/health endpoint then reports exactly what is wrong.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { randomBytes, scryptSync } from "node:crypto";

const dbUrl = process.env.DATABASE_URL ?? "";

function banner(text) {
  console.log(`\n━━━ ${text} ━━━`);
}

// ---------------------------------------------------------------------------
// 1. Guard: nothing to do without a real database
// ---------------------------------------------------------------------------
if (!dbUrl) {
  banner("DATABASE_URL is not set");
  console.warn(`
⚠️  No DATABASE_URL found — skipping database setup. The site will build, but
   every API call that needs the database will fail.

   Fix: Vercel Dashboard → your project → Settings → Environment Variables:

     DATABASE_URL = postgresql://postgres.<project-ref>:<password>@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
     DIRECT_URL   = postgresql://postgres.<project-ref>:<password>@aws-0-us-west-2.pooler.supabase.com:5432/postgres

   (values from Supabase → Project Settings → Database → Connection string,
   Transaction pooler for DATABASE_URL and Session pooler for DIRECT_URL)

   Then redeploy. This prebuild step will create/sync all tables automatically.
   You can verify the result any time at  /api/health
`);
  process.exit(0);
}

if (dbUrl.startsWith("file:")) {
  banner("Local SQLite database detected");
  console.log("→ Local build — skipping Supabase sync (prisma client stays as last generated).");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Resolve the Prisma CLI without network access
// ---------------------------------------------------------------------------
function prismaCommand(args) {
  const localCli = "node_modules/prisma/build/index.js";
  if (existsSync(localCli)) {
    return { cmd: process.execPath, args: [localCli, ...args] };
  }
  return { cmd: "npx", args: ["--no-install", "prisma", ...args] };
}

function runPrisma(args, env = process.env) {
  const { cmd, args: fullArgs } = prismaCommand(args);
  execFileSync(cmd, fullArgs, { stdio: "inherit", env });
}

let schemaSynced = false;

// ---------------------------------------------------------------------------
// 2. Generate the Prisma client (does not need the database)
// ---------------------------------------------------------------------------
banner("Prisma generate");
try {
  runPrisma(["generate"]);
  console.log("✅ Prisma client generated");
} catch (err) {
  console.warn(`⚠️  prisma generate failed (${err.message}) — continuing; Vercel may have generated it already.`);
}

// ---------------------------------------------------------------------------
// 3. Push the schema to the database (DIRECT_URL preferred, DATABASE_URL fallback)
// ---------------------------------------------------------------------------
banner("Prisma db push (schema sync)");
const directUrl = process.env.DIRECT_URL || dbUrl;
const pushArgs = ["db", "push", "--accept-data-loss", "--url", directUrl];
// The committed schema references env("DIRECT_URL") — make sure it resolves
// even when the var is unset on the host (the --url flag above still decides
// the actual connection target).
const pushEnv = { ...process.env, DIRECT_URL: directUrl };

try {
  runPrisma(pushArgs, pushEnv);
  schemaSynced = true;
  console.log("✅ Database schema is in sync with the code");
} catch (err) {
  if (process.env.DIRECT_URL && process.env.DIRECT_URL !== dbUrl) {
    console.warn("→ Push over DIRECT_URL failed; retrying with DATABASE_URL…");
    try {
      runPrisma(["db", "push", "--accept-data-loss", "--url", dbUrl], pushEnv);
      schemaSynced = true;
      console.log("✅ Database schema is in sync with the code (via DATABASE_URL)");
    } catch (err2) {
      console.warn(`⚠️  db push failed: ${err2.message}`);
    }
  } else {
    console.warn(`⚠️  db push failed: ${err.message}`);
  }
}

if (!schemaSynced) {
  console.warn(`
⚠️  The database schema could NOT be synced during this build. The deployment
   will continue, but database-backed features may fail until this is fixed.

   Checklist:
   • Is DATABASE_URL reachable from Vercel?  (check Supabase project is not paused)
   • Is the password URL-encoded?  (@ → %40, : → %3A, / → %2F …)
   • Prefer DIRECT_URL (session pooler, port 5432) for the most reliable push.

   After fixing, redeploy — or check the exact problem any time at /api/health
`);
}

// ---------------------------------------------------------------------------
// 4. Optional: bootstrap the admin account (never stores secrets in the repo)
// ---------------------------------------------------------------------------
const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
if (adminPassword && schemaSynced) {
  banner("Admin account bootstrap");
  try {
    const mod = await import("@prisma/client");
    const PrismaClient = mod.PrismaClient ?? mod.default?.PrismaClient;
    const client = new PrismaClient();

    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(adminPassword, salt, 64).toString("hex");
    const passwordHash = `${salt}:${hash}`;

    const existing = await client.user.findFirst({ where: { role: "ADMIN" } });
    if (existing) {
      console.log(`✅ Admin account already exists (${existing.email}) — nothing to do.`);
    } else {
      await client.user.create({
        data: {
          email: "brightminds@admin",
          passwordHash,
          name: "BrightMinds Admin",
          role: "ADMIN",
        },
      });
      console.log("✅ Admin account created (brightminds@admin)");
    }
    await client.$disconnect();
  } catch (err) {
    console.warn(`⚠️  Admin bootstrap skipped: ${err.message}`);
  }
} else if (!adminPassword) {
  console.log("ℹ️  ADMIN_BOOTSTRAP_PASSWORD not set — leaving admin seeding to the existing database.");
}

banner("Prebuild done");
process.exit(0);
