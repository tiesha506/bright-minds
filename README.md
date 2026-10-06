# 🧠 BrightMinds

**A personalised learning platform for students aged 6–15** — with connected experiences for **Students**, **Parents**, **Teachers** and **Administrators**.

BrightMinds adapts its tone, visuals and content difficulty to four age groups (Early 6–8, Primary 9–11, Intermediate 12–13, Teen 14–15) across four subjects: **Math • English • Science • Reading** (108 built-in lessons).

---

## ✨ What's inside

### 🎒 Student platform
- Three-step onboarding (name → age → themed avatar) with pink / blue / neutral theme skins
- 108 lessons across 4 subjects, each with reading sections, vocabulary cards, quizzes (with misconception feedback), printable worksheets, and challenge tasks
- **Strategy Lab** in Math — the same problem solved multiple ways (standard algorithm, visual models, number line, step-by-step)
- Printable worksheet hub with 5-dimension filtering, answer keys and print/PDF support
- Practice Zone, Daily Challenge, Achievements (subject badges), Progress with streaks, age-aware search (Ctrl/⌘+K)
- **Learning Helper** — a Socratic AI tutor that never gives direct answers
- **My Assignments** — receives work assigned by teachers
- Emoji avatar picker (16 avatars × 6 colours) — privacy-safe, no photo uploads

### 👪 Parent platform
- Multi-child management (add children, share their 6-char login code + PIN)
- Per-child overview: subject progress bars, weekly learning minutes, streak, strengths & growth areas
- Data-driven "How you can support …" recommendations
- Progress reports (daily / weekly / monthly) with plain-language charts — no education jargon
- Learning goals (daily minutes, weekly lesson target, priority subjects)
- Smart, deduplicated notifications (completions, score improvements, suggestions)
- Printable / PDF progress reports

### 👩‍🏫 Teacher platform
- Class overview with live stats (students, average progress, completion rate, students needing support)
- Classroom management: create classes, add students (auto-generates login codes), organise into **differentiated groups** (labels never shown to students)
- Assignment builder: subject, lesson, level, difficulty, question count, due date, instructions — whole class, a group, or a selection of students
- **Content Creator** — build custom lessons, worksheets, quizzes and reading passages (draft → assign)
- **Teacher Helper** — AI assistant that generates age-appropriate worksheets / quizzes / explanations as *editable drafts* the teacher approves before assigning
- **Reading Support** — identifies students needing reading intervention by skill (vocabulary, fluency, comprehension, inference…) with ready-made activity chains
- Class & student reports with print / PDF export

### 🛡 Admin console
- Platform stats, user management (role changes, deletions with cascade protection), classroom & content overviews, analytics, permissions matrix, and a live registration open/close toggle enforced at signup

### 🔗 The connected loop
Teacher assigns a fractions worksheet → student completes it in their dashboard → result is recorded → teacher's analytics update → parent receives a notification → system recommends targeted practice. One source of truth, four tailored views.

---

## 🧰 Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) + Lucide icons |
| Animation | framer-motion |
| Database | Prisma ORM — SQLite locally, PostgreSQL (Supabase) ready — see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) |
| Auth | Custom session-token auth (scrypt hashing) with role guards: STUDENT / PARENT / TEACHER / ADMIN |
| State | Zustand stores + typed `api()` fetch helper with Bearer sessions |
| AI | Server-side LLM SDK for Learning Helper (student) & Teacher Helper |

## 🚀 Getting started

```bash
bun install                # or npm install
cp .env.example .env       # defaults to a local SQLite file
bun run db:push            # create the database schema
bun run dev                # http://localhost:3000
```

### Demo accounts
Visit `/` and open the demo panel (or `POST /api/auth/demo-seed`) to seed sample data:

| Role | Credentials |
| --- | --- |
| Parent | `parent@demo.com` / `demo1234` |
| Teacher | `teacher@demo.com` / `demo1234` |
| Admin | `admin@brightminds.app` / `admin1234` |
| Student | login code `DEMO-2026`, PIN `8246` |

### Useful scripts
```bash
bun run lint       # ESLint
bunx tsc --noEmit  # type-check
bun run db:push    # sync Prisma schema
```

## 📁 Project layout

```
src/
  app/                 # App Router: page.tsx (role-routing shell) + /api routes
    api/               # auth, student, parent, teacher, admin, progress, activity
  components/
    learning/          # student experience (lessons, quizzes, worksheets, onboarding)
    parent/            # parent dashboard sections
    teacher/           # teacher dashboard sections
    admin/             # admin console sections
    site/              # public marketing site + auth dialogs
    shared/            # charts, avatar, cross-role UI
    ui/                # shadcn/ui primitives
  lib/
    content/           # 108 lessons: 4 subjects × 4 age groups + types
    server/auth.ts     # sessions, scrypt hashing, role guards
    *-store.ts         # Zustand client stores
prisma/schema.prisma   # data model (SQLite; Postgres twin in schema.supabase.prisma)
```

## 🔐 Privacy by design

Built for young children: no photo uploads (emoji avatars only), child accounts ride a guardian account with code+PIN login, parents see learning data only (never private conversations), teachers see only students in their classrooms, and all role boundaries are enforced **server-side** on every API route.

## ☁️ Going serverless

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for the exact checklist of what to create in Supabase and how the data layer migrates from SQLite to PostgreSQL.
