"use client";

// ---------------------------------------------------------------------------
// Reports — printable class report (roster + aggregates + interventions).
// Print / Save-as-PDF via window.print(); header/nav are .no-print.
// ---------------------------------------------------------------------------

import Image from "next/image";
import { useEffect, useState } from "react";
import { Printer, FileDown } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import {
  Loading,
  ErrorNote,
  Panel,
  PageHeader,
  GroupChip,
  Field,
  SelectInput,
} from "@/components/teacher/teacher-ui";
import { SUBJECT_IDS, SUBJECT_LABELS } from "@/lib/teacher-types";
import type { ClassReport } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";

interface ClassroomOption {
  id: string;
  name: string;
  studentCount: number;
}

export function ReportsView({ user }: { user: AuthUser }) {
  void user;
  const [classroomOptions, setClassroomOptions] = useState<ClassroomOption[] | null>(null);
  const [classroomId, setClassroomId] = useState("");
  const [report, setReport] = useState<ClassReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the classroom list once.
  useEffect(() => {
    let cancelled = false;
    api<{ classrooms: ClassroomOption[] }>("/api/teacher/classrooms")
      .then((d) => {
        if (cancelled) return;
        setClassroomOptions(d.classrooms);
        if (d.classrooms.length > 0) setClassroomId((cur) => cur || d.classrooms[0].id);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load classrooms");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load the report for the selected classroom.
  useEffect(() => {
    if (!classroomId) return;
    let cancelled = false;
    api<ClassReport>(`/api/teacher/report/${classroomId}`)
      .then((d) => {
        if (!cancelled) setReport(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not build the report");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [classroomId]);

  const print = () => window.print();

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="📄"
        title="Reports"
        subtitle="Printable class report — perfect for parent evenings and records."
        actions={
          report && (
            <div className="flex gap-2 no-print">
              <Button size="sm" onClick={print} className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button size="sm" variant="outline" onClick={print}>
                <FileDown className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          )
        }
      />

      {!loading && classroomOptions && classroomOptions.length > 1 && (
        <div className="max-w-xs no-print">
          <Field label="Classroom" htmlFor="rep-classroom">
            <SelectInput
              id="rep-classroom"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
            >
              {classroomOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
      )}

      {loading && <Loading label="Building report…" />}
      {error && <ErrorNote message={error} />}

      {!loading && classroomOptions && classroomOptions.length === 0 && (
        <Panel>
          <p className="py-6 text-center text-sm text-slate-400">
            Create a classroom first — reports need students.
          </p>
        </Panel>
      )}

      {report && (
        <Panel bodyClassName="p-5 sm:p-6">
          {/* Report header */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4">
            <Image src="/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-base font-extrabold text-slate-900">BrightMinds Class Report</p>
              <p className="text-sm text-slate-600">
                {report.classroom.name}
                {report.classroom.gradeLabel ? ` · ${report.classroom.gradeLabel}` : ""}
              </p>
              <p className="text-xs text-slate-400">
                Teacher {report.teacherName} · generated{" "}
                {new Date(report.generatedAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Aggregates */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              ["Students", String(report.aggregates.students)],
              ["Quiz average", report.aggregates.quizAvg === null ? "—" : `${report.aggregates.quizAvg}%`],
              ["Reading average", report.aggregates.readingAvg === null ? "—" : `${report.aggregates.readingAvg}%`],
              [
                "Assignments done",
                report.aggregates.assignmentCompletionPct === null
                  ? "—"
                  : `${report.aggregates.assignmentCompletionPct}%`,
              ],
              ["Active last 7 days", String(report.aggregates.activeLast7)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                <p className="text-lg font-extrabold tabular-nums text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Subject averages strip */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            {SUBJECT_IDS.map((sid) => (
              <span key={sid}>
                <strong className="text-slate-700">{SUBJECT_LABELS[sid]}:</strong>{" "}
                {report.aggregates.subjectAverages[sid] == null ? "—" : `${report.aggregates.subjectAverages[sid]}%`}
              </span>
            ))}
          </div>

          {/* Roster */}
          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">
            Roster ({report.roster.length})
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-2 py-2 font-bold">Student</th>
                  <th className="px-2 py-2 font-bold">Group</th>
                  {SUBJECT_IDS.map((sid) => (
                    <th key={sid} className="px-2 py-2 font-bold">
                      {SUBJECT_LABELS[sid]}
                    </th>
                  ))}
                  <th className="px-2 py-2 font-bold">Quiz</th>
                  <th className="px-2 py-2 font-bold">Assignments</th>
                  <th className="px-2 py-2 font-bold">Lessons</th>
                </tr>
              </thead>
              <tbody>
                {report.roster.map((r) => (
                  <tr key={r.studentId} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-semibold">{r.name}</td>
                    <td className="px-2 py-2">
                      <GroupChip group={r.groupName} />
                    </td>
                    {SUBJECT_IDS.map((sid) => (
                      <td key={sid} className="px-2 py-2 tabular-nums">
                        {r.subjectAverages[sid] == null ? "—" : `${r.subjectAverages[sid]}%`}
                      </td>
                    ))}
                    <td className="px-2 py-2 tabular-nums">
                      {r.quizAvg === null ? "—" : `${r.quizAvg}%`}
                    </td>
                    <td className="px-2 py-2 tabular-nums text-slate-600">
                      {r.assignmentCompletion
                        ? `${r.assignmentCompletion.completed}/${r.assignmentCompletion.total}`
                        : "—"}
                    </td>
                    <td className="px-2 py-2 tabular-nums text-slate-600">{r.lessonsDone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interventions */}
          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">
            Students needing intervention
          </p>
          {report.interventionList.length === 0 ? (
            <p className="text-sm text-slate-400">None — the whole class is on track.</p>
          ) : (
            <ul className="space-y-1.5">
              {report.interventionList.map((i) => (
                <li key={i.name} className="rounded-lg bg-rose-50/70 px-3 py-2 text-sm ring-1 ring-rose-100">
                  <strong className="text-rose-800">{i.name}</strong>{" "}
                  <span className="text-rose-700">— {i.focus}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
            BrightMinds · Teachers only see students in their own classrooms · Scores are quiz
            averages; “—” means not yet attempted.
          </p>
        </Panel>
      )}
    </div>
  );
}
