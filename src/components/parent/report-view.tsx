"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/shared/avatar";
import {
  BarRow,
  MiniBars,
  SparkLine,
  SUBJECT_COLORS,
} from "@/components/shared/charts";
import type { ReportResponse } from "@/lib/parent-types";
import { fmtDate, levelLabel, levelRange } from "./parent-ui";

// ---------------------------------------------------------------------------
// ReportView — the printable report body, shared by Child Progress (weekly /
// monthly tabs) and Reports (print / download PDF).
// ---------------------------------------------------------------------------

export function ReportView({ data }: { data: ReportResponse }) {
  const { profile } = data;
  const rangeLabel = data.range === "week" ? "Past week" : "Past month";

  return (
    <div className="space-y-6 print-full">
      {/* ----------------------------- header ------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <Avatar avatar={profile.avatar} color={profile.avatarColor} photoUrl={profile.photoUrl} size="lg" />
          <div>
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              {profile.name} — Learning Report
            </h2>
            <p className="text-sm text-muted-foreground">
              Age {profile.age} · {levelLabel(profile.ageGroup)} ({levelRange(profile.ageGroup)})
            </p>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">{rangeLabel}</p>
          <p>
            {fmtDate(data.rangeStart)} – {fmtDate(data.rangeEnd)}
          </p>
          <p>Created {fmtDate(data.generatedAt)}</p>
        </div>
      </div>

      {/* ---------------------------- summary ------------------------------ */}
      <section aria-label="Summary" className="rounded-2xl bg-amber-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800">
          The story so far
        </h3>
        {data.summary.map((sentence, i) => (
          <p key={i} className="mt-1.5 text-sm leading-relaxed text-amber-950">
            {sentence}
          </p>
        ))}
      </section>

      {/* ------------------------- subject progress ------------------------ */}
      <section aria-label="Subject performance">
        <h3 className="mb-3 text-lg font-bold">Subject performance</h3>
        <div className="space-y-3.5">
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
        </div>
      </section>

      <Separator />

      {/* --------------------------- time spent ---------------------------- */}
      <section aria-label="Time spent learning">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold">Time spent learning</h3>
          <p className="text-sm text-muted-foreground">
            {data.totalMinutes} minutes total · {data.streakDays} day
            {data.streakDays === 1 ? "" : "s"} streak 🔥
          </p>
        </div>
        <MiniBars
          data={data.minutesPerDay.map((d) => ({ label: d.day, value: d.minutes }))}
          color="#10b981"
          suffix="m"
          height={data.minutesPerDay.length > 10 ? 120 : 140}
        />
      </section>

      <Separator />

      {/* --------------------------- quiz results -------------------------- */}
      <section aria-label="Quiz results">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold">Quiz results</h3>
          <p className="text-sm text-muted-foreground">
            Overall average: {data.quizAverage !== null ? `${data.quizAverage}%` : "—"}
          </p>
        </div>
        {data.quizResults.length === 0 ? (
          <p className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
            No quizzes in this period yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.quizResults.map((q, i) => (
              <li
                key={`${q.lessonId}-${i}`}
                className="flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="text-lg" aria-hidden>
                    {q.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{q.lessonTitle}</p>
                    <p className="text-xs text-muted-foreground">{fmtDate(q.date)}</p>
                  </div>
                </div>
                <Badge
                  className={
                    q.score >= 80
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      : q.score >= 60
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : "bg-rose-100 text-rose-800 hover:bg-rose-100"
                  }
                >
                  {q.score}%
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Separator />

      {/* --------------------- skills mastered / practice ------------------- */}
      <section aria-label="Skills" className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2.5 text-lg font-bold">🌟 Skills mastered</h3>
          {data.skillsMastered.length === 0 ? (
            <p className="rounded-xl bg-muted/50 p-3.5 text-sm text-muted-foreground">
              None yet — the first 80%+ quiz will land here.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {data.skillsMastered.slice(0, 8).map((s, i) => (
                <li
                  key={`${s.lessonId}-${i}`}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900"
                >
                  {s.emoji} {s.lessonTitle} · {s.score}%
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="mb-2.5 text-lg font-bold">🎯 Still working on</h3>
          {data.skillsNeedingPractice.length === 0 ? (
            <p className="rounded-xl bg-muted/50 p-3.5 text-sm text-muted-foreground">
              Nothing stuck right now — every quiz so far is 80% or higher!
            </p>
          ) : (
            <ul className="space-y-2">
              {data.skillsNeedingPractice.slice(0, 4).map((s, i) => (
                <li
                  key={`${s.lessonId}-${i}`}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
                >
                  <span aria-hidden>{s.emoji}</span> {s.lessonTitle} — scored {s.score}%. A quick
                  re-read and second quiz attempt usually helps.
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Separator />

      {/* -------------------------- reading + extras ------------------------- */}
      <section aria-label="Reading and practice" className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2.5 text-lg font-bold">📖 Reading development</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            {data.readingAvg !== null
              ? `Average ${data.readingAvg}% across ${data.readingScores.length} quiz${data.readingScores.length === 1 ? "" : "zes"}.`
              : "No reading quizzes yet."}
          </p>
          <SparkLine points={data.readingScores} color="#8b5cf6" height={72} />
        </div>
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold">✏️ Worksheets &amp; goals</h3>
          <p className="text-sm text-muted-foreground">
            {data.worksheetsCompleted} worksheet set{data.worksheetsCompleted === 1 ? "" : "s"}{" "}
            completed in total.
          </p>
          <p className="text-sm text-muted-foreground">
            Daily goal: {data.goal.dailyMinutes} minutes · Weekly target:{" "}
            {data.goal.weeklyLessonTarget} lessons.
          </p>
          {data.goal.note && (
            <Card className="rounded-2xl border-rose-200 bg-rose-50/50">
              <CardHeader className="pb-1.5">
                <CardTitle className="text-sm">A note from your parent dashboard</CardTitle>
                <CardDescription className="text-xs">Your own reminder</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-rose-900">{data.goal.note}</CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
