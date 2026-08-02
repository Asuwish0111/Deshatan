"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Final() {
  const { language } = useDeshatan();

  const trust = [
    { label: t("final.trust1", language), sub: t("final.trust1.sub", language) },
    { label: t("final.trust2", language), sub: t("final.trust2.sub", language) },
    { label: t("final.trust3", language), sub: t("final.trust3.sub", language) },
    { label: t("final.trust4", language), sub: t("final.trust4.sub", language) },
  ];

  return (
    <>
      <div className="diya-wrap">
        <svg className="diya" viewBox="0 0 100 120">
          <defs>
            <linearGradient id="diyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--marigold)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "var(--sindoor)", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="80" rx="35" ry="25" fill="url(#diyaGrad)" />
          <path d="M 45 70 L 40 30 L 45 50 Q 50 40 55 50 L 60 30 L 55 70 Z" className="flame" fill="var(--marigold)" />
        </svg>
      </div>

      <div className="final-flourish">
        <svg className="paisley-flourish" viewBox="0 0 100 100">
          <path d="M 50 20 Q 70 50 50 80 Q 30 50 50 20" fill="currentColor" />
        </svg>
        <span className="hindi" style={{ fontSize: "28px" }}>
          {t("final.h1", language)}
        </span>
        <svg className="paisley-flourish flip" viewBox="0 0 100 100">
          <path d="M 50 20 Q 70 50 50 80 Q 30 50 50 20" fill="currentColor" />
        </svg>
      </div>

      <h2>{t("final.h2", language)}</h2>
      <p className="final-sub">{t("final.p", language)}</p>

      <div className="final-ctas">
        <button className="btn">{t("final.cta1", language)}</button>
        <button className="btn ghost">{t("final.cta2", language)}</button>
      </div>

      <div className="final-trust">
        {trust.map((item, i) => (
          <div key={i}>
            <b>{item.label}</b>
            <span>{item.sub}</span>
          </div>
        ))}
      </div>
    </>
  );
}
