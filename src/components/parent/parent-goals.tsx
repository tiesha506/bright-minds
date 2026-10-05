"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { SUBJECT_COLORS } from "@/components/shared/charts";
import type { ChildSummary, GoalData, OverviewResponse } from "@/lib/parent-types";
import { cn } from "@/lib/utils";
import { ChildSwitcher } from "./parent-progress";
import {
  EmptyState,
  ErrorState,
  SectionHeader,
  levelLabel,
  useAsync,
} from "./parent-ui";

// ---------------------------------------------------------------------------
// Learning Goals — per child: daily minutes, weekly lesson target, priority
// subjects and a personal note. Saved via PATCH /api/parent/children/[id].
// ---------------------------------------------------------------------------

const SUBJECT_OPTIONS = [
  { id: "math", label: "🔢 Mathematics" },
  { id: "english", label: "✏️ English" },
  { id: "science", label: "🔬 Science" },
  { id: "reading", label: "📖 Reading" },
] as const;

const DEFAULT_GOAL: GoalData = {
  dailyMinutes: 15,
  weeklyLessonTarget: 3,
  prioritySubjects: [],
  note: "",
};

export function ParentGoals({
  kids,
  selectedChild,
  onSelect,
  onSaved,
}: {
  kids: ChildSummary[];
  selectedChild: ChildSummary | null;
  onSelect: (childId: string) => void;
  onSaved: () => Promise<void> | void;
}) {
  if (kids.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Learning Goals" subtitle="Gentle targets keep learning a habit." />
        <EmptyState
          icon="🎯"
          title="No children yet"
          detail="Add a child, then set a small daily goal — even 10 minutes a day adds up fast."
        />
      </div>
    );
  }

  const child = selectedChild ?? kids[0];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Learning Goals"
        subtitle="Small, steady targets — you can change them any time."
        action={<ChildSwitcher kids={kids} value={child.id} onChange={onSelect} />}
      />
      <GoalsForm key={child.id} child={child} onSaved={onSaved} />
    </div>
  );
}

function GoalsForm({ child, onSaved }: { child: ChildSummary; onSaved: () => Promise<void> | void }) {
  const { data, error, loading, reload } = useAsync<OverviewResponse>(
    () => api<OverviewResponse>(`/api/parent/overview/${encodeURIComponent(child.id)}`),
    [child.id]
  );

  const [goal, setGoal] = useState<GoalData>(DEFAULT_GOAL);
  const [saving, setSaving] = useState(false);

  // Adopt the server goal once loaded (and when switching children).
  useEffect(() => {
    if (data) setGoal(data.goal);
  }, [data]);

  const save = async () => {
    setSaving(true);
    try {
      await api(`/api/parent/children/${encodeURIComponent(child.id)}`, {
        method: "PATCH",
        body: { goal },
      });
      await onSaved();
      reload();
    } catch {
      // The inline error below nudges a retry.
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error || !data) {
    return <ErrorState message={error ?? undefined} onRetry={reload} />;
  }

  const todayPct = Math.min(100, (data.todayMinutes / goal.dailyMinutes) * 100);
  const weekPct = Math.min(100, (data.lessonsThisWeek / goal.weeklyLessonTarget) * 100);
  const todayDone = data.todayMinutes >= goal.dailyMinutes;
  const weekDone = data.lessonsThisWeek >= goal.weeklyLessonTarget;

  const toggleSubject = (id: string) => {
    setGoal((g) => ({
      ...g,
      prioritySubjects: g.prioritySubjects.includes(id)
        ? g.prioritySubjects.filter((s) => s !== id)
        : [...g.prioritySubjects, id],
    }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* -------------------------- goal progress --------------------------- */}
      <div className="space-y-4 lg:col-span-2">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today&apos;s goal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold tabular-nums">
              {data.todayMinutes} of {goal.dailyMinutes} min
            </p>
            <Progress value={todayPct} className="mt-2 h-2.5" aria-label="Today's goal progress" />
            <p className={cn("mt-2 text-sm", todayDone ? "font-semibold text-emerald-600" : "text-muted-foreground")}>
              {todayDone ? "🎉 Goal reached — brilliant!" : `${goal.dailyMinutes - data.todayMinutes} more minutes to go.`}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">This week&apos;s lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold tabular-nums">
              {data.lessonsThisWeek} of {goal.weeklyLessonTarget}
            </p>
            <Progress value={weekPct} className="mt-2 h-2.5" aria-label="Weekly lesson progress" />
            <p className={cn("mt-2 text-sm", weekDone ? "font-semibold text-emerald-600" : "text-muted-foreground")}>
              {weekDone
                ? "🌟 Weekly target met — still counting!"
                : `${goal.weeklyLessonTarget - data.lessonsThisWeek} more lesson${goal.weeklyLessonTarget - data.lessonsThisWeek === 1 ? "" : "s"} this week.`}
            </p>
          </CardContent>
        </Card>
        <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          💡 {child.name} is {child.age} and learning at the{" "}
          <strong>{levelLabel(child.ageGroup)}</strong> level. Goals work best when they&apos;re
          small and regular — adjust any time as confidence grows.
        </p>
      </div>

      {/* ----------------------------- the form ----------------------------- */}
      <Card className="rounded-2xl lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Set goals for {child.name}</CardTitle>
          <CardDescription>These appear on your child&apos;s device too.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="daily-minutes">Learning time each day</Label>
              <Select
                value={String(goal.dailyMinutes)}
                onValueChange={(v) => setGoal((g) => ({ ...g, dailyMinutes: Number(v) }))}
              >
                <SelectTrigger id="daily-minutes">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (i + 1) * 5).map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {m} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Between 5 and 60 minutes.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="weekly-target">Lessons to finish each week</Label>
              <Select
                value={String(goal.weeklyLessonTarget)}
                onValueChange={(v) => setGoal((g) => ({ ...g, weeklyLessonTarget: Number(v) }))}
              >
                <SelectTrigger id="weekly-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} lesson{n === 1 ? "" : "s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Quizzes and lessons both count.</p>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Subjects to focus on first</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {SUBJECT_OPTIONS.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-2xl border p-3"
                  style={{ borderLeft: `4px solid ${SUBJECT_COLORS[s.id]}` }}
                >
                  <span className="text-sm font-semibold">{s.label}</span>
                  <Switch
                    checked={goal.prioritySubjects.includes(s.id)}
                    onCheckedChange={() => toggleSubject(s.id)}
                    aria-label={`Prioritise ${s.label}`}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Priority subjects get the first recommendations on the dashboard.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="goal-note">A note for the dashboard</Label>
            <Textarea
              id="goal-note"
              value={goal.note}
              maxLength={500}
              placeholder="e.g. Building reading confidence this term — 10 minutes together each evening."
              onChange={(e) => setGoal((g) => ({ ...g, note: e.target.value }))}
              className="min-h-24"
            />
            <p className="text-xs text-muted-foreground">
              Private to you — it appears on your reports ({goal.note.length}/500).
            </p>
          </div>

          <Button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-rose-500 hover:bg-rose-600"
          >
            <Save className="h-4 w-4" aria-hidden />
            {saving ? "Saving…" : "Save goals"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
