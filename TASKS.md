# Deshatan — task list

Every task below is small enough to finish in one sitting, has a clear "done"
test, and does not depend on tasks below it. Work top to bottom.

Status: **Phase 0 is complete.** Start at Phase 1, Task 1.1.

---

## Phase 0 — Done ✅

| # | Task | Done test |
|---|------|-----------|
| 0.1 | Extract catalogue + i18n from the HTML prototype | 334 destinations, 780 stays, 9 languages in `data/` |
| 0.2 | Postgres schema + setup/seed scripts | `npm run db:setup && npm run db:seed` fills every table |
| 0.3 | Dual data driver (Postgres / file store) | `npm run dev` works with no DATABASE_URL |
| 0.4 | 25 API routes | booking → payment → admin all return JSON |
| 0.5 | Shared price engine, server-side re-pricing | client cannot set its own total |
| 0.6 | Razorpay create-order + signature verify | test mode works, real mode verifies HMAC |
| 0.7 | Admin auth (JWT httpOnly cookie) | `/admin` redirects to login when signed out |
| 0.8 | Landing page as 13 React components | design identical to the prototype |
| 0.9 | Guest booking flow, 13 routes | search → confirmation verified in a browser |
| 0.10 | Admin panel, 10 pages | login → status change → audit entry verified |

---

## Phase 1 — Go live (do this first, it is the shortest path to a real URL)

**1.1 — Push to GitHub.** Create a repo, `git init`, commit, push.
*Done when:* the repo shows `src/`, `data/`, `db/`, `README.md`, and **not**
`node_modules`, `.next`, `.data`, `.env.local`.

**1.2 — Create a free Neon Postgres.** neon.tech → new project → copy the
connection string.
*Done when:* you have a `postgres://...` string saved somewhere safe.

**1.3 — Create the tables.** Locally: put the Neon URL in `.env.local` as
`DATABASE_URL`, run `npm run db:setup`.
*Done when:* the command prints "Schema created."

**1.4 — Seed the catalogue.** `npm run db:seed`.
*Done when:* it prints `destinations: 334` and `stays: 780`.

**1.5 — Deploy on Vercel.** vercel.com → import the repo → add env vars
`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
*Done when:* the landing page loads on a `.vercel.app` URL.

**1.6 — Smoke-test production.** Open `/book`, complete one booking, sign into
`/admin`, change its status.
*Done when:* the booking appears in the admin table with the new status.

**1.7 — Point a domain at it** (optional). Buy `deshatan.in` or similar, add it
in Vercel → Domains.
*Done when:* the site loads on your own domain over HTTPS.

---

## Phase 2 — Real payments

**2.1 — Razorpay test keys.** Sign up, copy the test key id and secret into
`.env.local` and Vercel.
*Done when:* the payment page opens the real Razorpay checkout instead of
completing instantly.

**2.2 — One test payment.** Pay with Razorpay's test card.
*Done when:* the booking shows `confirmed` and a real `payment_ref`.

**2.3 — Webhook fallback.** Add `POST /api/payments/webhook` so a payment still
gets recorded if the user closes the browser after paying.
*Done when:* a webhook replay from the Razorpay dashboard marks a booking paid.

**2.4 — KYC + live keys.** Complete Razorpay business verification, swap in live
keys.
*Done when:* a ₹1 real payment lands in your account.

---

## Phase 3 — The gaps left in the port

**3.1 — Translate the showcase section.** Its copy is English-only; add the 9
missing translations to `data/i18n.json` using the existing key pattern.
*Done when:* switching to Hindi changes the showcase headings too.

**3.2 — Editable catalogue.** Admin listings is read-only. Add
`PATCH /api/admin/destinations/[id]` plus an edit form.
*Done when:* changing a price in the admin panel changes it on `/book`.

**3.3 — Booking confirmation email.** Wire Resend or Brevo into the payment
verify route.
*Done when:* a real inbox receives the reference number after payment.

**3.4 — WhatsApp notification.** Same trigger, via the WhatsApp Business API.
*Done when:* the guest gets a message with their booking reference.

**3.5 — Real tracker updates.** The tracker stage is derived from status and
date. Add `POST /api/bookings/[id]/location` for a driver to post updates.
*Done when:* posting a location changes what the tracker page shows.

---

## Phase 4 — Things the product still needs

**4.1 — Guest accounts.** Right now "My trips" is an email lookup. Add email OTP
login so a traveller has a real account.

**4.2 — Partner login.** Guides and drivers need their own view of assigned
trips. New route group `/partner`, reusing the admin auth pattern.

**4.3 — Availability.** No calendar exists yet — two people can book the same
guide for the same week. Add a `blocked_dates` table and check it at booking.

**4.4 — Cancellation and refunds.** A cancel button plus a Razorpay refund call.

**4.5 — Search that scales.** 334 rows is fine with `ILIKE`; add a Postgres
`tsvector` index before the catalogue grows past a few thousand.

**4.6 — Analytics beyond bar charts.** Conversion rate, drop-off by booking step.

---

## Phase 5 — Polish

**5.1** Real photos for guides and drivers (currently brand initials avatars —
using a stranger's face behind a fictional name is not an option, so this needs
photos of actual partners once they sign up).
**5.2** Self-host the Wikimedia photos through Next's image optimizer instead of
hotlinking.
**5.3** SEO: per-destination `generateMetadata`, sitemap, Open Graph images.
**5.4** Accessibility pass: focus order through the booking steps, screen-reader
labels on the sliders.
**5.5** Rate-limit the booking and review endpoints.
