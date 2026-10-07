// ---------------------------------------------------------------------------
// Server-only helpers for the /api/reports routes. Never imported client-side.
// Supabase Storage: private "reports" bucket — service-role writes, signed-URL
// reads only. Signed URLs are minted per request and NEVER returned in JSON.
// ---------------------------------------------------------------------------

import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { forbidden, getSessionUser, unauthorized, type SessionUser } from "@/lib/server/auth";
import { ensureBucket } from "@/lib/server/storage";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const BUCKET = "reports";
export const REPORT_BUCKET_PREFIX = `${BUCKET}/`;

// ------------------------------- auth guards -------------------------------

/** Returns the signed-in user, or the 401/403 Response to return directly. */
export async function requireUser(
  req: Request,
  roles?: Array<"TEACHER" | "ADMIN" | "PARENT" | "STUDENT">
): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return unauthorized();
  if (roles && !roles.includes(user.role)) return forbidden();
  return user;
}

/** TEACHER (seated in their classroom) or ADMIN (any student). */
export async function canManageStudent(user: SessionUser, studentId: string): Promise<boolean> {
  if (user.role === "ADMIN") return true;
  if (user.role !== "TEACHER") return false;
  const seat = await db.classroomStudent.findFirst({
    where: { studentId, classroom: { teacherId: user.id } },
    select: { id: true },
  });
  return seat !== null;
}

// ------------------------------ file validation -----------------------------

/** Allowed extensions → the magic-byte signatures we accept for them. */
const EXTENSION_SIGNATURES: Record<string, string[]> = {
  pdf: ["pdf"],
  doc: ["ole"],
  docx: ["zip"],
  jpg: ["jpeg"],
  jpeg: ["jpeg"],
  png: ["png"],
};

/** Browser mime types we map onto the allowed extensions. */
const EXTENSION_MIMES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

/** Sniffs the leading bytes of a file into a coarse signature tag. */
export function sniffSignature(buf: Buffer): string | null {
  if (buf.length >= 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
    return "pdf"; // %PDF
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg"; // \xFF\xD8\xFF
  }
  if (buf.length >= 4 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "png"; // \x89PNG
  }
  if (buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b) {
    return "zip"; // PK.. (DOCX container)
  }
  if (buf.length >= 4 && buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) {
    return "ole"; // legacy DOC container
  }
  return null;
}

export function fileExtension(fileName: string): string {
  const base = fileName.split(/[\\/]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  return dot === -1 ? "" : base.slice(dot + 1).toLowerCase();
}

/**
 * Validates extension + browser mime + actual magic bytes.
 * Returns the canonical mime type to store, or null when the file is rejected.
 */
export function validateReportFile(
  fileName: string,
  clientMime: string,
  bytes: Buffer
): string | null {
  const ext = fileExtension(fileName);
  const signatures = EXTENSION_SIGNATURES[ext];
  if (!signatures) return null;

  // Browser-declared mime must be either the expected one or a generic one.
  const expectedMime = EXTENSION_MIMES[ext];
  const generic = clientMime === "" || clientMime === "application/octet-stream";
  if (!generic && clientMime !== expectedMime) return null;

  // Content must really look like the claimed type (defence vs renamed files).
  const sig = sniffSignature(bytes);
  return sig !== null && signatures.includes(sig) ? expectedMime : null;
}

// -------------------------------- storage ----------------------------------

/** "My Term Report.pdf" → "My-Term-Report.pdf" (safe for storage keys). */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "report";
  const cleaned = base
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+/, "");
  return (cleaned || "report").slice(-80);
}

/** Fresh storage key: reports/<studentId>/<uid>-<sanitised-name>. */
export function buildReportKey(studentId: string, fileName: string): string {
  const uid = `${Date.now().toString(36)}${randomBytes(8).toString("hex")}`;
  return `${REPORT_BUCKET_PREFIX}${studentId}/${uid}-${sanitizeFileName(fileName)}`;
}

/** Object path inside the bucket (key without the "reports/" prefix). */
function objectPath(fileKey: string): string {
  return fileKey.startsWith(REPORT_BUCKET_PREFIX)
    ? fileKey.slice(REPORT_BUCKET_PREFIX.length)
    : fileKey;
}

function objectUrl(path: string): string {
  // Encode every path segment individually (keys contain "/").
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encoded}`;
}

function signUrl(path: string): string {
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${encoded}`;
}

/** Service-role upload into the private bucket. Throws on failure. */
export async function uploadReportObject(
  fileKey: string,
  bytes: Buffer,
  mimeType: string
): Promise<void> {
  await ensureBucket(BUCKET, false); // self-heal a missing bucket
  const res = await fetch(objectUrl(objectPath(fileKey)), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": mimeType || "application/octet-stream",
      "cache-control": "3600",
    },
    body: new Uint8Array(bytes),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("report object upload failed:", res.status, detail.slice(0, 300));
    throw new Error("storage-upload-failed");
  }
}

/** Best-effort service-role delete (an orphaned object is harmless). */
export async function deleteReportObject(fileKey: string): Promise<void> {
  try {
    await fetch(objectUrl(objectPath(fileKey)), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${SERVICE_ROLE}` },
    });
  } catch (err) {
    console.error("report object delete failed", err);
  }
}

/**
 * Mints a fresh short-lived signed URL (expiresIn 300s) for reading a report
 * object. Returns null when storage isn't configured or the sign call fails.
 * When `fileName` is given, a download hint is appended so browsers save the
 * file instead of displaying it.
 */
export async function createSignedReportUrl(
  fileKey: string,
  fileName?: string
): Promise<string | null> {
  if (!SUPABASE_URL || !SERVICE_ROLE) return null;
  try {
    const res = await fetch(signUrl(objectPath(fileKey)), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: 300 }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("report sign failed:", res.status, detail.slice(0, 300));
      return null;
    }
    const data = (await res.json()) as { signedURL?: string };
    if (!data.signedURL) return null;

    let url: string;
    if (data.signedURL.startsWith("http")) {
      url = data.signedURL;
    } else if (data.signedURL.startsWith("/storage")) {
      url = `${SUPABASE_URL}${data.signedURL}`;
    } else {
      url = `${SUPABASE_URL}/storage/v1${data.signedURL}`;
    }
    if (fileName) {
      url += (url.includes("?") ? "&" : "?") + `download=${encodeURIComponent(fileName)}`;
    }
    return url;
  } catch (err) {
    console.error("createSignedReportUrl failed", err);
    return null;
  }
}

/** True when Supabase Storage is configured for reports. */
export function reportStorageConfigured(): boolean {
  return SUPABASE_URL !== "" && SERVICE_ROLE !== "";
}
