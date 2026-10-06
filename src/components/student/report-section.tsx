"use client";

// ---------------------------------------------------------------------------
// My Reports — school documents the teacher shared for THIS student. Playful
// student-theme card list with view / download (files stay private: every
// open goes through the session-checked file route → fresh signed URL).
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { ExternalLink, FileText, FolderDown, Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { ReportsListResponse } from "@/lib/report-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function StudentReportsSection() {
  const user = useAuthStore((s) => s.user);
  const student = useAuthStore((s) => s.student);
  const guest = useAuthStore((s) => s.guest);

  const [reports, setReports] = useState<ReportsListResponse["reports"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const myId = student?.id ?? null;
  const signedIn = !!user && !guest;

  // All state updates happen in promise callbacks — never synchronously in
  // the effect body (matches the shared useAsync pattern). Signed-out / guest
  // visitors simply never fetch, so `loading` stays untouched for them.
  useEffect(() => {
    if (!signedIn || !myId) return;
    let cancelled = false;
    api<ReportsListResponse>(`/api/reports?studentId=${encodeURIComponent(myId)}`)
      .then((d) => {
        if (!cancelled) {
          setReports(d.reports);
          setError(null);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Something went wrong");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [signedIn, myId, tick]);

  const reload = () => setTick((t) => t + 1);

  const view = (id: string) => {
    window.open(`/api/reports/${encodeURIComponent(id)}/file`, "_blank", "noopener");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"
          aria-hidden
        >
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight">My Reports</h2>
          <p className="text-xs text-muted-foreground">
            School reports your teacher shared with your family.
          </p>
        </div>
      </div>

      {!signedIn || !myId ? (
        <Card className="rounded-3xl border-dashed">
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <span className="text-4xl" aria-hidden>
              🗂️
            </span>
            <p className="font-bold">No reports yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              When your teacher shares a report, it will show up here.
            </p>
          </CardContent>
        </Card>
      ) : loading && !reports ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : error ? (
        <Card className="rounded-3xl border-amber-200 bg-amber-50/60">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <p className="text-sm font-semibold">Hmm, we couldn&apos;t load your reports.</p>
            <Button onClick={reload} variant="outline" className="rounded-full">
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : !reports || reports.length === 0 ? (
        <Card className="rounded-3xl border-dashed">
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <span className="text-4xl" aria-hidden>
              🌟
            </span>
            <p className="font-bold">No reports yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Keep learning — your teacher&apos;s reports will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3" aria-label="My reports">
          {reports.map((r) => (
            <li key={r.id}>
              <Card className="rounded-3xl transition-colors hover:border-violet-200">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"
                    aria-hidden
                  >
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="min-w-0 max-w-full truncate text-sm font-bold">{r.fileName}</p>
                      {r.term && (
                        <Badge className="rounded-full bg-violet-100 text-violet-700 hover:bg-violet-100">
                          {r.term}
                        </Badge>
                      )}
                    </div>
                    {r.description && (
                      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                        {r.description}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground">{fmtDate(r.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => view(r.id)}
                      size="sm"
                      className="min-h-11 rounded-full bg-violet-500 text-white hover:bg-violet-600"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden /> View
                    </Button>
                    <Button asChild size="sm" variant="outline" className="min-h-11 rounded-full">
                      <a
                        href={`/api/reports/${encodeURIComponent(r.id)}/file?download=1`}
                        download={r.fileName}
                      >
                        <FolderDown className="h-4 w-4" aria-hidden /> Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
