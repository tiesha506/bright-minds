"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronUp,
  Flame,
  Home,
  Library,
  Menu,
  NotebookPen,
  Search,
  Settings,
  Sparkles,
  Trophy,
  TrendingUp,
  BookOpen,
  Bot,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { levelFromXp } from "@/lib/student-store";
import { AGE_GROUPS } from "@/lib/learning-config";
import { Avatar } from "@/components/shared/avatar";
import type { StudentProfile } from "@/lib/student-store";

export type NavKey =
  | "home"
  | "subjects"
  | "worksheets"
  | "practice"
  | "reading"
  | "helper"
  | "achievements"
  | "progress";

const NAV_ITEMS: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { key: "subjects", label: "Subjects", icon: <Library className="w-4 h-4" /> },
  { key: "worksheets", label: "Worksheets", icon: <NotebookPen className="w-4 h-4" /> },
  { key: "practice", label: "Practice", icon: <Sparkles className="w-4 h-4" /> },
  { key: "reading", label: "Reading", icon: <BookOpen className="w-4 h-4" /> },
  { key: "helper", label: "Helper", icon: <Bot className="w-4 h-4" /> },
  { key: "achievements", label: "Achievements", icon: <Trophy className="w-4 h-4" /> },
  { key: "progress", label: "Progress", icon: <TrendingUp className="w-4 h-4" /> },
];

interface AppHeaderProps {
  profile: StudentProfile;
  xp: number;
  streak: number;
  active: NavKey;
  onNavigate: (key: NavKey) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onSwitchStudent: () => void;
}

export function AppHeader({
  profile,
  xp,
  streak,
  active,
  onNavigate,
  onOpenSearch,
  onOpenSettings,
  onSwitchStudent,
}: AppHeaderProps) {
  const { level, intoLevel } = levelFromXp(xp);
  const group = AGE_GROUPS[profile.ageGroup];

  // Defensive: during a hot-reload a caller chunk can briefly render the header
  // without fresh props — a missing callback must never crash the whole app.
  const go = (key: NavKey) => () => onNavigate?.(key);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md no-print">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          type="button"
          onClick={go("home")}
          className="flex items-center gap-2 min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="BrightMinds home"
        >
          <div className="h-10 rounded-full overflow-hidden border-2 border-primary/25 bg-white shadow-sm shrink-0 flex items-center">
            <img src="/logo.png" alt="BrightMinds logo" className="h-full w-auto" />
          </div>
          <div className="min-w-0 text-left">
            <p
              className="font-bold text-lg leading-tight truncate flex items-center gap-1.5"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <Avatar avatar={profile.avatar} color={profile.avatarColor} photoUrl={profile.photoUrl} size="xs" />
              BrightMinds
            </p>
            <p className="text-xs text-muted-foreground leading-tight truncate">
              {group.emoji} {profile.name} · {group.label}
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden xl:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.key}
              variant={active === item.key ? "secondary" : "ghost"}
              size="sm"
              onClick={go(item.key)}
              className="rounded-full gap-1.5 font-semibold"
              aria-current={active === item.key ? "page" : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Search (Ctrl+K)"
            onClick={onOpenSearch}
          >
            <Search className="w-4 h-4" />
          </Button>
          {streak > 0 && (
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex gap-1 items-center bg-orange-100 text-orange-800 border-orange-200"
              aria-label={`${streak} day learning streak`}
            >
              <Flame className="w-3.5 h-3.5" /> {streak}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="hidden sm:inline-flex gap-1 items-center bg-amber-100 text-amber-800 border-amber-200"
            aria-label={`Level ${level}`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Level {level}
          </Badge>
          <Badge className="gap-1 items-center font-bold" aria-label={`${xp} XP`}>
            <Zap className="w-3.5 h-3.5" /> {xp} XP
          </Badge>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full xl:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img
                    src="/logo.png"
                    alt=""
                    aria-hidden
                    className="h-8 w-8 rounded-full border border-primary/20"
                  />
                  BrightMinds
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="p-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={go(item.key)}
                    aria-current={active === item.key ? "page" : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold transition-colors",
                      active === item.key
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-secondary/60"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <div className="pt-2 border-t mt-2">
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold hover:bg-secondary/60"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop settings menu */}
          <div className="hidden xl:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Open settings menu">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-bold">{profile.name}&apos;s space</p>
                  <p className="text-xs text-muted-foreground font-normal">
                    Level {level} · {intoLevel}/100 XP to next
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpenSettings}>
                  <Settings className="mr-2 w-4 h-4" /> Profile, theme &amp; text size
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onSwitchStudent}
                  className="text-destructive focus:text-destructive"
                >
                  <Menu className="mr-2 w-4 h-4" /> Switch student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
