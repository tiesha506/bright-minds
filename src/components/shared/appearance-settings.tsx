"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { APPEARANCE_MODES, ThemeToggle } from "@/components/shared/theme-toggle";

const emptySubscribe = () => () => {};
/** Hydration-safe "mounted" check (SSR renders false, client true). */
function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/** Small colour swatches that preview each mode's palette (hex approximations). */
const MODE_SWATCHES: Record<string, { bg: string; card: string; primary: string; fg: string }> = {
  light: { bg: "#f2fbfa", card: "#ffffff", primary: "#16a3a3", fg: "#264247" },
  dark: { bg: "#2a2620", card: "#3a342c", primary: "#82d2c6", fg: "#f0ece4" },
  "eye-friendly": { bg: "#faf6ef", card: "#fbf8f1", primary: "#35927c", fg: "#5d564a" },
};

function ModePreviewCard({
  value,
  label,
  emoji,
  active,
  onSelect,
}: {
  value: string;
  label: string;
  emoji: string;
  active: boolean;
  onSelect: (value: string) => void;
}) {
  const sw = MODE_SWATCHES[value];
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(value)}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 text-center transition-all outline-none",
        "min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring/60",
        active
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/40 hover:bg-muted/50"
      )}
    >
      {active && (
        <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      {/* Mini palette preview */}
      <span
        aria-hidden="true"
        className="flex w-full items-center gap-2 rounded-xl p-2.5 shadow-inner"
        style={{ backgroundColor: sw.bg }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: sw.card, color: sw.fg }}
        >
          Aa
        </span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="h-2 w-full rounded-full" style={{ backgroundColor: sw.primary }} />
          <span className="h-2 w-3/4 rounded-full opacity-50" style={{ backgroundColor: sw.primary }} />
        </span>
        <span className="h-9 w-9 rounded-full" style={{ backgroundColor: sw.primary, opacity: 0.85 }} />
      </span>
      <span className="font-display text-base font-semibold">
        <span aria-hidden="true" className="mr-1">{emoji}</span>
        {label}
      </span>
    </button>
  );
}

/**
 * Full "Settings → Appearance" section: choose Light, Dark or Eye-Friendly mode.
 * Selection persists automatically (next-themes → localStorage "theme").
 */
export function AppearanceSettings({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const active = mounted && theme ? theme : "light";

  return (
    <section
      className={cn("rounded-2xl border bg-card p-4 shadow-sm sm:p-6", className)}
      aria-labelledby="appearance-heading"
    >
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h2 id="appearance-heading" className="font-display text-xl font-semibold sm:text-2xl">
          🎨 Appearance
        </h2>
        <ThemeToggle />
      </div>
      <p className="text-muted-foreground mb-4 text-sm">
        Pick how BrightMinds looks on this device. Your choice is saved automatically.
      </p>

      <div
        role="radiogroup"
        aria-label="Appearance mode"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {APPEARANCE_MODES.map((mode) => (
          <ModePreviewCard
            key={mode.value}
            value={mode.value}
            label={mode.label}
            emoji={mode.emoji}
            active={active === mode.value}
            onSelect={(v) => setTheme(v)}
          />
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Appearance only changes colours — it never changes how hard your learning is.
          Difficulty is chosen by age, not by theme. 🌱
        </p>
      </div>
    </section>
  );
}
