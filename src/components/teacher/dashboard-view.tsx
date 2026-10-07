"use client";

// ---------------------------------------------------------------------------
// Teacher Dashboard — "Class Overview" stat tiles + subject performance +
// weekly minutes + quick links, straight from /api/teacher/overview.
// ---------------------------------------------------------------------------

import { Users, TrendingUp, ClipboardCheck, LifeBuoy, Brain, BookOpen, Flame, Activity } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import { StatTile, BarRow, MiniBars, SUBJECT_COLORS } from "@/components/shared/charts";
import { RemindersPanel } from "@/components/shared/reminders-panel";
import { NotePad } from "@/components/shared/notepad";
import { Loading, ErrorNote, Panel, PageHeader, useFetch } from "@/components/teacher/teacher-ui";
import { SUBJECT_LABELS } from "@/lib/teacher-types";
import type { TeacherNavKey } from "@/lib/teacher-types";
import type { TeacherOverview } from "@/lib/teacher-types";

const QUICK_LINKS: { key: TeacherNavKey; emoji: string; label: string; hint: string }[] = [
  { key: "assignments", emoji: "📝", label: "New assignment", hint: "Set work for a class or group" },
  { key: "helper", emoji: "🤖", label: "Teacher Helper", hint: "Draft worksheets & quizzes with AI" },
  { key: "reading", emoji: "📖", label: "Reading Support", hint: "Skill gaps and 4-step plans" },
  { key: "reports", emoji: "📄", label: "Class report", hint: "Printable parent-friendly summary" },
];

export function DashboardView({
  user,
  onNavigate,
}: {
  user: AuthUser;
  onNavigate: (key: TeacherNavKey) => void;
}) {
  const { data, error, loading } = useFetch<TeacherOverview>(
    () => api<TeacherOverview>("/api/teacher/overview"),
    []
  );

  return (
    <div className="space-y-5" data-tour="dashboard">
      <PageHeader
        emoji="🏠"
        title="Class Overview"
        subtitle="A live snapshot of every student you teach."
      />

      {loading && <Loading />}
      {error && <ErrorNote message={error} />}

      {data && (
        <>
          {/* Headline tiles */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile
              icon={<Users className="h-4 w-4" />}
              label="Students"
              value={data.totalStudents}
              hint={`${data.activeStudents} active this week`}
              className="border-slate-200"
            />
            <StatTile
              icon={<TrendingUp className="h-4 w-4" />}
              label="Average Progress"
              value={`${data.avgClassProgress}%`}
              hint="Mean subject score"
              className="border-slate-200"
            />
            <StatTile
              icon={<ClipboardCheck className="h-4 w-4" />}
              label="Assignments Completed"
              value={`${data.assignmentCompletionPct}%`}
              hint="Across all classrooms"
              className="border-slate-200"
            />
            <StatTile
              icon={<LifeBuoy className="h-4 w-4" />}
              label="Students Needing Support"
              value={data.studentsNeedingSupport}
              hint="Avg score < 60% or inactive"
              className="border-slate-200"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Subject performance */}
            <Panel title="Subject performance" subtitle="Average quiz score per subject">
              <div className="space-y-3">
                {data.subjectAverages.map((s) => (
                  <BarRow
                    key={s.subjectId}
                    label={SUBJECT_LABELS[s.subjectId] ?? s.subjectId}
                    value={s.avg ?? 0}
                    color={SUBJECT_COLORS[s.subjectId]}
                  />
                ))}
                <p className="pt-1 text-xs text-slate-400">
                  {data.quizAverage !== null
                    ? `Class quiz average ${data.quizAverage}% · reading average ${data.readingAvg ?? "—"}%`
                    : "No quiz scores yet — assign a lesson quiz to see data here."}
                </p>
              </div>
            </Panel>

            {/* Weekly minutes */}
            <Panel title="Weekly learning minutes" subtitle="All students, last 7 days">
              <MiniBars data={data.weeklyMinutes} color="#10b981" suffix="m" height={130} />
              <p className="mt-2 text-xs text-slate-400">
                <Flame className="mr-1 inline h-3.5 w-3.5 text-emerald-500" />
                {data.recentMinutes} minutes logged in {data.recentActivityCount} session
                {data.recentActivityCount === 1 ? "" : "s"} this week
              </p>
            </Panel>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Students needing support */}
            <Panel
              title="Students needing support"
              subtitle="Low averages or no learning activity"
              actions={
                <button
                  type="button"
                  onClick={() => onNavigate("reading")}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Reading Support →
                </button>
              }
            >
              {data.supportList.length === 0 ? (
                <p className="py-4 text-center text-sm text-slate-400">
                  Everyone is on track right now 🎉
                </p>
              ) : (
                <ul className="space-y-2">
                  {data.supportList.map((s) => (
                    <li
                      key={s.studentId}
                      className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm"
                    >
                      <LifeBuoy className="h-4 w-4 shrink-0 text-rose-400" />
                      <span className="min-w-0 flex-1 truncate font-semibold">{s.name}</span>
                      <span className="truncate text-xs text-slate-500">{s.reason}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            {/* Quick links + classrooms */}
            <div className="space-y-4">
              <Panel title="Quick links">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUICK_LINKS.map((l) => (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => onNavigate(l.key)}
                      className="rounded-lg border border-slate-200 px-3 py-2.5 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                    >
                      <p className="text-sm font-bold">
                        <span aria-hidden className="mr-1.5">
                          {l.emoji}
                        </span>
                        {l.label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{l.hint}</p>
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel
                title="Your classrooms"
                actions={
                  <button
                    type="button"
                    onClick={() => onNavigate("classrooms")}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Manage →
                  </button>
                }
              >
                {data.classrooms.length === 0 ? (
                  <p className="py-2 text-sm text-slate-400">
                    No classrooms yet — create one in Classrooms.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {data.classrooms.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onNavigate("classrooms")}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300"
                      >
                        <Brain className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
                        {c.name}
                        <span className="inline-flex items-center gap-0.5 text-slate-400">
                          <BookOpen className="h-3 w-3" aria-hidden />
                          {c.studentCount}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                  <Activity className="h-3.5 w-3.5" aria-hidden />
                  Data refreshes every time you open this page.
                </p>
              </Panel>
            </div>
          </div>

          {/* Reminders + Note Pad — personal teacher toolkit. */}
          <div className="grid gap-4 lg:grid-cols-2">
            <RemindersPanel user={user} variant="pro" />
            <NotePad user={user} variant="pro" />
          </div>
        </>
      )}
    </div>
  );
}
