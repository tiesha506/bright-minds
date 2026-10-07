"use client";

import { Check, Minus, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./shared";

// ---------------------------------------------------------------------------
// Read-only capability matrix. Informational only — every rule here is
// enforced server-side on each API route (role checks + ownership filters).
// ---------------------------------------------------------------------------

type RoleCol = "STUDENT" | "PARENT" | "TEACHER" | "ADMIN";

interface CapRow {
  capability: string;
  scope: string;
  grant: Record<RoleCol, boolean>;
}

const ROWS: CapRow[] = [
  {
    capability: "Learn lessons, take quizzes & practise worksheets",
    scope: "Own learning only",
    grant: { STUDENT: true, PARENT: false, TEACHER: false, ADMIN: false },
  },
  {
    capability: "View & build own progress, XP and streak",
    scope: "Own data only",
    grant: { STUDENT: true, PARENT: false, TEACHER: false, ADMIN: false },
  },
  {
    capability: "Create child profiles & manage their settings",
    scope: "Own children only",
    grant: { STUDENT: false, PARENT: true, TEACHER: false, ADMIN: false },
  },
  {
    capability: "View progress reports & weekly insights",
    scope: "Own children only",
    grant: { STUDENT: false, PARENT: true, TEACHER: false, ADMIN: false },
  },
  {
    capability: "Create classrooms & manage seats/groups",
    scope: "Own classrooms only",
    grant: { STUDENT: false, PARENT: false, TEACHER: true, ADMIN: false },
  },
  {
    capability: "Set assignments & build custom activities",
    scope: "Own classrooms only",
    grant: { STUDENT: false, PARENT: false, TEACHER: true, ADMIN: false },
  },
  {
    capability: "View class results & differentiate groups",
    scope: "Own classrooms only",
    grant: { STUDENT: false, PARENT: false, TEACHER: true, ADMIN: false },
  },
  {
    capability: "Manage all user accounts (roles, deletion)",
    scope: "Whole platform",
    grant: { STUDENT: false, PARENT: false, TEACHER: false, ADMIN: true },
  },
  {
    capability: "Open/close registration & platform settings",
    scope: "Whole platform",
    grant: { STUDENT: false, PARENT: false, TEACHER: false, ADMIN: true },
  },
  {
    capability: "See platform-wide analytics & content stats",
    scope: "Whole platform",
    grant: { STUDENT: false, PARENT: false, TEACHER: false, ADMIN: true },
  },
  {
    capability: "Delete any child profile or account",
    scope: "Whole platform",
    grant: { STUDENT: false, PARENT: false, TEACHER: false, ADMIN: true },
  },
];

const COLUMNS: RoleCol[] = ["STUDENT", "PARENT", "TEACHER", "ADMIN"];

export function PermissionsSection() {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Permissions"
        description="What each role can do across the platform."
      />

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          This matrix is <strong>informational</strong>. Every rule is enforced
          server-side on each API route — role checks, ownership filters and
          self-protection — so hiding or showing UI alone never grants access.
        </p>
      </div>

      <Card className="border-zinc-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Capability matrix</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-4">Capability</th>
                <th className="py-2 pr-4 font-normal normal-case">Enforced scope</th>
                {COLUMNS.map((c) => (
                  <th key={c} className="px-2 py-2 text-center">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {ROWS.map((row) => (
                <tr key={row.capability} className="hover:bg-zinc-50">
                  <td className="py-2.5 pr-4 font-medium text-zinc-900">
                    {row.capability}
                  </td>
                  <td className="py-2.5 pr-4 text-zinc-500">{row.scope}</td>
                  {COLUMNS.map((c) => (
                    <td key={c} className="px-2 py-2.5 text-center">
                      {row.grant[c] ? (
                        <Check
                          className="mx-auto h-4 w-4 text-emerald-600"
                          aria-label={`${c}: allowed`}
                        />
                      ) : (
                        <Minus
                          className="mx-auto h-4 w-4 text-zinc-300"
                          aria-label={`${c}: not allowed`}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className={cn("text-xs text-zinc-500")}>
        Note: one exception is deliberate — the admin who manages accounts cannot
        change or delete their own account from the Users table, which protects the
        platform from losing its last administrator by accident.
      </p>
    </div>
  );
}
