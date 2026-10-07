"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarRange } from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarRow, StatTile } from "@/components/shared/charts";
import type {
  AnalyticsData,
  AnalyticsRange,
  CountRow,
} from "@/lib/admin-types";
import { EmptyState, ErrorNote, SectionHeading } from "./shared";

// ---------------------------------------------------------------------------
// Palette — zinc console with emerald/amber/violet/rose accents (no blues).
// ---------------------------------------------------------------------------
const C_STUDENTS = "var(--color-students)";
const C_ACTIVE = "var(--color-active)";
const C_MINUTES = "var(--color-minutes)";
const C_COMPLETED = "var(--color-completed)";
const C_ASSIGNED = "var(--color-assigned)";
const C_QUIZ = "var(--color-quiz)";
const C_READING = "var(--color-reading)";
const C_CERTS = "var(--color-certs)";

const accountsConfig = {
  students: { label: "New students", color: "#10b981" },
  parents: { label: "New parents", color: "#f59e0b" },
  teachers: { label: "New teachers", color: "#71717a" },
} satisfies ChartConfig;

const activeConfig = {
  active: { label: "Active students", color: "#10b981" },
} satisfies ChartConfig;

const minutesConfig = {
  minutes: { label: "Learning minutes", color: "#0d9488" },
} satisfies ChartConfig;

const teacherConfig = {
  assignments: { label: "Assignments created", color: "#3f3f46" },
} satisfies ChartConfig;

const completionConfig = {
  completed: { label: "Completed", color: "#10b981" },
  assigned: { label: "Assigned", color: "#a1a1aa" },
} satisfies ChartConfig;

const quizConfig = {
  quiz: { label: "Average quiz score", color: "#8b5cf6" },
} satisfies ChartConfig;

const readingConfig = {
  reading: { label: "Reading minutes", color: "#8b5cf6" },
} satisfies ChartConfig;

const certConfig = {
  certificates: { label: "Certificates earned", color: "#f59e0b" },
} satisfies ChartConfig;

const RANGE_TABS: { key: AnalyticsRange; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "3m", label: "3 months" },
  { key: "6m", label: "6 months" },
  { key: "12m", label: "12 months" },
  { key: "custom", label: "Custom" },
];

type PointLike = { value: number | null };

/** True when the series contains at least one real (non-zero) value. */
function hasData(points: PointLike[]): boolean {
  return points.some((p) => p.value !== 0 && p.value !== null);
}

const fmtDay = (iso: string) => {
  const d = new Date(iso);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return Number.isNaN(d.getTime()) ? iso : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

// --------------------------------------------------------------------------- 
// Generic chart card: skeleton while loading, honest empty state otherwise.
// ---------------------------------------------------------------------------
function ChartCard({
  title,
  description,
  loading,
  empty,
  children,
  className,
}: {
  title: string;
  description?: string;
  loading: boolean;
  empty: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`border-zinc-200 ${className ?? ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-56 w-full" />
        ) : empty ? (
          <EmptyState title="No data available yet" hint="Nothing was recorded in this period." />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

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
                color="#3f3f46"
                suffix=""
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------

export function AnalyticsSection() {
  const [range, setRange] = useState<AnalyticsRange>("7d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [appliedCustom, setAppliedCustom] = useState<{ from: string; to: string } | null>(null);
  const [result, setResult] = useState<{
    key: string;
    data?: AnalyticsData;
    error?: string;
  } | null>(null);

  const skipFetch = range === "custom" && !appliedCustom;
  const queryKey = `${range}|${appliedCustom?.from ?? ""}|${appliedCustom?.to ?? ""}`;
  const current = result && result.key === queryKey ? result : null;
  const data = current?.data ?? null;
  const error = current?.error ?? null;
  const loading = !skipFetch && current === null;

  useEffect(() => {
    if (skipFetch) return; // waiting for custom dates — nothing to load yet
    let alive = true;
    const params = new URLSearchParams({ range });
    if (range === "custom" && appliedCustom) {
      params.set("from", appliedCustom.from);
      params.set("to", appliedCustom.to);
    }
    api<AnalyticsData>(`/api/admin/analytics?${params.toString()}`)
      .then((d) => {
        if (alive) setResult({ key: queryKey, data: d });
      })
      .catch((e: Error) => {
        if (alive) setResult({ key: queryKey, error: e.message });
      });
    return () => {
      alive = false;
    };
  }, [range, appliedCustom, skipFetch, queryKey]);

  const series = data?.series;

  // Joined datasets for multi-series charts (label-aligned by bucket index).
  const accountsData = useMemo(() => {
    if (!series) return [];
    return series.studentRegistrations.map((p, i) => ({
      label: p.label,
      students: p.value,
      parents: series.parentRegistrations[i]?.value ?? 0,
      teachers: series.teacherRegistrations[i]?.value ?? 0,
    }));
  }, [series]);

  const completionData = useMemo(() => {
    if (!series) return [];
    return series.completionAssigned.map((p, i) => ({
      label: p.label,
      assigned: p.value,
      completed: series.completionCompleted[i]?.value ?? 0,
    }));
  }, [series]);

  const applyCustom = () => {
    if (customFrom && customTo) {
      setAppliedCustom({ from: customFrom, to: customTo });
    }
  };

  const showCustomHint = range === "custom" && !appliedCustom;

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Analytics"
        description="Platform activity over time — every chart is computed live from the database."
      />

      {/* Range filter */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Analytics range">
          {RANGE_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={range === t.key}
              onClick={() => setRange(t.key)}
              className={
                range === t.key
                  ? "rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-white"
                  : "rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100"
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        {range === "custom" && (
          <div className="flex flex-wrap items-end gap-2 rounded-xl border border-zinc-200 bg-white p-3">
            <CalendarRange className="mb-2 h-4 w-4 text-zinc-400" aria-hidden />
            <div>
              <label htmlFor="analytics-from" className="mb-1 block text-xs font-semibold text-zinc-600">
                From
              </label>
              <Input
                id="analytics-from"
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="w-40 border-zinc-300"
              />
            </div>
            <div>
              <label htmlFor="analytics-to" className="mb-1 block text-xs font-semibold text-zinc-600">
                To
              </label>
              <Input
                id="analytics-to"
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="w-40 border-zinc-300"
              />
            </div>
            <Button
              size="sm"
              onClick={applyCustom}
              disabled={!customFrom || !customTo}
              className="bg-zinc-900 text-white hover:bg-zinc-700"
            >
              Apply
            </Button>
            <p className="mb-1 text-xs text-zinc-500">
              Up to 366 days. Buckets: daily ≤ 2 months, weekly ≤ 7 months, monthly beyond.
            </p>
          </div>
        )}
      </div>

      {error && <ErrorNote message={error} />}
      {showCustomHint && (
        <p className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500">
          Pick a start and end date, then press Apply to load the custom range.
        </p>
      )}

      {!showCustomHint && (
      <>
      {/* Range KPIs — real totals over the selected window */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile
          icon={<CalendarRange className="h-4 w-4" aria-hidden />}
          label="Active students"
          value={loading ? "…" : (data?.totals.activeStudents ?? 0)}
          hint="Activity or progress in range"
        />
        <StatTile
          label="New students"
          value={loading ? "…" : (data?.totals.studentRegistrations ?? 0)}
          hint={
            loading
              ? undefined
              : `+${data?.totals.parentRegistrations ?? 0} parents · +${data?.totals.teacherRegistrations ?? 0} teachers`
          }
          icon={<span aria-hidden className="text-sm font-bold">+</span>}
        />
        <StatTile
          label="Assignments"
          value={loading ? "…" : (data?.totals.assignmentsCreated ?? 0)}
          hint={loading ? undefined : `${data?.totals.activeTeachers ?? 0} active teachers`}
          icon={<span aria-hidden className="text-sm font-bold">📚</span>}
        />
        <StatTile
          label="Completed work"
          value={loading ? "…" : (data?.totals.completedResults ?? 0)}
          hint={loading ? undefined : `of ${data?.totals.assignedResults ?? 0} assigned in range`}
          icon={<span aria-hidden className="text-sm font-bold">✓</span>}
        />
        <StatTile
          label="Quiz average"
          value={loading ? "…" : data?.totals.quizAvg != null ? `${data.totals.quizAvg}%` : "—"}
          hint={loading ? undefined : "Completed quizzes only"}
          icon={<span aria-hidden className="text-sm font-bold">✎</span>}
        />
        <StatTile
          label="Minutes"
          value={loading ? "…" : (data?.totals.activityMinutes ?? 0).toLocaleString()}
          hint={loading ? undefined : `${data?.totals.certificates ?? 0} certificates earned`}
          icon={<span aria-hidden className="text-sm font-bold">⏱</span>}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
            {/* Registrations by role */}
            <ChartCard
              title="New registrations"
              description="Accounts created in the period, by role."
              loading={loading}
              empty={!accountsData.some((d) => d.students > 0 || d.parents > 0 || d.teachers > 0)}
            >
              <ChartContainer config={accountsConfig} className="h-56 w-full aspect-auto">
                <AreaChart data={accountsData} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="students"
                    type="monotone"
                    stroke={C_STUDENTS}
                    fill={C_STUDENTS}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="parents"
                    type="monotone"
                    stroke={C_CERTS}
                    fill={C_CERTS}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="teachers"
                    type="monotone"
                    stroke={C_ASSIGNED}
                    fill={C_ASSIGNED}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ChartCard>

            {/* Active students per bucket */}
            <ChartCard
              title="Active students"
              description="Distinct students with activity or progress per bucket."
              loading={loading}
              empty={!hasData(series?.activeStudents ?? [])}
            >
              <ChartContainer config={activeConfig} className="h-56 w-full aspect-auto">
                <BarChart data={series?.activeStudents ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="active" fill={C_ACTIVE} radius={[3, 3, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ChartContainer>
            </ChartCard>

            {/* Platform activity minutes */}
            <ChartCard
              title="Platform activity"
              description="Learning minutes recorded per bucket (all subjects)."
              loading={loading}
              empty={!hasData(series?.activityMinutes ?? [])}
            >
              <ChartContainer config={minutesConfig} className="h-56 w-full aspect-auto">
                <AreaChart data={series?.activityMinutes ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="minutes"
                    type="monotone"
                    stroke={C_MINUTES}
                    fill={C_MINUTES}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ChartCard>

            {/* Teacher activity */}
            <ChartCard
              title="Teacher activity"
              description={`Assignments created per bucket${
                !loading && data ? ` · ${data.totals.activeTeachers} active teachers` : ""
              }.`}
              loading={loading}
              empty={!hasData(series?.teacherAssignments ?? [])}
            >
              <ChartContainer config={teacherConfig} className="h-56 w-full aspect-auto">
                <BarChart data={series?.teacherAssignments ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="assignments" fill={C_ASSIGNED} radius={[3, 3, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ChartContainer>
            </ChartCard>

            {/* Completion */}
            <ChartCard
              title="Assignment completion"
              description="Results assigned (when set) vs completed (when finished)."
              loading={loading}
              empty={!hasData([...(series?.completionCompleted ?? []), ...(series?.completionAssigned ?? [])])}
            >
              <ChartContainer config={completionConfig} className="h-56 w-full aspect-auto">
                <BarChart data={completionData} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="assigned" fill={C_ASSIGNED} radius={[3, 3, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="completed" fill={C_COMPLETED} radius={[3, 3, 0, 0]} maxBarSize={16} />
                </BarChart>
              </ChartContainer>
            </ChartCard>

            {/* Quiz performance */}
            <ChartCard
              title="Quiz performance"
              description="Average score of completed quizzes per bucket (gaps = no quizzes)."
              loading={loading}
              empty={!hasData(series?.quizAvg ?? [])}
            >
              <ChartContainer config={quizConfig} className="h-56 w-full aspect-auto">
                <LineChart data={series?.quizAvg ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Line
                    dataKey="quiz"
                    type="monotone"
                    stroke={C_QUIZ}
                    strokeWidth={2}
                    dot={{ r: 2.5 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ChartContainer>
            </ChartCard>

            {/* Reading activity */}
            <ChartCard
              title="Reading activity"
              description="Minutes logged against the reading subject per bucket."
              loading={loading}
              empty={!hasData(series?.readingMinutes ?? [])}
            >
              <ChartContainer config={readingConfig} className="h-56 w-full aspect-auto">
                <AreaChart data={series?.readingMinutes ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="reading"
                    type="monotone"
                    stroke={C_READING}
                    fill={C_READING}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ChartCard>

            {/* Certificates */}
            <ChartCard
              title="Certificates earned"
              description="Certificates awarded per bucket."
              loading={loading}
              empty={!hasData(series?.certificates ?? [])}
            >
              <ChartContainer config={certConfig} className="h-56 w-full aspect-auto">
                <BarChart data={series?.certificates ?? []} margin={{ left: -18, right: 6 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="certificates" fill={C_CERTS} radius={[3, 3, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ChartContainer>
            </ChartCard>

            {/* Subject usage — full width */}
            <ChartCard
              title="Subject usage"
              description="Lessons completed and minutes logged per subject in the period."
              loading={loading}
              empty={(series?.subjectUsage ?? []).length === 0}
              className="md:col-span-2"
            >
              <div className="space-y-3">
                {(series?.subjectUsage ?? []).map((row) => {
                  const maxMinutes = Math.max(1, ...(series?.subjectUsage ?? []).map((r) => r.minutes));
                  return (
                    <div key={row.subjectId}>
                      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                        <span className="font-semibold text-zinc-800">{row.label}</span>
                        <span className="text-xs tabular-nums text-zinc-500">
                          {row.lessons} {row.lessons === 1 ? "lesson" : "lessons"} ·{" "}
                          {row.minutes.toLocaleString()} min
                        </span>
                      </div>
                      <BarRow
                        label=""
                        value={row.minutes}
                        max={maxMinutes}
                        color="#0d9488"
                        suffix=""
                      />
                    </div>
                  );
                })}
              </div>
            </ChartCard>
          </div>

          {/* All-time context (independent of the range filter) */}
          <div className="grid gap-4 md:grid-cols-3">
            <BarCard
              title="All-time users by role"
              rows={data?.allTime.usersByRole ?? []}
              loading={loading}
              emptyText="No accounts yet."
            />
            <BarCard
              title="All-time students per age group"
              rows={data?.allTime.studentsPerAgeGroup ?? []}
              loading={loading}
              emptyText="No child profiles yet."
            />
            <BarCard
              title="All-time assignments by type"
              rows={data?.allTime.assignmentsByType ?? []}
              loading={loading}
              emptyText="No assignments set yet."
            />
          </div>

          {!loading && data && (
            <p className="text-xs text-zinc-500">
              Showing {data.bucketSize === "day" ? "daily" : data.bucketSize === "week" ? "weekly" : "monthly"}{" "}
              buckets from {fmtDay(data.from)} to {fmtDay(data.to)} · {data.buckets.length}{" "}
              {data.buckets.length === 1 ? "bucket" : "buckets"}. Zero bars mean nothing was
              recorded — numbers are never estimated.
            </p>
          )}
        </>
      )}
    </div>
  );
}
