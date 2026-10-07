"use client";

import { useState } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { useAuthStore, type AuthUser } from "@/lib/auth-store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { HelpButton } from "@/components/shared/howto-guides";
import { GuidedTour } from "@/components/shared/guided-tour";
import { OverviewSection } from "@/components/admin/overview-section";
import { UsersSection } from "@/components/admin/users-section";
import { ClassroomsSection } from "@/components/admin/classrooms-section";
import { ContentSection } from "@/components/admin/content-section";
import { AnalyticsSection } from "@/components/admin/analytics-section";
import { PermissionsSection } from "@/components/admin/permissions-section";
import { SettingsSection } from "@/components/admin/settings-section";
import { GuideSection } from "@/components/admin/guide-section";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "users", label: "Users" },
  { key: "classrooms", label: "Classrooms" },
  { key: "content", label: "Content" },
  { key: "analytics", label: "Analytics" },
  { key: "permissions", label: "Permissions" },
  { key: "settings", label: "Settings" },
  { key: "guide", label: "Guide" },
] as const;

type NavKey = (typeof NAV)[number]["key"];

export function AdminApp({ user }: { user: AuthUser }) {
  const [section, setSection] = useState<NavKey>("overview");
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // Session is cleared locally regardless; the server token will expire.
    }
    useAuthStore.getState().clear();
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BrightMinds logo"
              className="h-9 w-9 rounded-lg border border-zinc-200 object-cover"
            />
            <div>
              <p className="text-sm font-bold leading-tight">BrightMinds Admin</p>
              <p className="text-xs leading-tight text-zinc-500">
                Platform management console
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Appearance + help — hidden on very small screens to keep the bar tidy. */}
            <div className="hidden items-center gap-1.5 sm:flex no-print">
              <ThemeToggle />
              <HelpButton role="admin" />
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-tight">{user.name}</p>
              <p className="text-xs leading-tight text-zinc-500">{user.email}</p>
            </div>
            <Badge className="border-transparent bg-emerald-600 font-semibold text-white hover:bg-emerald-600">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              ADMIN
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              disabled={signingOut}
              className="border-zinc-300"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              {signingOut ? "Signing out…" : "Sign out"}
            </Button>
          </div>
        </div>
        <nav aria-label="Admin sections" className="mx-auto w-full max-w-6xl px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {NAV.map((n) => (
              <button
                key={n.key}
                type="button"
                aria-current={section === n.key ? "page" : undefined}
                onClick={() => setSection(n.key)}
                data-tour={n.key === "guide" ? undefined : n.key}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                  section === n.key
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                {n.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {section === "overview" && <OverviewSection />}
        {section === "users" && <UsersSection currentUser={user} />}
        {section === "classrooms" && <ClassroomsSection />}
        {section === "content" && <ContentSection />}
        {section === "analytics" && <AnalyticsSection />}
        {section === "permissions" && <PermissionsSection />}
        {section === "settings" && <SettingsSection />}
        {section === "guide" && <GuideSection />}
      </main>

      {/* One-time guided tour (auto-plays once per admin). */}
      <GuidedTour role="admin" userId={user.id} />

      <footer className="mt-auto border-t border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-1 px-4 py-3 text-xs text-zinc-500 sm:flex-row">
          <p>
            BrightMinds Admin Console — signed in as{" "}
            <span className="font-semibold text-zinc-700">{user.email}</span>
          </p>
          <p>Every admin action is validated server-side.</p>
        </div>
      </footer>
    </div>
  );
}
