"use client";

import { Badge } from "@/components/ui/badge";
import { AlertCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/lib/admin-types";

// ---------------------------------------------------------------------------
// Small shared pieces for the admin console: role badges, date formatting,
// empty/error states. Utilitarian zinc/slate look, emerald reserved for
// positive accents.
// ---------------------------------------------------------------------------

const ROLE_STYLES: Record<AdminRole, string> = {
  ADMIN: "border-transparent bg-zinc-900 text-zinc-50",
  TEACHER: "border-emerald-200 bg-emerald-50 text-emerald-800",
  PARENT: "border-transparent bg-zinc-200 text-zinc-700",
  STUDENT: "border-zinc-200 bg-zinc-100 text-zinc-600",
};

export function RoleBadge({ role }: { role: string }) {
  const style =
    ROLE_STYLES[role as AdminRole] ?? "border-zinc-200 bg-zinc-100 text-zinc-600";
  return (
    <Badge variant="outline" className={cn("font-semibold", style)}>
      {role}
    </Badge>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-02-03T…" → "3 Feb 2025" */
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold tracking-tight text-zinc-900">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-zinc-500">{description}</p>}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
      <Inbox className="h-6 w-6 text-zinc-400" aria-hidden />
      <p className="text-sm font-semibold text-zinc-700">{title}</p>
      {hint && <p className="max-w-sm text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
    >
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
