// One-off setup script: creates the newsletter_subscribers table.
// Run locally, never commit a connection string to this file.
//
//   npm install pg   (in this scripts/ folder, or anywhere with access to it)
//   DATABASE_URL='postgresql://...' node scripts/create-table.js
//
// Safe to re-run any time (e.g. after rotating the DB password and pointing
// at a different database) — CREATE TABLE IF NOT EXISTS is idempotent.

const { Client } = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL env var not set');
    process.exit(1);
  }
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      source TEXT DEFAULT 'weps-site'
    );
  `);
  const res = await client.query(`SELECT count(*)::int AS n FROM newsletter_subscribers;`);
  console.log('Table ready. Current row count:', res.rows[0].n);
  await client.end();
}

main().catch((err) => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
