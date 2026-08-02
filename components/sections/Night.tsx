"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Night() {
  const { language } = useDeshatan();

  return (
    <div className="night-grid">
      <div>
        <div className="eyebrow">
          <span className="hindi">सुरक्षा</span>
          <span>TRUST</span>
        </div>
        <h2>{t("night.h2", language)}</h2>
        <p>{t("night.p", language)}</p>

        <ul className="night-list">
          <li>
            <div className="bindu"></div>
            <b>{t("night.list1", language)}</b>
          </li>
          <li>
            <div className="bindu"></div>
            <b>{t("night.list2", language)}</b>
          </li>
          <li>
            <div className="bindu"></div>
            <b>{t("night.list3", language)}</b>
          </li>
        </ul>
      </div>

      <div>
        <div className="tracker-card">
          <div className="tc-head">
            <span>{t("tracker.head", language)}</span>
            <span className="live-pill">
              <i></i>
              {t("tracker.live", language)}
            </span>
          </div>

          <div style={{ color: "var(--paper)", marginBottom: "14px" }}>
            <div style={{ fontSize: "13.5px", color: "var(--indigo-muted)" }}>
              {t("tracker.status", language)}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "600", marginTop: "4px" }}>
              En route to Kedarnath 🏔️
            </div>
          </div>

          <div style={{ color: "var(--paper)", marginBottom: "14px" }}>
            <div style={{ fontSize: "13.5px", color: "var(--indigo-muted)" }}>
              {t("tracker.leg", language)}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "600", marginTop: "4px" }}>
              Chopta → Kedarnath (52km)
            </div>
          </div>

          <div style={{ color: "var(--paper)" }}>
            <div style={{ fontSize: "13.5px", color: "var(--indigo-muted)" }}>
              {t("tracker.eta", language)}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "600", marginTop: "4px" }}>
              2:45 PM (+15 min)
            </div>
          </div>

          <div className="tracker-foot">
            <span>Last ping: 2m ago</span>
            <b>8/12 guests</b>
          </div>
        </div>
      </div>
    </div>
  );
}
