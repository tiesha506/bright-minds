# ☁️ Supabase Setup Guide — making BrightMinds serverless

This document is the exact checklist of **what to create in Supabase** and **what to hand back to the developer**, so the app's data layer moves from the local SQLite file to Supabase Postgres with no code rewrites.

The app already talks to the database exclusively through **server-side Prisma** (`src/lib/db.ts`) behind Next.js API routes — so swapping SQLite → Supabase Postgres is a *provider + connection-string change*, not a refactor.

---

## 0. Live status

Project ref: **`ydrulncrxftkisnlvgyt`** → `https://ydrulncrxftkisnlvgyt.supabase.co`

| Item | Status | Notes |
| --- | --- | --- |
| ① Project URL | ✅ received & verified | project live, Auth service healthy |
| ② anon key | ✅ received & verified | tested against REST: auth passes (`PGRST205` = tables not yet created, as expected) |
| ③ service_role key | ✅ received | stored **only** in gitignored `.env`; never committed |
| ④ Session pooler URL (:5432) | ⏳ **pending** | see §1.2-A below |
| ⑤ Transaction pooler URL (:6543) | ⏳ **pending** | see §1.2-B below |
| ⑥ DB password | ⏳ **pending** | see §1.2-C below |

> Once ④⑤⑥ arrive: `cp prisma/schema.supabase.prisma prisma/schema.prisma` → set the two env vars → `npx prisma db push` → seed. Done.

### 1.2-A Get the Session pooler URL (DIRECT_URL, port 5432)
1. Open **https://supabase.com/dashboard/project/ydrulncrxftkisnlvgyt/settings/database**
2. Scroll to **"Connect to your database"** / **Connection string**.
3. Click the **Session pooler** tab (it shows port **`5432`**).
4. Copy the URI — it looks like
   `postgresql://postgres.ydrulncrxftkisnlvgyt:[YOUR-PASSWORD]@aws-0-XX-XXXX-N.pooler.supabase.com:5432/postgres`

### 1.2-B Get the Transaction pooler URL (DATABASE_URL, port 6543)
1. Same page, click the **Transaction pooler** tab (port **`6543`**).
2. Copy that URI (same shape, port 6543). This one gets `?pgbouncer=true&connection_limit=1` appended — I'll handle that.

### 1.2-C Database password
- The password was chosen when the project was created. If you don't remember it, on the same Database settings page click **"Reset database password"**, generate one, **copy it immediately** (it's shown once), and use it in both URLs from ① and ②.
- Then just paste me: **the two URIs as-is** (with `[YOUR-PASSWORD]` still in them is fine, plus the password separately) — or the two URIs with the password already filled in. I'll do the rest.

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
