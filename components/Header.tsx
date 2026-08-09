"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import Link from "next/link";
import { Language } from "@/types";
import Image from "next/image";

export default function Header() {
  const { language, setLanguage } = useDeshatan();
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages: Language[] = ["en", "hi", "bn", "mr"];
  const langNames: Record<Language, string> = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    mr: "मराठी",
    te: "తెలుగు",
    ta: "தமிழ்",
    gu: "ગુજરાતી",
    ur: "اردو",
    kn: "ಕನ್ನಡ",
    or: "ଓଡ଼ିଆ",
  };

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
          <span className="dot">•</span>
          <span>50,000+ Safe Stays 🧳</span>
        </div>
      </div>

      <header>
        <nav className="nav">
          <div className="logo">
            <div className="logo-frame">
              <Image
                src="/assets/logo-frame.svg"
                alt=""
                width={130}
                height={50}
                priority
                aria-hidden="true"
              />
              <div className="logo-mark">🏍️</div>
            </div>
            <div className="logo-name">
              {t("nav.logo", language)}
              <small>{t("nav.tagline", language)}</small>
            </div>
          </div>

          <div className={`nav-links ${navOpen ? 'open' : ''}`} id="nav-links">
            <a href="#showcase">{t("nav.coverage", language)}</a>
            <a href="#features">{t("nav.features", language)}</a>
            <a href="#tracking">{t("nav.calculator", language)}</a>
            <a href="#groups">{t("nav.groups", language)}</a>
            <a href="/book/search" className="nav-book">🎫 Book</a>
            <a href="/admin" className="nav-admin">⚙️ Admin</a>
          </div>

          <div className="nav-right">
            <div className="lang-dropdown">
              <button
                className="lang-trigger"
                onClick={() => setLangOpen(!langOpen)}
                title="Change language"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="lang-globe">
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1"/>
                  <path d="M1 9h16M9 1a8 8 0 010 16 8 8 0 010-16z" stroke="currentColor" strokeWidth="1"/>
                </svg>
                <span>{language.toUpperCase().slice(0, 2)}</span>
              </button>
              {langOpen && (
                <div className="lang-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={`lang-option ${language === lang ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(lang);
                        setLangOpen(false);
                      }}
                    >
                      {langNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-divider"></div>

            <Link href="/book/search" className="plan-trip-btn" aria-label="Plan Your Trip">
              <Image
                src="/assets/plan-trip-button.svg"
                alt="Plan Your Trip"
                width={188}
                height={44}
                priority
              />
            </Link>

            <button
              className="nav-toggle"
              id="nav-toggle"
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
              aria-label="Toggle menu"
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
