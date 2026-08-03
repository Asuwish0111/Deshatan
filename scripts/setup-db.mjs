// Creates every table in db/schema.sql on the Postgres pointed at by DATABASE_URL.
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Add it to .env.local (or your host) and run this again.');
  process.exit(1);
}
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});
await client.connect();
await client.query(fs.readFileSync(path.join(process.cwd(), 'db', 'schema.sql'), 'utf8'));
await client.end();
console.log('Schema created.');
