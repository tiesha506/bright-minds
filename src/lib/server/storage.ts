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
