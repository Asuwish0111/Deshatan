"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Community() {
  const { language } = useDeshatan();

  const points = [
    { label: t("community.p1", language), value: t("community.p1v", language) },
    { label: t("community.p2", language), value: t("community.p2v", language) },
    { label: t("community.p3", language), value: t("community.p3v", language) },
    { label: t("community.p4", language), value: t("community.p4v", language) },
  ];

  return (
    <div className="comm-grid">
      <div>
        <div className="eyebrow">
          <span className="hindi">समुदाय</span>
          <span>COMMUNITY</span>
        </div>
        <h2>{t("community.h2", language)}</h2>
        <p>{t("community.p", language)}</p>
      </div>

      <div className="points-card">
        <h3>{t("community.points", language)}</h3>
        {points.map((point, i) => (
          <div key={i} className="points-row">
            <span>{point.label}</span>
            <b>{point.value}</b>
          </div>
        ))}
        <div className="socials">
          <a href="#" title="Facebook">📱</a>
          <a href="#" title="Twitter">𝕏</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="YouTube">▶️</a>
        </div>
      </div>
    </div>
  );
}
