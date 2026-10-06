#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# BrightMinds — one-shot migration: local SQLite → Supabase Postgres
#
# Usage:
#   ./scripts/migrate-to-supabase.sh "<DB_PASSWORD>"
#
# The password is passed as an argument and URL-encoded automatically.
# No secrets are stored in this script; the credentials land only in .env
# (which is gitignored).
# ---------------------------------------------------------------------------
set -euo pipefail

PROJECT_REF="ydrulncrxftkisnlvgyt"
POOLER_HOST="aws-0-us-west-2.pooler.supabase.com"

PASS="${1:?Usage: ./scripts/migrate-to-supabase.sh <DB_PASSWORD>}"

# URL-encode the password (handles @ : / # ? etc.)
ENC_PASS="$(python3 - "$PASS" <<'PY'
import sys, urllib.parse
print(urllib.parse.quote(sys.argv[1], safe=""))
PY
)"

TXN_URL="postgresql://postgres.${PROJECT_REF}:${ENC_PASS}@${POOLER_HOST}:6543/postgres?pgbouncer=true&connection_limit=1"
SESSION_URL="postgresql://postgres.${PROJECT_REF}:${ENC_PASS}@${POOLER_HOST}:5432/postgres"

echo "→ 1/4  Swapping Prisma schema to PostgreSQL…"
cp prisma/schema.supabase.prisma prisma/schema.prisma

echo "→ 2/4  Writing connection strings to .env…"
python3 - "$TXN_URL" "$SESSION_URL" <<'PY'
import re, sys
txn, ses = sys.argv[1], sys.argv[2]
env = open(".env").read()
# Drop any previous app DATABASE_URL / DIRECT_URL lines (active or commented)
env = re.sub(r"^\s*#?\s*DATABASE_URL=.*pooler\.supabase\.com.*\n?", "", env, flags=re.M)
env = re.sub(r"^\s*#?\s*DIRECT_URL=.*pooler\.supabase\.com.*\n?", "", env, flags=re.M)
env = re.sub(r"^DATABASE_URL=.*\n?", "", env, flags=re.M)  # old SQLite line
env = re.sub(r"^# --- PENDING FROM DASHBOARD.*\n?", "", env, flags=re.M)
env = re.sub(r"^# Fill <DB_PASSWORD>.*\n?", "", env, flags=re.M)
env = env.rstrip("\n") + (
    "\n\n# --- Active: Supabase Postgres (local SQLite fallback: file:./db/custom.db) ---\n"
    f'DATABASE_URL="{txn}"\n'
    f'DIRECT_URL="{ses}"\n'
)
open(".env", "w").write(env)
print("   .env updated (gitignored — never committed)")
PY

echo "→ 3/4  Pushing schema to Supabase (migrations run over :5432)…"
bunx prisma db push

echo "→ 4/4  Regenerating Prisma client…"
bunx prisma generate

echo ""
echo "✅  BrightMinds now runs on Supabase Postgres."
echo "    Restart the dev server, then seed demo data:"
echo "    curl -X POST http://localhost:3000/api/auth/demo-seed"
