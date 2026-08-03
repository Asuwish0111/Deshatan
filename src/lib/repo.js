// Every DB read/write the app needs, in one place.
// Each function works against Postgres when DATABASE_URL is set, otherwise the file store.
import { sql, store, persist, usingPostgres, catalog } from './db.js';
import { uid, nowStamp } from './ids.js';

const rowDest = (r) => ({
  id: r.id, title: r.title, region: r.region, area: r.area, days: r.days,
  priceFrom: r.price_from, rating: Number(r.rating), reviews: r.reviews,
  scene: r.scene, image: r.image, blurb: r.blurb, hidden: r.hidden
});
const rowStay = (r) => ({
  id: r.id, name: r.name, type: r.type, region: r.region,
  pricePerNight: r.price_per_night, rating: Number(r.rating), image: r.image
});
const rowBooking = (r) => ({
  id: r.id, destId: r.dest_id, guestName: r.guest_name, guestEmail: r.guest_email,
  guestPhone: r.guest_phone, days: r.days, pax: r.pax, style: r.style, pace: r.pace,
  meal: r.meal, pickup: r.pickup, occasion: r.occasion, addons: r.addons || [],
  guideId: r.guide_id, driverId: r.driver_id, stayId: r.stay_id, roomTier: r.room_tier,
  total: r.total, paid: r.paid, status: r.status, paymentRef: r.payment_ref,
  startDate: r.start_date, createdAt: r.created_at
});

/* ------------------------------ catalog ------------------------------ */

export async function listDestinations({ q = '', region = '', maxBudget = 0, sort = 'popular', includeHidden = true, limit = 60, offset = 0 } = {}) {
  if (usingPostgres) {
    const where = [], params = [];
    if (q) { params.push(`%${q}%`); where.push(`(title ILIKE $${params.length} OR region ILIKE $${params.length} OR COALESCE(area,'') ILIKE $${params.length})`); }
    if (region) { params.push(region); where.push(`region = $${params.length}`); }
    if (maxBudget) { params.push(maxBudget); where.push(`price_from <= $${params.length}`); }
    if (!includeHidden) where.push('hidden = FALSE');
    const order = sort === 'price' ? 'price_from ASC' : sort === 'rating' ? 'rating DESC' : 'reviews DESC, rating DESC';
    params.push(limit, offset);
    const rows = await sql(
      `SELECT * FROM destinations ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
       ORDER BY ${order} LIMIT $${params.length - 1} OFFSET $${params.length}`, params);
    const [{ count }] = await sql(
      `SELECT COUNT(*)::int AS count FROM destinations ${where.length ? 'WHERE ' + where.join(' AND ') : ''}`,
      params.slice(0, params.length - 2));
    return { items: rows.map(rowDest), total: count };
  }
  let items = catalog().destinations;
  if (!includeHidden) items = items.filter((d) => !d.hidden);
  if (q) {
    const needle = q.toLowerCase();
    items = items.filter((d) =>
      d.title.toLowerCase().includes(needle) ||
      d.region.toLowerCase().includes(needle) ||
      (d.area || '').toLowerCase().includes(needle) ||
      (d.blurb || '').toLowerCase().includes(needle));
  }
  if (region) items = items.filter((d) => d.region === region);
  if (maxBudget) items = items.filter((d) => d.priceFrom <= maxBudget);
  items = [...items].sort((a, b) =>
    sort === 'price' ? a.priceFrom - b.priceFrom :
    sort === 'rating' ? b.rating - a.rating :
    (b.reviews - a.reviews) || (b.rating - a.rating));
  return { items: items.slice(offset, offset + limit), total: items.length };
}

export async function getDestination(id) {
  if (usingPostgres) {
    const rows = await sql('SELECT * FROM destinations WHERE id = $1', [id]);
    return rows[0] ? rowDest(rows[0]) : null;
  }
  return catalog().destinations.find((d) => d.id === id) || null;
}

export async function listRegions() {
  if (usingPostgres) {
    const rows = await sql('SELECT region, COUNT(*)::int AS count FROM destinations GROUP BY region ORDER BY count DESC');
    return rows;
  }
  const map = new Map();
  for (const d of catalog().destinations) map.set(d.region, (map.get(d.region) || 0) + 1);
  return [...map.entries()].map(([region, count]) => ({ region, count })).sort((a, b) => b.count - a.count);
}

export async function listStays({ region = '', limit = 24 } = {}) {
  if (usingPostgres) {
    const rows = region
      ? await sql('SELECT * FROM stays WHERE region = $1 ORDER BY rating DESC LIMIT $2', [region, limit])
      : await sql('SELECT * FROM stays ORDER BY rating DESC LIMIT $1', [limit]);
    return rows.map(rowStay);
  }
  let items = catalog().stays;
  if (region) {
    const inRegion = items.filter((s) => s.region === region);
    items = inRegion.length ? inRegion : items;
  }
  return [...items].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export async function getStay(id) {
  if (usingPostgres) {
    const rows = await sql('SELECT * FROM stays WHERE id = $1', [id]);
    return rows[0] ? rowStay(rows[0]) : null;
  }
  return catalog().stays.find((s) => s.id === id) || null;
}

export async function listGuides() {
  if (usingPostgres) return (await sql('SELECT * FROM guides ORDER BY rating DESC')).map((r) => ({ ...r, rating: Number(r.rating) }));
  return catalog().guides;
}
export async function listDrivers() {
  if (usingPostgres) return (await sql('SELECT * FROM drivers ORDER BY rating DESC')).map((r) => ({ ...r, rating: Number(r.rating) }));
  return catalog().drivers;
}

/* ------------------------------ bookings ------------------------------ */

export async function createBooking(b) {
  if (usingPostgres) {
    const rows = await sql(
      `INSERT INTO bookings (id,dest_id,guest_name,guest_email,guest_phone,days,pax,style,pace,meal,pickup,occasion,addons,guide_id,driver_id,stay_id,room_tier,total,paid,status,start_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *`,
      [b.id, b.destId, b.guestName, b.guestEmail, b.guestPhone, b.days, b.pax, b.style, b.pace, b.meal,
       b.pickup, b.occasion, JSON.stringify(b.addons || []), b.guideId, b.driverId, b.stayId, b.roomTier,
       b.total, b.paid || 0, b.status || 'pending', b.startDate]);
    return rowBooking(rows[0]);
  }
  const db = store();
  db.bookings.unshift(b);
  persist();
  return b;
}

export async function getBooking(id) {
  if (usingPostgres) {
    const rows = await sql('SELECT * FROM bookings WHERE id = $1', [id]);
    return rows[0] ? rowBooking(rows[0]) : null;
  }
  return store().bookings.find((b) => b.id === id) || null;
}

export async function listBookings({ email = '', status = '' } = {}) {
  if (usingPostgres) {
    const where = [], params = [];
    if (email) { params.push(email.toLowerCase()); where.push(`lower(guest_email) = $${params.length}`); }
    if (status) { params.push(status); where.push(`status = $${params.length}`); }
    const rows = await sql(`SELECT * FROM bookings ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC`, params);
    return rows.map(rowBooking);
  }
  let items = store().bookings;
  if (email) items = items.filter((b) => (b.guestEmail || '').toLowerCase() === email.toLowerCase());
  if (status) items = items.filter((b) => b.status === status);
  return items;
}

export async function updateBooking(id, patch) {
  if (usingPostgres) {
    const cols = { status: 'status', paid: 'paid', paymentRef: 'payment_ref', total: 'total', startDate: 'start_date' };
    const sets = [], params = [];
    for (const [k, v] of Object.entries(patch)) {
      if (!cols[k]) continue;
      params.push(v); sets.push(`${cols[k]} = $${params.length}`);
    }
    if (!sets.length) return getBooking(id);
    params.push(id);
    const rows = await sql(`UPDATE bookings SET ${sets.join(', ')} WHERE id = $${params.length} RETURNING *`, params);
    return rows[0] ? rowBooking(rows[0]) : null;
  }
  const db = store();
  const b = db.bookings.find((x) => x.id === id);
  if (!b) return null;
  Object.assign(b, patch);
  persist();
  return b;
}

/* ------------------------------ reviews ------------------------------ */

export async function createReview(r) {
  if (usingPostgres) {
    await sql(
      `INSERT INTO reviews (id,booking_id,target_type,target_id,target_name,rating,text,author,status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [r.id, r.bookingId, r.targetType, r.targetId, r.targetName, r.rating, r.text, r.author, r.status]);
    return r;
  }
  const db = store();
  db.reviews.unshift(r);
  persist();
  return r;
}

export async function listReviews({ status = '', targetName = '' } = {}) {
  if (usingPostgres) {
    const where = [], params = [];
    if (status) { params.push(status); where.push(`status = $${params.length}`); }
    if (targetName) { params.push(targetName); where.push(`target_name = $${params.length}`); }
    const rows = await sql(`SELECT * FROM reviews ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC`, params);
    return rows.map((r) => ({ id: r.id, bookingId: r.booking_id, targetType: r.target_type, targetId: r.target_id, targetName: r.target_name, rating: r.rating, text: r.text, author: r.author, status: r.status }));
  }
  let items = store().reviews;
  if (status) items = items.filter((r) => r.status === status);
  if (targetName) items = items.filter((r) => r.targetName === targetName);
  return items;
}

export async function setReviewStatus(id, status) {
  if (usingPostgres) { await sql('UPDATE reviews SET status = $1 WHERE id = $2', [status, id]); return; }
  const db = store();
  const r = db.reviews.find((x) => x.id === id);
  if (r) { r.status = status; persist(); }
}

/* --------------------------- applications --------------------------- */

export async function listApplications() {
  if (usingPostgres) return await sql('SELECT * FROM applications ORDER BY submitted DESC');
  return store().applications;
}

export async function createApplication(a) {
  if (usingPostgres) {
    await sql('INSERT INTO applications (id,name,kind,city,submitted,docs,note,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [a.id, a.name, a.kind, a.city, a.submitted, a.docs, a.note, a.status]);
    return a;
  }
  const db = store();
  db.applications.unshift(a);
  persist();
  return a;
}

export async function setApplicationStatus(id, status) {
  let app;
  if (usingPostgres) {
    const rows = await sql('UPDATE applications SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    app = rows[0];
  } else {
    const db = store();
    app = db.applications.find((x) => x.id === id);
    if (app) { app.status = status; persist(); }
  }
  if (app && status === 'approved') await promoteApplicant(app);
  return app;
}

// Approving an application creates the real partner record, same as the prototype did.
async function promoteApplicant(app) {
  const isGuide = (app.kind || '').toLowerCase() === 'guide';
  const rec = { id: uid(isGuide ? 'g' : 'd'), name: app.name, rating: 4.6, reviews: 0, verified: true };
  if (isGuide) rec.city = app.city; else rec.vehicle = 'Innova Crysta';
  if (usingPostgres) {
    if (isGuide) await sql('INSERT INTO guides (id,name,city,rating,reviews,verified) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING', [rec.id, rec.name, rec.city, rec.rating, 0, true]);
    else await sql('INSERT INTO drivers (id,name,vehicle,rating,reviews,verified) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING', [rec.id, rec.name, rec.vehicle, rec.rating, 0, true]);
    return;
  }
  const db = store();
  (isGuide ? db.guides : db.drivers).push(rec);
  persist();
}

/* ------------------------------ audit ------------------------------ */

export async function logAudit(action, detail, who = 'admin') {
  const entry = { id: uid('AL'), at: nowStamp(), who, action, detail };
  if (usingPostgres) {
    await sql('INSERT INTO audit_log (id,at,who,action,detail) VALUES ($1,$2,$3,$4,$5)', [entry.id, entry.at, entry.who, entry.action, entry.detail]);
    return entry;
  }
  const db = store();
  db.auditLog.unshift(entry);
  persist();
  return entry;
}

export async function listAudit() {
  if (usingPostgres) return await sql('SELECT * FROM audit_log ORDER BY at DESC LIMIT 200');
  return store().auditLog;
}
