"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Users } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { AuthUser } from "@/lib/auth-store";

interface StatusRow {
  studentId: string;
  name: string;
  groupName: string;
  classroomNames: string[];
  online: boolean;
  lastActive: string | null;
}

const AVATAR_COLORS = ["bg-amber-200", "bg-rose-200", "bg-emerald-200", "bg-teal-200", "bg-violet-200", "bg-orange-200"];

/**
 * TeacherStatusPanel — live "My Students" online/offline list for teachers.
 *
 * Contract for shell wiring:  <TeacherStatusPanel user={user} />
 * Data: GET /api/status (TEACHER/ADMIN only). Auto-refreshes every 60 s.
 */
export function TeacherStatusPanel({ user }: { user: AuthUser }) {
  const [rows, setRows] = useState<StatusRow[] | null>(null);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (announce = false) => {
    setRefreshing(true);
    try {
      const data = await api<{ students: StatusRow[] }>("/api/status");
      setRows(data.students);
      if (announce) toast.success("Status refreshed");
    } catch (e) {
      if (announce) toast.error(e instanceof Error ? e.message : "Could not load status");
      setRows((prev) => prev ?? []);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(() => load(), 60_000); // auto-refresh every 60 s
    return () => clearInterval(t);
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows ?? [];
    return (rows ?? []).filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.groupName.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const onlineCount = (rows ?? []).filter((r) => r.online).length;

  const relative = (iso: string | null) =>
    iso ? formatDistanceToNowStrict(new Date(iso), { addSuffix: true }) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-primary" />
          My Students
          {rows !== null && (
            <Badge variant="secondary" className="ml-auto gap-1.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-emerald-500"
              />
              {onlineCount} online · {rows.length} total
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => load(true)}
            disabled={refreshing}
            className="h-9 rounded-full"
            aria-label="Refresh status"
          >
            {refreshing ? "Refreshing…" : "Refresh"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or group…"
            aria-label="Search students"
            className="h-10 rounded-full pl-8"
          />
        </div>

        {rows === null && (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        )}

        {rows !== null && rows.length === 0 && (
          <p className="rounded-xl bg-muted/40 px-3 py-8 text-center text-sm text-muted-foreground">
            No students seated in your classrooms yet — add students from the Classrooms tab.
          </p>
        )}

        {rows !== null && rows.length > 0 && filtered.length === 0 && (
          <p className="rounded-xl bg-muted/40 px-3 py-6 text-center text-sm text-muted-foreground">
            No students match &ldquo;{query}&rdquo;.
          </p>
        )}

        {filtered.length > 0 && (
          <ScrollArea className="max-h-96">
            <ul className="space-y-2 pr-2">
              {filtered.map((r) => {
                const color =
                  AVATAR_COLORS[r.studentId.charCodeAt(r.studentId.length - 1) % AVATAR_COLORS.length];
                const last = relative(r.lastActive);
                return (
                  <li
                    key={r.studentId}
                    className="flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30 px-3 py-2.5"
                  >
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color}`}
                    >
                      {r.name.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{r.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.online
                          ? "Online now"
                          : last
                            ? `Last active: ${last}`
                            : "No activity recorded yet"}
                      </p>
                    </div>
                    {r.groupName && (
                      <Badge variant="secondary" className="max-w-28 truncate">
                        Group {r.groupName}
                      </Badge>
                    )}
                    <span
                      role="img"
                      aria-label={r.online ? "Online" : "Offline"}
                      className="text-base"
                    >
                      {r.online ? "🟢" : "⚪"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
        <p className="text-[11px] leading-snug text-muted-foreground" role="note">
          Online = activity in the last 5 minutes. Updates automatically every minute.
          {user.role === "ADMIN" ? " Showing students from all classrooms (admin view)." : ""}
        </p>
      </CardContent>
    </Card>
  );
}
