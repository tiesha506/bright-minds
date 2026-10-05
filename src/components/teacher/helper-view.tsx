"use client";

// ---------------------------------------------------------------------------
// Teacher Helper — AI teaching assistant. Modes produce EDITABLE drafts which
// the teacher reviews before saving to Content or assigning. Backend route:
// POST /api/teacher/helper (z-ai-web-dev-sdk, server-side only).
// ---------------------------------------------------------------------------

import { useState } from "react";
import { Loader2, Sparkles, Save, Send, Plus, Trash2, AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AuthUser } from "@/lib/auth-store";
import {
  Loading,
  ErrorNote,
  Panel,
  PageHeader,
  Field,
  TextInput,
  SelectInput,
  TextareaInput,
  useFetch,
  AssignDialog,
} from "@/components/teacher/teacher-ui";
import { AGE_GROUP_LABELS, SUBJECT_IDS, SUBJECT_LABELS } from "@/lib/teacher-types";
import type { AgeGroup } from "@/lib/content/types";
import type { TeacherClassroomList } from "@/lib/teacher-types";
import { Button } from "@/components/ui/button";

// ------------------------------- Draft types -------------------------------

interface WorksheetDraft {
  title: string;
  items: { prompt: string; answer: string; hint?: string }[];
}
interface QuizQuestionDraft {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}
interface QuizDraft {
  title: string;
  questions: QuizQuestionDraft[];
}
interface ReadingDraft {
  title: string;
  passage: string;
  questions: { question: string; options: string[]; answerIndex: number }[];
}
interface DifferentiateDraft {
  advanced: string[];
  onLevel: string[];
  support: string[];
}

type HelperMode = "worksheet" | "quiz" | "reading" | "strategies" | "differentiate" | "free";

const MODES: { key: HelperMode; label: string; emoji: string; blurb: string }[] = [
  { key: "worksheet", label: "Worksheet", emoji: "📝", blurb: "Printable question set with an answer key" },
  { key: "quiz", label: "Quiz", emoji: "🧠", blurb: "Multiple-choice quiz with explanations" },
  { key: "reading", label: "Reading passage", emoji: "📖", blurb: "Original passage + comprehension questions" },
  { key: "strategies", label: "Teaching strategies", emoji: "💡", blurb: "Evidence-informed ideas for a topic" },
  { key: "differentiate", label: "Differentiate", emoji: "🎯", blurb: "Advanced / on-level / support variants" },
  { key: "free", label: "Free question", emoji: "💬", blurb: "Ask anything about teaching" },
];

const AGE_GROUPS: AgeGroup[] = ["early", "primary", "intermediate", "teen"];

const EXAMPLES: { label: string; mode: HelperMode; patch: Record<string, unknown> }[] = [
  {
    label: "Create a Grade 4 multiplication worksheet",
    mode: "worksheet",
    patch: { subject: "math", topic: "multiplication", ageGroup: "primary", count: 10, difficulty: "standard" },
  },
  {
    label: "Give me three different ways to teach fractions",
    mode: "strategies",
    patch: { topic: "fractions" },
  },
  {
    label: "Write a 5-question quiz on photosynthesis",
    mode: "quiz",
    patch: { subject: "science", topic: "photosynthesis", ageGroup: "primary", count: 5, difficulty: "standard" },
  },
  {
    label: "Make a reading passage about the water cycle for 7-year-olds",
    mode: "reading",
    patch: { topic: "the water cycle", ageGroup: "early" },
  },
  {
    label: "Differentiate a lesson on equivalent fractions",
    mode: "differentiate",
    patch: { subject: "math", topic: "equivalent fractions", ageGroup: "primary" },
  },
  {
    label: "How do I support a struggling reader in a mixed-ability class?",
    mode: "free",
    patch: {
      question: "How do I support a struggling reader in a mixed-ability class?",
    },
  },
];

interface HelperResult {
  mode: HelperMode;
  draft?: unknown;
  raw?: string;
  saved?: { id: string; title: string; type: string; status: string };
}

// ------------------------------ Param fields -------------------------------

function ParamFields({
  mode,
  params,
  setParams,
}: {
  mode: HelperMode;
  params: Record<string, string>;
  setParams: (patch: Record<string, string>) => void;
}) {
  if (mode === "free") {
    return (
      <Field label="Your question" htmlFor="th-question">
        <TextareaInput
          id="th-question"
          rows={3}
          value={params.question ?? ""}
          onChange={(e) => setParams({ question: e.target.value })}
          placeholder="e.g. How do I support a struggling reader in a mixed-ability class?"
          maxLength={800}
        />
      </Field>
    );
  }
  if (mode === "strategies") {
    return (
      <Field label="Topic or challenge" htmlFor="th-topic">
        <TextInput
          id="th-topic"
          value={params.topic ?? ""}
          onChange={(e) => setParams({ topic: e.target.value })}
          placeholder="e.g. teaching fractions"
          maxLength={120}
        />
      </Field>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(mode === "worksheet" || mode === "quiz" || mode === "differentiate") && (
        <Field label="Subject" htmlFor="th-subject">
          <SelectInput id="th-subject" value={params.subject ?? "math"} onChange={(e) => setParams({ subject: e.target.value })}>
            {SUBJECT_IDS.map((s) => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[s]}
              </option>
            ))}
          </SelectInput>
        </Field>
      )}
      <Field label="Topic" htmlFor="th-topic2">
        <TextInput
          id="th-topic2"
          value={params.topic ?? ""}
          onChange={(e) => setParams({ topic: e.target.value })}
          placeholder="e.g. multiplication"
          maxLength={120}
        />
      </Field>
      {(mode === "worksheet" || mode === "quiz" || mode === "reading" || mode === "differentiate") && (
        <Field label="Age group" htmlFor="th-age">
          <SelectInput
            id="th-age"
            value={params.ageGroup ?? "primary"}
            onChange={(e) => setParams({ ageGroup: e.target.value })}
          >
            {AGE_GROUPS.map((g) => (
              <option key={g} value={g}>
                {AGE_GROUP_LABELS[g]}
              </option>
            ))}
          </SelectInput>
        </Field>
      )}
      {(mode === "worksheet" || mode === "quiz") && (
        <>
          <Field label="Number of questions" htmlFor="th-count">
            <TextInput
              id="th-count"
              type="number"
              min={1}
              max={20}
              value={params.count ?? "8"}
              onChange={(e) => setParams({ count: e.target.value })}
            />
          </Field>
          <Field label="Difficulty" htmlFor="th-diff">
            <SelectInput id="th-diff" value={params.difficulty ?? "standard"} onChange={(e) => setParams({ difficulty: e.target.value })}>
              <option value="mild">Mild</option>
              <option value="standard">Standard</option>
              <option value="tricky">Tricky</option>
            </SelectInput>
          </Field>
        </>
      )}
    </div>
  );
}

// ------------------------------ Draft editors ------------------------------

function WorksheetEditor({
  draft,
  onChange,
}: {
  draft: WorksheetDraft;
  onChange: (d: WorksheetDraft) => void;
}) {
  return (
    <div className="space-y-3">
      <Field label="Title">
        <TextInput value={draft.title} onChange={(e) => onChange({ ...draft, title: e.target.value })} />
      </Field>
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Items</p>
        {draft.items.map((item, i) => (
          <div key={i} className="grid gap-1.5 rounded-lg border border-slate-200 p-2 sm:grid-cols-[1fr_1fr_auto]">
            <TextInput
              value={item.prompt}
              placeholder={`Question ${i + 1}`}
              onChange={(e) =>
                onChange({
                  ...draft,
                  items: draft.items.map((it, j) => (j === i ? { ...it, prompt: e.target.value } : it)),
                })
              }
            />
            <TextInput
              value={item.answer ?? ""}
              placeholder="Answer"
              onChange={(e) =>
                onChange({
                  ...draft,
                  items: draft.items.map((it, j) => (j === i ? { ...it, answer: e.target.value } : it)),
                })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              onClick={() => onChange({ ...draft, items: draft.items.filter((_, j) => j !== i) })}
              aria-label={`Remove item ${i + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({ ...draft, items: [...draft.items, { prompt: "", answer: "" }] })}
        >
          <Plus className="h-4 w-4" /> Add item
        </Button>
      </div>
    </div>
  );
}

function OptionsEditor({
  name,
  options,
  answerIndex,
  onChange,
}: {
  name: string;
  options: string[];
  answerIndex: number;
  onChange: (options: string[], answerIndex: number) => void;
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-1.5">
          <input
            type="radio"
            name={`answer-${name}-${i}`}
            checked={answerIndex === i}
            onChange={() => onChange(options, i)}
            aria-label={`Mark option ${i + 1} correct`}
            className="h-4 w-4 accent-emerald-600"
          />
          <TextInput
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const next = [...options];
              next[i] = e.target.value;
              onChange(next, answerIndex);
            }}
          />
        </label>
      ))}
    </div>
  );
}

function QuizEditor({ draft, onChange }: { draft: QuizDraft; onChange: (d: QuizDraft) => void }) {
  return (
    <div className="space-y-3">
      <Field label="Title">
        <TextInput value={draft.title} onChange={(e) => onChange({ ...draft, title: e.target.value })} />
      </Field>
      {draft.questions.map((q, qi) => (
        <div key={qi} className="space-y-2 rounded-lg border border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-extrabold text-white">
              {qi + 1}
            </span>
            <TextInput
              value={q.question}
              placeholder="Question text"
              onChange={(e) =>
                onChange({
                  ...draft,
                  questions: draft.questions.map((x, j) => (j === qi ? { ...x, question: e.target.value } : x)),
                })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              onClick={() => onChange({ ...draft, questions: draft.questions.filter((_, j) => j !== qi) })}
              aria-label={`Remove question ${qi + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <OptionsEditor
            name={`q${qi}`}
            options={q.options}
            answerIndex={q.answerIndex}
            onChange={(options, answerIndex) =>
              onChange({
                ...draft,
                questions: draft.questions.map((x, j) => (j === qi ? { ...x, options, answerIndex } : x)),
              })
            }
          />
          <TextInput
            value={q.explanation ?? ""}
            placeholder="Explanation shown after answering (optional)"
            onChange={(e) =>
              onChange({
                ...draft,
                questions: draft.questions.map((x, j) => (j === qi ? { ...x, explanation: e.target.value } : x)),
              })
            }
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onChange({
            ...draft,
            questions: [
              ...draft.questions,
              { question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "" },
            ],
          })
        }
      >
        <Plus className="h-4 w-4" /> Add question
      </Button>
    </div>
  );
}

function ReadingEditor({ draft, onChange }: { draft: ReadingDraft; onChange: (d: ReadingDraft) => void }) {
  return (
    <div className="space-y-3">
      <Field label="Title">
        <TextInput value={draft.title} onChange={(e) => onChange({ ...draft, title: e.target.value })} />
      </Field>
      <Field label="Passage">
        <TextareaInput
          rows={8}
          value={draft.passage}
          onChange={(e) => onChange({ ...draft, passage: e.target.value })}
        />
      </Field>
      {draft.questions.map((q, qi) => (
        <div key={qi} className="space-y-2 rounded-lg border border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[10px] font-extrabold text-white">
              {qi + 1}
            </span>
            <TextInput
              value={q.question}
              placeholder="Comprehension question"
              onChange={(e) =>
                onChange({
                  ...draft,
                  questions: draft.questions.map((x, j) => (j === qi ? { ...x, question: e.target.value } : x)),
                })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              onClick={() => onChange({ ...draft, questions: draft.questions.filter((_, j) => j !== qi) })}
              aria-label={`Remove question ${qi + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <OptionsEditor
            name={`rq${qi}`}
            options={q.options}
            answerIndex={q.answerIndex}
            onChange={(options, answerIndex) =>
              onChange({
                ...draft,
                questions: draft.questions.map((x, j) => (j === qi ? { ...x, options, answerIndex } : x)),
              })
            }
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onChange({
            ...draft,
            questions: [...draft.questions, { question: "", options: ["", "", "", ""], answerIndex: 0 }],
          })
        }
      >
        <Plus className="h-4 w-4" /> Add question
      </Button>
    </div>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <Field label={`${label} — one activity per line`}>
      <TextareaInput
        rows={3}
        value={items.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
    </Field>
  );
}

// --------------------------------- View ------------------------------------

export function HelperView({ user }: { user: AuthUser }) {
  void user;
  const { toast } = useToast();
  const [mode, setMode] = useState<HelperMode>("worksheet");
  const [params, setParamsState] = useState<Record<string, string>>({
    subject: "math",
    topic: "",
    ageGroup: "primary",
    count: "8",
    difficulty: "standard",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HelperResult | null>(null);
  const [edited, setEdited] = useState<unknown>(null);
  const [rawText, setRawText] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);

  const classroomsReq = useFetch<TeacherClassroomList>(
    () => api<TeacherClassroomList>("/api/teacher/classrooms"),
    []
  );

  const setParams = (patch: Record<string, string>) => setParamsState((p) => ({ ...p, ...patch }));

  const applyExample = (ex: (typeof EXAMPLES)[number]) => {
    setMode(ex.mode);
    setParams(
      Object.fromEntries(Object.entries(ex.patch).map(([k, v]) => [k, String(v)])) as Record<string, string>
    );
    setResult(null);
    setEdited(null);
    setRawText("");
    setSavedId(null);
    setError(null);
  };

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setEdited(null);
    setRawText("");
    setSavedId(null);
    try {
      const numeric: Record<string, unknown> = { ...params };
      if (mode === "worksheet" || mode === "quiz") numeric.count = Number(params.count) || 8;
      const res = await api<HelperResult>("/api/teacher/helper", {
        method: "POST",
        body: { mode, params: numeric },
      });
      setResult(res);
      if (res.draft !== undefined) setEdited(res.draft);
      if (res.raw) setRawText(res.raw);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Teacher Helper could not generate a draft");
    } finally {
      setLoading(false);
    }
  };

  const buildBodyForSave = (): { ok: true; body: string } | { ok: false; error: string } => {
    if (edited !== null && result?.mode) {
      return { ok: true, body: JSON.stringify(edited) };
    }
    if (rawText) return { ok: true, body: JSON.stringify({ text: rawText }) };
    return { ok: false, error: "Generate a draft first." };
  };

  const titleOf = (): string => {
    if (edited && typeof edited === "object" && typeof (edited as Record<string, unknown>).title === "string") {
      return String((edited as Record<string, unknown>).title);
    }
    return `Helper draft — ${new Date().toLocaleDateString()}`;
  };

  const saveDraft = async (): Promise<string | null> => {
    const built = buildBodyForSave();
    if (!built.ok) {
      setError(built.error);
      return null;
    }
    const subjectRaw = params.subject ?? "";
    const type =
      result?.mode === "worksheet" || result?.mode === "quiz" || result?.mode === "reading"
        ? result.mode
        : "lesson";
    const res = await api<{ activity: { id: string } }>("/api/teacher/content", {
      method: "POST",
      body: {
        title: titleOf(),
        type,
        subjectId: (SUBJECT_IDS as readonly string[]).includes(subjectRaw)
          ? subjectRaw
          : result?.mode === "reading"
            ? "reading"
            : "math",
        ageGroup: (AGE_GROUPS as string[]).includes(params.ageGroup ?? "") ? params.ageGroup : "primary",
        status: "draft",
        body: built.body,
      },
    });
    return res.activity.id;
  };

  const onSaveDraft = async () => {
    setError(null);
    try {
      const id = await saveDraft();
      if (id) {
        setSavedId(id);
        toast({ title: "Draft saved 📚", description: "Find it under Content — fully editable." });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the draft");
    }
  };

  const onAssign = async () => {
    setError(null);
    try {
      const id = savedId ?? (await saveDraft());
      if (id) {
        setSavedId(id);
        setAssignOpen(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not prepare the assignment");
    }
  };

  const draft = edited;

  return (
    <div className="space-y-5">
      <PageHeader
        emoji="🤖"
        title="Teacher Helper"
        subtitle="Your AI teaching assistant. Every draft is editable before it reaches students."
      />

      <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          <strong>AI drafts are suggestions — review and edit before assigning.</strong> Generated
          content is never sent to students automatically.
        </p>
      </div>

      {/* Mode chips */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => {
              setMode(m.key);
              setResult(null);
              setEdited(null);
              setRawText("");
              setSavedId(null);
              setError(null);
            }}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-left transition-colors",
              mode === m.key
                ? "border-emerald-600 bg-emerald-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            )}
          >
            <p className={cn("text-sm font-bold", mode === m.key ? "text-emerald-800" : "text-slate-800")}>
              <span aria-hidden className="mr-1">
                {m.emoji}
              </span>
              {m.label}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{m.blurb}</p>
          </button>
        ))}
      </div>

      {/* Params + generate */}
      <Panel
        title="What do you need?"
        actions={
          <Button
            onClick={generate}
            disabled={loading}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate draft
          </Button>
        }
      >
        <div className="space-y-3">
          <ParamFields mode={mode} params={params} setParams={setParams} />
          <div className="flex flex-wrap gap-1.5">
            <span className="py-1 text-xs font-semibold text-slate-400">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => applyExample(ex)}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                {ex.label}
              </button>
            ))}
          </div>
          {loading && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-3 text-sm text-emerald-800">
              <Loading label="Generating your draft… this can take 10–30 seconds." />
            </div>
          )}
          {error && (
            <div className="space-y-2">
              <ErrorNote message={error} />
              <Button variant="outline" size="sm" onClick={generate}>
                <RotateCcw className="h-4 w-4" /> Try again
              </Button>
            </div>
          )}
        </div>
      </Panel>

      {/* Result */}
      {result && (
        <Panel
          title="Editable draft"
          subtitle="Adjust anything below — your edits are what gets saved."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onSaveDraft}>
                <Save className="h-4 w-4" /> Save as draft
              </Button>
              <Button size="sm" onClick={onAssign} className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Send className="h-4 w-4" /> Assign…
              </Button>
            </div>
          }
        >
          {savedId && (
            <p className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Draft saved to Content. You can assign it now or keep editing.
            </p>
          )}

          {result.draft !== undefined && draft !== null && draft !== undefined ? (
            <div className="space-y-4">
              {result.mode === "worksheet" && (
                <WorksheetEditor draft={draft as WorksheetDraft} onChange={(d) => setEdited(d)} />
              )}
              {result.mode === "quiz" && (
                <QuizEditor draft={draft as QuizDraft} onChange={(d) => setEdited(d)} />
              )}
              {result.mode === "reading" && (
                <ReadingEditor draft={draft as ReadingDraft} onChange={(d) => setEdited(d)} />
              )}
              {result.mode === "differentiate" && (
                <div className="space-y-3">
                  <ListEditor
                    label="Advanced"
                    items={(draft as DifferentiateDraft).advanced ?? []}
                    onChange={(items) => setEdited({ ...(draft as DifferentiateDraft), advanced: items })}
                  />
                  <ListEditor
                    label="On level"
                    items={(draft as DifferentiateDraft).onLevel ?? []}
                    onChange={(items) => setEdited({ ...(draft as DifferentiateDraft), onLevel: items })}
                  />
                  <ListEditor
                    label="Support"
                    items={(draft as DifferentiateDraft).support ?? []}
                    onChange={(items) => setEdited({ ...(draft as DifferentiateDraft), support: items })}
                  />
                </div>
              )}
            </div>
          ) : (
            <Field
              label={result.mode === "free" ? "Assistant reply (editable)" : "AI reply — could not be parsed as JSON, edit as text"}
              htmlFor="th-raw"
            >
              <TextareaInput
                id="th-raw"
                rows={14}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="font-mono text-xs"
              />
            </Field>
          )}
        </Panel>
      )}

      <AssignDialog
        open={assignOpen}
        onOpenChange={setAssignOpen}
        activityId={savedId}
        activityTitle={titleOf()}
        classrooms={classroomsReq.data?.classrooms ?? []}
        onAssigned={() => {
          setResult(null);
          setEdited(null);
          setRawText("");
          setSavedId(null);
        }}
      />
    </div>
  );
}
