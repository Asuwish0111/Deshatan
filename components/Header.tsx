"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import Link from "next/link";
import { Language } from "@/types";

export default function Header() {
  const { language, setLanguage } = useDeshatan();
  const [navOpen, setNavOpen] = useState(false);

  const languages: Language[] = ["en", "hi", "bn", "mr", "te", "ta", "gu", "ur", "kn", "or"];

  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>🧳 Explore India 🧳</span>
          <span className="dot">•</span>
          <span>भारत घूमो 🧳</span>
          <span className="dot">•</span>
          <span>28 States + 8 Territories 🧳</span>
          <span className="dot">•</span>
          <span>2,600+ Verified Guides 🧳</span>
        </div>
      </div>

      <header>
        <nav className="nav">
          <div className="logo">
            <div className="logo-mark">🏍️</div>
            <div className="logo-name">
              {t("nav.logo", language)}
              <small>{t("nav.tagline", language)}</small>
            </div>
          </div>

          <div className="nav-links" id="nav-links">
            <a href="#showcase">{t("nav.coverage", language)}</a>
            <a href="#features">{t("nav.features", language)}</a>
            <a href="#calculator">{t("nav.calculator", language)}</a>
            <a href="#groups">{t("nav.groups", language)}</a>
            <a href="/book/search" style={{ color: "var(--sindoor)", fontWeight: "700" }}>🎫 Book</a>
            <a href="/admin" style={{ color: "var(--marigold)", fontWeight: "700" }}>⚙️ Admin</a>
          </div>

          <div className="nav-right">
            <div className="lang-switch">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="nav-toggle"
              id="nav-toggle"
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
