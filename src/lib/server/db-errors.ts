import { db } from "@/lib/db";

/**
 * Turn a raw database failure into an honest, actionable JSON response.
 *
 * The original bug this fixes: every auth route had a blanket `catch` that
 * returned a vague message ("Could not create the account"), so a schema
 * drift on the live deployment looked identical to a user mistake and nobody
 * could tell what was broken. This helper logs the real error server-side
 * (visible in Vercel → Functions logs) and gives the client a truthful,
 * plain-language explanation instead.
 */

export function logDbError(scope: string, e: unknown) {
  const code = (e as { code?: string })?.code ?? "";
  const message = e instanceof Error ? e.message : String(e);
  console.error(`[db-error] ${scope}: ${code ? `${code} ` : ""}${message}`);
  if (e instanceof Error && e.stack) console.error(e.stack);
}

export function dbErrorResponse(scope: string, e: unknown): Response {
  logDbError(scope, e);

  const code = (e as { code?: string })?.code ?? "";
  const message = e instanceof Error ? e.message : String(e);

  // No database configured at all (env var missing on the host)
  if (!process.env.DATABASE_URL) {
    return Response.json(
      {
        error:
          "The server has no database configured yet. If you are the administrator: add DATABASE_URL (and DIRECT_URL) in your hosting dashboard → Environment Variables, then redeploy. Check /api/health afterwards.",
      },
      { status: 503 }
    );
  }

  // Prisma client was generated before/without the schema
  if (/did not initialize yet|prisma generate/i.test(message)) {
    return Response.json(
      {
        error:
          "The server is still finishing its deployment (database client not ready). Please try again in a minute.",
      },
      { status: 503 }
    );
  }

  // Database unreachable (wrong credentials, paused project, network)
  if (
    code === "P1001" ||
    code === "P1002" ||
    /Can't reach database|Connection refused|Timed out fetching|ECONNREFUSED|ETIMEDOUT/i.test(message)
  ) {
    return Response.json(
      {
        error:
          "The server cannot reach the database right now. Please try again in a minute — if it keeps happening, the administrator should check the DATABASE_URL on the server (see /api/health).",
      },
      { status: 503 }
    );
  }

  // Schema drift: missing table or column
  if (
    code === "P2021" ||
    code === "P2022" ||
    /does not exist in the current database/i.test(message)
  ) {
    return Response.json(
      {
        error:
          "The database is temporarily out of sync with the app (a table or column is missing). A redeploy fixes this automatically — check /api/health for the exact status.",
      },
      { status: 503 }
    );
  }

  // Duplicate email that raced past the pre-check (P2002) — honest message
  if (code === "P2002") {
    return Response.json(
      { error: "An account with this email already exists. Try logging in." },
      { status: 409 }
    );
  }

  return Response.json(
    { error: "Something went wrong on the server. Please try again in a moment." },
    { status: 500 }
  );
}
