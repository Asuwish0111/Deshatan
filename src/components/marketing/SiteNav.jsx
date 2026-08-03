'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLang, LANGUAGES } from '../LanguageProvider';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const linksRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (linksRef.current?.contains(e.target) || toggleRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const mq = matchMedia('(min-width:1021px)');
    const onWide = (e) => { if (e.matches) setOpen(false); };
    document.addEventListener('click', onDocClick);
    mq.addEventListener('change', onWide);
    return () => { document.removeEventListener('click', onDocClick); mq.removeEventListener('change', onWide); };
  }, [open]);

  return (
    <header>
      <nav className="nav" aria-label="Main">
        <a className="logo" href="#top">
          <svg className="logo-mark" viewBox="0 0 44 44" aria-hidden="true">
            <path d="M6 42 V22 A16 16 0 0 1 14 12 A10 10 0 0 1 21 7 L22 3 L23 7 A10 10 0 0 1 30 12 A16 16 0 0 1 38 22 V42 Z" fill="#A14834" stroke="#26190E" strokeWidth="2.5" />
            <circle cx="22" cy="24" r="6" fill="#CF9E46" stroke="#26190E" strokeWidth="2" />
          </svg>
          <span className="logo-name">Deshatan</span>
        </a>
        <div className={'nav-links' + (open ? ' open' : '')} id="nav-links" ref={linksRef} onClick={() => setOpen(false)}>
          <a href="#coverage" data-i18n="nav.coverage">Where we go</a>
          <a href="#features" data-i18n="nav.features">Everything included</a>
          <a href="#calculator" data-i18n="nav.calculator">Dream calculator</a>
          <a href="#groups" data-i18n="nav.groups">Your kind of yatra</a>
        </div>
        <div className="nav-right">
          <div className="lang-switch">
            <label htmlFor="lang-select" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Choose language</label>
            <select id="lang-select" aria-label="Choose language" value={lang} onChange={(e) => setLang(e.target.value)}>
              {LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </div>
          <Link className="btn red" href="/book" data-i18n="nav.cta">Plan my yatra</Link>
          <button
            className="nav-toggle" id="nav-toggle" ref={toggleRef}
            aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav-links"
            onClick={() => setOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
