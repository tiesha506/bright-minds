"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import type { ChildSummary, ReportResponse } from "@/lib/parent-types";
import { ReportView } from "./report-view";
import { ChildSwitcher } from "./parent-progress";
import { EmptyState, ErrorState, PageSkeleton, SectionHeader, useAsync } from "./parent-ui";

// ---------------------------------------------------------------------------
// Reports — pick a child + range, get a clean printable report with a
// "Print / Download PDF" button (uses the existing .no-print / .print-full
// CSS pattern from globals.css).
// ---------------------------------------------------------------------------

export function ParentReports({
  kids,
  selectedChild,
  onSelect,
}: {
  kids: ChildSummary[];
  selectedChild: ChildSummary | null;
  onSelect: (childId: string) => void;
}) {
  const [range, setRange] = useState<"week" | "month">("week");

  if (kids.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Reports" subtitle="A clean summary you can print or save." />
        <EmptyState
          icon="📄"
          title="Nothing to report yet"
          detail="Once your child is added and has completed a lesson or two, generate a report here to print or save as a PDF."
        />
      </div>
    );
  }

  const child = selectedChild ?? kids[0];

  return (
    <div className="space-y-6">
      <div className="no-print">
        <SectionHeader
          title="Reports"
          subtitle="Perfect for a quick look before parent evening — or to keep as a record."
          action={
            <div className="flex flex-wrap items-center gap-2">
              <ChildSwitcher kids={kids} value={child.id} onChange={onSelect} />
              <select
                aria-label="Report period"
                value={range}
                onChange={(e) => setRange(e.target.value as "week" | "month")}
                className="h-10 rounded-full border bg-background px-3 text-sm font-semibold"
              >
                <option value="week">Past week</option>
                <option value="month">Past month</option>
              </select>
              <PrintButton />
            </div>
          }
        />
      </div>

      <ReportsBody key={`${child.id}-${range}`} childId={child.id} range={range} />
    </div>
  );
}

function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="rounded-full bg-rose-500 hover:bg-rose-600"
      aria-label="Print or save this report as a PDF"
    >
      <Printer className="h-4 w-4" aria-hidden /> Print / Download PDF
    </Button>
  );
}

function ReportsBody({ childId, range }: { childId: string; range: "week" | "month" }) {
  const { data, error, loading, reload } = useAsync<ReportResponse>(
    () =>
      api<ReportResponse>(`/api/parent/report/${encodeURIComponent(childId)}?range=${range}`),
    [childId, range]
  );

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error ?? undefined} onRetry={reload} />;

  return (
    <Card className="rounded-3xl">
      <CardHeader className="no-print pb-0">
        <CardTitle className="text-lg">Ready to share</CardTitle>
        <CardDescription>
          Everything below prints cleanly — headers, navigation and buttons are hidden
          automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-4 sm:p-6 sm:pt-2">
        <ReportView data={data} />
      </CardContent>
    </Card>
  );
}
