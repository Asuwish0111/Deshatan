import Link from "next/link";
import type { Metadata } from "next";
import TopBar from "@/components/dashboard/TopBar";
import SkipLink from "@/components/dashboard/SkipLink";
import { SHOWCASE_CREDITS } from "@/components/dashboard/credits";
import { STAY_PHOTOS } from "@/components/booking/stayPhotos";
import ds from "@/components/dashboard/dashboard.module.css";
import s from "@/components/booking/booking.module.css";

export const metadata: Metadata = {
  title: "Photo credits — Deshatan",
  description:
    "Attribution for the photography used across Deshatan, with photographer and licence for each image.",
};

/* CC BY and CC BY-SA require attribution somewhere reachable from the work.
   Keeping it here rather than under every photograph satisfies the licences
   without a credits block sitting in the middle of the page. */
export default function CreditsPage() {
  const stays = Object.entries(STAY_PHOTOS);

  return (
    <div className={ds.page}>
      <SkipLink />
      <TopBar
        primary={{ label: "Find a yatra", href: "/book" }}
        secondary={{ label: "My trips", href: "/book/mytrips" }}
      />

      <main id="main" className={ds.upper}>
        <div className={ds.archCap} aria-hidden="true" />
        <div className={s.plate}>
          <div className={s.plateInner}>
            <div className={s.head}>
              <p className={ds.eyebrow}>
                <span className={ds.eyebrowBar} aria-hidden="true" />
                <span className={ds.eyebrowWord}>Shukriya</span>
                <span className={ds.eyebrowBar} aria-hidden="true" />
              </p>
              <h1>Photo credits</h1>
              <p>
                Every arch, frieze and monument on this site is drawn. The photographs
                are not — they come from Wikimedia Commons under licences permitting
                commercial use, and each one is credited below as those licences require.
              </p>
            </div>

            <div className={s.split} style={{ marginTop: 34 }}>
              <div className={s.stack}>
                <div className={s.card}>
                  <h2>Journeys</h2>
                  <dl className={s.summaryRows}>
                    {SHOWCASE_CREDITS.map((c) => (
                      <div key={c.photo}>
                        <dt>
                          <a href={c.page} target="_blank" rel="noopener noreferrer">
                            {c.photo}
                          </a>{" "}
                          — {c.author}
                        </dt>
                        <dd>
                          <a href={c.href} target="_blank" rel="noopener noreferrer">
                            {c.licence}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={s.card}>
                  <h2>Stays</h2>
                  <p className={s.tripMeta} style={{ marginBottom: 12 }}>
                    These show the area and the kind of stay, not the individual
                    property.
                  </p>
                  <dl className={s.summaryRows}>
                    {stays.map(([id, photos]) =>
                      photos.map((p, i) => (
                        <div key={id + i}>
                          <dt>
                            <a href={p.page} target="_blank" rel="noopener noreferrer">
                              {p.area}
                            </a>{" "}
                            — {p.author}
                          </dt>
                          <dd>{p.licence}</dd>
                        </div>
                      )),
                    )}
                  </dl>
                </div>
              </div>

              <div className={s.stack}>
                <div className={`${s.card} ${s.summary}`}>
                  <h2>Licences used</h2>
                  <dl className={s.summaryRows}>
                    <div>
                      <dt>CC BY</dt>
                      <dd>credit required</dd>
                    </div>
                    <div>
                      <dt>CC BY-SA</dt>
                      <dd>credit + share-alike</dd>
                    </div>
                    <div>
                      <dt>CC0 / public domain</dt>
                      <dd>no credit required</dd>
                    </div>
                  </dl>
                  <p className={s.fieldHint} style={{ marginTop: 12 }}>
                    Replacing an image with your own photography removes its entry here.
                  </p>
                  <div style={{ marginTop: 16 }}>
                    <Link className={s.btnGhost} href="/dashboard">
                      ← Back to Deshatan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={ds.archBottom} aria-hidden="true" />
    </div>
  );
}
