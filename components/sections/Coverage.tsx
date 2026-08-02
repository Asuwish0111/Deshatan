"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import { REGION_ACCENTS } from "@/lib/constants";

export default function Coverage() {
  const { language } = useDeshatan();

  const stats = [
    { num: 28, label: t("coverage.s1.label", language), sub: t("coverage.s1.sub", language) },
    { num: 8, label: t("coverage.s2.label", language), sub: t("coverage.s2.sub", language) },
    { num: 3, label: t("coverage.s3.label", language), sub: t("coverage.s3.sub", language) },
  ];

  const regions = Object.keys(REGION_ACCENTS);

  return (
    <>
      <div className="coverage-head reveal">
        <div className="eyebrow">
          <span>COVERAGE</span>
        </div>
        <h2>{t("coverage.h2", language)}</h2>
      </div>

      <div className="coverage-grid">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`stamp ${i === 0 ? "red" : i === 1 ? "gold" : "blue"} reveal`}
          >
            <div className="stamp-inner">
              <div className="cov-num">{stat.num}</div>
              <div className="cov-label">{stat.label}</div>
              <div className="cov-sub">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="region-chips">
        {regions.map((region) => (
          <div
            key={region}
            className="chip on"
            style={{
              background: REGION_ACCENTS[region]?.bg,
              color: REGION_ACCENTS[region]?.text,
              borderColor: REGION_ACCENTS[region]?.bg,
            }}
          >
            {region}
          </div>
        ))}
      </div>
    </>
  );
}
