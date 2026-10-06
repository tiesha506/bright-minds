"use client";

// ---------------------------------------------------------------------------
// Students — searchable roster table + full student profile dialog.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import { Avatar, AvatarPhotoEditor } from "@/components/shared/avatar";
import { BarRow, MiniBars, SparkLine, SUBJECT_COLORS } from "@/components/shared/charts";
import {
  Loading,
  ErrorNote,
  EmptyState,
  Panel,
  PageHeader,
  ScoreChip,
  GroupChip,
  TypeChip,
  StatusChip,
  TextInput,
  useFetch,
} from "@/components/teacher/teacher-ui";
import {
  AGE_GROUP_LABELS,
  SUBJECT_LABELS,
  fmtDate,
  fmtPct,
  scoreBand,
  SCORE_BAND_LABELS,
} from "@/lib/teacher-types";
import type { RosterEntry, TeacherClassroomList, TeacherStudentProfile } from "@/lib/teacher-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function statusOf(s: RosterEntry): { label: string; className: string } {
  if (!s.lastActive) {
    return { label: "No activity yet", className: "bg-slate-100 text-slate-500" };
  }
  const band = scoreBand(s.avg);
  const tone =
    band === "strong"
      ? "bg-emerald-100 text-emerald-800"
      : band === "ontrack"
        ? "bg-teal-100 text-teal-800"
        : band === "watch"
          ? "bg-amber-100 text-amber-800"
          : "bg-rose-100 text-rose-800";
  return { label: SCORE_BAND_LABELS[band], className: tone };
}

function StudentProfileDialog({
  studentId,
  onClose,
}: {
  studentId: string | null;
  onClose: () => void;
}) {
  const [data, setData] = useState<TeacherStudentProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api<TeacherStudentProfile>(`/api/teacher/students/${studentId}`)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load profile");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 pr-6">
            {data && (
              <>
                <Avatar avatar={data.student.avatar} color={data.student.avatarColor} photoUrl={data.student.photoUrl} size="md" />
                <span className="min-w-0 flex-1 truncate">{data.student.name}</span>
                <span className="text-xs font-normal text-slate-400">
                  {data.student.age} yrs · {AGE_GROUP_LABELS[data.student.ageGroup]}
                </span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading && <Loading label="Loading profile…" />}
        {error && <ErrorNote message={error} />}

        {data && (
          <div className="space-y-4">
            {/* Profile photo (optional — stored in Supabase Storage) */}
            <Panel title="Profile photo" bodyClassName="p-4">
              <AvatarPhotoEditor
                targetType="student"
                targetId={data.student.id}
                photoUrl={data.student.photoUrl}
                avatar={data.student.avatar}
                color={data.student.avatarColor}
                name={data.student.name}
                onChanged={(url) => {
                  const photo = url ?? "";
                  api(`/api/teacher/students/${data.student.id}`, {
                    method: "PATCH",
                    body: { photoUrl: photo || null },
                  })
                    .then(() =>
                      setData((d) =>
                        d ? { ...d, student: { ...d.student, photoUrl: photo } } : d
                      )
                    )
                    .catch((e) =>
                      alert(e instanceof Error ? e.message : "Could not save the photo.")
                    );
                }}
              />
              <p className="mt-2 text-xs text-slate-400">
                With a parent&apos;s okay — shown on the student&apos;s dashboard instead of the emoji avatar.
              </p>
            </Panel>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-1.5">
              {data.classrooms.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600"
                >
                  🏫 {c.name}
                  <GroupChip group={c.groupName} />
                </span>
              ))}
              {data.student.loginCode && (
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700">
                  Code {data.student.loginCode}
                </span>
              )}
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {data.student.worksheetsDone} worksheets done
              </span>
            </div>

            {/* Headline numbers */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["Overall", fmtPct(data.overallAvg)],
                ["Quiz average", fmtPct(data.quizAvg)],
                ["Reading", fmtPct(data.readingAvg)],
                ["Lessons done", String(data.subjects.reduce((n, s) => n + s.lessonsDone, 0))],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="text-lg font-extrabold tabular-nums">{value}</p>
                </div>
              ))}
            </div>

            {/* Subjects */}
            <Panel title="Subject averages" bodyClassName="space-y-2.5 p-4">
              {data.subjects.map((s) => (
                <BarRow
                  key={s.subjectId}
                  label={SUBJECT_LABELS[s.subjectId] ?? s.subjectId}
                  value={s.avg ?? 0}
                  color={SUBJECT_COLORS[s.subjectId]}
                />
              ))}
            </Panel>

            {/* Activity + quiz trend */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title="Learning minutes" subtitle="Last 14 days">
                <MiniBars data={data.activity14} color="#0d9488" suffix="m" height={110} />
              </Panel>
              <Panel title="Quiz score trend" subtitle="Chronological scores">
                {data.quizResults.length > 0 ? (
                  <>
                    <SparkLine
                      points={[...data.quizResults].reverse().map((r) => r.score as number)}
                      color="#10b981"
                      height={80}
                    />
                    <p className="mt-1 truncate text-xs text-slate-400">
                      Latest: {data.quizResults[0].emoji} {data.quizResults[0].lessonTitle} —{" "}
                      {data.quizResults[0].score}%
                    </p>
                  </>
                ) : (
                  <p className="py-6 text-center text-sm text-slate-400">No quizzes taken yet.</p>
                )}
              </Panel>
            </div>

            {/* Skills */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title="Skills mastered" subtitle="Quiz score 80%+">
                {data.skillsMastered.length === 0 ? (
                  <p className="text-sm text-slate-400">Nothing at mastery level yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {data.skillsMastered.slice(0, 12).map((s) => (
                      <span
                        key={`${s.lessonId}-${s.skill}`}
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200"
                      >
                        ✦ {s.skill} · {s.score}%
                      </span>
                    ))}
                  </div>
                )}
              </Panel>
              <Panel title="Needs practice" subtitle="Quiz score below 60%">
                {data.needsPractice.length === 0 ? (
                  <p className="text-sm text-slate-400">No weak skills — nice work!</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {data.needsPractice.slice(0, 12).map((s) => (
                      <span
                        key={`${s.lessonId}-${s.skill}`}
                        className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200"
                      >
                        ✧ {s.skill} · {s.score}%
                      </span>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            {/* Reading detail */}
            {data.readingDetail.length > 0 && (
              <Panel title="Reading detail" subtitle="Every reading lesson attempted">
                <ul className="divide-y divide-slate-100">
                  {data.readingDetail.map((r) => (
                    <li key={r.lessonId} className="flex items-center gap-2 py-2 text-sm">
                      <span aria-hidden>{r.emoji}</span>
                      <span className="min-w-0 flex-1 truncate font-medium">{r.lessonTitle}</span>
                      <span className="text-xs text-slate-400">{fmtDate(r.date)}</span>
                      <ScoreChip value={r.score} />
                    </li>
                  ))}
                </ul>
              </Panel>
            )}

            {/* Assignment history */}
            <Panel title="Assignment history">
              {data.assignments.length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No assignments yet.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {data.assignments.map((a) => (
                    <li key={a.assignmentId} className="flex flex-wrap items-center gap-2 py-2 text-sm">
                      <span className="min-w-0 flex-1 truncate font-medium">{a.title}</span>
                      <TypeChip type={a.type} />
                      <span className="text-xs text-slate-400">
                        {a.classroomName}
                        {a.dueDate ? ` · due ${a.dueDate}` : ""}
                      </span>
                      {a.status === "completed" ? (
                        <ScoreChip value={a.score} />
                      ) : (
                        <StatusChip status={a.status} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function StudentsView({ user }: { user: AuthUser }) {
  void user;
  const { data, error, loading } = useFetch<TeacherClassroomList>(
    () => api<TeacherClassroomList>("/api/teacher/classrooms"),
    []
  );
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = data?.students ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.classroomName.toLowerCase().includes(q) ||
        (s.groupName && s.groupName.toLowerCase() === q)
    );
  }, [data, query]);

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="👩‍🎓"
        title="Students"
        subtitle="Every student across your classrooms. Click a row for the full profile."
      />

      <div className="relative no-print">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, classroom or group…"
          className="pl-9"
          aria-label="Search students"
        />
      </div>

      {loading && <Loading />}
      {error && <ErrorNote message={error} />}

      {data && (
        <Panel title={`${filtered.length} student${filtered.length === 1 ? "" : "s"}`} bodyClassName="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              title="No students found"
              hint={query ? "Try a different search." : "Add students from the Classrooms section."}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-2.5 font-bold">Student</th>
                    <th className="px-3 py-2.5 font-bold">Age</th>
                    <th className="px-3 py-2.5 font-bold">Classroom</th>
                    <th className="px-3 py-2.5 font-bold">Avg</th>
                    <th className="px-3 py-2.5 font-bold">Reading</th>
                    <th className="px-3 py-2.5 font-bold">Status</th>
                    <th className="px-2 py-2.5" aria-label="Open" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const status = statusOf(s);
                    return (
                      <tr
                        key={s.seatId}
                        tabIndex={0}
                        onClick={() => setOpenId(s.studentId)}
                        onKeyDown={(e) => e.key === "Enter" && setOpenId(s.studentId)}
                        className="cursor-pointer border-b border-slate-50 transition-colors last:border-0 hover:bg-emerald-50/40"
                      >
                        <td className="px-4 py-2.5">
                          <span className="flex items-center gap-2">
                            <Avatar avatar={s.avatar} color={s.avatarColor} photoUrl={s.photoUrl} size="xs" />
                            <span className="font-semibold">{s.name}</span>
                          </span>
                        </td>
                        <td className="px-3 py-2.5 tabular-nums text-slate-600">{s.age}</td>
                        <td className="px-3 py-2.5 text-slate-600">
                          {s.classroomName}
                          {s.groupName ? ` · ${s.groupName}` : ""}
                        </td>
                        <td className="px-3 py-2.5">
                          <ScoreChip value={s.avg} />
                        </td>
                        <td className="px-3 py-2.5">
                          <ScoreChip value={s.readingAvg} />
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <ChevronRight className="ml-auto h-4 w-4 text-slate-300" aria-hidden />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      )}

      {openId && <StudentProfileDialog studentId={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}