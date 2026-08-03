-- Deshatan schema (PostgreSQL)
CREATE TABLE IF NOT EXISTS destinations (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  region       TEXT NOT NULL,
  area         TEXT,
  days         INT  NOT NULL DEFAULT 2,
  price_from   INT  NOT NULL,
  rating       NUMERIC(2,1) DEFAULT 4.5,
  reviews      INT DEFAULT 0,
  scene        TEXT,
  image        TEXT,
  blurb        TEXT,
  hidden       BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS destinations_region_idx ON destinations(region);

CREATE TABLE IF NOT EXISTS stays (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  type            TEXT,
  region          TEXT,
  price_per_night INT NOT NULL,
  rating          NUMERIC(2,1) DEFAULT 4.5,
  image           TEXT
);
CREATE INDEX IF NOT EXISTS stays_region_idx ON stays(region);

CREATE TABLE IF NOT EXISTS guides (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, city TEXT,
  rating NUMERIC(2,1), reviews INT, verified BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, vehicle TEXT,
  rating NUMERIC(2,1), reviews INT, verified BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS bookings (
  id           TEXT PRIMARY KEY,
  dest_id      TEXT REFERENCES destinations(id),
  guest_name   TEXT NOT NULL,
  guest_email  TEXT NOT NULL,
  guest_phone  TEXT,
  days         INT, pax INT, style TEXT, pace TEXT, meal TEXT, pickup TEXT,
  occasion     TEXT,
  addons       JSONB DEFAULT '[]'::jsonb,
  guide_id     TEXT, driver_id TEXT, stay_id TEXT, room_tier TEXT,
  total        INT NOT NULL,
  paid         INT DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'pending',
  payment_ref  TEXT,
  start_date   TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(lower(guest_email));
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);

CREATE TABLE IF NOT EXISTS reviews (
  id          TEXT PRIMARY KEY,
  booking_id  TEXT,
  target_type TEXT NOT NULL,
  target_id   TEXT,
  target_name TEXT,
  rating      INT NOT NULL,
  text        TEXT,
  author      TEXT,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  kind      TEXT NOT NULL,
  city      TEXT,
  submitted TEXT,
  docs      TEXT,
  note      TEXT,
  status    TEXT NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS audit_log (
  id     TEXT PRIMARY KEY,
  at     TEXT,
  who    TEXT,
  action TEXT,
  detail TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value JSONB
);
