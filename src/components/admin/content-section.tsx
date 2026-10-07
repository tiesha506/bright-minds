"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarRow } from "@/components/shared/charts";
import type { ContentData } from "@/lib/admin-types";
import { EmptyState, ErrorNote, SectionHeading } from "./shared";

const EMERALD = "#10b981";

export function ContentSection() {
  const [data, setData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api<ContentData>("/api/admin/content")
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  if (error) {
    return (
      <div>
        <SectionHeading title="Content" />
        <ErrorNote message={error} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Content"
        description="Real lesson counts from the curriculum registry, plus teacher-created content."
      />

      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lessons per subject and age group</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {data === null ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <th className="py-2 pr-4">Subject</th>
                  <th className="px-3 py-2 text-right">Early (6–8)</th>
                  <th className="px-3 py-2 text-right">Primary (9–11)</th>
                  <th className="px-3 py-2 text-right">Intermediate (12–13)</th>
                  <th className="px-3 py-2 text-right">Teen (14–15)</th>
                  <th className="px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.subjects.map((s) => (
                  <tr key={s.subjectId} className="hover:bg-zinc-50">
                    <td className="py-2.5 pr-4 font-semibold text-zinc-900">
                      <span aria-hidden className="mr-1.5">
                        {s.emoji}
                      </span>
                      {s.name}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{s.byGroup.early}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      {s.byGroup.primary}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      {s.byGroup.intermediate}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{s.byGroup.teen}</td>
                    <td className="px-3 py-2.5 text-right font-bold tabular-nums">
                      {s.total}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-zinc-200 font-bold text-zinc-900">
                  <td className="py-2.5 pr-4">All subjects</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {data.subjects.reduce((n, s) => n + s.byGroup.early, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {data.subjects.reduce((n, s) => n + s.byGroup.primary, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {data.subjects.reduce((n, s) => n + s.byGroup.intermediate, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {data.subjects.reduce((n, s) => n + s.byGroup.teen, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{data.lessonsTotal}</td>
                </tr>
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Custom activities by status</CardTitle>
          </CardHeader>
          <CardContent>
            {data === null ? (
              <Skeleton className="h-24 w-full" />
            ) : data.customActivitiesTotal === 0 ? (
              <EmptyState
                title="No custom activities yet"
                hint="Teachers can build draft, private and assigned activities."
              />
            ) : (
              <div className="space-y-2.5">
                {data.customActivities.map((r) => (
                  <BarRow
                    key={r.label}
                    label={r.label}
                    value={r.value}
                    max={Math.max(1, ...data.customActivities.map((x) => x.value))}
                    color={EMERALD}
                    suffix=""
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Assignments by type</CardTitle>
          </CardHeader>
          <CardContent>
            {data === null ? (
              <Skeleton className="h-24 w-full" />
            ) : data.assignmentsTotal === 0 ? (
              <EmptyState
                title="No assignments yet"
                hint="Assignments appear here once teachers set work for their classrooms."
              />
            ) : (
              <div className="space-y-2.5">
                {data.assignmentsByType.map((r) => (
                  <BarRow
                    key={r.label}
                    label={r.label}
                    value={r.value}
                    max={Math.max(1, ...data.assignmentsByType.map((x) => x.value))}
                    color={EMERALD}
                    suffix=""
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
