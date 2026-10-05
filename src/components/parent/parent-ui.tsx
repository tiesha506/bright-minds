"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AGE_GROUPS } from "@/lib/learning-config";

// ---------------------------------------------------------------------------
// Small shared building blocks for every Parent section: async-data hook,
// loading / error / empty states, and formatting helpers.
// ---------------------------------------------------------------------------

/** Tiny fetch-state hook with manual reload — plain and predictable.
 *  State updates happen in promise callbacks (never synchronously in the
 *  effect body), and sections remount per child via `key` so loading states
 *  reset naturally. */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  // Keep the latest loader without re-triggering the effect (assigned in an
  // effect, never during render).
  const loaderRef = useRef(loader);
  useEffect(() => {
    loaderRef.current = loader;
  });

  useEffect(() => {
    let alive = true;
    loaderRef
      .current()
      .then((d) => {
        if (alive) {
          setData(d);
          setError(null);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (alive) {
          setError(e instanceof Error ? e.message : "Something went wrong");
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, [...deps, tick]);

  // Called from event handlers, so updating state here is safe.
  const reload = () => {
    setLoading(true);
    setError(null);
    setTick((t) => t + 1);
  };

  return {
    data,
    error,
    loading,
    reload,
  };
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
  title = "We couldn't load this",
}: {
  message?: string;
  onRetry: () => void;
  title?: string;
}) {
  return (
    <Card className="rounded-2xl border-amber-200 bg-amber-50/60">
      <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
        <span className="text-3xl" aria-hidden>
          🛠️
        </span>
        <div>
          <p className="font-bold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {message ?? "Please check your connection and try again."}
          </p>
        </div>
        <Button onClick={onRetry} variant="outline" className="rounded-full">
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  icon,
  title,
  detail,
  action,
}: {
  icon: string;
  title: string;
  detail: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-dashed">
      <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
        <span className="text-4xl" aria-hidden>
          {icon}
        </span>
        <div>
          <p className="text-lg font-bold">{title}</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{detail}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}

/** Skeleton grid used while dashboards load. */
export function TilesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
}

export function RowsSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 rounded-2xl" />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-xl" />
        <Skeleton className="h-4 w-40 rounded-lg" />
      </div>
      <Skeleton className="h-36 rounded-3xl" />
      <TilesSkeleton />
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  );
}

// ------------------------------ formatting ---------------------------------

export function levelLabel(ageGroup: string): string {
  return AGE_GROUPS[ageGroup as keyof typeof AGE_GROUPS]?.label ?? "Learning";
}

export function levelRange(ageGroup: string): string {
  return AGE_GROUPS[ageGroup as keyof typeof AGE_GROUPS]?.range ?? "";
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return fmtDate(iso);
}
