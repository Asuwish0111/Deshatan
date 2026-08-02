"use client";

import React, { useState } from "react";
import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { language } = useDeshatan();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <footer>
      <div className="wrap">
        <div className="foot-trust">
          <div className="foot-trust-row">
            <div className="foot-trust-item">
              <span>✓</span>
              <div>
                <b>{t("footer.trust1", language)}</b>
                <span>{t("footer.trust1.sub", language)}</span>
              </div>
            </div>
            <div className="foot-trust-item">
              <span>✓</span>
              <div>
                <b>{t("footer.trust2", language)}</b>
                <span>{t("footer.trust2.sub", language)}</span>
              </div>
            </div>
            <div className="foot-trust-item">
              <span>✓</span>
              <div>
                <b>{t("footer.trust3", language)}</b>
                <span>{t("footer.trust3.sub", language)}</span>
              </div>
            </div>
            <div className="foot-trust-item">
              <span>✓</span>
              <div>
                <b>{t("footer.trust4", language)}</b>
                <span>{t("footer.trust4.sub", language)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="foot-news">
          <div className="foot-news-copy">
            <h4>{t("footer.news", language)}</h4>
            <p>{t("footer.news.desc", language)}</p>
          </div>
          <form className="foot-news-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder={t("footer.news.ph", language)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {t("footer.news.btn", language)}
            </button>
          </form>
          {status === "success" && (
            <div className="foot-news-note ok">{t("footer.news.note", language)}</div>
          )}
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <h4>{t("footer.about", language)}</h4>
            <p>{t("footer.about.p", language)}</p>
            <div className="foot-socials">
              <a href="#" title="Facebook">
                f
              </a>
              <a href="#" title="Twitter">
                𝕏
              </a>
              <a href="#" title="Instagram">
                📷
              </a>
              <a href="#" title="LinkedIn">
                in
              </a>
            </div>
          </div>

          <div>
            <h4>{t("footer.explore", language)}</h4>
            <ul>
              <li>
                <a href="#showcase">{t("footer.explore1", language)}</a>
              </li>
              <li>
                <a href="#coverage">{t("footer.explore2", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.explore3", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.explore4", language)}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.trust.h", language)}</h4>
            <ul>
              <li>
                <a href="#">{t("footer.trust1", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.trust2", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.trust3", language)}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.help", language)}</h4>
            <ul>
              <li>
                <a href="#">{t("footer.help1", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.help2", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.help3", language)}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.policy", language)}</h4>
            <ul>
              <li>
                <a href="#">{t("footer.policy1", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.policy2", language)}</a>
              </li>
              <li>
                <a href="#">{t("footer.policy3", language)}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
