"use client";

// ---------------------------------------------------------------------------
// Classrooms — cards, detail roster (groups, codes, remove), add student with
// generated login code + PIN, create classroom.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  ArrowLeft,
  UserPlus,
  Trash2,
  Pencil,
  Copy,
  Check,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AuthUser } from "@/lib/auth-store";
import { Avatar, AvatarPicker } from "@/components/shared/avatar";
import {
  Loading,
  ErrorNote,
  EmptyState,
  Panel,
  PageHeader,
  ScoreChip,
  GroupChip,
  Field,
  TextInput,
  SelectInput,
  useFetch,
} from "@/components/teacher/teacher-ui";
import { GROUP_LABELS } from "@/lib/teacher-types";
import type { RosterEntry, TeacherClassroomList, TeacherClassroomSummary } from "@/lib/teacher-types";
import type { TeacherClassroomDetail } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// ------------------------------ Create dialog ------------------------------

function CreateClassroomDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (id: string) => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [gradeLabel, setGradeLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ classroom: TeacherClassroomSummary }>("/api/teacher/classrooms", {
        method: "POST",
        body: { name, gradeLabel },
      });
      toast({ title: "Classroom created", description: res.classroom.name });
      onOpenChange(false);
      setName("");
      setGradeLabel("");
      onCreated(res.classroom.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create classroom");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create classroom</DialogTitle>
          <DialogDescription>Group your students to assign differentiated work.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Field label="Classroom name" htmlFor="cr-name">
            <TextInput
              id="cr-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grade 5 Mathematics"
              maxLength={80}
            />
          </Field>
          <Field label="Grade label (optional)" htmlFor="cr-grade">
            <TextInput
              id="cr-grade"
              value={gradeLabel}
              onChange={(e) => setGradeLabel(e.target.value)}
              placeholder="e.g. Grade 5 · Ages 10-11"
              maxLength={60}
            />
          </Field>
          {error && <ErrorNote message={error} />}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={busy || name.trim().length < 2} className="bg-emerald-600 text-white hover:bg-emerald-700">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------ Add student --------------------------------

function AddStudentDialog({
  open,
  onOpenChange,
  classroomId,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  classroomId: string;
  onAdded: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [age, setAge] = useState("10");
  const [group, setGroup] = useState("");
  const [avatar, setAvatar] = useState("🦊");
  const [color, setColor] = useState("teal");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<{ loginCode: string; pin: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setAge("10");
      setGroup("");
      setAvatar("🦊");
      setColor("teal");
      setCredentials(null);
      setError(null);
      setCopied(false);
    }
  }, [open]);

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ loginCode: string; pin: string; student: { name: string } }>(
        `/api/teacher/classrooms/${classroomId}/students`,
        { method: "POST", body: { name, age: Number(age), avatar, avatarColor: color, groupName: group } }
      );
      setCredentials({ loginCode: res.loginCode, pin: res.pin, name: res.student.name });
      onAdded();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add the student");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!credentials) return;
    try {
      await navigator.clipboard.writeText(
        `BrightMinds login — code ${credentials.loginCode}, PIN ${credentials.pin}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — teacher can still read the code
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {credentials ? (
          <>
            <DialogHeader>
              <DialogTitle>Student added 🎉</DialogTitle>
              <DialogDescription>
                Hand these credentials to {credentials.name}&rsquo;s family. They sign in on the
                student login with the code + PIN.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Login code</p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-emerald-800">
                  {credentials.loginCode}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">PIN</p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-emerald-800">{credentials.pin}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={copy}>
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={() => onOpenChange(false)} className="bg-emerald-600 text-white hover:bg-emerald-700">
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Add student</DialogTitle>
              <DialogDescription>
                A login code and PIN are generated automatically for the new student.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Student name" htmlFor="as-name">
                  <TextInput
                    id="as-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amara Diallo"
                    maxLength={60}
                  />
                </Field>
                <Field label="Age" htmlFor="as-age">
                  <SelectInput id="as-age" value={age} onChange={(e) => setAge(e.target.value)}>
                    {Array.from({ length: 12 }, (_, i) => i + 5).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </SelectInput>
                </Field>
              </div>
              <Field label="Differentiated group (optional)" htmlFor="as-group">
                <SelectInput id="as-group" value={group} onChange={(e) => setGroup(e.target.value)}>
                  <option value="">No group</option>
                  {["A", "B", "C"].map((g) => (
                    <option key={g} value={g}>
                      {GROUP_LABELS[g]}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Avatar">
                <AvatarPicker value={avatar} color={color} onChange={(a, c) => { setAvatar(a); setColor(c); }} compact />
              </Field>
              {error && <ErrorNote message={error} />}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
                Cancel
              </Button>
              <Button
                onClick={submit}
                disabled={busy || name.trim().length < 2}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Add student
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------ Rename dialog ------------------------------

function RenameClassroomDialog({
  open,
  onOpenChange,
  classroom,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  classroom: { id: string; name: string; gradeLabel: string } | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [gradeLabel, setGradeLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && classroom) {
      setName(classroom.name);
      setGradeLabel(classroom.gradeLabel);
      setError(null);
    }
  }, [open, classroom]);

  const submit = async () => {
    if (!classroom) return;
    setBusy(true);
    setError(null);
    try {
      await api(`/api/teacher/classrooms/${classroom.id}`, {
        method: "PATCH",
        body: { name, gradeLabel },
      });
      toast({ title: "Classroom updated" });
      onOpenChange(false);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update classroom");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit classroom</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Field label="Classroom name" htmlFor="ed-name">
            <TextInput id="ed-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          </Field>
          <Field label="Grade label" htmlFor="ed-grade">
            <TextInput id="ed-grade" value={gradeLabel} onChange={(e) => setGradeLabel(e.target.value)} maxLength={60} />
          </Field>
          {error && <ErrorNote message={error} />}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={busy} className="bg-emerald-600 text-white hover:bg-emerald-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------ Detail roster ------------------------------

function ClassroomDetail({
  classroomId,
  onBack,
}: {
  classroomId: string;
  onBack: () => void;
}) {
  const { toast } = useToast();
  const { data, error, loading, reload } = useFetch<TeacherClassroomDetail>(
    () => api<TeacherClassroomDetail>(`/api/teacher/classrooms/${classroomId}`),
    [classroomId]
  );
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [removeSeat, setRemoveSeat] = useState<RosterEntry | null>(null);
  const [deleteClassroom, setDeleteClassroom] = useState(false);

  const setGroup = async (studentId: string, groupName: string) => {
    try {
      await api(`/api/teacher/classrooms/${classroomId}/students/${studentId}`, {
        method: "PATCH",
        body: { groupName },
      });
      toast({ title: groupName ? `Moved to Group ${groupName}` : "Removed from groups" });
      reload();
    } catch (e) {
      toast({ title: "Could not update group", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  const doRemoveSeat = async (studentId: string) => {
    try {
      await api(`/api/teacher/classrooms/${classroomId}/students/${studentId}`, { method: "DELETE" });
      toast({ title: "Student removed from classroom" });
      setRemoveSeat(null);
      reload();
    } catch (e) {
      toast({ title: "Could not remove student", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  const doDeleteClassroom = async () => {
    try {
      await api(`/api/teacher/classrooms/${classroomId}`, { method: "DELETE" });
      toast({ title: "Classroom deleted" });
      setDeleteClassroom(false);
      onBack();
    } catch (e) {
      toast({ title: "Could not delete classroom", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 no-print"
      >
        <ArrowLeft className="h-4 w-4" /> All classrooms
      </button>

      {loading && <Loading />}
      {error && <ErrorNote message={error} />}

      {data && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">{data.classroom.name}</h1>
              <p className="text-xs text-slate-500">
                {data.classroom.gradeLabel || "No grade label"} · {data.studentCount} student
                {data.studentCount === 1 ? "" : "s"} · {data.assignmentCount} assignment
                {data.assignmentCount === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex gap-2 no-print">
              <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                <Pencil className="h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAddOpen(true)} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <UserPlus className="h-4 w-4" /> Add student
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDeleteClassroom(true)} className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Groups legend */}
          <div className="flex flex-wrap gap-2">
            {["A", "B", "C"].map((g) => {
              const count = data.groups.find((x) => x.group === g)?.count ?? 0;
              return (
                <span key={g} className="inline-flex items-center gap-1.5">
                  <GroupChip group={g} />
                  <span className="text-xs text-slate-400">{count}</span>
                </span>
              );
            })}
          </div>
          <p className="text-xs text-slate-400">
            Groups: Group A — Advanced · Group B — On Level · Group C — Additional Support. Use
            groups to differentiate assignments.
          </p>

          <Panel title="Roster" bodyClassName="p-0">
            {data.students.length === 0 ? (
              <EmptyState
                title="No students yet"
                hint="Use “Add student” to enrol your first learner — we'll generate their login code and PIN."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-4 py-2.5 font-bold">Student</th>
                      <th className="px-3 py-2.5 font-bold">Login code</th>
                      <th className="px-3 py-2.5 font-bold">Group</th>
                      <th className="px-3 py-2.5 font-bold">Avg</th>
                      <th className="px-3 py-2.5 font-bold">Reading</th>
                      <th className="px-3 py-2.5 font-bold">Last active</th>
                      <th className="px-2 py-2.5 no-print" aria-label="Remove" />
                    </tr>
                  </thead>
                  <tbody>
                    {data.students.map((s) => (
                      <tr key={s.seatId} className="border-b border-slate-50 last:border-0">
                        <td className="px-4 py-2.5">
                          <span className="flex items-center gap-2">
                            <Avatar avatar={s.avatar} color={s.avatarColor} size="xs" />
                            <span className="font-semibold">{s.name}</span>
                            <span className="text-xs text-slate-400">({s.age})</span>
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-500">
                          {s.loginCode ?? "—"}
                        </td>
                        <td className="px-3 py-2.5 no-print">
                          <select
                            value={s.groupName}
                            onChange={(e) => setGroup(s.studentId, e.target.value)}
                            aria-label={`Group for ${s.name}`}
                            className="h-8 rounded-md border border-slate-300 bg-white px-1.5 text-xs font-semibold"
                          >
                            <option value="">—</option>
                            <option value="A">A · Advanced</option>
                            <option value="B">B · On level</option>
                            <option value="C">C · Support</option>
                          </select>
                        </td>
                        <td className="px-3 py-2.5">
                          <ScoreChip value={s.avg} />
                        </td>
                        <td className="px-3 py-2.5">
                          <ScoreChip value={s.readingAvg} />
                        </td>
                        <td className="px-3 py-2.5 text-xs text-slate-500">{s.lastActive ?? "never"}</td>
                        <td className="px-2 py-2.5 text-right no-print">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            onClick={() => setRemoveSeat(s)}
                            aria-label={`Remove ${s.name}`}
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
        </>
      )}

      <AddStudentDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        classroomId={classroomId}
        onAdded={reload}
      />
      <RenameClassroomDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        classroom={data?.classroom ?? null}
        onSaved={reload}
      />

      <AlertDialog open={removeSeat !== null} onOpenChange={(v) => !v && setRemoveSeat(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removeSeat?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              The student loses access to this classroom&rsquo;s assignments. Their learning history
              is kept, and they can be re-enrolled later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() => removeSeat && doRemoveSeat(removeSeat.studentId)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteClassroom} onOpenChange={setDeleteClassroom}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this classroom?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes all seats and assignments for &ldquo;{data?.classroom.name}&rdquo;. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-rose-600 hover:bg-rose-700" onClick={doDeleteClassroom}>
              Delete classroom
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// --------------------------------- View ------------------------------------

export function ClassroomsView({ user }: { user: AuthUser }) {
  void user;
  const { data, error, loading, reload } = useFetch<TeacherClassroomList>(
    () => api<TeacherClassroomList>("/api/teacher/classrooms"),
    []
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const averages = useMemo(() => {
    const map = new Map<string, number | null>();
    if (!data) return map;
    for (const c of data.classrooms) {
      const rows = data.students.filter((s) => s.classroomId === c.id);
      const vals = rows.map((s) => s.avg).filter((v): v is number => v !== null);
      map.set(c.id, vals.length === 0 ? null : Math.round(vals.reduce((a, b) => a + b, 0) / vals.length));
    }
    return map;
  }, [data]);

  if (selectedId) {
    return <ClassroomDetail classroomId={selectedId} onBack={() => { setSelectedId(null); reload(); }} />;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="🏫"
        title="Classrooms"
        subtitle="Rosters, differentiated groups and student login credentials."
        actions={
          <Button size="sm" onClick={() => setCreateOpen(true)} className="bg-emerald-600 text-white hover:bg-emerald-700 no-print">
            <Plus className="h-4 w-4" /> New classroom
          </Button>
        }
      />

      {loading && <Loading />}
      {error && <ErrorNote message={error} />}

      {data && data.classrooms.length === 0 && (
        <Panel>
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No classrooms yet"
            hint="Create your first classroom, then add students — each gets a unique login code and PIN."
          />
        </Panel>
      )}

      {data && data.classrooms.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.classrooms.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              <p className="truncate text-sm font-bold text-slate-900">{c.name}</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{c.gradeLabel || "—"}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold">{c.studentCount} students</span>
                <span>{c.assignmentCount} assignments</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class average</span>
                <ScoreChip value={averages.get(c.id) ?? null} />
              </div>
            </button>
          ))}
        </div>
      )}

      <CreateClassroomDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={(id) => {
          reload();
          setSelectedId(id);
        }}
      />
    </div>
  );
}
