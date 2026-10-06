"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/shared/avatar";
import { api } from "@/lib/api";
import type { ChildSummary, ReportResponse } from "@/lib/parent-types";
import { cn } from "@/lib/utils";
import { ReportView } from "./report-view";
import { EmptyState, ErrorState, PageSkeleton, SectionHeader, useAsync } from "./parent-ui";

// ---------------------------------------------------------------------------
// Child Progress — per-child deep dive. The range switch (This week / This
// month) drives the same real report endpoint that powers printable reports.
// ---------------------------------------------------------------------------

type RangeKey = "week" | "month";

export function ChildProgressView({
  kids,
  selectedChild,
  onSelect,
}: {
  kids: ChildSummary[];
  selectedChild: ChildSummary | null;
  onSelect: (childId: string) => void;
}) {
  const [range, setRange] = useState<RangeKey>("week");

  if (kids.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Child Progress" subtitle="A closer look at each learner." />
        <EmptyState
          icon="📈"
          title="No children yet"
          detail="Add a child first, and their quiz scores, reading growth and learning time will show up here."
        />
      </div>
    );
  }

  const child = selectedChild ?? kids[0];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Child Progress"
        subtitle="Dive into subjects, quizzes, reading growth and time spent."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <ChildSwitcher kids={kids} value={child.id} onChange={onSelect} />
            <div
              role="group"
              aria-label="Report range"
              className="flex overflow-hidden rounded-full border"
            >
              {(
                [
                  { key: "week", label: "This week" },
                  { key: "month", label: "This month" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  aria-pressed={range === opt.key}
                  onClick={() => setRange(opt.key)}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold transition-colors",
                    range === opt.key
                      ? "bg-rose-100 text-rose-700"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <ProgressReport key={`${child.id}-${range}`} childId={child.id} range={range} />
    </div>
  );
}

export function ChildSwitcher({
  kids,
  value,
  onChange,
}: {
  kids: ChildSummary[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[190px] rounded-full" aria-label="Choose child">
        <SelectValue placeholder="Choose child" />
      </SelectTrigger>
      <SelectContent>
        {kids.map((k) => (
          <SelectItem key={k.id} value={k.id}>
            <span className="flex items-center gap-2">
              <Avatar avatar={k.avatar} color={k.avatarColor} photoUrl={k.photoUrl} size="xs" />
              {k.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ProgressReport({ childId, range }: { childId: string; range: RangeKey }) {
  const { data, error, loading, reload } = useAsync<ReportResponse>(
    () => fetchReport(childId, range),
    [childId, range]
  );

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error ?? undefined} onRetry={reload} />;

  return (
    <Card className="rounded-3xl p-1">
      <CardContent className="p-4 sm:p-6">
        <ReportView data={data} />
      </CardContent>
    </Card>
  );
}

function fetchReport(childId: string, range: RangeKey): Promise<ReportResponse> {
  return api<ReportResponse>(
    `/api/parent/report/${encodeURIComponent(childId)}?range=${range}`
  );
}
