import { neon } from '@neondatabase/serverless';

// Only this origin is allowed to call the endpoint from a browser.
const ALLOWED_ORIGIN = 'https://natoch9.github.io';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function isValidEmail(email) {
  return (
    typeof email === 'string' &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders();

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, headers);
    }

    const email = String(body.email || '').trim().toLowerCase();
    if (!isValidEmail(email)) {
      return json({ error: 'Invalid email address' }, 400, headers);
    }

    try {
      const sql = neon(env.DATABASE_URL);
      await sql`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING
      `;
      return json({ ok: true }, 200, headers);
    } catch (err) {
      return json({ error: 'Server error' }, 500, headers);
    }
  },
};
