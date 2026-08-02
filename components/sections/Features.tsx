"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Features() {
  const { language } = useDeshatan();

  const features = [
    {
      icon: "✓",
      title: t("feature.verified", language),
      desc: t("feature.verified.desc", language),
      tags: ["24/7", "Trained", "Multi-lingual"],
    },
    {
      icon: "🏨",
      title: t("feature.stays", language),
      desc: t("feature.stays.desc", language),
      tags: ["Hotels", "Homestays", "Resorts"],
    },
    {
      icon: "📍",
      title: t("feature.tracking", language),
      desc: t("feature.tracking.desc", language),
      tags: ["Real-time", "GPS", "ETA"],
    },
    {
      icon: "⭐",
      title: t("feature.reviews", language),
      desc: t("feature.reviews.desc", language),
      tags: ["Authentic", "Verified", "Photos"],
    },
    {
      icon: "🍴",
      title: t("feature.meals", language),
      desc: t("feature.meals.desc", language),
      tags: ["Local", "Breakfast", "Dinner"],
    },
    {
      icon: "🛡️",
      title: t("feature.insurance", language),
      desc: t("feature.insurance.desc", language),
      tags: ["Health", "Trip", "Optional"],
    },
  ];

  return (
    <>
      <div className="features-head reveal">
        <div className="eyebrow">
          <span>FEATURES</span>
        </div>
        <h2>{t("features.h2", language)}</h2>
      </div>

      <div className="feature-grid">
        {features.map((feat, i) => (
          <div key={i}>
            <div className="feat-icon">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
            <div className="review-line">
              <span className="stars">★★★★★</span>
            </div>
            <div className="tag-row">
              {feat.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
