import { PrismaClient } from '@prisma/client'

/**
 * Repair common Supabase pooler connection-string mistakes at runtime so a
 * slightly-wrong paste never takes the whole app down:
 *
 *  • Port 6543 is PgBouncer in TRANSACTION mode — Prisma MUST run without
 *    prepared statements there (error `42P05: prepared statement "s0"
 *    already exists` otherwise). Appends `?pgbouncer=true&connection_limit=1`
 *    automatically when they are missing.
 *  • `new URL()` also re-encodes userinfo, which fixes passwords pasted with
 *    raw special characters (e.g. a literal `@` inside the password).
 *
 * Local SQLite URLs and already-correct URLs pass through unchanged, and a
 * completely unparseable value is left alone (the /api/health endpoint
 * reports it) rather than being silently altered.
 */
function normalizeDatabaseUrl(raw: string | undefined): string | undefined {
  if (!raw || raw.startsWith('file:')) return raw
  try {
    const u = new URL(raw)
    const isTransactionPooler = u.port === '6543' || u.searchParams.has('pgbouncer')
    if (isTransactionPooler) {
      if (!u.searchParams.has('pgbouncer')) u.searchParams.set('pgbouncer', 'true')
      if (!u.searchParams.has('connection_limit')) u.searchParams.set('connection_limit', '1')
    }
    const normalized = u.toString()
    return normalized === raw ? raw : normalized
  } catch {
    return raw
  }
}

const databaseUrl = normalizeDatabaseUrl(process.env.DATABASE_URL)
const urlRepaired = !!databaseUrl && databaseUrl !== process.env.DATABASE_URL

if (urlRepaired) {
  console.log('[db] DATABASE_URL was missing pooler parameters — repaired automatically.')
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    ...(urlRepaired && databaseUrl
      ? { datasources: { db: { url: databaseUrl } } }
      : {}),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
