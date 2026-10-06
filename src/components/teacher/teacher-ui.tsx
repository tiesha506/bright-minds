"use client";

// ---------------------------------------------------------------------------
// Shared widgets for the Teacher space (slate surfaces + emerald accent).
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SCORE_BAND_LABELS,
  SCORE_BAND_STYLES,
  scoreBand,
  fmtPct,
  ASSIGNMENT_TYPE_LABELS,
  GROUP_LABELS,
} from "@/lib/teacher-types";
import type { RosterEntry, TeacherClassroomSummary } from "@/lib/teacher-types";
import { Avatar } from "@/components/shared/avatar";

// ------------------------------- Panels ------------------------------------

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm print-full",
        className
      )}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <div className="min-w-0 flex-1">
            {title && <h2 className="truncate text-sm font-bold text-slate-900">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function PageHeader({
  emoji,
  title,
  subtitle,
  actions,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3 no-print">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl ring-1 ring-emerald-100" aria-hidden>
        {emoji}
      </span>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
      {message}
    </div>
  );
}

export function EmptyState({ icon, title, hint }: { icon?: React.ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-10 text-center">
      <span className="text-slate-300">{icon ?? <Inbox className="h-8 w-8" />}</span>
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      {hint && <p className="max-w-sm text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

// ------------------------------- Chips -------------------------------------

export function ScoreChip({ value, label }: { value: number | null; label?: string }) {
  const band = scoreBand(value);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums",
        SCORE_BAND_STYLES[band]
      )}
      title={SCORE_BAND_LABELS[band]}
    >
      {label ? `${label} ` : ""}
      {fmtPct(value)}
    </span>
  );
}

export function GroupChip({ group }: { group: string }) {
  if (!group) {
    return (
      <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-500">
        No group
      </span>
    );
  }
  const tone =
    group === "A"
      ? "bg-emerald-100 text-emerald-800"
      : group === "B"
        ? "bg-teal-100 text-teal-800"
        : "bg-violet-100 text-violet-800";
  return (
    <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold", tone)}>
      {GROUP_LABELS[group] ?? `Group ${group}`}
    </span>
  );
}

export function TypeChip({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-medium text-slate-600">
      {ASSIGNMENT_TYPE_LABELS[type] ?? type}
    </span>
  );
}

const STATUS_TONES: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  private: "bg-amber-100 text-amber-800",
  assigned: "bg-emerald-100 text-emerald-800",
  completed: "bg-emerald-100 text-emerald-800",
  overdue: "bg-rose-100 text-rose-700",
};

export function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold capitalize",
        STATUS_TONES[status] ?? "bg-slate-100 text-slate-600"
      )}
    >
      {status}
    </span>
  );
}

// ------------------------------ Data hooks ---------------------------------

/** Tiny fetch-state hook for teacher views. */
export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [...deps, tick]);

  return { data, error, loading, reload: () => setTick((t) => t + 1) };
}

// ---------------------------- Assign dialog --------------------------------

type Target = "class" | "group" | "students";

/**
 * Assign an existing CustomActivity to a classroom / group / student
 * selection. Used by the Content library and the Teacher Helper.
 */
export function AssignDialog({
  open,
  onOpenChange,
  activityId,
  activityTitle,
  classrooms,
  onAssigned,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  activityId: string | null;
  activityTitle: string;
  classrooms: TeacherClassroomSummary[];
  onAssigned?: () => void;
}) {
  const { toast } = useToast();
  const [classroomId, setClassroomId] = useState("");
  const [target, setTarget] = useState<Target>("class");
  const [group, setGroup] = useState("B");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !classroomId) {
      setRoster([]);
      return;
    }
    let cancelled = false;
    api<{ students: RosterEntry[] }>(`/api/teacher/classrooms/${classroomId}`)
      .then((d) => {
        if (!cancelled) setRoster(d.students);
      })
      .catch(() => {
        if (!cancelled) setRoster([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, classroomId]);

  useEffect(() => {
    if (open) {
      setSelected(new Set());
      setTarget("class");
      setError(null);
      if (classrooms.length > 0 && !classroomId) setClassroomId(classrooms[0].id);
    }
  }, [open]);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
    for (const s of roster) if (s.groupName in counts) counts[s.groupName] += 1;
    return counts;
  }, [roster]);

  const submit = async () => {
    if (!activityId || !classroomId) return;
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ assignment: { targetCount?: number }; assignedCount?: number }>(
        `/api/teacher/content/${activityId}/assign`,
        {
          method: "POST",
          body: {
            classroomId,
            groupName: target === "group" ? group : null,
            studentIds:
              target === "students" ? Array.from(selected) : [],
          },
        }
      );
      const count = res.assignedCount ?? res.assignment?.targetCount ?? 0;
      toast({
        title: "Activity assigned ✅",
        description: `${activityTitle} was sent to ${count} student${count === 1 ? "" : "s"}.`,
      });
      onOpenChange(false);
      onAssigned?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not assign the activity");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign activity</DialogTitle>
          <DialogDescription>
            &ldquo;{activityTitle}&rdquo; will appear in the students&rsquo; assignment list.
          </DialogDescription>
        </DialogHeader>

        {classrooms.length === 0 ? (
          <p className="text-sm text-slate-500">Create a classroom first to assign work.</p>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="assign-classroom">Classroom</Label>
              <select
                id="assign-classroom"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm"
              >
                {classrooms.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.studentCount})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label>Assign to</Label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ["class", "Entire class"],
                    ["group", "A group"],
                    ["students", "Selected"],
                  ] as [Target, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTarget(value)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
                      target === value
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {target === "group" && (
              <div className="space-y-1.5">
                <Label htmlFor="assign-group">Group</Label>
                <select
                  id="assign-group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm"
                >
                  {["A", "B", "C"].map((g) => (
                    <option key={g} value={g}>
                      {GROUP_LABELS[g]} — {groupCounts[g]} student{groupCounts[g] === 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {target === "students" && (
              <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
                {roster.length === 0 && <p className="p-2 text-xs text-slate-400">Loading roster…</p>}
                {roster.map((s) => (
                  <label
                    key={s.studentId}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50"
                  >
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
                    <Avatar avatar={s.avatar} color={s.avatarColor} photoUrl={s.photoUrl} size="xs" />
                    <span className="flex-1 truncate font-medium">{s.name}</span>
                    {s.groupName && (
                      <span className="text-xs text-slate-400">Group {s.groupName}</span>
                    )}
                  </label>
                ))}
                <p className="px-2 pt-1 text-xs text-slate-400">
                  {selected.size} selected
                </p>
              </div>
            )}

            {error && <ErrorNote message={error} />}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={busy || classrooms.length === 0 || (target === "students" && selected.size === 0)}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --------------------------- Small form fields -----------------------------

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-semibold text-slate-700">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function TextInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn("h-9 border-slate-300 text-sm focus-visible:ring-emerald-500/40", props.className)}
    />
  );
}

export function SelectInput(props: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={cn(
        "h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
        props.className
      )}
    />
  );
}

export function TextareaInput(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-xs placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
        props.className
      )}
    />
  );
}
