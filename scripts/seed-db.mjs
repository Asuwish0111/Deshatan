// Loads data/seed.json (334 destinations, 780 stays, guides, drivers and sample
// bookings) into Postgres. Safe to re-run: existing rows are updated, not duplicated.
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set — nothing to seed. File mode seeds itself from data/seed.json.');
  process.exit(1);
}
const seed = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'seed.json'), 'utf8'));
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});
await client.connect();

const chunk = (arr, n) => arr.reduce((out, x, i) => ((out[Math.floor(i / n)] ||= []).push(x), out), []);

async function insertMany(table, cols, rows, mapper) {
  let done = 0;
  for (const batch of chunk(rows, 200)) {
    const values = [];
    const tuples = batch.map((row, i) => {
      const v = mapper(row);
      values.push(...v);
      return '(' + v.map((_, j) => `$${i * v.length + j + 1}`).join(',') + ')';
    });
    await client.query(
      `INSERT INTO ${table} (${cols.join(',')}) VALUES ${tuples.join(',')}
       ON CONFLICT (id) DO UPDATE SET ${cols.filter((c) => c !== 'id').map((c) => `${c}=EXCLUDED.${c}`).join(',')}`,
      values
    );
    done += batch.length;
  }
  console.log(`${table}: ${done}`);
}

await insertMany('destinations',
  ['id', 'title', 'region', 'area', 'days', 'price_from', 'rating', 'reviews', 'scene', 'image', 'blurb', 'hidden'],
  seed.destinations,
  (d) => [d.id, d.title, d.region, d.area || null, d.days, d.priceFrom, d.rating, d.reviews, d.scene, d.image || null, d.blurb, !!d.hidden]);

await insertMany('stays',
  ['id', 'name', 'type', 'region', 'price_per_night', 'rating', 'image'],
  seed.stays,
  (s) => [s.id, s.name, s.type, s.region, s.pricePerNight, s.rating, s.image || null]);

await insertMany('guides', ['id', 'name', 'city', 'rating', 'reviews', 'verified'], seed.guides,
  (g) => [g.id, g.name, g.city || null, g.rating, g.reviews || 0, g.verified !== false]);

await insertMany('drivers', ['id', 'name', 'vehicle', 'rating', 'reviews', 'verified'], seed.drivers,
  (d) => [d.id, d.name, d.vehicle || null, d.rating, d.reviews || 0, d.verified !== false]);

await insertMany('applications', ['id', 'name', 'kind', 'city', 'submitted', 'docs', 'note', 'status'], seed.applications,
  (a) => [a.id, a.name, a.kind, a.city, a.submitted, a.docs, a.note, a.status]);

await insertMany('bookings',
  ['id', 'dest_id', 'guest_name', 'guest_email', 'guest_phone', 'days', 'pax', 'style', 'guide_id', 'driver_id', 'stay_id', 'total', 'paid', 'status'],
  seed.bookings,
  (b) => [b.id, b.destId, b.guestName, b.guestEmail, b.guestPhone, b.days, b.pax, b.style, b.guideId, b.driverId, b.stayId, b.total, b.paid || 0, b.status]);

await insertMany('reviews', ['id', 'target_type', 'target_name', 'rating', 'text', 'author', 'status'], seed.reviews,
  (r) => [r.id, r.targetType, r.targetName, r.rating, r.text, r.author, r.status]);

await insertMany('audit_log', ['id', 'at', 'who', 'action', 'detail'], seed.auditLog,
  (a) => [a.id, a.at, a.who, a.action, a.detail]);

await client.end();
console.log('Seed complete.');
