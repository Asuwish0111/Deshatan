'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import I18N from '../../data/i18n.json';

const LANG_CLASSES = ['lang-hi', 'lang-bn', 'lang-mr', 'lang-te', 'lang-ta', 'lang-gu', 'lang-ur', 'lang-kn', 'lang-or'];
const LangContext = createContext({ lang: 'en', setLang: () => {} });
export const useLang = () => useContext(LangContext);

export const LANGUAGES = [
  ['en', 'English'], ['hi', 'हिंदी'], ['bn', 'বাংলা'], ['mr', 'मराठी'], ['te', 'తెలుగు'],
  ['ta', 'தமிழ்'], ['gu', 'ગુજરાતી'], ['ur', 'اردو'], ['kn', 'ಕನ್ನಡ'], ['or', 'ଓଡ଼ିଆ']
];

// The marketing markup carries data-i18n keys (same as the prototype). Rather than
// duplicating 159 strings x 10 languages inside JSX, we translate that markup in place
// after mount and keep the English text in the HTML as the server-rendered default.
export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');
  const [originals] = useState(() => new Map());

  const apply = useCallback((next) => {
    const dict = I18N[next];
    document.body.classList.remove(...LANG_CLASSES);
    if (next !== 'en') document.body.classList.add('lang-' + next);
    document.documentElement.setAttribute('lang', next);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = next !== 'en' && dict?.[key] !== undefined ? dict[key] : originals.get(el);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (!originals.has(el)) originals.set(el, el.getAttribute('placeholder'));
      el.setAttribute('placeholder', next !== 'en' && dict?.[key] !== undefined ? dict[key] : originals.get(el));
    });
  }, [originals]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try { localStorage.setItem('deshatan-lang', next); } catch {}
    apply(next);
  }, [apply]);

  useEffect(() => {
    let saved = 'en';
    try { saved = localStorage.getItem('deshatan-lang') || 'en'; } catch {}
    if (saved !== 'en') { setLangState(saved); apply(saved); }
  }, [apply]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
