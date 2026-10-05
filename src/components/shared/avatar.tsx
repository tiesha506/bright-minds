"use client";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Avatar system: an emoji + a soft colour bubble. Chosen in onboarding,
// settings, by parents (for children) and auto-assigned by teachers.
// ---------------------------------------------------------------------------

export const AVATARS = [
  "🦊", "🐼", "🐨", "🦁", "🐸", "🦉", "🐬", "🦄",
  "🐢", "🐝", "🚀", "⭐", "🌈", "🎨", "🎧", "⚡",
] as const;

export const AVATAR_COLORS = {
  rose: "bg-rose-200 text-rose-900",
  amber: "bg-amber-200 text-amber-900",
  emerald: "bg-emerald-200 text-emerald-900",
  teal: "bg-teal-200 text-teal-900",
  violet: "bg-violet-200 text-violet-900",
  orange: "bg-orange-200 text-orange-900",
} as const;

export type AvatarColor = keyof typeof AVATAR_COLORS;

export const AVATAR_COLOR_KEYS = Object.keys(AVATAR_COLORS) as AvatarColor[];

export function isAvatarColor(v: string): v is AvatarColor {
  return v in AVATAR_COLORS;
}

export function Avatar({
  avatar,
  color = "amber",
  size = "md",
  className,
}: {
  avatar?: string | null;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    xs: "h-6 w-6 text-sm",
    sm: "h-8 w-8 text-lg",
    md: "h-10 w-10 text-xl",
    lg: "h-14 w-14 text-3xl",
    xl: "h-20 w-20 text-4xl",
  };
  const emoji = avatar && AVATARS.includes(avatar as (typeof AVATARS)[number]) ? avatar : "🙂";
  const bubble = isAvatarColor(color ?? "") ? color : "amber";
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full select-none",
        sizes[size],
        AVATAR_COLORS[bubble],
        className
      )}
    >
      {emoji}
    </span>
  );
}

/** Grid picker used in onboarding, settings and child-profile forms. */
export function AvatarPicker({
  value,
  color,
  onChange,
  compact = false,
}: {
  value: string;
  color: string;
  onChange: (avatar: string, color: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choose your avatar">
        {AVATARS.map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={value === a}
            onClick={() => onChange(a, color)}
            className={cn(
              "flex items-center justify-center rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              compact ? "h-9 w-9 text-lg" : "h-11 w-11 text-2xl",
              value === a
                ? "border-primary bg-primary/10 scale-105"
                : "border-transparent bg-muted/60"
            )}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Choose a bubble colour">
        {AVATAR_COLOR_KEYS.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={color === c}
            aria-label={`Colour ${c}`}
            onClick={() => onChange(value, c)}
            className={cn(
              "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
              AVATAR_COLORS[c].split(" ")[0],
              color === c ? "border-foreground" : "border-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}
