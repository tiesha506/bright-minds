"use client";

// ---------------------------------------------------------------------------
// Analytics — distributions, completion rings, reading trend and plain-language
// takeaways, all computed from real classroom data.
// ---------------------------------------------------------------------------

import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import { BarRow, MiniBars, ProgressRing, SparkLine, SUBJECT_COLORS } from "@/components/shared/charts";
import { Loading, ErrorNote, Panel, PageHeader, useFetch } from "@/components/teacher/teacher-ui";
import { SUBJECT_LABELS } from "@/lib/teacher-types";
import type { TeacherOverview, TeacherAssignmentRow } from "@/lib/teacher-types";

export function AnalyticsView({ user }: { user: AuthUser }) {
  void user;
  const overviewReq = useFetch<TeacherOverview>(() => api<TeacherOverview>("/api/teacher/overview"), []);
  const assignmentsReq = useFetch<{ assignments: TeacherAssignmentRow[] }>(
    () => api<{ assignments: TeacherAssignmentRow[] }>("/api/teacher/assignments"),
    []
  );

  const perClassroom = useMemo(() => {
    const map = new Map<string, { name: string; completed: number; total: number; scores: number[] }>();
    for (const a of assignmentsReq.data?.assignments ?? []) {
      const entry = map.get(a.classroomId) ?? { name: a.classroomName, completed: 0, total: 0, scores: [] };
      entry.total += a.targetCount;
      entry.completed += a.completedCount;
      if (a.avgScore !== null) entry.scores.push(a.avgScore);
      map.set(a.classroomId, entry);
    }
    return Array.from(map.entries());
  }, [assignmentsReq.data]);

  const takeaways = useMemo(() => {
    const o = overviewReq.data;
    if (!o) return [];
    const list: string[] = [];

    const scored = o.subjectAverages.filter((s) => s.avg !== null) as { subjectId: string; avg: number }[];
    if (scored.length > 0) {
      const best = scored.reduce((a, b) => (b.avg > a.avg ? b : a));
      const worst = scored.reduce((a, b) => (b.avg < a.avg ? b : a));
      list.push(
        `${SUBJECT_LABELS[best.subjectId] ?? best.subjectId} is your strongest subject this term (${best.avg}% average).`
      );
      if (best.subjectId !== worst.subjectId) {
        list.push(
          `${SUBJECT_LABELS[worst.subjectId] ?? worst.subjectId} needs attention — the class average is ${worst.avg}%. Consider a small-group re-teach or a differentiated worksheet for the bottom group.`
        );
      }
    }

    const bigBucket = [...o.distribution].sort((a, b) => b.value - a.value)[0];
    if (bigBucket && bigBucket.value > 0) {
      list.push(`Most quiz scores land in the ${bigBucket.label} band (${bigBucket.value} scores).`);
    }

    if (o.assignmentCompletionPct > 0) {
      list.push(
        o.assignmentCompletionPct >= 80
          ? `Assignment completion is healthy at ${o.assignmentCompletionPct}%.`
          : `Only ${o.assignmentCompletionPct}% of assigned work is complete — a deadline reminder or in-class catch-up slot may help.`
      );
    }

    const trend = o.readingTrend.filter((t) => t.value > 0);
    if (trend.length >= 2) {
      const first = trend[0].value;
      const last = trend[trend.length - 1].value;
      if (last > first) list.push(`Reading scores are trending up (${first}% → ${last}% over recent weeks).`);
      else if (last < first) list.push(`Reading scores dipped slightly (${first}% → ${last}%). The Reading Support plans target exactly this.`);
      else list.push(`Reading scores are holding steady around ${last}%.`);
    }

    if (o.studentsNeedingSupport > 0) {
      list.push(
        `${o.studentsNeedingSupport} student${o.studentsNeedingSupport === 1 ? "" : "s"} need support right now — check the Dashboard list or open Reading Support for ready-made plans.`
      );
    } else if (o.totalStudents > 0) {
      list.push("No students are currently below the support threshold. Keep the momentum!");
    }

    return list;
  }, [overviewReq.data]);

  const o = overviewReq.data;

  return (
    <div className="space-y-5" data-tour="analytics">
      <PageHeader
        emoji="📊"
        title="Analytics"
        subtitle="Class and subject trends computed from real quiz, assignment and activity data."
      />

      {overviewReq.loading && <Loading />}
      {overviewReq.error && <ErrorNote message={overviewReq.error} />}

      {o && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Quiz performance distribution" subtitle="All quiz scores across your classrooms">
              <MiniBars data={o.distribution} color="#0d9488" height={140} />
              <p className="mt-2 text-xs text-slate-400">
                Class quiz average: <strong>{o.quizAverage ?? "—"}%</strong> · Reading average:{" "}
                <strong>{o.readingAvg ?? "—"}%</strong>
              </p>
            </Panel>

            <Panel title="Reading trend" subtitle="Average reading score, week by week">
              <SparkLine
                points={o.readingTrend.map((t) => t.value)}
                color="#8b5cf6"
                height={110}
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                {o.readingTrend.map((t) => (
                  <span key={t.label}>{t.label}</span>
                ))}
              </div>
            </Panel>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Subject performance" subtitle="Average score per subject">
              <div className="space-y-3">
                {o.subjectAverages.map((s) => (
                  <BarRow
                    key={s.subjectId}
                    label={SUBJECT_LABELS[s.subjectId] ?? s.subjectId}
                    value={s.avg ?? 0}
                    color={SUBJECT_COLORS[s.subjectId]}
                  />
                ))}
              </div>
            </Panel>

            <Panel
              title="Assignment completion"
              subtitle={assignmentsReq.loading ? "Loading assignments…" : "Share of assigned work completed"}
            >
              {perClassroom.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">
                  No assignments yet — completion rings appear once work is set.
                </p>
              ) : (
                <div className="flex flex-wrap items-center justify-around gap-4">
                  {perClassroom.map(([id, c]) => {
                    const pct = c.total === 0 ? 0 : Math.round((c.completed / c.total) * 100);
                    const avg =
                      c.scores.length === 0
                        ? null
                        : Math.round(c.scores.reduce((a, b) => a + b, 0) / c.scores.length);
                    return (
                      <div key={id} className="flex flex-col items-center gap-1">
                        <ProgressRing value={pct} color="#10b981" size={92} label={c.name} />
                        <p className="max-w-32 truncate text-xs font-bold text-slate-700">{c.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {c.completed}/{c.total} done{avg !== null ? ` · avg ${avg}%` : ""}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>
          </div>

          <Panel title="Weekly learning minutes" subtitle="All students, last 7 days">
            <MiniBars data={o.weeklyMinutes} color="#10b981" suffix="m" height={130} />
          </Panel>

          <Panel title="Takeaways" subtitle="Plain-language reads on the data">
            <ul className="space-y-2">
              {takeaways.map((t) => (
                <li key={t} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </>
      )}
    </div>
  );
}
