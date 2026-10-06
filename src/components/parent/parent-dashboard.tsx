"use client";

import { useState } from "react";
import {
  BookOpenCheck,
  Flame,
  Puzzle,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/shared/avatar";
import {
  BarRow,
  MiniBars,
  ProgressRing,
  SUBJECT_COLORS,
  StatTile,
} from "@/components/shared/charts";
import { getLesson, type Lesson } from "@/lib/content";
import { api } from "@/lib/api";
import { AGE_GROUPS } from "@/lib/learning-config";
import type { ChildSummary, OverviewResponse, Recommendation } from "@/lib/parent-types";
import { cn } from "@/lib/utils";
import type { ParentSection } from "./parent-app";
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
  SectionHeader,
  fmtDateTime,
  levelLabel,
  useAsync,
} from "./parent-ui";

// ---------------------------------------------------------------------------
// Dashboard — "Alex's Learning Overview": stats, subject bars, insight,
// weekly minutes, tailored support ideas and class assignments.
// ---------------------------------------------------------------------------

export function ParentDashboard({
  child,
  onGo,
}: {
  child: ChildSummary | null;
  onGo: (s: ParentSection) => void;
}) {
  if (!child) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="Dashboard"
          subtitle="Your child's learning, at a friendly glance."
        />
        <EmptyState
          icon="🧒"
          title="No children added yet"
          detail="Add your first child to see their learning overview, progress and ideas for how you can help."
          action={
            <Button onClick={() => onGo("children")} className="rounded-full bg-rose-500 hover:bg-rose-600">
              + Add your first child
            </Button>
          }
        />
      </div>
    );
  }

  return <DashboardWithData key={child.id} child={child} onGo={onGo} />;
}

function DashboardWithData({ child, onGo }: { child: ChildSummary; onGo: (s: ParentSection) => void }) {
  const { data, error, loading, reload } = useAsync<OverviewResponse>(
    () => apiFetchOverview(child.id),
    [child.id]
  );
  const [lessonDialog, setLessonDialog] = useState<{ rec: Recommendation; lesson: Lesson } | null>(
    null
  );

  if (loading) return <PageSkeleton />;
  if (error || !data) {
    return <ErrorState message={error ?? undefined} onRetry={reload} />;
  }

  const { profile } = data;
  const level = AGE_GROUPS[profile.ageGroup as keyof typeof AGE_GROUPS];
  const weekTotal = data.weeklyMinutes.reduce((n, d) => n + d.minutes, 0);
  const firstName = profile.name;

  // Plain-language insight built from real subject averages.
  const scored = data.subjectProgress.filter((s): s is typeof s & { avgScore: number } => s.avgScore !== null);
  const best = scored.length > 0 ? scored.reduce((a, b) => (b.avgScore > a.avgScore ? b : a)) : null;
  const worst = scored.length > 0 ? scored.reduce((a, b) => (b.avgScore < a.avgScore ? b : a)) : null;
  let insight: string;
  if (best && worst && best.subjectId !== worst.subjectId && worst.avgScore < 80) {
    insight = `${firstName} is doing well in ${best.label}. ${worst.label} is an area where additional practice may help.`;
  } else if (best) {
    insight = `${firstName} is doing really well across subjects — an average of ${best.avgScore}% in ${best.label} is something to celebrate!`;
  } else {
    insight = `${firstName} hasn't finished any quizzes yet. Trying the first lesson together is a great way to begin.`;
  }

  return (
    <div className="space-y-6">
      {/* ------------------------------ hero ------------------------------ */}
      <section
        aria-labelledby="child-overview-title"
        className="relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-6 sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/50"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center gap-4 sm:gap-5">
          <Avatar avatar={profile.avatar} color={profile.avatarColor} photoUrl={profile.photoUrl} size="xl" />
          <div className="min-w-0 flex-1">
            <h1 id="child-overview-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {firstName}&apos;s Learning Overview
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-amber-900/80">
              <span>Age {profile.age}</span>
              <span aria-hidden>·</span>
              <span>
                {level?.emoji} {levelLabel(profile.ageGroup)}
              </span>
              <span aria-hidden>·</span>
              <span>{profile.xp} XP</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => onGo("progress")}
              className="rounded-full border-amber-300 bg-white/70 hover:bg-white"
            >
              <TrendingUp className="h-4 w-4" aria-hidden /> Progress detail
            </Button>
            <Button
              variant="outline"
              onClick={() => onGo("reports")}
              className="rounded-full border-amber-300 bg-white/70 hover:bg-white"
            >
              📄 Report
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------- stat tiles ---------------------------- */}
      <section aria-label="Key numbers this week">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-4">
            <ProgressRing value={data.overallPct} size={76} color="#f59e0b" label="Overall progress" />
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Overall
            </p>
          </div>
          <StatTile
            icon={<TrendingUp className="h-4 w-4" aria-hidden />}
            label="This week"
            value={`${weekTotal} min`}
            hint={
              data.weeklyDelta === 0
                ? "Same as last week"
                : data.weeklyDelta > 0
                  ? `+${data.weeklyDelta} min vs last week`
                  : `${data.weeklyDelta} min vs last week`
            }
            className="border-emerald-200 bg-emerald-50/50"
          />
          <StatTile
            icon={<BookOpenCheck className="h-4 w-4" aria-hidden />}
            label="Lessons done"
            value={data.lessonsCompleted}
            hint={`${data.lessonsThisWeek} this week`}
            className="border-rose-200 bg-rose-50/40"
          />
          <StatTile
            icon={<Puzzle className="h-4 w-4" aria-hidden />}
            label="Worksheets"
            value={data.worksheetsCompleted}
            hint="Printable practice sets"
          />
          <StatTile
            icon={<Trophy className="h-4 w-4" aria-hidden />}
            label="Quiz average"
            value={data.quizAverage !== null ? `${data.quizAverage}%` : "—"}
            hint={data.quizAverage !== null ? "Across all subjects" : "No quizzes yet"}
            className="border-violet-200 bg-violet-50/40"
          />
          <StatTile
            icon={<Flame className="h-4 w-4" aria-hidden />}
            label="Streak"
            value={`${data.streakDays} ${data.streakDays === 1 ? "day" : "days"}`}
            hint="Learning days in a row 🔥"
            className="border-orange-200 bg-orange-50/50"
          />
        </div>
      </section>

      {/* ------------------- subjects + weekly minutes ---------------------- */}
      <section aria-label="Subject progress and learning time" className="grid gap-6 lg:grid-cols-5">
        <Card className="rounded-2xl lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Subject progress</CardTitle>
            <CardDescription>Average quiz score in each subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.subjectProgress.map((s) => (
              <div key={s.subjectId}>
                <BarRow
                  label={`${s.emoji} ${s.label}`}
                  value={s.avgScore ?? 0}
                  color={SUBJECT_COLORS[s.subjectId] ?? SUBJECT_COLORS.math}
                />
                <p className="ml-[104px] mt-1 text-xs text-muted-foreground">
                  {s.avgScore === null
                    ? "No quizzes yet"
                    : `${s.lessonsDone} of ${s.lessonsTotal} lessons started`}
                </p>
              </div>
            ))}
            <Separator />
            <p className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
              <Sparkles className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden />
              {insight}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Learning time</CardTitle>
            <CardDescription>Minutes per day — last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniBars
              data={data.weeklyMinutes.map((d) => ({ label: d.day, value: d.minutes }))}
              color="#f59e0b"
              suffix="m"
              height={140}
            />
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-muted/60 p-2.5">
                <p className="text-lg font-extrabold tabular-nums">{data.monthlyMinutes}</p>
                <p className="text-xs text-muted-foreground">minutes this month</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-2.5">
                <p className="text-lg font-extrabold tabular-nums">
                  {data.todayMinutes}/{data.goal.dailyMinutes}
                </p>
                <p className="text-xs text-muted-foreground">today vs daily goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------ support suggestions ----------------------- */}
      <section aria-label="How you can support your child">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">How You Can Support {firstName}</CardTitle>
            <CardDescription>Small, friendly ideas based on real progress</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {data.recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border bg-gradient-to-br from-white to-rose-50/50 p-4"
              >
                <span className="text-2xl" aria-hidden>
                  {rec.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug">{rec.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{rec.detail}</p>
                  {rec.subjectId && rec.lessonId && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2.5 rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                      onClick={() => {
                        const lesson = getLesson(rec.subjectId as string, rec.lessonId as string);
                        if (lesson) setLessonDialog({ rec, lesson });
                      }}
                    >
                      Open lesson preview
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ---------------------------- assignments --------------------------- */}
      <section aria-label="Class assignments">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Class assignments</CardTitle>
            <CardDescription>Set by {firstName}&apos;s teacher</CardDescription>
          </CardHeader>
          <CardContent>
            {data.assignments.length === 0 ? (
              <p className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                No class assignments yet — when a teacher sets work, it will appear here.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {data.assignments.map((a, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{a.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.classroomName} · {a.type}
                        {a.dueDate ? ` · due ${a.dueDate}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {a.score !== null && (
                        <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-100">
                          {a.score}%
                        </Badge>
                      )}
                      <Badge
                        className={cn(
                          a.status === "completed"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        )}
                      >
                        {a.status === "completed" ? "✅ Completed" : "📌 To do"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      {/* --------------------------- lesson dialog -------------------------- */}
      <Dialog open={lessonDialog !== null} onOpenChange={(open) => !open && setLessonDialog(null)}>
        <DialogContent className="rounded-3xl sm:max-w-lg">
          {lessonDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <span aria-hidden>{lessonDialog.lesson.emoji}</span>
                  {lessonDialog.lesson.title}
                </DialogTitle>
                <DialogDescription>
                  {lessonDialog.lesson.minutes} minute lesson · part of{" "}
                  {levelLabel(lessonDialog.lesson.id.split("-")[1])}
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
                <p className="rounded-2xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
                  {lessonDialog.lesson.intro}
                </p>
                <div>
                  <p className="mb-1.5 text-sm font-bold">What&apos;s inside</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {lessonDialog.lesson.sections.map((sec, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{sec.heading}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {lessonDialog.lesson.quiz.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Includes a {lessonDialog.lesson.quiz.length}-question quiz and a printable
                    worksheet — plus a fun fact about {lessonDialog.lesson.title.toLowerCase()}.
                  </p>
                )}
                <p className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-900">
                  💡 Open BrightMinds on {firstName}&apos;s device and pick{" "}
                  <strong>{lessonDialog.lesson.title}</strong> from{" "}
                  {lessonDialog.rec.subjectId
                    ? SUBJECT_NAME[lessonDialog.rec.subjectId] ?? "the subject list"
                    : "the subject list"}
                  .
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended for {firstName} · added {fmtDateTime(new Date().toISOString())}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const SUBJECT_NAME: Record<string, string> = {
  math: "Mathematics",
  english: "English",
  science: "Science",
  reading: "Reading",
};

function apiFetchOverview(childId: string): Promise<OverviewResponse> {
  return api<OverviewResponse>(`/api/parent/overview/${encodeURIComponent(childId)}`);
}
