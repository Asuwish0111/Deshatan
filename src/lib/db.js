// Data layer with two drivers:
//   * postgres  - used when DATABASE_URL is set (production / Neon / Supabase)
//   * file      - .data/db.json, used otherwise so `npm run dev` works with zero setup
import fs from 'node:fs';
import path from 'node:path';

export const usingPostgres = Boolean(process.env.DATABASE_URL);

// ---------- postgres ----------
let _pool = null;
async function pool() {
  if (!_pool) {
    const { default: pg } = await import('pg');
    _pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 5
    });
  }
  return _pool;
}
export async function sql(text, params = []) {
  const p = await pool();
  const res = await p.query(text, params);
  return res.rows;
}

// ---------- file store ----------
const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SEED_FILE = path.join(process.cwd(), 'data', 'seed.json');

function freshFromSeed() {
  const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
  return {
    destinations: seed.destinations,
    stays: seed.stays,
    guides: seed.guides,
    drivers: seed.drivers,
    bookings: seed.bookings,
    reviews: seed.reviews,
    applications: seed.applications,
    auditLog: seed.auditLog,
    settings: seed.settings || {}
  };
}

let _cache = null;
export function store() {
  if (_cache) return _cache;
  try {
    if (fs.existsSync(DB_FILE)) {
      _cache = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      return _cache;
    }
  } catch { /* corrupt file -> reseed */ }
  _cache = freshFromSeed();
  persist();
  return _cache;
}
export function persist() {
  if (!_cache) return;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(_cache));
}

// Catalog (destinations/stays/guides/drivers) is shipped content, so in file mode
// it is read straight off the seed - no copy, no drift.
export function catalog() {
  return store();
}
