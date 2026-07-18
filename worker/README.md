# WEPs Newsletter Worker

A small Cloudflare Worker that handles newsletter signups from the static site
(`../index.html`). The site itself never talks to Postgres directly — it POSTs
an email to this Worker, which is the only thing holding the database
credential (as an encrypted Cloudflare secret, never committed to git).

## One-time setup

```bash
cd worker
npm install

# Log in to Cloudflare (opens a browser)
npx wrangler login

# Store the Neon connection string as an encrypted secret — never put this in a file
npx wrangler secret put DATABASE_URL
# (paste the connection string when prompted, press Enter)

# Deploy
npx wrangler deploy
```

`wrangler deploy` prints the live Worker URL (something like
`https://weps-newsletter.<your-subdomain>.workers.dev`) — that URL is what
`index.html`'s newsletter form POSTs to.

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
