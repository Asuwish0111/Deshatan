# Deshatan

Pan-India travel booking — 28 states, 8 union territories, plus Nepal and Bhutan.
Next.js 15 (App Router) frontend, API routes as the backend, Postgres for data,
Razorpay for payments.

This is a port of the single-file HTML prototype, which is kept at
`reference/deshatan-prototype.html` as the design source of truth.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

That's it. With no `DATABASE_URL` set the app runs in **file mode**: it seeds
itself from `data/seed.json` into `.data/db.json`, so every page, booking and
admin screen works immediately with the full 334-destination catalogue.

Admin panel: `/admin` — default login `admin@deshatan.in` / `deshatan123`
(change these in `.env.local`).

## Switch to Postgres

```bash
# .env.local
DATABASE_URL=postgres://user:pass@host/db

npm run db:setup     # creates the tables from db/schema.sql
npm run db:seed      # loads data/seed.json (safe to re-run)
```

The app detects `DATABASE_URL` and switches drivers automatically — no code change.

## Turn on real payments

Payments run in **test mode** until you add Razorpay keys. In test mode the
booking still completes end to end, but no money moves and no gateway is called.

```bash
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
```

With keys set, `/api/payments/create-order` creates a real Razorpay order and
`/api/payments/verify` checks the HMAC signature before marking a booking paid.
The browser is never trusted to declare a payment successful, and the trip total
is recalculated server-side on every booking so a tampered client can't set its
own price.

---

## Deploy (Vercel + Neon, free tiers)

1. Push this folder to a GitHub repo.
2. Create a free Postgres at **neon.tech** and copy the connection string.
3. On **vercel.com** → New Project → import the repo.
4. Add environment variables in Vercel:
   `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`,
   and the three Razorpay keys if you want live payments.
5. Deploy. Then, once, from your machine:
   ```bash
   DATABASE_URL="<neon url>" npm run db:setup
   DATABASE_URL="<neon url>" npm run db:seed
   ```

Netlify works too (it runs Next.js via its adapter), but Vercel needs no extra
configuration for the App Router.

---

## Layout

```
data/seed.json          334 destinations, 780 stays, guides, drivers, sample bookings
data/i18n.json          9 languages x 159 keys (English lives in the markup)
db/schema.sql           Postgres DDL
scripts/                db:setup and db:seed
src/lib/db.js           driver switch: Postgres or file store
src/lib/repo.js         every query the app makes, both drivers
src/lib/pricing.js      the one price engine — API, booking flow and admin all use it
src/lib/auth.js         admin session (JWT in an httpOnly cookie)
src/lib/media.js        photo resolution: own photo -> state photo -> scene photo
src/app/page.jsx        marketing landing page
src/app/book/           guest booking flow
src/app/admin/          admin panel
src/app/api/            25 API routes
src/components/marketing/  the 13 landing-page sections
```

## Routes

**Guest** `/` · `/book` · `/book/trip/[id]` · `/book/customize/[id]` ·
`/book/pick/[id]` · `/book/stay/[id]` · `/book/hotel/[id]/[stayId]` ·
`/book/details/[id]` · `/book/payment/[id]` · `/book/confirmation/[ref]` ·
`/book/mytrips` · `/book/track/[ref]` · `/book/review/[ref]`

**Admin** `/admin` · bookings · listings · partners · applications · reviews ·
customers · analytics · audit · settings

---

## Two bugs found and fixed during the port

**The app shell was invisible.** The prototype kept the marketing page and the
booking app in one document and swapped them with `body.app-mode`, so
`#app-shell` was `display:none` by default. In Next.js each is its own route, so
every booking and admin page rendered a zero-height page. Now the shell is always
visible and the `body.app-mode` swap is gone.

**Room cost never reached the total.** The chosen stay was shown in the summary
but never added to the price. `quote()` now includes it, and the room tier
multiplier (Standard 1x, Deluxe 1.35x, Suite 1.75x) applies to nights = days − 1.

## What is not ported yet

- The landing page's new showcase section is English-only; the other 9 languages
  fall back to English there.
- Admin listings is read-only — catalogue edits still mean editing `data/seed.json`
  or the `destinations` table.
- The live tracker derives its stage from booking status and start date. Real GPS
  would need a partner app feeding location updates.
