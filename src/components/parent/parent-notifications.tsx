"use client";

import { BellOff, CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NotificationItem } from "@/lib/parent-types";
import { cn } from "@/lib/utils";
import { EmptyState, ErrorState, RowsSkeleton, SectionHeader, timeAgo } from "./parent-ui";

// ---------------------------------------------------------------------------
// Notifications — the feed created automatically by the platform when the
// child completes lessons, quizzes or assignments. Simple and readable.
// ---------------------------------------------------------------------------

const KIND_META: Record<string, { icon: string; label: string; tint: string }> = {
  completion: { icon: "✅", label: "Lesson completed", tint: "bg-emerald-50 border-emerald-200" },
  score: { icon: "🏅", label: "Great score", tint: "bg-amber-50 border-amber-200" },
  suggestion: { icon: "💡", label: "Idea", tint: "bg-rose-50 border-rose-200" },
  assignment: { icon: "📋", label: "Assignment", tint: "bg-violet-50 border-violet-200" },
};

export function ParentNotifications({
  notifications,
  error,
  loading,
  unreadCount,
  onReload,
  onMarkAllRead,
}: {
  notifications: NotificationItem[] | null;
  error: string | null;
  loading: boolean;
  unreadCount: number;
  onReload: () => void;
  onMarkAllRead: () => void;
}) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Notifications"
        subtitle="Little updates from your children's learning."
        action={
          <Button
            variant="outline"
            onClick={onMarkAllRead}
            disabled={loading || unreadCount === 0}
            className="rounded-full"
          >
            <CheckCheck className="h-4 w-4" aria-hidden /> Mark all read
            {unreadCount > 0 && (
              <Badge className="ml-1.5 bg-rose-500 text-white hover:bg-rose-500">
                {unreadCount}
              </Badge>
            )}
          </Button>
        }
      />

      {loading && !notifications ? (
        <RowsSkeleton rows={5} />
      ) : error && !notifications ? (
        <ErrorState message={error} onRetry={onReload} />
      ) : !notifications || notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="All quiet for now"
          detail="When your child completes a lesson, does brilliantly on a quiz or finishes class work, it will show up here."
        />
      ) : (
        <ul className="space-y-2.5" aria-label="Notifications list">
          {notifications.map((n) => {
            const meta = KIND_META[n.kind] ?? {
              icon: "🔔",
              label: "Update",
              tint: "bg-muted/40 border",
            };
            return (
              <li key={n.id}>
                <Card
                  className={cn(
                    "rounded-2xl border transition-colors",
                    n.read ? "border-border bg-card" : cn(meta.tint, "border")
                  )}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <span className="text-2xl" aria-hidden>
                      {meta.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold">{n.childName}</span>
                        <Badge variant="secondary" className="rounded-full text-[11px]">
                          {meta.label}
                        </Badge>
                        {!n.read && (
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-rose-500"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{n.text}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{timeAgo(n.createdAt)}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && notifications && notifications.length > 0 && unreadCount === 0 && (
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <BellOff className="h-4 w-4" aria-hidden /> You&apos;re all caught up.
        </p>
      )}
    </div>
  );
}
