"use client";

import Link from "next/link";
import { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import s from "./dashboard.module.css";

// Copy comes from lib/i18n so the footer has one source of truth with the rest
// of the site — the page's own sections are English-only, but this follows the
// language switcher the moment the dashboard wires it up.
const COLUMNS: { head: string; links: [string, string][] }[] = [
  {
    head: "footer.explore",
    links: [
      ["footer.explore1", "/book/search"],
      ["footer.explore2", "#showcase"],
      ["footer.explore3", "#features"],
      ["footer.explore4", "#coverage"],
    ],
  },
  {
    head: "footer.trust.h",
    links: [
      ["footer.trust1", "#features"],
      ["footer.trust2", "#features"],
      ["footer.trust3", "#community"],
    ],
  },
  {
    head: "footer.help",
    links: [
      ["footer.help1", "#"],
      ["footer.help2", "#"],
      ["footer.help3", "#"],
    ],
  },
  {
    head: "footer.policy",
    links: [
      ["footer.policy1", "#"],
      ["footer.policy2", "#"],
      ["footer.policy3", "#"],
    ],
  },
];

const SOCIALS: [string, string][] = [
  ["Instagram", "/figma/social-instagram.svg"],
  ["YouTube", "/figma/social-youtube.svg"],
  ["X", "/figma/social-x.svg"],
  ["WhatsApp community", "/figma/social-whatsapp.svg"],
];

export default function SiteFooter() {
  const { language } = useDeshatan();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className={s.siteFooter}>
      <div className={s.footerInner}>
        <div className={s.footNews}>
          <div className={s.footNewsCopy}>
            <p className={s.eyebrow}>
              <span className={s.eyebrowBar} aria-hidden="true" />
              <span className={s.eyebrowWord}>Judey Rahiye</span>
              <span className={s.eyebrowCaps}>{t("footer.news", language)}</span>
            </p>
            <p className={s.footNewsDesc}>{t("footer.news.desc", language)}</p>
          </div>

          <form
            className={s.footNewsForm}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setEmail("");
            }}
          >
            <label className={s.srOnly} htmlFor="foot-news-input">
              {t("footer.news.ph", language)}
            </label>
            <input
              id="foot-news-input"
              type="email"
              required
              placeholder={t("footer.news.ph", language)}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
            />
            <button type="submit">{t("footer.news.btn", language)}</button>
            <p className={s.footNewsNote} aria-live="polite">
              {sent ? t("footer.news.note", language) : " "}
            </p>
          </form>
        </div>

        <div className={s.footGrid}>
          <div className={s.footBrand}>
            <p className={s.footWordmark}>Deshatan</p>
            <p>{t("footer.about.p", language)}</p>
            <div className={s.footSocials}>
              {SOCIALS.map(([label, icon]) => (
                <Link key={label} href="#" aria-label={label}>
                  {/* the exported glyphs are hard-filled parchment, which is
                      invisible on cream — masked so they take the ink */}
                  <span
                    aria-hidden="true"
                    style={{
                      maskImage: `url(${icon})`,
                      WebkitMaskImage: `url(${icon})`,
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav className={s.footCol} key={col.head} aria-label={t(col.head, language)}>
              <h2>{t(col.head, language)}</h2>
              <ul>
                {col.links.map(([key, href]) => (
                  <li key={key}>
                    <Link href={href}>{t(key, language)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={s.footBase}>
          <p>© {new Date().getFullYear()} Deshatan · Ghoomo Poora Bharat</p>
          <p>28 states · 8 union territories · Nepal &amp; Bhutan</p>
        </div>
      </div>
    </footer>
  );
}
