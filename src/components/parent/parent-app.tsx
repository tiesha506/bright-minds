"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useAuthStore, type AuthUser } from "@/lib/auth-store";
import type { ChildSummary, NotificationItem, NotificationsResponse } from "@/lib/parent-types";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { HelpButton } from "@/components/shared/howto-guides";
import { GuidedTour } from "@/components/shared/guided-tour";
import { RemindersPanel } from "@/components/shared/reminders-panel";
import { ParentReportsPanel } from "@/components/parent/reports-panel";
import { ErrorState, PageSkeleton } from "./parent-ui";
import { ParentDashboard } from "./parent-dashboard";
import { ParentChildren } from "./parent-children";
import { ChildProgressView } from "./parent-progress";
import { ParentReports } from "./parent-reports";
import { ParentGoals } from "./parent-goals";
import { ParentNotifications } from "./parent-notifications";
import { ParentSettings } from "./parent-settings";

// ---------------------------------------------------------------------------
// ParentApp — the complete parent experience: header, icon nav (left rail on
// desktop, chips on mobile), sections and a warm simple footer.
// ---------------------------------------------------------------------------

export type ParentSection =
  | "dashboard"
  | "children"
  | "progress"
  | "reports"
  | "goals"
  | "notifications"
  | "settings";

const NAV: { key: ParentSection; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "children", label: "My Children", icon: Users },
  { key: "progress", label: "Child Progress", icon: LineChart },
  { key: "reports", label: "Reports", icon: ClipboardList },
  { key: "goals", label: "Learning Goals", icon: CalendarCheck },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "settings", label: "Settings", icon: Settings },
];

export function ParentApp({ user }: { user: AuthUser }) {
  const { toast } = useToast();
  const [section, setSection] = useState<ParentSection>("dashboard");

  // ------------------------- children (loaded once) ------------------------
  const [children, setChildren] = useState<ChildSummary[] | null>(null);
  const [childrenError, setChildrenError] = useState<string | null>(null);
  const [childrenLoading, setChildrenLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const loadChildren = useCallback(async () => {
    setChildrenLoading(true);
    setChildrenError(null);
    try {
      const data = await api<{ children: ChildSummary[] }>("/api/parent/children");
      setChildren(data.children);
    } catch (err) {
      setChildrenError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setChildrenLoading(false);
    }
  }, []);

  // --------------------------- notifications -------------------------------
  const [notifications, setNotifications] = useState<NotificationItem[] | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [notifLoading, setNotifLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    setNotifLoading(true);
    setNotifError(null);
    try {
      const data = await api<NotificationsResponse>("/api/parent/notifications");
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      setNotifError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setNotifLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChildren();
    loadNotifications();
  }, [loadChildren, loadNotifications]);

  // Keep a valid child selected (first child by default).
  useEffect(() => {
    if (children && children.length > 0) {
      if (!selectedChildId || !children.some((c) => c.id === selectedChildId)) {
        setSelectedChildId(children[0].id);
      }
    } else if (children && children.length === 0) {
      setSelectedChildId(null);
    }
  }, [children, selectedChildId]);

  const selectedChild = children?.find((c) => c.id === selectedChildId) ?? null;

  const go = useCallback((next: ParentSection) => {
    setSection(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openChild = useCallback(
    (childId: string, next: ParentSection = "dashboard") => {
      setSelectedChildId(childId);
      go(next);
    },
    [go]
  );

  const signOut = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // Signing out locally regardless — the token simply becomes unusable.
    }
    useAuthStore.getState().clear();
  };

  const markAllRead = async () => {
    try {
      await api("/api/parent/notifications/read-all", { method: "POST" });
      setNotifications((prev) => prev?.map((n) => ({ ...n, read: true })) ?? prev);
      setUnreadCount(0);
      toast({ title: "All caught up ✅", description: "Every notification is marked as read." });
    } catch (err) {
      toast({
        title: "Couldn't update notifications",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ------------------------------ header ------------------------------ */}
      <header className="no-print sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => go("dashboard")}
            className="flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="BrightMinds parent dashboard home"
          >
            <img
              src="/logo.png"
              alt="BrightMinds logo"
              className="h-9 w-9 rounded-xl object-cover shadow-sm"
            />
            <span className="text-lg font-extrabold tracking-tight">
              Bright<span className="text-rose-500">Minds</span>
            </span>
            <span className="hidden rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 md:inline">
              Parent
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative lg:hidden"
              onClick={() => go("notifications")}
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            {/* Appearance + help — hidden on very small screens to keep the bar tidy. */}
            <div className="hidden items-center gap-1.5 sm:flex no-print">
              <HelpButton role="parent" />
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" aria-hidden />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>

        {/* Mobile section chips */}
        <nav aria-label="Parent sections" className="border-t lg:hidden">
          <div
            className="flex gap-1.5 overflow-x-auto px-3 py-2"
            role="tablist"
            aria-orientation="horizontal"
          >
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = section === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => go(item.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                    active
                      ? "border-rose-200 bg-rose-100 text-rose-700"
                      : "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                  {item.key === "notifications" && unreadCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* --------------------------- desktop rail --------------------------- */}
        <aside className="no-print sticky top-[65px] hidden h-[calc(100vh-65px)] w-60 shrink-0 flex-col justify-between border-r px-3 py-6 lg:flex">
          <nav aria-label="Parent sections" className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = section === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.key)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                    active
                      ? "bg-rose-100 text-rose-700"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  {item.label}
                  {item.key === "notifications" && unreadCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="rounded-2xl bg-emerald-50 p-3.5 text-xs leading-relaxed text-emerald-900">
            <p className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="h-4 w-4" aria-hidden /> Private by design
            </p>
            <p className="mt-1">
              You only ever see your own children&apos;s learning progress — nothing else.
            </p>
          </div>
        </aside>

        {/* ------------------------------ main -------------------------------- */}
        <main className="min-w-0 flex-1 px-4 py-6 pb-12 sm:px-6 sm:py-8">
          {childrenLoading && children === null ? (
            <PageSkeleton />
          ) : childrenError ? (
            <ErrorState message={childrenError} onRetry={loadChildren} />
          ) : children !== null && children.length > 0 && !selectedChild ? (
            <PageSkeleton />
          ) : (
            <>
              {section === "dashboard" && (
                <div className="space-y-6" data-tour="dashboard">
                  <ParentDashboard child={selectedChild} onGo={go} />
                  <RemindersPanel user={user} variant="pro" />
                </div>
              )}
              {section === "children" && (
                <div data-tour="children">
                  <ParentChildren
                    kids={children ?? []}
                    loading={childrenLoading}
                    error={childrenError}
                    onReload={loadChildren}
                    onSelect={(id) => openChild(id, "dashboard")}
                  />
                </div>
              )}
              {section === "progress" && (
                <div data-tour="progress">
                  <ChildProgressView
                    kids={children ?? []}
                    selectedChild={selectedChild}
                    onSelect={(id) => setSelectedChildId(id)}
                  />
                </div>
              )}
              {section === "reports" && (
                <div className="space-y-10" data-tour="reports">
                  {/* Private report documents shared by the teacher. */}
                  <ParentReportsPanel />
                  {/* Printable learning summary. */}
                  <ParentReports
                    kids={children ?? []}
                    selectedChild={selectedChild}
                    onSelect={(id) => setSelectedChildId(id)}
                  />
                </div>
              )}
              {section === "goals" && (
                <ParentGoals
                  kids={children ?? []}
                  selectedChild={selectedChild}
                  onSelect={(id) => setSelectedChildId(id)}
                  onSaved={loadChildren}
                />
              )}
              {section === "notifications" && (
                <ParentNotifications
                  notifications={notifications}
                  error={notifError}
                  loading={notifLoading}
                  unreadCount={unreadCount}
                  onReload={loadNotifications}
                  onMarkAllRead={markAllRead}
                />
              )}
              {section === "settings" && (
                <div data-tour="settings">
                  <ParentSettings
                    user={user}
                    kids={children ?? []}
                    onSelectChild={(id) => openChild(id, "dashboard")}
                    onSignOut={signOut}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ------------------------------ footer ------------------------------ */}
      <footer className="no-print mt-auto border-t bg-card/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-safe sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt=""
                aria-hidden
                className="h-6 w-6 rounded-full object-cover"
              />
              BrightMinds — helping curious kids grow, one small win at a time
              <span aria-hidden>💛</span>
            </p>
            <nav aria-label="Footer" className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => go("settings")}
                className="hover:text-foreground transition-colors"
              >
                Settings
              </button>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" aria-hidden /> Parents see progress only
              </span>
            </nav>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground/70 sm:text-left">
            © {new Date().getFullYear()} BrightMinds Learning. Family data stays private. 🌈
          </p>
        </div>
      </footer>

      {/* One-time guided tour (auto-plays once per parent). */}
      <GuidedTour role="parent" userId={user.id} />
    </div>
  );
}
