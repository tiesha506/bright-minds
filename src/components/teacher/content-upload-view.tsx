"use client";

// ---------------------------------------------------------------------------
// Content Upload + Intelligent Scanning + AI Generation (Teacher wizard).
// Step 1 Upload → Step 2 Scan (editable AI analysis) → Step 3 Generate
// (grounded, teacher-reviewed items + resources) → Step 4 Assign.
// Nothing reaches students without teacher review + approval.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  Link2,
  Sparkles,
  Loader2,
  Trash2,
  Plus,
  Wand2,
  ScanSearch,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  ExternalLink,
  ClipboardCheck,
  Library,
  Pencil,
  CircleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { AuthUser } from "@/lib/auth-store";
import { useToast } from "@/hooks/use-toast";
import { celebrate } from "@/lib/confetti";
import type { AgeGroup } from "@/lib/content/types";
import {
  AGE_GROUP_LABELS,
  DIFFICULTIES,
  GROUP_LABELS,
  SUBJECT_IDS,
  SUBJECT_LABELS,
} from "@/lib/teacher-types";
import type { Difficulty, SubjectId } from "@/lib/teacher-types";
import {
  GENERATE_KINDS,
  GENERATE_MODES,
  MATERIAL_ACCEPT_ATTR,
  MAX_MATERIAL_MB,
  RESOURCE_KIND_META,
  fileExtension,
  guessResourceKind,
  isValidHttpUrl,
} from "@/lib/teacher-materials";
import type {
  GenerateKind,
  GenerateMode,
  GeneratedItem,
  MaterialAnalysis,
  MaterialResource,
  MaterialSummary,
} from "@/lib/teacher-materials";
import {
  EmptyState,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  Panel,
  SelectInput,
  StatusChip,
  TextInput,
  TextareaInput,
} from "@/components/teacher/teacher-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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

// ------------------------------ small helpers ------------------------------

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `it-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Multipart fetch helper (api() always sends JSON — this one doesn't). */
async function apiForm<T>(path: string, form: FormData): Promise<T> {
  const token = useAuthStore.getState().token;
  const res = await fetch(path, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(typeof data.error === "string" ? data.error : `Upload failed (${res.status})`);
  }
  return data as T;
}

// ------------------------------- view state --------------------------------

type WizardStep = 1 | 2 | 3 | 4;
type Target = "class" | "group" | "students";

interface WorkingMaterial {
  id: string;
  title: string;
  subjectId: SubjectId;
  topic: string;
  status: string;
  analysis: MaterialAnalysis;
  fileName: string;
  fileKind: "document" | "image" | "multimedia" | "none";
  fileUrl: string;
  hasFile: boolean;
  extractedChars: number;
  extractedPreview: string;
  extractionNote: string;
  resources: MaterialResource[];
  createdAt: string;
}

interface EditorItem extends GeneratedItem {
  id: string;
}

interface RosterStudent {
  studentId: string;
  name: string;
  groupName: string;
  avatar: string;
  avatarColor: string;
  photoUrl: string;
}

interface ClassroomRow {
  id: string;
  name: string;
  studentCount: number;
}

const STEP_META: { n: WizardStep; label: string; emoji: string }[] = [
  { n: 1, label: "Upload", emoji: "📤" },
  { n: 2, label: "Scan", emoji: "🔍" },
  { n: 3, label: "Generate", emoji: "✨" },
  { n: 4, label: "Assign", emoji: "🎯" },
];

const SUBJECT_BADGE: Record<string, string> = {
  math: "bg-amber-100 text-amber-800",
  english: "bg-violet-100 text-violet-800",
  science: "bg-teal-100 text-teal-800",
  reading: "bg-rose-100 text-rose-800",
};

// ============================ list editor ===================================

function StringListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder,
  addLabel,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  const update = (i: number, value: string) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-slate-700">{label}</p>
      {hint && <p className="-mt-1 text-xs text-slate-400">{hint}</p>}
      {items.length === 0 && <p className="rounded-md bg-slate-50 px-2.5 py-2 text-xs text-slate-400">Nothing detected — add your own.</p>}
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-5 shrink-0 text-center text-xs font-bold text-slate-400">{i + 1}</span>
            <TextInput value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} aria-label={`${label} ${i + 1}`} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 text-slate-400 hover:text-rose-600"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              aria-label={`Remove ${label} ${i + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="h-10 gap-1.5 border-slate-300" onClick={() => onChange([...items, ""])}>
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </Button>
    </div>
  );
}

// ============================ item editor ===================================

function ItemCard({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: EditorItem;
  index: number;
  onChange: (next: EditorItem) => void;
  onRemove: () => void;
}) {
  const setOption = (i: number, value: string) => {
    const options = [...item.options];
    options[i] = value;
    onChange({ ...item, options });
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
          {index + 1}
        </span>
        <p className="flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Question</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-slate-400 hover:text-rose-600"
          onClick={onRemove}
          aria-label={`Delete question ${index + 1}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <TextareaInput
        rows={2}
        value={item.question}
        onChange={(e) => onChange({ ...item, question: e.target.value })}
        placeholder="Question text…"
        aria-label={`Question ${index + 1}`}
      />
      {item.options.length > 0 ? (
        <div className="mt-2 space-y-1.5">
          <p className="text-xs font-semibold text-slate-500">Multiple-choice options</p>
          {item.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-5 shrink-0 text-center text-xs font-bold text-slate-400">{String.fromCharCode(65 + i)}</span>
              <TextInput value={opt} onChange={(e) => setOption(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} aria-label={`Option ${String.fromCharCode(65 + i)} of question ${index + 1}`} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 shrink-0",
                  item.answer && item.answer === opt ? "text-emerald-600" : "text-slate-300 hover:text-emerald-600"
                )}
                onClick={() => onChange({ ...item, answer: opt })}
                aria-label={`Mark option ${String.fromCharCode(65 + i)} as the answer`}
                title="Mark as correct answer"
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="h-10 border-slate-300" onClick={() => onChange({ ...item, options: [...item.options, ""] })}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Option
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-10 text-slate-400" onClick={() => onChange({ ...item, options: [] })}>
              Remove choices
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="ghost" size="sm" className="mt-2 h-10 text-slate-400" onClick={() => onChange({ ...item, options: ["", "", "", ""] })}>
          <Plus className="mr-1 h-3.5 w-3.5" /> Add multiple-choice options
        </Button>
      )}
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Field label="Answer">
          <TextInput value={item.answer} onChange={(e) => onChange({ ...item, answer: e.target.value })} placeholder="Correct answer…" aria-label={`Answer for question ${index + 1}`} />
        </Field>
        <Field label="Hint (optional)">
          <TextInput value={item.hint} onChange={(e) => onChange({ ...item, hint: e.target.value })} placeholder="A short nudge…" aria-label={`Hint for question ${index + 1}`} />
        </Field>
      </div>
    </div>
  );
}

// ============================== main view ===================================

export function ContentUploadView({ user }: { user: AuthUser }) {
  const { toast } = useToast();

  // ------------------------------ top level --------------------------------
  const [tab, setTab] = useState<"create" | "library">("create");
  const [step, setStep] = useState<WizardStep>(1);

  // library
  const [materials, setMaterials] = useState<MaterialSummary[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(true);
  const [materialsError, setMaterialsError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // working material (wizard subject)
  const [material, setMaterial] = useState<WorkingMaterial | null>(null);
  const [busy, setBusy] = useState(false);
  const [recovering, setRecovering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // step 1
  const [file, setFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [subject, setSubject] = useState<SubjectId>("math");
  const [dragActive, setDragActive] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkKind, setLinkKind] = useState<"video" | "audio" | "link">("video");
  const [uploadPct, setUploadPct] = useState(0);
  const [uploadStage, setUploadStage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // step 3
  const [genKind, setGenKind] = useState<GenerateKind>("questions");
  const [genCount, setGenCount] = useState(6);
  const [genDifficulty, setGenDifficulty] = useState<Difficulty>("standard");
  const [genLevel, setGenLevel] = useState<AgeGroup>("primary");
  const [genMode, setGenMode] = useState<GenerateMode | "">("");
  const [genInstructions, setGenInstructions] = useState("");
  const [items, setItems] = useState<EditorItem[]>([]);
  const [basedOn, setBasedOn] = useState("");
  const [generating, setGenerating] = useState(false);

  // resources
  const [resKind, setResKind] = useState<"video" | "audio" | "link">("video");
  const [resTitle, setResTitle] = useState("");
  const [resUrl, setResUrl] = useState("");
  const resFileRef = useRef<HTMLInputElement>(null);

  // step 4
  const [classrooms, setClassrooms] = useState<ClassroomRow[]>([]);
  const [roster, setRoster] = useState<RosterStudent[]>([]);
  const [classroomId, setClassroomId] = useState("");
  const [target, setTarget] = useState<Target>("class");
  const [group, setGroup] = useState("B");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dueDate, setDueDate] = useState("");
  const [assignInstructions, setAssignInstructions] = useState("");
  const [approved, setApproved] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assigned, setAssigned] = useState<{ title: string; targetCount: number } | null>(null);

  // ------------------------------ data loads --------------------------------

  const loadMaterials = () => {
    setMaterialsLoading(true);
    setMaterialsError(null);
    api<{ materials: MaterialSummary[] }>("/api/teacher/materials")
      .then((d) => setMaterials(d.materials))
      .catch((e) => setMaterialsError(e instanceof Error ? e.message : "Could not load materials"))
      .finally(() => setMaterialsLoading(false));
  };

  useEffect(() => {
    api<{ classrooms: ClassroomRow[] }>("/api/teacher/classrooms")
      .then((d) => setClassrooms(d.classrooms))
      .catch(() => setClassrooms([]));
  }, [tab]);

  useEffect(() => {
    if (tab === "library") loadMaterials();
  }, [tab]);

  useEffect(() => {
    if (!classroomId) {
      setRoster([]);
      return;
    }
    let cancelled = false;
    api<{ students: RosterStudent[] }>(`/api/teacher/classrooms/${classroomId}`)
      .then((d) => {
        if (!cancelled) setRoster(d.students);
      })
      .catch(() => {
        if (!cancelled) setRoster([]);
      });
    return () => {
      cancelled = true;
    };
  }, [classroomId]);

  useEffect(() => {
    if (classrooms.length > 0 && !classroomId) setClassroomId(classrooms[0].id);
  }, [classrooms]);

  // ------------------------------ step 1 flow -------------------------------

  const startUpload = async (chosen: File) => {
    setError(null);
    setBusy(true);
    setUploadPct(8);
    const stages = ["Uploading file…", "Extracting text…", "Analyzing content with AI…", "Finishing up…"];
    let si = 0;
    setUploadStage(stages[0]);
    const timer = setInterval(() => {
      si = Math.min(si + 1, stages.length - 1);
      setUploadStage(stages[si]);
      setUploadPct((p) => Math.min(p + 18, 92));
    }, 2200);
    try {
      const form = new FormData();
      form.append("file", chosen);
      form.append("subjectId", subject);
      if (newTitle.trim()) form.append("title", newTitle.trim());
      const res = await apiForm<{ material: MaterialSummary & { extractionNote: string } }>("/api/teacher/upload", form);
      setUploadPct(100);
      setMaterial({ ...res.material, fileUrl: "", hasFile: true, extractedPreview: "", resources: [] });
      setItems([]);
      setBasedOn("");
      setApproved(false);
      setAssigned(null);
      setStep(2);
      toast({ title: "Material uploaded ✅", description: "Review the AI scan below — everything is editable." });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    } finally {
      clearInterval(timer);
      setBusy(false);
      setUploadStage("");
      setUploadPct(0);
    }
  };

  const onPickFile = (f: File | null) => {
    if (!f) return;
    const ext = fileExtension(f.name);
    if (!MATERIAL_ACCEPT_ATTR.split(",").includes(`.${ext}`)) {
      setError("Unsupported file type. Use PDF, DOCX, PPTX, JPG, PNG, MP4, MP3, WAV, TXT or MD.");
      return;
    }
    if (f.size > MAX_MATERIAL_MB * 1024 * 1024) {
      setError(`Files must be under ${MAX_MATERIAL_MB} MB.`);
      return;
    }
    setError(null);
    setFile(f);
    void startUpload(f);
  };

  const addLinkMaterial = async () => {
    setError(null);
    if (!isValidHttpUrl(linkUrl.trim())) {
      setError("Paste a valid link starting with http:// or https://");
      return;
    }
    setBusy(true);
    try {
      const res = await api<{ material: MaterialSummary & { extractionNote: string } }>("/api/teacher/materials", {
        method: "POST",
        body: {
          title: linkTitle.trim() || linkUrl.trim(),
          subjectId: subject,
          link: { kind: linkKind, title: linkTitle.trim(), url: linkUrl.trim() },
        },
      });
      setMaterial({ ...res.material, fileUrl: "", hasFile: false, extractedPreview: "", resources: [] });
      setItems([]);
      setStep(2);
      toast({ title: "Link attached 🔗", description: "Links can't be scanned — add a document for AI generation." });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the link.");
    } finally {
      setBusy(false);
    }
  };

  // ------------------------------ step 2 flow -------------------------------

  const rescan = async () => {
    if (!material) return;
    const needsRecovery = (material.extractedChars ?? 0) === 0;
    setError(null);
    if (needsRecovery) setRecovering(true);
    setBusy(true);
    try {
      const res = await api<{ material: MaterialSummary; recoveryNote?: string }>("/api/teacher/materials/analyze", {
        method: "POST",
        body: {
          materialId: material.id,
          subjectId: material.subjectId,
          allowSubjectOverride: false,
          rescan: needsRecovery,
        },
      });
      const recovered = (res.material.extractedChars ?? 0) > 0;
      setMaterial((m) =>
        m
          ? {
              ...m,
              topic: res.material.topic,
              subjectId: res.material.subjectId,
              analysis: res.material.analysis,
              status: res.material.status,
              extractedChars: res.material.extractedChars,
              extractionNote: recovered ? res.recoveryNote ?? "" : m.extractionNote,
            }
          : m
      );
      toast(
        recovered && needsRecovery
          ? { title: "Text recovered 🎉", description: "The pages were read with AI scanning — you can generate from this material now." }
          : { title: "Re-scan complete 🔍", description: "The AI analysis was refreshed." }
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Re-scan failed. Please try again.");
    } finally {
      setBusy(false);
      setRecovering(false);
    }
  };

  const saveEdits = async (opts: { silent?: boolean; markReady?: boolean } = {}) => {
    if (!material) return;
    setError(null);
    setBusy(true);
    try {
      const body: Record<string, unknown> = {
        title: material.title,
        topic: material.topic,
        subjectId: material.subjectId,
        analysis: material.analysis,
      };
      if (opts.markReady) body.status = "ready";
      await api(`/api/teacher/materials/${material.id}`, { method: "PATCH", body });
      if (!opts.silent) toast({ title: "Saved ✅", description: "Your corrections were saved." });
    } catch (e) {
      if (!opts.silent) setError(e instanceof Error ? e.message : "Could not save changes.");
      throw e;
    } finally {
      setBusy(false);
    }
  };

  const openMaterial = async (id: string) => {
    setError(null);
    setBusy(true);
    try {
      const res = await api<{ material: WorkingMaterial }>(`/api/teacher/materials/${id}`);
      setMaterial(res.material);
      setItems([]);
      setBasedOn("");
      setApproved(false);
      setAssigned(null);
      setTab("create");
      setStep(2);
    } catch (e) {
      toast({ title: "Could not open material", description: e instanceof Error ? e.message : "Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const deleteMaterial = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api(`/api/teacher/materials/${deleteId}`, { method: "DELETE" });
      setMaterials((m) => m.filter((x) => x.id !== deleteId));
      if (material?.id === deleteId) resetWizard();
      toast({ title: "Material deleted" });
    } catch (e) {
      toast({ title: "Delete failed", description: e instanceof Error ? e.message : "Please try again." });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  // ------------------------------ step 3 flow -------------------------------

  const generate = async () => {
    if (!material) return;
    setError(null);
    setGenerating(true);
    try {
      const res = await api<{ items: GeneratedItem[]; basedOn: string }>("/api/ai/generate", {
        method: "POST",
        body: {
          materialId: material.id,
          kind: genKind,
          count: genCount,
          difficulty: genDifficulty,
          level: genLevel,
          mode: genMode || undefined,
          instructions: genInstructions.trim() || undefined,
          topic: material.topic || undefined,
        },
      });
      setItems(res.items.map((it) => ({ ...it, id: uid(), options: it.options ?? [] })));
      setBasedOn(res.basedOn);
      toast({ title: `${res.items.length} ${genKind} ready ✨`, description: "Edit anything below, then continue to Assign." });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  // ---------------------------- resource flow -------------------------------

  const refreshResources = async () => {
    if (!material) return;
    try {
      const res = await api<{ resources: MaterialResource[] }>(`/api/teacher/materials/${material.id}/resources`);
      setMaterial((m) => (m ? { ...m, resources: res.resources } : m));
    } catch {
      // keep old list on failure
    }
  };

  const addResourceLink = async () => {
    if (!material) return;
    if (!isValidHttpUrl(resUrl.trim())) {
      toast({ title: "Invalid link", description: "Links must start with http:// or https://", variant: "destructive" as never });
      return;
    }
    setBusy(true);
    try {
      await api(`/api/teacher/materials/${material.id}/resources`, {
        method: "POST",
        body: { kind: resKind, source: "link", title: resTitle.trim() || resUrl.trim(), url: resUrl.trim() },
      });
      setResTitle("");
      setResUrl("");
      await refreshResources();
      toast({ title: "Resource added 🔗" });
    } catch (e) {
      toast({ title: "Could not add resource", description: e instanceof Error ? e.message : undefined });
    } finally {
      setBusy(false);
    }
  };

  const addResourceFile = async (f: File | null) => {
    if (!material || !f) return;
    if (f.size > MAX_MATERIAL_MB * 1024 * 1024) {
      toast({ title: "File too large", description: `Files must be under ${MAX_MATERIAL_MB} MB.` });
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.append("file", f);
      form.append("kind", guessResourceKind(f.name));
      form.append("title", f.name);
      await apiForm(`/api/teacher/materials/${material.id}/resources`, form);
      await refreshResources();
      toast({ title: "Resource attached 📎", description: f.name });
    } catch (e) {
      toast({ title: "Upload failed", description: e instanceof Error ? e.message : undefined });
    } finally {
      setBusy(false);
      if (resFileRef.current) resFileRef.current.value = "";
    }
  };

  const removeResource = async (resourceId: string) => {
    if (!material) return;
    try {
      await api(`/api/teacher/materials/${material.id}/resources/${resourceId}`, { method: "DELETE" });
      setMaterial((m) => (m ? { ...m, resources: m.resources.filter((r) => r.id !== resourceId) } : m));
    } catch (e) {
      toast({ title: "Could not remove resource", description: e instanceof Error ? e.message : undefined });
    }
  };

  // ------------------------------ step 4 flow -------------------------------

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of roster) {
      if (s.groupName) counts[s.groupName] = (counts[s.groupName] ?? 0) + 1;
    }
    return counts;
  }, [roster]);

  const targetIds = useMemo(() => {
    if (target === "students") return Array.from(selected);
    if (target === "group") return roster.filter((s) => s.groupName === group).map((s) => s.studentId);
    return roster.map((s) => s.studentId);
  }, [target, selected, group, roster]);

  const targetLabel = useMemo(() => {
    const room = classrooms.find((c) => c.id === classroomId);
    if (target === "group") return `${GROUP_LABELS[group] ?? `Group ${group}`} in ${room?.name ?? "classroom"} — ${targetIds.length} student${targetIds.length === 1 ? "" : "s"}`;
    if (target === "students") return `Selected students in ${room?.name ?? "classroom"} — ${targetIds.length}`;
    return `Entire ${room?.name ?? "classroom"} — ${targetIds.length} student${targetIds.length === 1 ? "" : "s"}`;
  }, [target, group, classroomId, classrooms, targetIds.length]);

  const assign = async () => {
    if (!material || !approved) return;
    setError(null);
    setAssigning(true);
    try {
      const res = await api<{ assignment: { title: string; targetCount: number } }>(`/api/teacher/materials/${material.id}/assign`, {
        method: "POST",
        body: {
          classroomId,
          groupName: target === "group" ? group : null,
          studentIds: target === "students" ? Array.from(selected) : [],
          level: genLevel,
          difficulty: genDifficulty,
          questionCount: items.length,
          dueDate,
          instructions: assignInstructions.trim() || undefined,
          title: material.title,
          generated: {
            items: items.map((it) => ({ question: it.question, answer: it.answer, options: it.options, hint: it.hint })),
            basedOn,
          },
        },
      });
      setAssigned({ title: res.assignment.title, targetCount: res.assignment.targetCount });
      celebrate("big");
      toast({ title: "Assigned! 🎉", description: `${res.assignment.title} → ${res.assignment.targetCount} student${res.assignment.targetCount === 1 ? "" : "s"}.` });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not assign. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  const resetWizard = () => {
    setMaterial(null);
    setFile(null);
    setNewTitle("");
    setLinkUrl("");
    setLinkTitle("");
    setItems([]);
    setBasedOn("");
    setAssignInstructions("");
    setDueDate("");
    setApproved(false);
    setAssigned(null);
    setSelected(new Set());
    setTarget("class");
    setStep(1);
    setError(null);
  };

  // ------------------------------- analysis edit ----------------------------

  const setAnalysis = (patch: Partial<MaterialAnalysis>) => {
    setMaterial((m) => (m ? { ...m, analysis: { ...m.analysis, ...patch } } : m));
  };

  const hasText = (material?.extractedChars ?? 0) > 0;

  // ================================ render ==================================

  return (
    <div>
      <PageHeader
        emoji="📤"
        title="Content Studio"
        subtitle={`Upload material, let AI scan it, generate questions, review and assign — ${user.name.split(" ")[0]}'s intelligent workflow.`}
        actions={
          <div className="flex rounded-lg border border-slate-200 bg-white p-1" role="tablist" aria-label="Content studio sections">
            {(
              [
                ["create", "Create", <Sparkles key="s" className="h-4 w-4" />],
                ["library", `My Materials${materials.length > 0 ? ` (${materials.length})` : ""}`, <Library key="l" className="h-4 w-4" />],
              ] as ["create" | "library", string, React.ReactNode][]
            ).map(([key, label, icon]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  "flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition-colors",
                  tab === key ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        }
      />

      {error && (
        <div className="mb-4">
          <ErrorNote message={error} />
          <button type="button" className="sr-only" onClick={() => setError(null)}>
            dismiss
          </button>
        </div>
      )}

      {tab === "library" ? (
        <LibraryTab materials={materials} loading={materialsLoading} error={materialsError} onOpen={openMaterial} onDelete={setDeleteId} onReload={loadMaterials} />
      ) : assigned ? (
        <SuccessPanel assigned={assigned} onDone={resetWizard} onLibrary={() => { resetWizard(); setTab("library"); }} />
      ) : (
        <div className="space-y-4">
          {/* ---------------------------- stepper ---------------------------- */}
          <ol className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:gap-3">
            {STEP_META.map((s, i) => {
              const state = step === s.n ? "current" : step > s.n ? "done" : "todo";
              const reachable = s.n < step;
              return (
                <li key={s.n} className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    disabled={!reachable || busy}
                    onClick={() => reachable && setStep(s.n)}
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded-lg px-1.5 py-1 text-left transition-colors sm:px-2",
                      reachable ? "hover:bg-slate-50" : "cursor-default"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        state === "current" && "bg-emerald-600 text-white",
                        state === "done" && "bg-emerald-100 text-emerald-700",
                        state === "todo" && "bg-slate-100 text-slate-400"
                      )}
                    >
                      {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                    </span>
                    <span className={cn("hidden truncate text-xs font-bold sm:block", state === "current" ? "text-slate-900" : "text-slate-400")}>
                      {s.emoji} {s.label}
                    </span>
                  </button>
                  {i < STEP_META.length - 1 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />}
                </li>
              );
            })}
          </ol>

          {/* --------------------------- STEP 1 ------------------------------ */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              <Panel title="1 · Upload material" subtitle="PDF, Word, PowerPoint, photos, audio or video — up to 50 MB." className="lg:col-span-3">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Upload a file"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    onPickFile(e.dataTransfer.files?.[0] ?? null);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
                    dragActive ? "border-emerald-500 bg-emerald-50" : "border-slate-300 bg-slate-50/60 hover:border-emerald-400 hover:bg-emerald-50/40"
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                    <UploadCloud className="h-6 w-6" aria-hidden />
                  </span>
                  {busy && uploadStage ? (
                    <div className="w-full max-w-xs space-y-2">
                      <p className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                        <Loader2 className="h-4 w-4 animate-spin" /> {uploadStage}
                      </p>
                      <Progress value={uploadPct} className="h-2" />
                    </div>
                  ) : file ? (
                    <>
                      <p className="max-w-full truncate text-sm font-semibold text-slate-800">{file.name}</p>
                      <p className="text-xs text-slate-400">Click to choose a different file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-slate-700">Drag &amp; drop a file, or click to browse</p>
                      <p className="text-xs text-slate-400">PDF · DOCX · PPTX · photos (AI reads them) · MP4 · MP3 · TXT</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={MATERIAL_ACCEPT_ATTR}
                    className="hidden"
                    onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Subject (required)" htmlFor="cu-subject">
                    <SelectInput id="cu-subject" value={subject} onChange={(e) => setSubject(e.target.value as SubjectId)}>
                      {SUBJECT_IDS.map((s) => (
                        <option key={s} value={s}>
                          {SUBJECT_LABELS[s]}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                  <Field label="Title (optional)" htmlFor="cu-title">
                    <Input id="cu-title" className="h-10 border-slate-300 text-sm" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Defaults to the file name" maxLength={160} />
                  </Field>
                </div>
                <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-emerald-50/70 px-3 py-2 text-xs text-emerald-800">
                  <ScanSearch className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  BrightMinds scans the file immediately: text is extracted, then AI detects the topic, objectives, vocabulary and difficulty — all editable on the next step.
                </p>
              </Panel>

              <Panel title="Or attach a link" subtitle="Videos, audio and websites ride along as resources." className="lg:col-span-2">
                <div className="space-y-3">
                  <Field label="Type">
                    <div className="grid grid-cols-3 gap-2">
                      {(["video", "audio", "link"] as const).map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setLinkKind(k)}
                          className={cn(
                            "min-h-11 rounded-lg border px-2 text-xs font-semibold capitalize transition-colors",
                            linkKind === k ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          )}
                        >
                          {RESOURCE_KIND_META[k].emoji} {RESOURCE_KIND_META[k].label}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Link (https://…)" htmlFor="cu-link-url">
                    <Input id="cu-link-url" className="h-10 border-slate-300 text-sm" type="url" inputMode="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://youtube.com/watch?v=…" />
                  </Field>
                  <Field label="Title (optional)" htmlFor="cu-link-title">
                    <Input id="cu-link-title" className="h-10 border-slate-300 text-sm" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} placeholder="e.g. Fractions explained video" />
                  </Field>
                  <Button type="button" disabled={busy || !linkUrl.trim()} onClick={addLinkMaterial} className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700">
                    <Link2 className="mr-2 h-4 w-4" /> Add link material
                  </Button>
                  <p className="text-xs text-slate-400">Link-only materials can&apos;t be AI-scanned — upload a document when you want generated questions.</p>
                </div>
              </Panel>
            </div>
          )}

          {/* --------------------------- STEP 2 ------------------------------ */}
          {step === 2 && material && (
            <div className="space-y-4">
              <Panel
                title="2 · Detected content"
                subtitle="The AI scan is a first draft — correct anything before generating."
                actions={
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 border-slate-300"
                      onClick={rescan}
                      disabled={busy || (!hasText && !(material.hasFile && material.fileKind === "document"))}
                    >
                      <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", busy && "animate-spin")} />
                      {hasText ? "Re-scan" : "Try AI page reading"}
                    </Button>
                    <Button type="button" size="sm" className="h-10 bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => saveEdits()} disabled={busy}>
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Save corrections
                    </Button>
                  </div>
                }
              >
                {material.extractionNote && (
                  <p className="mb-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {material.extractionNote}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Title" htmlFor="m-title">
                    <Input id="m-title" className="h-10 border-slate-300 text-sm" value={material.title} onChange={(e) => setMaterial({ ...material, title: e.target.value })} maxLength={160} />
                  </Field>
                  <Field label="Subject (your selection is used for assignments)" htmlFor="m-subject">
                    <SelectInput id="m-subject" value={material.subjectId} onChange={(e) => setMaterial({ ...material, subjectId: e.target.value as SubjectId })}>
                      {SUBJECT_IDS.map((s) => (
                        <option key={s} value={s}>
                          {SUBJECT_LABELS[s]}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                  <Field label="Topic" htmlFor="m-topic" hint={material.topic ? "Detected — edit if needed" : "Add a short topic name"}>
                    <Input id="m-topic" className="h-10 border-slate-300 text-sm" value={material.topic} onChange={(e) => setMaterial({ ...material, topic: e.target.value })} placeholder="e.g. Adding fractions" maxLength={120} />
                  </Field>
                  <Field label="Difficulty">
                    <SelectInput value={material.analysis.difficulty} onChange={(e) => setAnalysis({ difficulty: e.target.value as Difficulty })}>
                      {DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>
                          {d === "mild" ? "Mild — easier" : d === "standard" ? "Standard — on level" : "Tricky — stretch"}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <StringListEditor label="Learning objectives" items={material.analysis.objectives} onChange={(objectives) => setAnalysis({ objectives })} placeholder="Students will be able to…" addLabel="Add objective" />
                  <StringListEditor label="Key concepts" items={material.analysis.concepts} onChange={(concepts) => setAnalysis({ concepts })} placeholder="e.g. Equivalent fractions" addLabel="Add concept" />
                  <StringListEditor label="Vocabulary" items={material.analysis.vocabulary} onChange={(vocabulary) => setAnalysis({ vocabulary })} placeholder="e.g. numerator" addLabel="Add word" />
                  <StringListEditor label="Questions found in the material" items={material.analysis.questions} onChange={(questions) => setAnalysis({ questions })} placeholder="A question detected in the document" addLabel="Add question" />
                </div>

                <div className="mt-4">
                  <Field label="Summary" htmlFor="m-summary">
                    <TextareaInput id="m-summary" rows={2} value={material.analysis.summary} onChange={(e) => setAnalysis({ summary: e.target.value })} placeholder="1-3 sentences describing this material…" />
                  </Field>
                </div>

                {material.extractedPreview && (
                  <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
                    <summary className="cursor-pointer text-xs font-semibold text-slate-500">
                      Extracted text preview · {material.extractedChars.toLocaleString()} characters
                    </summary>
                    <p className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-slate-600 nice-scroll">{material.extractedPreview}…</p>
                  </details>
                )}
              </Panel>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <Button type="button" variant="outline" className="h-11 border-slate-300" onClick={() => setStep(1)} disabled={busy}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Upload another
                </Button>
                <Button
                  type="button"
                  className="h-11 bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={async () => {
                    try {
                      await saveEdits({ silent: true });
                      setStep(3);
                    } catch {
                      /* error already shown */
                    }
                  }}
                  disabled={busy}
                >
                  Continue to Generate <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* --------------------------- STEP 3 ------------------------------ */}
          {step === 3 && material && (
            <div className="space-y-4">
              <Panel
                title="3 · Generate from this material"
                subtitle="Questions are grounded in YOUR document — nothing invented, nothing sent to students yet."
              >
                {!hasText ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800">
                    {material.hasFile && material.fileKind === "document" ? (
                      <div className="space-y-2">
                        <p className="font-medium">
                          No readable text was found in this document — it may be scanned pages or built from pictures.
                        </p>
                        <p>AI page scanning (OCR) can read the pages, including text inside diagrams, and recover the content.</p>
                        <Button type="button" size="sm" className="h-10 bg-amber-600 text-white hover:bg-amber-700" onClick={rescan} disabled={busy}>
                          <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", recovering && "animate-spin")} />
                          {recovering ? "Reading the pages… (this can take up to a minute)" : "Try AI page reading (OCR)"}
                        </Button>
                      </div>
                    ) : (
                      <p>
                        This material has no readable text (video, audio or a link), so AI generation is unavailable. Attach it to an
                        assignment from the Assignments tab, or upload a document to generate from.
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                      {GENERATE_KINDS.map((k) => (
                        <button
                          key={k.value}
                          type="button"
                          onClick={() => setGenKind(k.value)}
                          title={k.hint}
                          className={cn(
                            "min-h-11 rounded-lg border px-2.5 py-2 text-left transition-colors",
                            genKind === k.value ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-200" : "border-slate-200 hover:bg-slate-50"
                          )}
                        >
                          <span className="block text-base leading-none" aria-hidden>
                            {k.emoji}
                          </span>
                          <span className={cn("mt-1 block text-xs font-bold", genKind === k.value ? "text-emerald-700" : "text-slate-600")}>{k.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Field label={`How many · ${genCount}`} htmlFor="gen-count">
                        <div className="flex h-10 items-center px-1">
                          <Slider id="gen-count" min={1} max={20} step={1} value={[genCount]} onValueChange={(v) => setGenCount(v[0] ?? 6)} aria-label="Number of items" />
                        </div>
                      </Field>
                      <Field label="Difficulty">
                        <SelectInput value={genDifficulty} onChange={(e) => setGenDifficulty(e.target.value as Difficulty)}>
                          {DIFFICULTIES.map((d) => (
                            <option key={d} value={d}>
                              {d === "mild" ? "Mild — easier" : d === "standard" ? "Standard — on level" : "Tricky — stretch"}
                            </option>
                          ))}
                        </SelectInput>
                      </Field>
                      <Field label="Age group">
                        <SelectInput value={genLevel} onChange={(e) => setGenLevel(e.target.value as AgeGroup)}>
                          {(Object.keys(AGE_GROUP_LABELS) as AgeGroup[]).map((g) => (
                            <option key={g} value={g}>
                              {AGE_GROUP_LABELS[g]}
                            </option>
                          ))}
                        </SelectInput>
                      </Field>
                      <Field label="Variant (optional)">
                        <div className="grid grid-cols-3 gap-1.5">
                          {GENERATE_MODES.map((m) => (
                            <button
                              key={m.value}
                              type="button"
                              title={m.label}
                              onClick={() => setGenMode(genMode === m.value ? "" : m.value)}
                              className={cn(
                                "min-h-11 rounded-lg border text-sm transition-colors",
                                genMode === m.value ? "border-emerald-600 bg-emerald-50" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                              )}
                              aria-pressed={genMode === m.value}
                            >
                              {m.emoji}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>

                    <div className="mt-3">
                      <Field label="Extra instructions (optional)" htmlFor="gen-instructions">
                        <TextareaInput
                          id="gen-instructions"
                          rows={2}
                          value={genInstructions}
                          onChange={(e) => setGenInstructions(e.target.value)}
                          placeholder="e.g. focus on word problems, use denominators under 10, include one real-life example…"
                        />
                      </Field>
                    </div>

                    <Button
                      type="button"
                      className="mt-4 h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                      onClick={generate}
                      disabled={generating || !hasText}
                    >
                      {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      {generating ? "Generating…" : `Generate ${genCount} ${GENERATE_KINDS.find((k) => k.value === genKind)?.label ?? "items"}`}
                    </Button>
                  </>
                )}
              </Panel>

              {items.length > 0 && (
                <Panel
                  title={`Generated items · ${items.length} ${basedOn ? `· based on “${basedOn}”` : ""}`}
                  subtitle="Edit anything — the teacher decides what ships."
                  actions={
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 border-slate-300"
                      onClick={() => setItems((prev) => [...prev, { id: uid(), question: "", answer: "", options: [], hint: "" }])}
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5" /> Add row
                    </Button>
                  }
                >
                  <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1 nice-scroll">
                    {items.map((item, i) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        index={i}
                        onChange={(next) => setItems((prev) => prev.map((it) => (it.id === item.id ? next : it)))}
                        onRemove={() => setItems((prev) => prev.filter((it) => it.id !== item.id))}
                      />
                    ))}
                  </div>
                </Panel>
              )}

              {/* ------------------------- resources ------------------------- */}
              <Panel title="Attach resources" subtitle="The original file plus videos, audio, links — everything ships with the assignment.">
                <ul className="space-y-2">
                  {material.hasFile && (
                    <li className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                      <span aria-hidden className="text-lg">{material.fileKind === "multimedia" ? "🎬" : material.fileKind === "image" ? "🖼️" : "📄"}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{material.fileName || "Original file"}</p>
                        <p className="text-xs text-slate-400">Uploaded material</p>
                      </div>
                      {material.fileUrl && (
                        <a href={material.fileUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-xs font-semibold text-slate-600 hover:bg-white">
                          <Download className="h-3.5 w-3.5" /> Download
                        </a>
                      )}
                    </li>
                  )}
                  {material.resources.map((r) => (
                    <li key={r.id} className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                      <span aria-hidden className="text-lg">{RESOURCE_KIND_META[r.kind as keyof typeof RESOURCE_KIND_META]?.emoji ?? "📎"}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{r.title}</p>
                        <p className="text-xs text-slate-400">
                          {RESOURCE_KIND_META[r.kind as keyof typeof RESOURCE_KIND_META]?.label ?? r.kind}
                          {r.source === "upload" ? " · upload" : ""}
                        </p>
                      </div>
                      {r.source === "link" && r.url ? (
                        <a href={r.url} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                          <ExternalLink className="h-3.5 w-3.5" /> Open
                        </a>
                      ) : r.fileUrl ? (
                        <a href={r.fileUrl} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                          <Download className="h-3.5 w-3.5" /> Download
                        </a>
                      ) : null}
                      <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-slate-400 hover:text-rose-600" onClick={() => removeResource(r.id)} aria-label={`Remove ${r.title}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                  {!material.hasFile && material.resources.length === 0 && (
                    <li className="rounded-lg bg-slate-50 px-3 py-3 text-xs text-slate-400">No resources yet — add a video, audio file or link below.</li>
                  )}
                </ul>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-12">
                  <SelectInput aria-label="Resource type" value={resKind} onChange={(e) => setResKind(e.target.value as "video" | "audio" | "link")} className="sm:col-span-2">
                    <option value="video">🎬 Video</option>
                    <option value="audio">🎧 Audio</option>
                    <option value="link">🔗 Link</option>
                  </SelectInput>
                  <Input aria-label="Resource title" className="h-10 border-slate-300 text-sm sm:col-span-3" value={resTitle} onChange={(e) => setResTitle(e.target.value)} placeholder="Title (optional)" />
                  <Input aria-label="Resource URL" className="h-10 border-slate-300 text-sm sm:col-span-5" type="url" value={resUrl} onChange={(e) => setResUrl(e.target.value)} placeholder="https://…" />
                  <Button type="button" className="h-10 bg-slate-800 text-white hover:bg-slate-900 sm:col-span-2" onClick={addResourceLink} disabled={busy || !resUrl.trim()}>
                    <Plus className="mr-1 h-4 w-4" /> Add
                  </Button>
                </div>
                <div className="mt-2">
                  <input
                    ref={resFileRef}
                    type="file"
                    accept={MATERIAL_ACCEPT_ATTR}
                    className="hidden"
                    onChange={(e) => void addResourceFile(e.target.files?.[0] ?? null)}
                  />
                  <Button type="button" variant="outline" className="h-11 border-slate-300" onClick={() => resFileRef.current?.click()} disabled={busy}>
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload video / audio / file
                  </Button>
                </div>
              </Panel>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <Button type="button" variant="outline" className="h-11 border-slate-300" onClick={() => setStep(2)} disabled={busy}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to scan
                </Button>
                <Button type="button" className="h-11 bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => setStep(4)} disabled={busy || items.length === 0}>
                  {items.length === 0 ? "Generate items first" : `Review & assign (${items.length} items)`} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* --------------------------- STEP 4 ------------------------------ */}
          {step === 4 && material && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Panel title="4 · Choose who gets it" subtitle="Assign to an entire classroom, a differentiated group, or a hand-picked selection.">
                {classrooms.length === 0 ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800">
                    You have no classrooms yet. Create one in the <strong>Classrooms</strong> tab, then come back to assign.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Field label="Classroom" htmlFor="as-class">
                      <SelectInput id="as-class" value={classroomId} onChange={(e) => { setClassroomId(e.target.value); setSelected(new Set()); }}>
                        {classrooms.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.studentCount} students)
                          </option>
                        ))}
                      </SelectInput>
                    </Field>

                    <Field label="Assign to">
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            ["class", "Entire class", "🏫"],
                            ["group", "A group", "👥"],
                            ["students", "Selected", "✅"],
                          ] as [Target, string, string][]
                        ).map(([value, label, emoji]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setTarget(value)}
                            className={cn(
                              "min-h-11 rounded-lg border px-2 text-xs font-semibold transition-colors",
                              target === value ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {emoji} {label}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {target === "group" && (
                      <Field label="Group" htmlFor="as-group">
                        <SelectInput id="as-group" value={group} onChange={(e) => setGroup(e.target.value)}>
                          {["A", "B", "C"].map((g) => (
                            <option key={g} value={g}>
                              {GROUP_LABELS[g]} — {groupCounts[g] ?? 0} student{(groupCounts[g] ?? 0) === 1 ? "" : "s"}
                            </option>
                          ))}
                        </SelectInput>
                      </Field>
                    )}

                    {target === "students" && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-700">Students · {selected.size} selected</p>
                        <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2 nice-scroll">
                          {roster.length === 0 && <p className="p-2 text-xs text-slate-400">This classroom is empty.</p>}
                          {roster.map((s) => (
                            <label key={s.studentId} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-sm hover:bg-slate-50">
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
                                aria-label={`Select ${s.name}`}
                              />
                              <span className="flex-1 truncate font-medium">{s.name}</span>
                              {s.groupName && <span className="text-xs text-slate-400">Group {s.groupName}</span>}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Due date (optional)" htmlFor="as-due">
                        <Input id="as-due" type="date" className="h-10 border-slate-300 text-sm" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                      </Field>
                      <Field label="Questions in this assignment" htmlFor="as-count">
                        <Input id="as-count" type="number" min={1} max={20} className="h-10 border-slate-300 text-sm" value={items.length} readOnly aria-readonly />
                      </Field>
                    </div>

                    <Field label="Instructions for students (optional)" htmlFor="as-instructions">
                      <TextareaInput id="as-instructions" rows={2} value={assignInstructions} onChange={(e) => setAssignInstructions(e.target.value)} placeholder="e.g. Show your working for questions 3-5. Watch the video first!" />
                    </Field>
                  </div>
                )}
              </Panel>

              <Panel title="Review & approve" subtitle="Final check before anything reaches students.">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <p className="text-sm font-bold text-slate-900">{material.title}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge className={cn("border-0", SUBJECT_BADGE[material.subjectId])}>{SUBJECT_LABELS[material.subjectId]}</Badge>
                    <Badge variant="outline" className="border-slate-300 text-slate-600">{AGE_GROUP_LABELS[genLevel]}</Badge>
                    <Badge variant="outline" className="border-slate-300 text-slate-600">{genDifficulty}</Badge>
                    <Badge variant="outline" className="border-slate-300 text-slate-600">{items.length} questions</Badge>
                    {material.resources.length > 0 && <Badge variant="outline" className="border-slate-300 text-slate-600">+{material.resources.length} resources</Badge>}
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    <ClipboardCheck className="mr-1 inline h-3.5 w-3.5" aria-hidden />
                    Going to <strong>{targetLabel || "—"}</strong>
                    {dueDate && (
                      <>
                        {" "}· due <strong>{dueDate}</strong>
                      </>
                    )}
                  </p>
                  <div className="mt-3 max-h-40 space-y-1 overflow-y-auto rounded-lg bg-white px-3 py-2 nice-scroll">
                    {items.slice(0, 4).map((it, i) => (
                      <p key={it.id} className="truncate text-xs text-slate-600">
                        <span className="font-bold text-slate-400">{i + 1}.</span> {it.question || "(empty question)"}
                      </p>
                    ))}
                    {items.length > 4 && <p className="text-xs italic text-slate-400">…and {items.length - 4} more</p>}
                    {items.length === 0 && <p className="text-xs text-slate-400">No questions yet.</p>}
                  </div>
                </div>

                <label className="mt-4 flex min-h-11 cursor-pointer items-start gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm hover:bg-slate-50">
                  <Checkbox checked={approved} onCheckedChange={(v) => setApproved(v === true)} aria-label="Approve assignment" />
                  <span className="text-slate-600">
                    I have <strong>reviewed every question and answer</strong> and approve sending this to students. Questions only — answers stay with me.
                  </span>
                </label>

                {assigned === null && error && <div className="mt-3"><ErrorNote message={error} /></div>}

                <Button
                  type="button"
                  className="mt-4 h-12 w-full bg-emerald-600 text-base text-white hover:bg-emerald-700"
                  onClick={assign}
                  disabled={!approved || assigning || targetIds.length === 0 || items.length === 0}
                >
                  {assigning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {assigning ? "Assigning…" : `Assign to ${targetIds.length} student${targetIds.length === 1 ? "" : "s"}`}
                </Button>
              </Panel>

              <div className="lg:col-span-2">
                <Button type="button" variant="outline" className="h-11 border-slate-300" onClick={() => setStep(3)} disabled={assigning}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to editing
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this material?</AlertDialogTitle>
            <AlertDialogDescription>
              The uploaded file, its scan and attached resources are removed. Existing assignments keep their copy. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 text-white hover:bg-rose-700"
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                void deleteMaterial();
              }}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================== library tab =================================

function LibraryTab({
  materials,
  loading,
  error,
  onOpen,
  onDelete,
  onReload,
}: {
  materials: MaterialSummary[];
  loading: boolean;
  error: string | null;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onReload: () => void;
}) {
  if (loading) return <Loading label="Loading materials…" />;
  if (error) return <ErrorNote message={error} />;
  if (materials.length === 0) {
    return (
      <Panel>
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title="No materials yet"
          hint="Upload a lesson PDF, a worksheet photo or a slide deck in the Create tab — BrightMinds will scan it and build questions with you."
        />
        <div className="flex justify-center pb-4">
          <Button type="button" onClick={onReload} variant="outline" className="h-11 border-slate-300">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </Panel>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {materials.map((m) => (
        <Panel key={m.id} className="flex flex-col">
          <div className="flex items-start gap-2">
            <span aria-hidden className="text-xl">{m.fileKind === "multimedia" ? "🎬" : m.fileKind === "image" ? "🖼️" : m.hasFile ? "📄" : "🔗"}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900" title={m.title}>{m.title}</p>
              <p className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            <StatusChip status={m.status} />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge className={cn("border-0", SUBJECT_BADGE[m.subjectId])}>{SUBJECT_LABELS[m.subjectId]}</Badge>
            {m.topic && <Badge variant="outline" className="max-w-full truncate border-slate-300 font-normal text-slate-600">{m.topic}</Badge>}
          </div>
          {m.analysis.summary && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{m.analysis.summary}</p>}
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
            <span>{m.extractedChars > 0 ? `${m.extractedChars.toLocaleString()} chars` : "no text"}</span>
            <span>{m.resourceCount} resource{m.resourceCount === 1 ? "" : "s"}</span>
            <span>{m.analysis.concepts.length} concepts</span>
          </div>
          <div className="mt-auto flex gap-2 pt-3">
            <Button type="button" size="sm" className="h-10 flex-1 bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => onOpen(m.id)}>
              <Pencil className="mr-1.5 h-3.5 w-3.5" /> Open wizard
            </Button>
            <Button type="button" size="sm" variant="outline" className="h-10 border-slate-300 text-slate-500 hover:text-rose-600" onClick={() => onDelete(m.id)} aria-label={`Delete ${m.title}`}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      ))}
    </div>
  );
}

// ============================== success panel ===============================

function SuccessPanel({
  assigned,
  onDone,
  onLibrary,
}: {
  assigned: { title: string; targetCount: number };
  onDone: () => void;
  onLibrary: () => void;
}) {
  return (
    <Panel className="mx-auto max-w-xl text-center">
      <div className="flex flex-col items-center gap-3 py-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden />
        </span>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Assignment sent! 🎉</h2>
        <p className="max-w-sm text-sm text-slate-500">
          <strong>{assigned.title}</strong> is now visible to {assigned.targetCount} student{assigned.targetCount === 1 ? "" : "s"} — questions only, answers stay with you.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Button type="button" className="h-11 bg-emerald-600 text-white hover:bg-emerald-700" onClick={onDone}>
            <UploadCloud className="mr-2 h-4 w-4" /> Upload another material
          </Button>
          <Button type="button" variant="outline" className="h-11 border-slate-300" onClick={onLibrary}>
            <Library className="mr-2 h-4 w-4" /> My materials
          </Button>
        </div>
      </div>
    </Panel>
  );
}
