"use client";

// ---------------------------------------------------------------------------
// Assignments — create form (registry lessons, assign-to selector) + table
// with completion stats.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { Trash2, Send, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AuthUser } from "@/lib/auth-store";
import { getLessons } from "@/lib/content";
import type { AgeGroup } from "@/lib/content/types";
import {
  Loading,
  ErrorNote,
  EmptyState,
  Panel,
  PageHeader,
  ScoreChip,
  TypeChip,
  Field,
  TextInput,
  SelectInput,
  TextareaInput,
  useFetch,
} from "@/components/teacher/teacher-ui";
import {
  AGE_GROUP_LABELS,
  ASSIGNMENT_TYPES,
  ASSIGNMENT_TYPE_LABELS,
  DIFFICULTIES,
  GROUP_LABELS,
  SUBJECT_IDS,
  SUBJECT_LABELS,
} from "@/lib/teacher-types";
import type { TeacherAssignmentRow, TeacherClassroomList } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AssignTo = "class" | "group" | "students";

const AGE_GROUPS: AgeGroup[] = ["early", "primary", "intermediate", "teen"];

function CreateAssignmentForm({
  classrooms,
  allStudents,
  onCreated,
}: {
  classrooms: TeacherClassroomList["classrooms"];
  allStudents: TeacherClassroomList["students"];
  onCreated: () => void;
}) {
  const { toast } = useToast();
  const [classroomId, setClassroomId] = useState(classrooms[0]?.id ?? "");
  const [subjectId, setSubjectId] = useState<string>("math");
  const [level, setLevel] = useState<AgeGroup>("primary");
  const [type, setType] = useState<string>("lesson");
  const [lessonId, setLessonId] = useState("");
  const [difficulty, setDifficulty] = useState<string>("standard");
  const [questionCount, setQuestionCount] = useState("8");
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [assignTo, setAssignTo] = useState<AssignTo>("class");
  const [group, setGroup] = useState("B");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lessons = useMemo(() => getLessons(subjectId, level), [subjectId, level]);

  // Reset the lesson when subject/level changes and the choice no longer fits.
  useEffect(() => {
    if (!lessons.some((l) => l.id === lessonId)) setLessonId("");
  }, [lessons, lessonId]);

  const roster = useMemo(
    () => allStudents.filter((s) => s.classroomId === classroomId),
    [allStudents, classroomId]
  );
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
    for (const s of roster) if (s.groupName in counts) counts[s.groupName] += 1;
    return counts;
  }, [roster]);

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ assignedCount: number }>("/api/teacher/assignments", {
        method: "POST",
        body: {
          classroomId,
          title: lessons.find((l) => l.id === lessonId)
            ? `${ASSIGNMENT_TYPE_LABELS[type]}: ${lessons.find((l) => l.id === lessonId)!.title.replace(/^[^ ]+ /, "")}`
            : `${ASSIGNMENT_TYPE_LABELS[type]} work`,
          type,
          subjectId,
          lessonId: lessonId || undefined,
          level,
          difficulty,
          questionCount: Number(questionCount),
          dueDate,
          instructions,
          groupName: assignTo === "group" ? group : null,
          studentIds: assignTo === "students" ? Array.from(selected) : [],
        },
      });
      toast({
        title: "Assignment created ✅",
        description: `Sent to ${res.assignedCount} student${res.assignedCount === 1 ? "" : "s"}.`,
      });
      setInstructions("");
      setDueDate("");
      setSelected(new Set());
      setAssignTo("class");
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create the assignment");
    } finally {
      setBusy(false);
    }
  };

  if (classrooms.length === 0) {
    return (
      <Panel title="Create assignment">
        <p className="text-sm text-slate-500">
          Create a classroom with students first — then assign work here.
        </p>
      </Panel>
    );
  }

  return (
    <Panel title="Create assignment" subtitle="Pick a lesson from the BrightMinds registry and target the right students.">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Classroom" htmlFor="as-classroom">
            <SelectInput id="as-classroom" value={classroomId} onChange={(e) => { setClassroomId(e.target.value); setSelected(new Set()); }}>
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.studentCount})
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Subject" htmlFor="as-subject">
            <SelectInput id="as-subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              {SUBJECT_IDS.map((s) => (
                <option key={s} value={s}>
                  {SUBJECT_LABELS[s]}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Level (age group)" htmlFor="as-level">
            <SelectInput id="as-level" value={level} onChange={(e) => setLevel(e.target.value as AgeGroup)}>
              {AGE_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {AGE_GROUP_LABELS[g]}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <Field label="Type" htmlFor="as-type">
            <SelectInput id="as-type" value={type} onChange={(e) => setType(e.target.value)}>
              {ASSIGNMENT_TYPES.filter((t) => t !== "custom").map((t) => (
                <option key={t} value={t}>
                  {ASSIGNMENT_TYPE_LABELS[t]}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Difficulty" htmlFor="as-diff">
            <SelectInput id="as-diff" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d[0].toUpperCase() + d.slice(1)}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Questions" htmlFor="as-count">
            <TextInput
              id="as-count"
              type="number"
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
            />
          </Field>
          <Field label="Due date (optional)" htmlFor="as-due">
            <TextInput id="as-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </Field>
        </div>

        <Field
          label="Lesson"
          htmlFor="as-lesson"
          hint={`${lessons.length} ${SUBJECT_LABELS[subjectId]} lessons available for ${AGE_GROUP_LABELS[level]}.`}
        >
          <SelectInput id="as-lesson" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            <option value="">Choose a lesson…</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.emoji} {l.title} ({l.minutes} min)
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Instructions (optional)" htmlFor="as-instructions">
          <TextareaInput
            id="as-instructions"
            rows={2}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Complete the 8 questions. Use the visual method if you get stuck!"
            maxLength={1000}
          />
        </Field>

        <Field label="Assign to">
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["class", `Entire class (${roster.length})`],
                ["group", "A group"],
                ["students", "Selected students"],
              ] as [AssignTo, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setAssignTo(value)}
                className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors ${
                  assignTo === value
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Field>

        {assignTo === "group" && (
          <Field label="Group" htmlFor="as-group-sel">
            <SelectInput id="as-group-sel" value={group} onChange={(e) => setGroup(e.target.value)}>
              {["A", "B", "C"].map((g) => (
                <option key={g} value={g}>
                  {GROUP_LABELS[g]} — {groupCounts[g]} student{groupCounts[g] === 1 ? "" : "s"}
                </option>
              ))}
            </SelectInput>
          </Field>
        )}

        {assignTo === "students" && (
          <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
            {roster.length === 0 && <p className="p-2 text-xs text-slate-400">This classroom has no students yet.</p>}
            {roster.map((s) => (
              <label key={s.studentId} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50">
                <Checkbox
                  checked={selected.has(s.studentId)}
                  onCheckedChange={(v) =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (v) next.add(s.studentId);
                      else next.delete(s.studentId);
                      return next;
                    })
                  }
                />
                <span className="flex-1 truncate font-medium">{s.name}</span>
                {s.groupName && <span className="text-xs text-slate-400">Group {s.groupName}</span>}
              </label>
            ))}
            <p className="px-2 pt-1 text-xs text-slate-400">{selected.size} selected</p>
          </div>
        )}

        {error && <ErrorNote message={error} />}

        <div className="flex justify-end">
          <Button
            onClick={submit}
            disabled={busy || !lessonId || (assignTo === "students" && selected.size === 0)}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Assign to students
          </Button>
        </div>
      </div>
    </Panel>
  );
}

function AssignmentsTable({ reloadSignal }: { reloadSignal: number }) {
  const { toast } = useToast();
  const { data, error, loading, reload } = useFetch<{ assignments: TeacherAssignmentRow[] }>(
    () => api<{ assignments: TeacherAssignmentRow[] }>("/api/teacher/assignments"),
    [reloadSignal]
  );
  const [toDelete, setToDelete] = useState<TeacherAssignmentRow | null>(null);

  const doDelete = async () => {
    if (!toDelete) return;
    try {
      await api(`/api/teacher/assignments/${toDelete.id}`, { method: "DELETE" });
      toast({ title: "Assignment deleted" });
      setToDelete(null);
      reload();
    } catch (e) {
      toast({
        title: "Could not delete",
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Panel title="Assigned work" subtitle="Newest first" bodyClassName="p-0">
        {loading && <Loading />}
        {error && <div className="p-4"><ErrorNote message={error} /></div>}
        {data && data.assignments.length === 0 && (
          <EmptyState title="No assignments yet" hint="Create one above — students see it instantly in their app." />
        )}
        {data && data.assignments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-2.5 font-bold">Title</th>
                  <th className="px-3 py-2.5 font-bold">Classroom</th>
                  <th className="px-3 py-2.5 font-bold">Type</th>
                  <th className="px-3 py-2.5 font-bold">Target</th>
                  <th className="px-3 py-2.5 font-bold">Due</th>
                  <th className="px-3 py-2.5 font-bold">Completion</th>
                  <th className="px-3 py-2.5 font-bold">Avg score</th>
                  <th className="px-2 py-2.5" aria-label="Delete" />
                </tr>
              </thead>
              <tbody>
                {data.assignments.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0">
                    <td className="max-w-56 px-4 py-2.5">
                      <p className="truncate font-semibold">{a.title}</p>
                      {a.lessonTitle && <p className="truncate text-xs text-slate-400">{a.lessonTitle}</p>}
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{a.classroomName}</td>
                    <td className="px-3 py-2.5">
                      <TypeChip type={a.type} />
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-500">
                      {a.groupName
                        ? `Group ${a.groupName}`
                        : a.studentIds.length > 0
                          ? `${a.studentIds.length} selected`
                          : "Whole class"}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-500">{a.dueDate || "—"}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                          <span
                            className="block h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${a.targetCount === 0 ? 0 : Math.round((a.completedCount / a.targetCount) * 100)}%`,
                            }}
                          />
                        </span>
                        <span className="text-xs font-bold tabular-nums text-slate-600">
                          {a.completedCount}/{a.targetCount}
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <ScoreChip value={a.avgScore} />
                    </td>
                    <td className="px-2 py-2.5 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => setToDelete(a)}
                        aria-label={`Delete ${a.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <AlertDialog open={toDelete !== null} onOpenChange={(v) => !v && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{toDelete?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Students will no longer see this assignment. Existing results are removed too.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-rose-600 hover:bg-rose-700" onClick={doDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function AssignmentsView({ user }: { user: AuthUser }) {
  void user;
  const { data } = useFetch<TeacherClassroomList>(
    () => api<TeacherClassroomList>("/api/teacher/classrooms"),
    []
  );
  const [created, setCreated] = useState(0);

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="📝"
        title="Assignments"
        subtitle="Set registry lessons, quizzes, worksheets and reading for a class, a group or selected students."
      />
      {data && (
        <CreateAssignmentForm
          classrooms={data.classrooms}
          allStudents={data.students}
          onCreated={() => setCreated((c) => c + 1)}
        />
      )}
      <AssignmentsTable reloadSignal={created} />
    </div>
  );
}
