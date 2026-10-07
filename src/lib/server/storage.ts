/**
 * Supabase Storage bootstrap — makes sure the buckets the app needs exist,
 * the same way the prebuild self-heals the database schema.
 *
 * Buckets:
 *   • content  (private) — teacher materials (PDFs, slides, media)
 *   • reports  (private) — student report files
 *   • avatars  (public)  — profile photos
 *
 * On a fresh deployment these buckets do not exist yet; instead of failing
 * with "Bucket not found", the first upload (or a visit to /api/health)
 * creates them automatically. Idempotent and cached per server instance.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** Are the Supabase Storage env vars present? */
export function storageConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_ROLE);
}

/** Buckets created successfully during this server instance's lifetime. */
const ensured = new Set<string>();

/**
 * Make sure a bucket exists (creating it when missing). Returns true when the
 * bucket is usable, false when storage is unconfigured or Supabase refused.
 */
export async function ensureBucket(bucket: string, isPublic: boolean): Promise<boolean> {
  if (!storageConfigured()) return false;
  if (ensured.has(bucket)) return true;

  const headers = { Authorization: `Bearer ${SERVICE_ROLE}` };

  try {
    // 1. Already exists?
    const check = await fetch(`${SUPABASE_URL}/storage/v1/bucket/${bucket}`, { headers });
    if (check.ok) {
      ensured.add(bucket);
      return true;
    }

    // 2. Create it (409 = someone else created it first — equally fine)
    const created = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        id: bucket,
        name: bucket,
        public: isPublic,
        fileSizeLimit: 104857600, // 100 MB — routes enforce their own tighter limits
      }),
    });
    if (created.ok || created.status === 409) {
      ensured.add(bucket);
      console.log(`[storage] bucket "${bucket}" ready${created.status === 409 ? " (already existed)" : " (created)"}`);
      return true;
    }

    const detail = await created.text().catch(() => "");
    console.error(`[storage] could not create bucket "${bucket}":`, created.status, detail.slice(0, 200));
    return false;
  } catch (err) {
    console.error(`[storage] ensureBucket("${bucket}") failed:`, err);
    return false;
  }
}

/** Ensure every bucket the application uses. */
export async function ensureAppBuckets(): Promise<void> {
  await Promise.all([
    ensureBucket("content", false),
    ensureBucket("reports", false),
    ensureBucket("avatars", true),
  ]);
}

/** IDs of every bucket in the project (null when unreachable or unconfigured). */
export async function listBucketIds(): Promise<string[] | null> {
  if (!storageConfigured()) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      headers: { Authorization: `Bearer ${SERVICE_ROLE}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: string }[];
    return data.map((b) => b.id ?? "").filter(Boolean);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Diagnostics — pinpoint WHY storage is not configured without exposing any
// secret value. Mirrors the urlShape diagnostics for DATABASE_URL.
// ---------------------------------------------------------------------------

export interface StorageDiagnostics {
  /** Exact env var names that are not set on the server. */
  missing: string[];
  /** Human-readable problem with the NEXT_PUBLIC_SUPABASE_URL value, if any. */
  urlIssue: string | null;
  /** Human-readable problem with the SUPABASE_SERVICE_ROLE_KEY value, if any. */
  keyIssue: string | null;
}

const QUOTED = /^["'].*["']$/;

/**
 * Decode the `role` claim from a Supabase JWT key WITHOUT verifying the
 * signature (diagnostics only — we never return the key, just its role label,
 * so an admin can tell they pasted the anon key instead of service_role).
 */
export function decodeSupabaseKeyRole(key: string): string | null {
  const parts = key.trim().split(".");
  if (parts.length !== 3 || !parts[1]) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as {
      role?: unknown;
    };
    return typeof json.role === "string" ? json.role : null;
  } catch {
    return null;
  }
}

/**
 * Inspect the two Storage env vars for the classic setup mistakes:
 * variable missing, quotes pasted in, REST path appended to the URL,
 * or the public anon/publishable key used instead of the service_role key.
 */
export function storageDiagnostics(): StorageDiagnostics {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!key) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  let urlIssue: string | null = null;
  if (url) {
    if (QUOTED.test(url)) {
      urlIssue = "it is wrapped in quote marks — remove the quotes";
    } else if (!url.startsWith("https://")) {
      urlIssue = "it should start with https://";
    } else if (/\/rest\/v1|\/storage\/v1/.test(url)) {
      urlIssue =
        "it includes an API path (/rest/v1 or /storage/v1) — use only the bare project URL, e.g. https://<ref>.supabase.co";
    } else {
      try {
        const host = new URL(url).hostname;
        if (!host.endsWith(".supabase.co")) {
          urlIssue = `the host "${host}" does not look like a Supabase project URL (expected https://<ref>.supabase.co)`;
        }
      } catch {
        urlIssue = "it is not a valid URL";
      }
    }
  }

  let keyIssue: string | null = null;
  if (key) {
    if (QUOTED.test(key)) {
      keyIssue = "it is wrapped in quote marks — remove the quotes";
    } else if (key.startsWith("sb_secret_")) {
      // New-style Supabase secret key — valid for the Storage API.
    } else if (key.startsWith("sb_publishable_")) {
      keyIssue =
        "this is the public publishable key — the service_role SECRET key is required";
    } else {
      const role = decodeSupabaseKeyRole(key);
      if (role === "service_role") {
        // Correct key.
      } else if (role === "anon" || role === "authenticated") {
        keyIssue = `the key is the public "${role}" key — the service_role SECRET key is required (both start with eyJ; service_role is the other one in the API keys list)`;
      } else if (role) {
        keyIssue = `the key decodes as role "${role}" — the service_role key is required`;
      } else {
        keyIssue =
          "it does not look like a Supabase service_role key (expected the long eyJ… token from Supabase → Project Settings → API → service_role)";
      }
    }
  }

  return { missing, urlIssue, keyIssue };
}
