"use client";

// ---------------------------------------------------------------------------
// Reports — the documents teachers privately shared about your children.
// Files live in the private "reports" bucket; opening/downloading goes
// through /api/reports/[id]/file, which mint-fresh short-lived signed URLs.
// ---------------------------------------------------------------------------

import { useMemo } from "react";
import { ExternalLink, FileText, FolderDown } from "lucide-react";
import { api } from "@/lib/api";
import type { ReportItem, ReportsListResponse } from "@/lib/report-types";
import { useAsync, EmptyState, ErrorState, RowsSkeleton, SectionHeader } from "./parent-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ReportCard({ report }: { report: ReportItem }) {
  const isNew = Date.now() - new Date(report.createdAt).getTime() < SEVEN_DAYS_MS;

  const view = () => {
    // Never embeds a signed URL — the route 302-redirects to a fresh one.
    window.open(`/api/reports/${encodeURIComponent(report.id)}/file`, "_blank", "noopener");
  };

  return (
    <Card className="rounded-2xl border-amber-100 bg-white transition-colors hover:border-amber-200">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"
          aria-hidden
        >
          <FileText className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="min-w-0 max-w-full truncate text-sm font-bold text-foreground">
              {report.fileName}
            </p>
            {report.term && (
              <Badge className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-100">
                {report.term}
              </Badge>
            )}
            {isNew && (
              <Badge className="rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                New
              </Badge>
            )}
          </div>
          {report.description && (
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">{report.description}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {fmtDate(report.createdAt)}
            {report.uploadedBy ? ` · Shared by ${report.uploadedBy}` : ""}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              onClick={view}
              size="sm"
              className="min-h-11 rounded-full bg-rose-500 text-white hover:bg-rose-600"
            >
              <ExternalLink className="h-4 w-4" aria-hidden /> View Report
            </Button>
            <Button asChild size="sm" variant="outline" className="min-h-11 rounded-full">
              <a
                href={`/api/reports/${encodeURIComponent(report.id)}/file?download=1`}
                download={report.fileName}
              >
                <FolderDown className="h-4 w-4" aria-hidden /> Download Report
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ParentReportsPanel() {
  const { data, error, loading, reload } = useAsync<ReportsListResponse>(
    () => api<ReportsListResponse>("/api/reports"),
    []
  );

  // Group by child, keeping the newest-first order from the API.
  const groups = useMemo(() => {
    const map = new Map<string, ReportItem[]>();
    for (const r of data?.reports ?? []) {
      const key = r.studentName || "My child";
      const list = map.get(key) ?? [];
      list.push(r);
      map.set(key, list);
    }
    return Array.from(map.entries());
  }, [data]);

  const total = data?.reports.length ?? 0;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Reports"
        subtitle="Term reports and documents your child's teacher shared with you privately."
      />

      {loading && !data ? (
        <RowsSkeleton rows={4} />
      ) : error && !data ? (
        <ErrorState message={error} onRetry={reload} />
      ) : total === 0 ? (
        <EmptyState
          icon="🗂️"
          title="No reports available yet"
          detail="When a teacher shares a school report for your child, it will appear here and you'll get a notification."
        />
      ) : (
        <div className="space-y-8">
          {groups.map(([childName, reports]) => (
            <section key={childName} aria-label={`Reports for ${childName}`}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight">{childName}</h2>
                <Badge variant="secondary" className="rounded-full">
                  {reports.length} {reports.length === 1 ? "report" : "reports"}
                </Badge>
              </div>
              <div className="space-y-3">
                {reports.map((r) => (
                  <ReportCard key={r.id} report={r} />
                ))}
              </div>
            </section>
          ))}
          <p className="text-center text-xs text-muted-foreground">
            🔒 Reports are private educational records — only you and the teacher can open them.
          </p>
        </div>
      )}
    </div>
  );
}
