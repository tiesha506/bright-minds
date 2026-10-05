"use client";

// ---------------------------------------------------------------------------
// Content — teacher-built activities (drafts). Structured body editor, status
// badges, assign-to-classroom flow. Helper-saved drafts appear here too.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { Pencil, Trash2, Send, Loader2, RotateCcw } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AuthUser } from "@/lib/auth-store";
import {
  Loading,
  ErrorNote,
  EmptyState,
  Panel,
  PageHeader,
  StatusChip,
  Field,
  TextInput,
  SelectInput,
  TextareaInput,
  useFetch,
  AssignDialog,
} from "@/components/teacher/teacher-ui";
import {
  AGE_GROUP_LABELS,
  CONTENT_STATUSES,
  CONTENT_TYPE_LABELS,
  CONTENT_TYPES,
  SUBJECT_IDS,
  SUBJECT_LABELS,
} from "@/lib/teacher-types";
import type { AgeGroup } from "@/lib/content/types";
import type { CustomActivityRow, TeacherClassroomList } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";
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

type EditorMode = "items" | "text" | "json";

interface FormState {
  editingId: string | null;
  title: string;
  type: string;
  subjectId: string;
  ageGroup: AgeGroup;
  status: string;
  instructions: string;
  itemsRaw: string;
  textRaw: string;
  jsonRaw: string;
  mode: EditorMode;
}

const EMPTY_FORM: FormState = {
  editingId: null,
  title: "",
  type: "worksheet",
  subjectId: "math",
  ageGroup: "primary",
  status: "draft",
  instructions: "",
  itemsRaw: "",
  textRaw: "",
  jsonRaw: "{\n  \n}",
  mode: "items",
};

function bodyToForm(body: unknown): { mode: EditorMode; instructions: string; itemsRaw: string; textRaw: string; jsonRaw: string } {
  if (body && typeof body === "object" && Array.isArray((body as Record<string, unknown>).items)) {
    const items = (body as { items: { prompt?: string; answer?: unknown }[] }).items;
    const lines = items
      .map((it) => `${it.prompt ?? ""} | ${typeof it.answer === "string" ? it.answer : ""}`)
      .join("\n");
    return {
      mode: "items",
      instructions:
        typeof (body as Record<string, unknown>).instructions === "string"
          ? String((body as Record<string, unknown>).instructions)
          : "",
      itemsRaw: lines,
      textRaw: "",
      jsonRaw: JSON.stringify(body, null, 2),
    };
  }
  if (body && typeof body === "object" && typeof (body as Record<string, unknown>).text === "string") {
    return {
      mode: "text",
      instructions: "",
      itemsRaw: "",
      textRaw: String((body as Record<string, unknown>).text),
      jsonRaw: JSON.stringify(body, null, 2),
    };
  }
  return {
    mode: "json",
    instructions: "",
    itemsRaw: "",
    textRaw: "",
    jsonRaw: JSON.stringify(body ?? {}, null, 2),
  };
}

function buildBody(form: FormState): { ok: true; body: string } | { ok: false; error: string } {
  if (form.mode === "items") {
    const items = form.itemsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf("|");
        const prompt = idx === -1 ? line : line.slice(0, idx).trim();
        const answer = idx === -1 ? "" : line.slice(idx + 1).trim();
        return { prompt, answer };
      });
    for (const it of items) {
      if (!it.prompt) return { ok: false, error: "Every item line needs a prompt before the | separator." };
    }
    return {
      ok: true,
      body: JSON.stringify({
        instructions: form.instructions,
        items,
      }),
    };
  }
  if (form.mode === "text") {
    return { ok: true, body: JSON.stringify({ text: form.textRaw }) };
  }
  try {
    const parsed = JSON.parse(form.jsonRaw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { ok: false, error: "JSON body must be an object." };
    }
    return { ok: true, body: JSON.stringify(parsed) };
  } catch {
    return { ok: false, error: "JSON body is not valid JSON yet." };
  }
}

function ActivityForm({
  classrooms,
  onSaved,
}: {
  classrooms: TeacherClassroomList["classrooms"];
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CustomActivityRow>).detail;
      if (!detail) return;
      const parsed = bodyToForm(detail.body);
      set({
        editingId: detail.id,
        title: detail.title,
        type: detail.type,
        subjectId: detail.subjectId,
        ageGroup: detail.ageGroup as AgeGroup,
        status: detail.status,
        ...parsed,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("teacher-edit-activity", handler);
    return () => window.removeEventListener("teacher-edit-activity", handler);
  }, []);

  const submit = async () => {
    const built = buildBody(form);
    if (!built.ok) {
      setError(built.error);
      return;
    }
    setBusy(true);
    setError(null);
    const payload = {
      ...(form.editingId ? { id: form.editingId } : {}),
      title: form.title,
      type: form.type,
      subjectId: form.subjectId,
      ageGroup: form.ageGroup,
      status: form.status,
      body: built.body,
    };
    try {
      if (form.editingId) {
        await api("/api/teacher/content", { method: "PATCH", body: payload });
        toast({ title: "Activity updated ✅" });
      } else {
        await api("/api/teacher/content", { method: "POST", body: payload });
        toast({ title: "Activity saved to your library ✅" });
      }
      setForm(EMPTY_FORM);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the activity");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel
      title={form.editingId ? "Edit activity" : "Create activity"}
      subtitle="Build a worksheet, quiz, reading task or vocabulary set. Saved drafts can be assigned from here."
      actions={
        form.editingId ? (
          <Button variant="ghost" size="sm" onClick={() => setForm(EMPTY_FORM)}>
            <RotateCcw className="h-4 w-4" /> New instead
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Title" htmlFor="ca-title">
            <TextInput
              id="ca-title"
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="e.g. Comparing Fractions with Pizza Models"
              maxLength={120}
            />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Type" htmlFor="ca-type">
              <SelectInput id="ca-type" value={form.type} onChange={(e) => set({ type: e.target.value })}>
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {CONTENT_TYPE_LABELS[t]}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Subject" htmlFor="ca-subject">
              <SelectInput id="ca-subject" value={form.subjectId} onChange={(e) => set({ subjectId: e.target.value })}>
                {SUBJECT_IDS.map((s) => (
                  <option key={s} value={s}>
                    {SUBJECT_LABELS[s]}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Age group" htmlFor="ca-age">
              <SelectInput
                id="ca-age"
                value={form.ageGroup}
                onChange={(e) => set({ ageGroup: e.target.value as AgeGroup })}
              >
                {(Object.keys(AGE_GROUP_LABELS) as AgeGroup[]).map((g) => (
                  <option key={g} value={g}>
                    {AGE_GROUP_LABELS[g]}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>
        </div>

        <Field label="Status">
          <div className="flex gap-2">
            {CONTENT_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ status: s })}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  form.status === s
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        {/* Body editor */}
        <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
          <div className="flex gap-1.5">
            {(
              [
                ["items", "Items (prompt | answer)"],
                ["text", "Free text"],
                ["json", "JSON"],
              ] as [EditorMode, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => set({ mode: value })}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  form.mode === value
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {form.mode === "items" && (
            <>
              <Field label="Instructions shown to students" htmlFor="ca-instructions">
                <TextareaInput
                  id="ca-instructions"
                  rows={2}
                  value={form.instructions}
                  onChange={(e) => set({ instructions: e.target.value })}
                  placeholder="e.g. Answer every question in your book. The answer key is for checking afterwards."
                  maxLength={1000}
                />
              </Field>
              <Field
                label="Items — one per line as  prompt | answer"
                htmlFor="ca-items"
                hint="Example: Which is larger: 1/2 or 3/5? | 3/5"
              >
                <TextareaInput
                  id="ca-items"
                  rows={5}
                  value={form.itemsRaw}
                  onChange={(e) => set({ itemsRaw: e.target.value })}
                  placeholder={"What is 6 × 7? | 42\nName the capital of France | Paris"}
                />
              </Field>
            </>
          )}

          {form.mode === "text" && (
            <Field label="Text" htmlFor="ca-text" hint="Rich instructions, a strategy note, anything the student should read.">
              <TextareaInput
                id="ca-text"
                rows={6}
                value={form.textRaw}
                onChange={(e) => set({ textRaw: e.target.value })}
              />
            </Field>
          )}

          {form.mode === "json" && (
            <Field label="Body JSON" htmlFor="ca-json" hint="Advanced: full control of the activity body (items, questions, passage…).">
              <TextareaInput
                id="ca-json"
                rows={8}
                value={form.jsonRaw}
                onChange={(e) => set({ jsonRaw: e.target.value })}
                className="font-mono text-xs"
                spellCheck={false}
              />
            </Field>
          )}
        </div>

        {error && <ErrorNote message={error} />}

        <div className="flex justify-end">
          <Button
            onClick={submit}
            disabled={busy || form.title.trim().length < 2}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {form.editingId ? "Save changes" : "Save activity"}
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export function ContentView({ user }: { user: AuthUser }) {
  void user;
  const { toast } = useToast();
  const { data, error, loading, reload } = useFetch<{ activities: CustomActivityRow[] }>(
    () => api<{ activities: CustomActivityRow[] }>("/api/teacher/content"),
    []
  );
  const classroomsReq = useFetch<TeacherClassroomList>(
    () => api<TeacherClassroomList>("/api/teacher/classrooms"),
    []
  );
  const [assignId, setAssignId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<CustomActivityRow | null>(null);

  const doDelete = async () => {
    if (!toDelete) return;
    try {
      await api(`/api/teacher/content?id=${encodeURIComponent(toDelete.id)}`, { method: "DELETE" });
      toast({ title: "Activity deleted" });
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
    <div className="space-y-5">
      <PageHeader
        emoji="📚"
        title="Content"
        subtitle="Your activity library — including drafts saved from the Teacher Helper."
      />

      <ActivityForm classrooms={classroomsReq.data?.classrooms ?? []} onSaved={reload} />

      <Panel title={`Library (${data?.activities.length ?? 0})`} bodyClassName="p-0">
        {loading && <Loading />}
        {error && <div className="p-4"><ErrorNote message={error} /></div>}
        {data && data.activities.length === 0 && (
          <EmptyState
            title="No activities yet"
            hint="Create one above, or generate a draft with the Teacher Helper and save it here."
          />
        )}
        {data && data.activities.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {data.activities.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-2 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{a.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                    <span className="font-semibold capitalize">{a.type}</span>
                    <span>· {SUBJECT_LABELS[a.subjectId] ?? a.subjectId}</span>
                    <span>· {AGE_GROUP_LABELS[a.ageGroup as AgeGroup] ?? a.ageGroup}</span>
                    {a.itemCount > 0 && <span>· {a.itemCount} items</span>}
                    <span>· edited {new Date(a.updatedAt).toLocaleDateString()}</span>
                  </p>
                </div>
                <StatusChip status={a.status} />
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent<CustomActivityRow>("teacher-edit-activity", { detail: a })
                      )
                    }
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => setAssignId(a.id)}
                  >
                    <Send className="h-4 w-4" /> Assign…
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => setToDelete(a)}
                    aria-label={`Delete ${a.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <AssignDialog
        open={assignId !== null}
        onOpenChange={(v) => !v && setAssignId(null)}
        activityId={assignId}
        activityTitle={data?.activities.find((a) => a.id === assignId)?.title ?? "Activity"}
        classrooms={classroomsReq.data?.classrooms ?? []}
        onAssigned={() => {
          reload();
          if (classroomsReq.data) classroomsReq.reload();
        }}
      />

      <AlertDialog open={toDelete !== null} onOpenChange={(v) => !v && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{toDelete?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              The draft is removed from your library. Students who already received it keep their
              assignment.
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
    </div>
  );
}
