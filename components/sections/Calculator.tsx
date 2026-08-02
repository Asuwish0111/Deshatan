"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import { STYLE_OPTIONS, REGION_MULTIPLIERS } from "@/lib/constants";
import { useState } from "react";

export default function Calculator() {
  const { language } = useDeshatan();
  const [days, setDays] = useState(5);
  const [pax, setPax] = useState(2);
  const [style, setStyle] = useState<"backpacker" | "comfort" | "heritage">("comfort");
  const [region, setRegion] = useState("Himalayas");

  const baseRate = STYLE_OPTIONS.find((s) => s.key === style)?.price || 4500;
  const regionMult = REGION_MULTIPLIERS[region] || 1.0;
  const groupFactor = 1 - Math.min((pax - 1) * 0.04, 0.22);
  const total = Math.round(days * pax * baseRate * regionMult * groupFactor);
  const perHead = Math.round(total / pax);

  return (
    <div className="calc-grid">
      <div>
        <div className="eyebrow">
          <span className="hindi">सपनों का</span>
          <span>CALCULATOR</span>
        </div>
        <h2>{t("calc.h2", language)}</h2>
        <p className="calc-intro">{t("calc.p", language)}</p>

        <div className="budget-note">
          <b>{t("calc.budget", language)}</b>
        </div>
      </div>

      <div className="calc-panel">
        <h3>
          {t("calc.h3", language)}
          <small>
            <button type="button" onClick={() => { setDays(5); setPax(2); setStyle("comfort"); setRegion("Himalayas"); }}>
              {t("calc.small", language)}
            </button>
          </small>
        </h3>

        <div className="field">
          <label>
            {t("calc.days", language)}
            <output>{days}</output>
          </label>
          <input
            type="range"
            min="2"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label>
            {t("calc.pax", language)}
            <output>{pax}</output>
          </label>
          <input
            type="range"
            min="1"
            max="15"
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
          />
        </div>

        <div className="field-section">
          <label>{t("calc.style", language)}</label>
          <div className="seg">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={opt.key === style ? "on" : ""}
                onClick={() => setStyle(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field-section">
          <label>{t("calc.region", language)}</label>
          <div className="seg seg-4">
            {Object.keys(REGION_MULTIPLIERS).map((r) => (
              <button
                key={r}
                type="button"
                className={r === region ? "on" : ""}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="calc-total">
          <div className="rupees">₹{total.toLocaleString()}</div>
          <div className="per">{t("calc.per", language)}: ₹{perHead.toLocaleString()}</div>
        </div>

        <div className="calc-break">
          <span>
            <b>{t("calc.stay", language)}</b>
            ₹{Math.round((total * 0.45) / 1000)}k
          </span>
          <span>
            <b>{t("calc.travel", language)}</b>
            ₹{Math.round((total * 0.35) / 1000)}k
          </span>
          <span>
            <b>{t("calc.guide", language)}</b>
            ₹{Math.round((total * 0.2) / 1000)}k
          </span>
        </div>

        <button type="button" className="btn" style={{ width: "100%", marginTop: "16px" }}>
          {t("calc.cta", language)}
        </button>
      </div>
    </div>
  );
}
