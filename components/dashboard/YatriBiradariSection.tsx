import Link from "next/link";
import s from "./dashboard.module.css";

const LEDGER: [string, string][] = [
  ["Papa books Char Dham", "+4,200 pts"],
  ["You review your Ziro guide", "+150 pts"],
  ["Cousin's Pondy weekend", "+900 pts"],
  ["Group pool balance", "18,750 pts"],
  ["Redeemable on next booking", "₹1,875 off"],
];

const SOCIALS: { label: string; icon: string; href: string }[] = [
  { label: "Instagram", icon: "/figma/social-instagram.svg", href: "#instagram" },
  { label: "YouTube", icon: "/figma/social-youtube.svg", href: "#youtube" },
  { label: "X", icon: "/figma/social-x.svg", href: "#x" },
  { label: "WhatsApp community", icon: "/figma/social-whatsapp.svg", href: "#whatsapp" },
];

export default function YatriBiradariSection() {
  return (
    <section className={s.biradari} id="community">
      <div className={s.biradariInner}>
        <div className={s.biradariCopy}>
          <p className={`${s.eyebrow} ${s.eyebrowOnDark} ${s.eyebrowCream}`}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>Yatri Biradari</span>
            <span className={s.eyebrowCaps}>The yatri circle</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>

          <h2 className={s.biradariTitle}>Travel together, earn together.</h2>

          <p className={s.biradariLede}>
            Join a point group with your friends and family. Every booking anyone makes
            adds to the shared pool — redeem it together on the next trip. Dadi&apos;s Char
            Dham funds your Spiti ride. That&apos;s the circle.
          </p>
          <p className={s.biradariLede}>
            And when you&apos;re back, your reviews of guides, drivers and stays keep the
            next yatri safe. Follow the journeys, share yours.
          </p>

          <div className={s.biradariSocials}>
            {SOCIALS.map((social) => (
              <Link
                className={s.biradariSocial}
                key={social.label}
                href={social.href}
                aria-label={social.label}
              >
                <img src={social.icon} alt="" width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>

        <div className={s.pointsCard}>
          <h3 className={s.pointsTitle}>✦ Yatra Points — the family pool</h3>
          <dl className={s.pointsLedger}>
            {LEDGER.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
