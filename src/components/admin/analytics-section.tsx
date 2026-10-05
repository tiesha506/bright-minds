"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarRow, MiniBars } from "@/components/shared/charts";
import type { AnalyticsData, CountRow } from "@/lib/admin-types";
import { ErrorNote, SectionHeading } from "./shared";

const EMERALD = "#10b981";

function BarCard({
  title,
  rows,
  loading,
  emptyText,
}: {
  title: string;
  rows: CountRow[];
  loading: boolean;
  emptyText: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const nonEmpty = rows.filter((r) => r.value > 0);
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-28 w-full" />
        ) : nonEmpty.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">{emptyText}</p>
        ) : (
          <div className="space-y-2.5">
            {nonEmpty.map((r) => (
              <BarRow
                key={r.label}
                label={r.label}
                value={r.value}
                max={max}
                color={EMERALD}
                suffix=""
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AnalyticsSection() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api<AnalyticsData>("/api/admin/analytics")
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Analytics"
        description="Platform-wide aggregates, computed live from the database."
      />
      {error && <ErrorNote message={error} />}

      <div className="grid gap-4 md:grid-cols-2">
        <BarCard
          title="Users by role"
          rows={data?.usersByRole ?? []}
          loading={data === null}
          emptyText="No accounts yet."
        />
        <BarCard
          title="Students per age group"
          rows={data?.studentsPerAgeGroup ?? []}
          loading={data === null}
          emptyText="No child profiles yet."
        />
        <BarCard
          title="Progress rows per subject"
          rows={data?.progressPerSubject ?? []}
          loading={data === null}
          emptyText="No lesson progress recorded yet."
        />
        <BarCard
          title="Assignments by type"
          rows={data?.assignmentsByType ?? []}
          loading={data === null}
          emptyText="No assignments set yet."
        />
      </div>

      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            Daily active students — last 14 days
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data === null ? (
            <Skeleton className="h-36 w-full" />
          ) : (
            <MiniBars data={data.dailyActive} color={EMERALD} height={140} />
          )}
          <p className="mt-3 text-xs text-zinc-500">
            A student counts as active on a day when they logged any learning minutes
            (from the activity log).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
