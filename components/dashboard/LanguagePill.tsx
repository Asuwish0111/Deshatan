"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useDeshatan } from "@/lib/context";
import { LANGUAGES, LANG_NAMES, LANG_SHORT, RTL } from "@/lib/languages";
import { Language } from "@/types";
import s from "./dashboard.module.css";

/* The pill was a button with no handler and an aria-label promising it changed
   the language. It is a listbox now: click or Enter opens, arrows move, Enter
   picks, Escape closes and hands focus back. */
export default function LanguagePill() {
  const { language, setLanguage } = useDeshatan();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();

  // open on the current language rather than the top of the list
  useEffect(() => {
    if (open) {
      const i = Math.max(0, LANGUAGES.indexOf(language));
      setActive(i);
      requestAnimationFrame(() => optionRefs.current[i]?.focus());
    }
  }, [open, language]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  };

  const pick = (lang: Language) => {
    setLanguage(lang);
    close();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    let next = active;
    if (e.key === "ArrowDown") next = (active + 1) % LANGUAGES.length;
    else if (e.key === "ArrowUp") next = (active - 1 + LANGUAGES.length) % LANGUAGES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = LANGUAGES.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    optionRefs.current[next]?.focus();
  };

  return (
    <div className={s.langWrap} ref={wrap}>
      <button
        ref={button}
        className={s.langPill}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Language — ${LANG_NAMES[language]}. Change language`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>
          <span className={`${s.icon18} ${s.iconGlobe}`}>
            <img src="/figma/globe.svg" alt="" />
          </span>
          <span className={s.langCode}>{LANG_SHORT[language]}</span>
        </span>
        <span className={`${s.icon18} ${s.iconCaret} ${open ? s.iconCaretUp : ""}`}>
          <img src="/figma/caret-down.svg" alt="" />
        </span>
      </button>

      {open ? (
        <ul
          className={s.langMenu}
          id={listId}
          role="listbox"
          aria-label="Choose a language"
          onKeyDown={onListKey}
        >
          {LANGUAGES.map((lang, i) => (
            <li key={lang} role="none">
              <button
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="option"
                aria-selected={lang === language}
                lang={lang}
                dir={RTL.includes(lang) ? "rtl" : undefined}
                className={`${s.langOption} ${lang === language ? s.langOptionOn : ""}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => pick(lang)}
              >
                <span>{LANG_NAMES[lang]}</span>
                {lang === language ? (
                  <span aria-hidden="true" className={s.langTick}>
                    ✓
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
