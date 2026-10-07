"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Avatar system: an emoji + a soft colour bubble — or a real profile photo
// (uploaded to Supabase Storage by parents / teachers / the student).
// Chosen in onboarding, settings, by parents (for children) and by teachers.
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
  photoUrl,
  name,
  className,
}: {
  avatar?: string | null;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero";
  photoUrl?: string | null;
  name?: string;
  className?: string;
}) {
  const sizes = {
    xs: "h-6 w-6 text-sm",
    sm: "h-8 w-8 text-lg",
    md: "h-10 w-10 text-xl",
    lg: "h-14 w-14 text-3xl",
    xl: "h-20 w-20 text-4xl",
    hero: "h-20 w-20 sm:h-24 sm:w-24 text-5xl",
  };
  const bubble = isAvatarColor(color ?? "") ? color : "amber";

  // A real photo always wins over the emoji avatar.
  if (photoUrl) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/50 select-none",
          sizes[size],
          AVATAR_COLORS[bubble],
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt={name ? `${name}'s profile photo` : "Profile photo"}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  const emoji = avatar && AVATARS.includes(avatar as (typeof AVATARS)[number]) ? avatar : "🙂";
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

// ---------------------------------------------------------------------------
// Photo upload (Supabase Storage via /api/upload/avatar)
// ---------------------------------------------------------------------------

/** Center-crop to a square and downscale to 256×256 JPEG — small & fast. */
async function resizeForAvatar(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the image.");
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, 256, 256);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not process the image."))),
      "image/jpeg",
      0.85
    )
  );
}

/**
 * Upload a profile photo for a user ("user") or student ("student").
 * Returns the public URL to store in photoUrl.
 */
export async function uploadAvatarPhoto(
  file: File,
  targetType: "user" | "student",
  targetId?: string
): Promise<string> {
  const token = useAuthStore.getState().token;
  const blob = await resizeForAvatar(file);
  const form = new FormData();
  form.append("file", new File([blob], "avatar.jpg", { type: "image/jpeg" }));
  form.append("targetType", targetType);
  if (targetId) form.append("targetId", targetId);
  const res = await fetch("/api/upload/avatar", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Photo upload failed.");
  return data.url;
}

/**
 * Compact "add / change / remove photo" control. Renders a small round
 * preview (photo, or the fallback emoji avatar) with camera + trash buttons.
 */
export function AvatarPhotoEditor({
  targetType,
  targetId,
  photoUrl,
  avatar,
  color,
  name,
  onChanged,
  allowRemove = true,
}: {
  targetType: "user" | "student";
  targetId?: string;
  photoUrl?: string | null;
  avatar?: string | null;
  color?: string;
  name?: string;
  onChanged: (photoUrl: string | null) => void;
  allowRemove?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadAvatarPhoto(file, targetType, targetId);
      onChanged(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Photo upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar
          avatar={avatar}
          color={color}
          size="lg"
          photoUrl={photoUrl}
          name={name}
        />
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
            <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label="Upload a profile photo"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="h-3.5 w-3.5" aria-hidden />
          {photoUrl ? "Change photo" : "Add photo"}
        </Button>
        {allowRemove && photoUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-muted-foreground"
            disabled={busy}
            onClick={() => onChanged(null)}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
