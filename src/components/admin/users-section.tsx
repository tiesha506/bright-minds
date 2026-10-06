"use client";

import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type {
  AdminRole,
  AdminStudentRow,
  AdminUserRow,
  UsersData,
} from "@/lib/admin-types";
import { RoleBadge, EmptyState, ErrorNote, SectionHeading, fmtDate } from "./shared";

const TABS: { key: string; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "PARENT", label: "Parents" },
  { key: "TEACHER", label: "Teachers" },
  { key: "ADMIN", label: "Admins" },
  { key: "STUDENT", label: "Students" },
];

const ALL_ROLES: AdminRole[] = ["STUDENT", "PARENT", "TEACHER", "ADMIN"];

type DeleteTarget =
  | { kind: "user"; id: string; name: string; extra: string }
  | { kind: "student"; id: string; name: string; extra: string };

/** Online = lastSeenAt within the last 5 minutes (maintained by the auth layer). */
function lastSeenLabel(iso: string | null): { online: boolean; text: string } {
  if (!iso) return { online: false, text: "Never" };
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return { online: false, text: "Never" };
  const diff = Date.now() - ts;
  if (diff < 5 * 60 * 1000) return { online: true, text: "Online" };
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return { online: false, text: `${Math.max(1, mins)}m ago` };
  const hours = Math.floor(mins / 60);
  if (hours < 24) return { online: false, text: `${hours}h ago` };
  const days = Math.floor(hours / 24);
  if (days < 30) return { online: false, text: `${days}d ago` };
  return { online: false, text: fmtDate(iso) };
}

function LastSeenCell({ iso }: { iso: string | null }) {
  const { online, text } = lastSeenLabel(iso);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-zinc-300"}`}
      />
      <span className={online ? "font-semibold text-emerald-700" : "text-zinc-500"}>
        {text}
      </span>
    </span>
  );
}

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function UsersSection({ currentUser }: { currentUser: AuthUser }) {
  const [tab, setTab] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");
  const [data, setData] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rowBusy, setRowBusy] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Debounce the search box.
  useEffect(() => {
    const t = setTimeout(() => setQ(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  function reload() {
    setReloadKey((k) => k + 1);
  }

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (tab !== "ALL") params.set("role", tab);
    if (q) params.set("q", q);
    api<UsersData>(`/api/admin/users?${params.toString()}`)
      .then((d) => {
        if (alive) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((e: Error) => {
        if (alive) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, [tab, q, reloadKey]);

  async function changeRole(id: string, role: string) {
    setRowBusy(id);
    setError(null);
    try {
      await api(`/api/admin/users/${id}`, { method: "PATCH", body: { role } });
      await reload();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRowBusy(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setRowBusy(target.id);
    setError(null);
    try {
      if (target.kind === "user") {
        await api(`/api/admin/users/${target.id}`, { method: "DELETE" });
      } else {
        await api(`/api/admin/students/${target.id}`, { method: "DELETE" });
      }
      await reload();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setRowBusy(null);
    }
  }

  const users: AdminUserRow[] = data?.users ?? [];
  const students: AdminStudentRow[] = data?.students ?? [];
  const isStudentTab = tab === "STUDENT";

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Users"
        description="Accounts and child profiles. Role changes and deletions take effect immediately."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter by role">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                tab === t.key
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden
          />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={isStudentTab ? "Search child or parent…" : "Search name or email…"}
            className="border-zinc-300 pl-8"
            aria-label="Search users"
          />
        </div>
      </div>

      {error && <ErrorNote message={error} />}

      <Card className="border-zinc-200 py-0">
        {loading ? (
          <TableSkeleton rows={6} />
        ) : isStudentTab ? (
          students.length === 0 ? (
            <div className="p-4">
              <EmptyState
                title="No child profiles found"
                hint="Child profiles are created by parents during onboarding or by teachers adding classroom seats."
              />
            </div>
          ) : (
            <CardContent className="overflow-x-auto py-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3">Group</th>
                    <th className="px-4 py-3">Parent</th>
                    <th className="px-4 py-3">Login code</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">{s.name}</td>
                      <td className="px-4 py-2.5 tabular-nums">{s.age}</td>
                      <td className="px-4 py-2.5 capitalize text-zinc-600">{s.ageGroup}</td>
                      <td className="px-4 py-2.5 text-zinc-600">{s.parentName ?? "—"}</td>
                      <td className="px-4 py-2.5">
                        {s.hasCode ? (
                          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                            Set
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-400">Not set</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-500">{fmtDate(s.createdAt)}</td>
                      <td className="px-4 py-2.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={rowBusy === s.id}
                          onClick={() =>
                            setDeleteTarget({
                              kind: "student",
                              id: s.id,
                              name: s.name,
                              extra: `Age ${s.age}${s.parentName ? ` · parent ${s.parentName}` : ""}`,
                            })
                          }
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          aria-label={`Delete ${s.name}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          )
        ) : users.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No accounts found"
              hint={q ? "Try a different search." : "No accounts match this filter yet."}
            />
          </div>
        ) : (
          <CardContent className="overflow-x-auto py-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Last seen</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Linked</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {users.map((u) => {
                  const self = u.id === currentUser.id;
                  return (
                    <tr key={u.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-2.5 font-semibold text-zinc-900">
                        {u.name}
                        {self && (
                          <span className="ml-1.5 text-xs font-medium text-zinc-400">
                            (you)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-600">{u.email}</td>
                      <td className="px-4 py-2.5">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-4 py-2.5">
                        <LastSeenCell iso={u.lastSeenAt} />
                      </td>
                      <td className="px-4 py-2.5 text-zinc-500">{fmtDate(u.createdAt)}</td>
                      <td className="px-4 py-2.5 text-zinc-600">
                        {u.role === "PARENT"
                          ? `${u.childrenCount} ${u.childrenCount === 1 ? "child" : "children"}`
                          : u.role === "TEACHER"
                            ? `${u.classroomCount} ${u.classroomCount === 1 ? "classroom" : "classrooms"}`
                            : "—"}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-end gap-2">
                          <Select
                            value={u.role}
                            disabled={self || rowBusy === u.id}
                            onValueChange={(v) => changeRole(u.id, v)}
                          >
                            <SelectTrigger
                              size="sm"
                              aria-label={`Change role for ${u.name}`}
                              className="w-28 border-zinc-300"
                              title={self ? "You can't change your own role" : undefined}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ALL_ROLES.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={self || rowBusy === u.id}
                            title={self ? "You can't delete your own account" : undefined}
                            onClick={() =>
                              setDeleteTarget({
                                kind: "user",
                                id: u.id,
                                name: u.name,
                                extra: `${u.role} · ${u.email}`,
                              })
                            }
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            aria-label={`Delete ${u.name}`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        )}
      </Card>

      <p className="text-xs text-zinc-500">
        Deleting an account removes its sessions, classrooms, assignments, custom activities,
        notifications and child profiles. Deleting a child profile removes their progress,
        activity, seats and results. These actions cannot be undone.
      </p>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteTarget?.kind === "student" ? "child profile" : "account"} “
              {deleteTarget?.name}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.extra && (
                <span className="mb-2 block font-medium text-zinc-700">
                  {deleteTarget.extra}
                </span>
              )}
              This permanently removes{" "}
              {deleteTarget?.kind === "student"
                ? "the profile with all of its progress, activity, classroom seats, results and goal"
                : "the account with all of its sessions, classrooms, assignments, custom activities, notifications and child profiles"}
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
