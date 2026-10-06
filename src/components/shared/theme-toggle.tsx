"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Leaf, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
/** Hydration-safe "mounted" check (SSR renders false, client true). */
function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/** The three appearance modes BrightMinds supports. */
export const APPEARANCE_MODES = [
  { value: "light", label: "Light", icon: Sun, emoji: "☀️" },
  { value: "dark", label: "Dark", icon: Moon, emoji: "🌙" },
  { value: "eye-friendly", label: "Eye-Friendly", icon: Leaf, emoji: "🌿" },
] as const;

export type AppearanceMode = (typeof APPEARANCE_MODES)[number]["value"];

/**
 * Compact Light / Dark / Eye-Friendly toggle for headers and menus.
 * Selection is persisted by next-themes (localStorage key: "theme").
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const active = mounted && theme ? theme : "light";

  return (
    <div
      role="group"
      aria-label="Appearance"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border bg-card/80 p-1 shadow-sm",
        className
      )}
    >
      {APPEARANCE_MODES.map((mode) => {
        const Icon = mode.icon;
        const isActive = active === mode.value;
        return (
          <button
            key={mode.value}
            type="button"
            title={`${mode.label} mode`}
            aria-label={`${mode.label} mode`}
            aria-pressed={isActive}
            onClick={() => setTheme(mode.value)}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring/60",
              isActive
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
