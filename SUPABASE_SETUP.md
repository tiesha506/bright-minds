# ☁️ Supabase Setup Guide — making BrightMinds serverless

This document is the exact checklist of **what to create in Supabase** and **what to hand back to the developer**, so the app's data layer moves from the local SQLite file to Supabase Postgres with no code rewrites.

The app already talks to the database exclusively through **server-side Prisma** (`src/lib/db.ts`) behind Next.js API routes — so swapping SQLite → Supabase Postgres is a *provider + connection-string change*, not a refactor.

---

## 0. Live status — ✅ MIGRATION COMPLETE

Project ref: **`ydrulncrxftkisnlvgyt`** → `https://ydrulncrxftkisnlvgyt.supabase.co` (region `us-west-2`)

| Item | Status | Notes |
| --- | --- | --- |
| ① Project URL | ✅ done | project live, Auth service healthy |
| ② anon key | ✅ done | verified against REST |
| ③ service_role key | ✅ done | stored **only** in gitignored `.env`; never committed |
| ④ Session pooler URL (:5432) | ✅ done | `DIRECT_URL` — migrations |
| ⑤ Transaction pooler URL (:6543) | ✅ done | `DATABASE_URL` + `?pgbouncer=true&connection_limit=1` |
| ⑥ DB password | ✅ done | stored **only** in gitignored `.env` |

**Executed migration (all verified):**
- `scripts/migrate-to-supabase.sh` → schema swapped to `prisma/schema.prisma` (PostgreSQL + directUrl)
- `prisma db push` → **13 tables created** in Supabase
- Demo seed + live traffic flowing: users, students, progress, classrooms, assignments all in Supabase
- **RLS deny-by-default enabled on all 13 tables** — anon/authenticated REST access returns empty; the app's privileged server connection is unaffected
- Note: the sandbox exports a stale `DATABASE_URL` globally; the dev server must be started with `set -a && . ./.env && set +a` so the Supabase URL wins. In production (Vercel etc.) set the env vars in the dashboard — no such issue.

### 1.2-A Get the Session pooler URL (DIRECT_URL, port 5432) — ✅ DONE
`postgresql://postgres.ydrulncrxftkisnlvgyt:[YOUR-PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres`

### 1.2-B Get the Transaction pooler URL (DATABASE_URL, port 6543) — ✅ DONE
`postgresql://postgres.ydrulncrxftkisnlvgyt:[YOUR-PASSWORD]@aws-0-us-west-2.pooler.supabase.com:6543/postgres` + `?pgbouncer=true&connection_limit=1` (script appends automatically)

### 1.2-C Database password — ✅ DONE
Provided; stored only in the gitignored `.env` and consumed by the migration script.

---

## 1. What to create in the Supabase dashboard

### 1.1 Project
- [ ] **New project** → name `bright-minds`, pick the region closest to your users (e.g. `us-east-1` / `eu-west-2`).
- [ ] Set a strong **database password** — you'll need it in every connection string below.
- [ ] Plan: the **Free tier** is enough to start (500 MB DB, 1 GB storage, 2 projects).

### 1.2 The values I need back from you (Project Settings → API + Database)
| # | Value | Where in Supabase | Used for |
| --- | --- | --- | --- |
| 1 | **Project URL** (`https://<ref>.supabase.co`) | Settings → API | only if we later use supabase-js / storage / realtime |
| 2 | **anon public key** | Settings → API → Project API keys | client-side features (optional) |
| 3 | **service_role key** ⚠️ | Settings → API → Project API keys | optional server-side tasks (storage admin). **Never** goes in the repo or the browser |
| 4 | **Session pooler string** (port **5432**) | Settings → Database → Connection string → *Session pooler* | `DIRECT_URL` — Prisma migrations / `db push` |
| 5 | **Transaction pooler string** (port **6543**) | Settings → Database → Connection string → *Transaction pooler* | `DATABASE_URL` — the running app |
| 6 | **Database password** | set by you at project creation | embedded in the strings above |

> 🔒 Send items 1–5 through a secure channel (or set them directly as env vars in your host, e.g. Vercel → Settings → Environment Variables). The `service_role` key bypasses Row Level Security — treat it like a root password.

### 1.3 Nothing else is strictly required
The app's tables are created **by Prisma**, not by hand. But while you're in the dashboard, recommended one-click extras:

- [ ] **Storage bucket** `exports` (private) — only if you want generated report PDFs stored server-side instead of printed client-side.
- [ ] **Daily backups** — paid plans only; on Free tier the included 7-day point-in-time recovery is fine for a demo.
- [ ] *(Optional)* **Auth providers** — see §4 if you ever want Supabase Auth instead of the built-in custom auth.

---

## 2. What I (the developer) will change in the code

Already prepared in this repo — only the connection strings are missing:

| File | Status |
| --- | --- |
| `prisma/schema.supabase.prisma` | ✅ Ready-made Postgres twin of the schema (`provider = "postgresql"` + `directUrl`). When migrating: `cp prisma/schema.supabase.prisma prisma/schema.prisma` |
| `.env.example` | ✅ Documents both `DATABASE_URL` (pooler, pgbouncer) and `DIRECT_URL` |
| `src/lib/db.ts` | ✅ No change needed — reads `env("DATABASE_URL")` |

Migration commands (run once the env vars exist):

```bash
cp prisma/schema.supabase.prisma prisma/schema.prisma
npx prisma db push          # creates all tables in Supabase Postgres
npx prisma generate         # regenerate the Postgres client
# then seed demo data:
curl -X POST https://<your-app>/api/auth/demo-seed
```

---

## 3. Connection-string details (the part people get wrong)

Supabase sits behind **Supavisor** connection pooling. Prisma needs *different* endpoints for runtime vs migrations:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // Transaction pooler :6543 — serverless-friendly
  directUrl = env("DIRECT_URL")     // Session pooler :5432 — migrations
}
```

- **Runtime (`DATABASE_URL`, port 6543):** append `?pgbouncer=true&connection_limit=1` — required so Prisma works behind PgBouncer-style transaction pooling in serverless environments (Vercel/Lambda), where each function instance must not hold a persistent Postgres connection.
- **Migrations (`DIRECT_URL`, port 5432):** a plain session connection. Prisma requires this because migrations/`db push` need prepared statements that transaction pooling can't do.
- Replace `[YOUR-PASSWORD]` in both strings, and URL-encode special characters.

### Serverless deployment target
The app deploys as-is to **Vercel** (or any Node host):
- All DB access is already server-side (API routes) → no CORS/RLS exposure.
- Set the same env vars in the dashboard: `DATABASE_URL`, `DIRECT_URL`.
- One caveat for serverless: keep `connection_limit=1` and expect cold starts; if you later see `Too many connections`, upgrade the Supabase plan or add a pool size like `pool_timeout=10`.

---

## 4. Auth — keep the built-in system (recommended) or adopt Supabase Auth?

The current app uses **its own** auth: scrypt-hashed passwords, opaque session tokens in `Session`, role guards (`STUDENT | PARENT | TEACHER | ADMIN`) enforced server-side on every route, plus child **code + PIN** login.

| Option | Effort | Why / why not |
| --- | --- | --- |
| **Keep custom auth on Supabase Postgres** (recommended first step) | ✅ Zero code change — `User` and `Session` tables just live in Postgres | Works today, kids' code+PIN flow is custom anyway |
| **Supabase Auth** (email+password / magic links) | Medium — map `auth.users.id` → `User`, rewrite login/session routes, re-implement student code+PIN on top | Gives you hosted sessions, OAuth, email verification. **Note:** for under-13 students, magic-link email is problematic — children ride the guardian account by design |
| **Supabase Auth + RLS with client queries** | High — needs a full RLS policy set per role | Only worth it if you want direct browser→DB queries. The app intentionally routes everything through server APIs, so RLS is *defence-in-depth*, not required |

If you choose Supabase Auth later, I need from you: the `anon` + `service_role` keys and confirmation of which providers to enable (Email only; disable signups until we wire the parent-approval flow).

---

## 5. Row Level Security (optional but recommended hardening)

Because the app queries exclusively through Prisma **with a privileged server connection**, RLS won't block the app. Adding RLS still protects you against *direct* table access via the Supabase API/SQL editor. Baseline policy set I'll apply:

```sql
-- No anon access to app tables
alter table "User" enable row level security;
alter table "Student" enable row level security;
alter table "Progress" enable row level security;
alter table "ActivityLog" enable row level security;
alter table "Classroom" enable row level security;
alter table "ClassroomStudent" enable row level security;
alter table "Assignment" enable row level security;
alter table "AssignmentResult" enable row level security;
alter table "Notification" enable row level security;
alter table "Goal" enable row level security;
alter table "CustomActivity" enable row level security;
alter table "Session" enable row level security;
alter table "PlatformSetting" enable row level security;
-- (no policies created → deny-by-default for anon/authenticated;
--  the server's privileged connection is unaffected)
```

---

## 6. Post-migration checklist

- [ ] `prisma db push` succeeded against Supabase (tables visible in Supabase Table Editor)
- [ ] Demo seed run → login works for all four roles
- [ ] Teacher assigns → student completes → parent notified (the connected loop) re-verified on Supabase data
- [ ] Env vars set in production host, `.env` **not** committed
- [ ] (Optional) Storage bucket created if storing exports
- [ ] Supabase → Database → Backups understood (PITR on free tier)

---

**TL;DR — the 6 things I need from you in Supabase:** ① project URL ② anon key ③ service_role key ④ session-pooler URL (:5432) ⑤ transaction-pooler URL (:6543) ⑥ DB password — set them as `DATABASE_URL` + `DIRECT_URL` (and the three keys only if enabling supabase-js features), and I'll switch `prisma/schema.supabase.prisma` into place and run the migration.
