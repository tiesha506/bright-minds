"use client";

// ---------------------------------------------------------------------------
// Reading Support — flagged students with 4-step recommended activity plans
// (real registry lessons) plus a whole-roster skill-gap table.
// ---------------------------------------------------------------------------

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight, BookOpenCheck } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import {
  Loading,
  ErrorNote,
  EmptyState,
  Panel,
  PageHeader,
  ScoreChip,
  GroupChip,
  useFetch,
} from "@/components/teacher/teacher-ui";
import type { ReadingSupportResponse, ReadingSupportEntry, RecommendStep } from "@/lib/teacher-types";

const STEP_ICONS: Record<string, string> = {
  reading: "📖",
  lesson: "📘",
  worksheet: "📝",
  quiz: "🧠",
};

const STEP_LABELS: Record<string, string> = {
  reading: "Passage",
  lesson: "Skill lesson",
  worksheet: "Worksheet",
  quiz: "Quiz",
};

function skillSentence(skill: string): string {
  const s = skill.toLowerCase();
  return `may benefit from additional practice with ${s}`;
}

function RecommendedPlan({ steps }: { steps: RecommendStep[] }) {
  return (
    <ol className="space-y-1.5">
      {steps.map((step) => (
        <li
          key={step.step}
          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/70 px-2.5 py-1.5 text-sm"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-extrabold text-white">
            {step.step}
          </span>
          <span aria-hidden>{STEP_ICONS[step.type] ?? "📌"}</span>
          <span className="min-w-0 flex-1 truncate font-medium text-slate-700">{step.title}</span>
          <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
            {STEP_LABELS[step.type] ?? step.type}
          </span>
          {step.lessonId && (
            <span className="hidden font-mono text-[10px] text-slate-300 sm:inline">{step.lessonId}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

function FlaggedCard({ entry }: { entry: ReadingSupportEntry }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <BookOpenCheck className="h-5 w-5 text-amber-600" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900">{entry.name}</p>
        <GroupChip group={entry.groupName} />
        <ScoreChip value={entry.readingAvg} label="Reading" />
      </div>
      <p className="mt-2 text-sm text-amber-800">
        <strong>{entry.name}</strong> {skillSentence(entry.weakestSkill.skill)}
        {entry.weakestSkill.score !== null
          ? ` — weakest score ${entry.weakestSkill.score}% on “${entry.weakestSkill.skill}”.`
          : " — this skill has not been attempted yet."}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">{entry.classroomName}</p>

      <p className="mb-1.5 mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">
        Recommended 4-step plan
      </p>
      <RecommendedPlan steps={entry.recommended} />

      <div className="mt-3 flex flex-wrap gap-1.5">
        {entry.skills.map((s) => (
          <span
            key={s.lessonId}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
              s.score === null
                ? "bg-slate-50 text-slate-500 ring-slate-200"
                : s.score < 50
                  ? "bg-rose-50 text-rose-700 ring-rose-200"
                  : s.score < 65
                    ? "bg-amber-50 text-amber-800 ring-amber-200"
                    : "bg-emerald-50 text-emerald-700 ring-emerald-200"
            }`}
            title={s.lessonId}
          >
            {s.skill}: {s.score === null ? "not yet" : `${s.score}%`}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReadingSupportView({ user }: { user: AuthUser }) {
  void user;
  const { data, error, loading } = useFetch<ReadingSupportResponse>(
    () => api<ReadingSupportResponse>("/api/teacher/reading-support"),
    []
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="📖"
        title="Reading Support"
        subtitle="Reading-skill analysis per student. Flagged = reading average below 65% or any reading quiz below 50%."
      />

      {loading && <Loading />}
      {error && <ErrorNote message={error} />}

      {data && (
        <>
          <Panel
            title={`Flagged students (${data.flagged.length})`}
            subtitle="Each card includes a ready-to-teach 4-step plan built from real BrightMinds reading lessons."
          >
            {data.flagged.length === 0 ? (
              <EmptyState
                title="No flagged students"
                hint="Every reader is above the support thresholds right now."
              />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {data.flagged.map((entry) => (
                  <FlaggedCard key={entry.studentId} entry={entry} />
                ))}
              </div>
            )}
          </Panel>

          <Panel title={`All readers (${data.all.length})`} subtitle="Weakest comprehension skill per student" bodyClassName="p-0">
            {data.all.length === 0 ? (
              <EmptyState title="No students yet" hint="Enrol students to see reading analytics." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-4 py-2.5 font-bold">Student</th>
                      <th className="px-3 py-2.5 font-bold">Classroom</th>
                      <th className="px-3 py-2.5 font-bold">Reading avg</th>
                      <th className="px-3 py-2.5 font-bold">Weakest skill</th>
                      <th className="px-3 py-2.5 font-bold">Score</th>
                      <th className="px-2 py-2.5" aria-label="Expand" />
                    </tr>
                  </thead>
                  <tbody>
                    {data.all.map((entry) => (
                      <Fragment key={entry.studentId}>
                        <tr
                          className="cursor-pointer border-b border-slate-50 hover:bg-emerald-50/40"
                          onClick={() =>
                            setExpanded(expanded === entry.studentId ? null : entry.studentId)
                          }
                        >
                          <td className="px-4 py-2.5 font-semibold">{entry.name}</td>
                          <td className="px-3 py-2.5 text-slate-600">{entry.classroomName}</td>
                          <td className="px-3 py-2.5">
                            <ScoreChip value={entry.readingAvg} />
                          </td>
                          <td className="px-3 py-2.5 text-slate-700">{entry.weakestSkill.skill}</td>
                          <td className="px-3 py-2.5">
                            {entry.weakestSkill.score === null ? (
                              <span className="text-xs font-semibold text-slate-400">not yet attempted</span>
                            ) : (
                              <ScoreChip value={entry.weakestSkill.score} />
                            )}
                          </td>
                          <td className="px-2 py-2.5 text-right">
                            {expanded === entry.studentId ? (
                              <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
                            )}
                          </td>
                        </tr>
                        {expanded === entry.studentId && (
                          <tr className="border-b border-slate-50 bg-slate-50/60">
                            <td colSpan={6} className="px-4 py-3">
                              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                                4-step plan for {entry.name}
                              </p>
                              <RecommendedPlan steps={entry.recommended} />
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <p className="text-xs text-slate-400">
            Skills tracked: Vocabulary · Fluency · Comprehension · Main Idea · Inference · Context
            Clues · Summarising — mapped automatically to each student&rsquo;s age group.
          </p>
        </>
      )}
    </div>
  );
}
