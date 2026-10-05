"use client";

// ---------------------------------------------------------------------------
// BrightMinds Teacher space — professional shell for the TEACHER role.
// Slate surfaces, emerald accent, dense data-first layout. Sticky footer.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { AuthUser } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { TeacherNavKey } from "@/lib/teacher-types";
import { DashboardView } from "@/components/teacher/dashboard-view";
import { StudentsView } from "@/components/teacher/students-view";
import { ClassroomsView } from "@/components/teacher/classrooms-view";
import { AssignmentsView } from "@/components/teacher/assignments-view";
import { ContentView } from "@/components/teacher/content-view";
import { AnalyticsView } from "@/components/teacher/analytics-view";
import { ReadingSupportView } from "@/components/teacher/reading-support-view";
import { HelperView } from "@/components/teacher/helper-view";
import { ReportsView } from "@/components/teacher/reports-view";
import { SettingsView } from "@/components/teacher/settings-view";

const NAV: { key: TeacherNavKey; emoji: string; label: string }[] = [
  { key: "dashboard", emoji: "🏠", label: "Dashboard" },
  { key: "students", emoji: "👩‍🎓", label: "Students" },
  { key: "classrooms", emoji: "🏫", label: "Classrooms" },
  { key: "assignments", emoji: "📝", label: "Assignments" },
  { key: "content", emoji: "📚", label: "Content" },
  { key: "analytics", emoji: "📊", label: "Analytics" },
  { key: "reading", emoji: "📖", label: "Reading Support" },
  { key: "helper", emoji: "🤖", label: "Teacher Helper" },
  { key: "reports", emoji: "📄", label: "Reports" },
  { key: "settings", emoji: "⚙️", label: "Settings" },
];

function NavButtons({
  active,
  onNavigate,
  onAfterNavigate,
}: {
  active: TeacherNavKey;
  onNavigate: (key: TeacherNavKey) => void;
  onAfterNavigate?: () => void;
}) {
  return (
    <nav aria-label="Teacher sections" className="space-y-0.5">
      {NAV.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => {
            onNavigate(item.key);
            onAfterNavigate?.();
          }}
          aria-current={active === item.key ? "page" : undefined}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
            active === item.key
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          <span aria-hidden className="text-base leading-none">
            {item.emoji}
          </span>
          <span className="flex-1 truncate">{item.label}</span>
          {active === item.key && <ChevronRight className="h-3.5 w-3.5 text-emerald-600" />}
        </button>
      ))}
    </nav>
  );
}

/** The complete teacher experience. Required export. */
export function TeacherApp({ user }: { user: AuthUser }) {
  const [active, setActive] = useState<TeacherNavKey>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll to top on section change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  const signOut = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // Session already gone — continue with local sign-out.
    }
    useAuthStore.getState().clear();
  };

  const go = (key: TeacherNavKey) => setActive(key);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      {/* ------------------------------ Header ------------------------------ */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white no-print">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
          {/* Mobile nav */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-3">
              <SheetTitle className="px-2 pb-2 text-left text-sm font-bold text-slate-500">
                Teacher space
              </SheetTitle>
              <NavButtons active={active} onNavigate={go} onAfterNavigate={() => setMobileNavOpen(false)} />
            </SheetContent>
          </Sheet>

          <Image src="/logo.png" alt="BrightMinds logo" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" priority />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-extrabold tracking-tight">BrightMinds</p>
            <p className="hidden text-xs text-slate-500 sm:block">Teacher space</p>
          </div>
          <span className="hidden items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 md:inline-flex">
            🍎 Teacher space
          </span>
          <span className="hidden truncate text-sm font-semibold text-slate-700 sm:inline">
            {user.name}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="gap-1.5 border-slate-300 text-slate-600 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>

      {/* ------------------------------ Body ------------------------------- */}
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white px-3 py-4 lg:block no-print">
          <NavButtons active={active} onNavigate={go} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            {active === "dashboard" && <DashboardView user={user} onNavigate={go} />}
            {active === "students" && <StudentsView user={user} />}
            {active === "classrooms" && <ClassroomsView user={user} />}
            {active === "assignments" && <AssignmentsView user={user} />}
            {active === "content" && <ContentView user={user} />}
            {active === "analytics" && <AnalyticsView user={user} />}
            {active === "reading" && <ReadingSupportView user={user} />}
            {active === "helper" && <HelperView user={user} />}
            {active === "reports" && <ReportsView user={user} />}
            {active === "settings" && <SettingsView user={user} onNavigate={go} />}
          </div>
        </main>
      </div>

      {/* ------------------------- Sticky footer --------------------------- */}
      <footer className="mt-auto border-t border-slate-200 bg-white pb-safe no-print">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
          <span className="font-semibold text-slate-600">BrightMinds for Teachers</span>
          <span aria-hidden>·</span>
          <span>Teachers only see students in their own classrooms.</span>
          <span className="ml-auto">Signed in as {user.name}</span>
        </div>
      </footer>
    </div>
  );
}
