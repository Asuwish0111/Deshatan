"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Groups() {
  const { language } = useDeshatan();

  const groups = [
    {
      key: "kids",
      title: t("groups.kids", language),
      sub: t("groups.kids.sub", language),
      desc: t("groups.kids.desc", language),
      items: ["Adventure stories", "Wildlife spotting", "Temple visits"],
    },
    {
      key: "teens",
      title: t("groups.teens", language),
      sub: t("groups.teens.sub", language),
      desc: t("groups.teens.desc", language),
      items: ["Trekking", "Rock climbing", "Water sports"],
    },
    {
      key: "adults",
      title: t("groups.adults", language),
      sub: t("groups.adults.sub", language),
      desc: t("groups.adults.desc", language),
      items: ["Multi-state epics", "Honeymoons", "Solo quests"],
    },
  ];

  return (
    <>
      <div className="groups-head reveal">
        <div className="eyebrow">
          <span>AGE GROUPS</span>
        </div>
        <h2>{t("groups.h2", language)}</h2>
      </div>

      <div className="group-grid">
        {groups.map((group) => (
          <div key={group.key} className="jharokha">
            <div className="arch-img">
              <svg viewBox="0 0 200 150">
                <circle cx="100" cy="50" r="40" fill="var(--marigold)" opacity="0.6" />
                <path d="M 60 90 Q 100 60 140 90 L 140 150 L 60 150 Z" fill="var(--indigo)" opacity="0.4" />
              </svg>
            </div>
            <div className="body">
              <h3>{group.title}</h3>
              <div className="sub">{group.sub}</div>
              <p>{group.desc}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
