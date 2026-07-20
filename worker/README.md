# WEPs Newsletter Worker

A small Cloudflare Worker that handles newsletter signups from the static site
(`../index.html`). The site itself never talks to Postgres directly — it POSTs
an email to this Worker, which is the only thing holding the database
credential (as an encrypted Cloudflare secret, never committed to git).

**Status: deployed.** Live at `https://weps-newsletter.natoch9.workers.dev`,
already wired into `index.html`'s `NEWSLETTER_ENDPOINT`. Database is the
`WEPs Newsletter` database in Neon (not the default `neondb`) — worth knowing
if you ever need to re-run the table-creation SQL below against a fresh
connection string (e.g. after another password rotation).

## One-time setup (for reference / redeploying elsewhere)

```bash
cd worker
npm install

# Log in to Cloudflare (opens a browser)
npx wrangler login

# Store the Neon connection string as an encrypted secret — never put this in a file
npx wrangler secret put DATABASE_URL
# (paste the connection string when prompted, press Enter)

# First deploy on a brand-new Cloudflare account also needs a workers.dev
# subdomain registered once — wrangler will prompt, or register via:
# PUT https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/subdomain
# with body {"subdomain": "<your-subdomain>"}

# Deploy
npx wrangler deploy
```

`wrangler deploy` prints the live Worker URL (something like
`https://weps-newsletter.<your-subdomain>.workers.dev`) — that URL is what
`index.html`'s newsletter form POSTs to (`NEWSLETTER_ENDPOINT` near the top of
the page's inline `<script>`).

**If the DB password is ever rotated**, the fix is two commands: re-run
`npx wrangler secret put DATABASE_URL` with the new connection string (no
redeploy needed, secrets apply immediately), and if the new string points at
a different database, re-run the table-creation script:

```bash
DATABASE_URL='postgresql://...' node scripts/create-table.js
```

## What it does

`POST /` with `{"email": "someone@example.com"}` →
validates the email, inserts it into the `newsletter_subscribers` table in
Neon Postgres (`ON CONFLICT DO NOTHING`, so re-submitting the same email is a
no-op, not an error), and returns `{"ok": true}`. CORS is locked to
`https://natoch9.github.io` — the endpoint won't respond to browser requests
from any other origin.

## Table schema (already created)

```sql
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'weps-site'
);
```

## Known limitation

No rate limiting or bot protection (e.g. Cloudflare Turnstile) is implemented
yet — basic email-format validation only. Fine for a low-traffic launch;
worth revisiting if the signup form starts attracting spam.
