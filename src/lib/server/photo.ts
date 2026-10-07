import { NextResponse } from "next/server";

/**
 * Validate an uploaded-photo URL coming from /api/upload/avatar.
 * Returns "" for null/"" (clear), the URL string when valid, or null when invalid.
 */
export function cleanPhotoUrl(
  value: unknown,
  supabaseUrl?: string
): string | null {
  if (value === null || value === "") return "";
  if (typeof value !== "string") return null;
  if (value.length > 500) return null;
  const prefix = `${supabaseUrl ?? ""}/storage/v1/object/public/avatars/`;
  if (supabaseUrl && value.startsWith(prefix)) return value;
  return null;
}

export function photoUnsupported() {
  return NextResponse.json(
    { error: "Photo storage is not configured." },
    { status: 500 }
  );
}
