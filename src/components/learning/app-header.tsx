"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Trophy, LogOut, Zap, ChevronUp } from "lucide-react";
import { levelFromXp } from "@/lib/student-store";
import { AGE_GROUPS } from "@/lib/learning-config";
import type { StudentProfile } from "@/lib/student-store";

interface AppHeaderProps {
  profile: StudentProfile;
  xp: number;
  onOpenSettings: () => void;
  onOpenAchievements: () => void;
  onSwitchStudent: () => void;
}

export function AppHeader({
  profile,
  xp,
  onOpenSettings,
  onOpenAchievements,
  onSwitchStudent,
}: AppHeaderProps) {
  const { level, intoLevel } = levelFromXp(xp);
  const group = AGE_GROUPS[profile.ageGroup];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md no-print">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/25 shrink-0">
            { }
            <img src="/images/mascot.png" alt="BrightMinds mascot" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-lg leading-tight truncate" style={{ fontFamily: "var(--font-fredoka)" }}>
              BrightMinds
            </p>
            <p className="text-xs text-muted-foreground leading-tight truncate">
              {group.emoji} {profile.name} · {group.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge
            variant="secondary"
            className="hidden sm:inline-flex gap-1 items-center bg-amber-100 text-amber-800 border-amber-200"
            aria-label={`Level ${level}`}
          >
            <ChevronUp className="w-3.5 h-3.5" /> Level {level}
          </Badge>
          <Badge
            className="gap-1 items-center font-bold"
            aria-label={`${xp} XP`}
          >
            <Zap className="w-3.5 h-3.5" /> {xp} XP
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full" aria-label="Open menu">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>
                <p className="font-bold">{profile.name}&apos;s space</p>
                <p className="text-xs text-muted-foreground font-normal">
                  Level {level} · {intoLevel}/100 XP to next
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onOpenAchievements}>
                <Trophy className="mr-2 w-4 h-4" /> My achievements
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenSettings}>
                <Settings className="mr-2 w-4 h-4" /> Profile &amp; theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSwitchStudent} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 w-4 h-4" /> Switch student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
