import Link from 'next/link';
import s from './dashboard.module.css';

// Navy plate above the arch: two centre tabs around the lotus motif,
// language pill + CTA on the right. Figma node 2:2441 (header band).
export default function TopBar() {
  return (
    <header className={s.topbar}>
      <nav className={s.navCenter} aria-label="Main">
        <div className={s.tabSlot}>
          <Link className={s.tab} href="#coverage">
            <span className={s.tabText}>
              <img src="/figma/user-icon-active.svg" alt="" width={16} height={16} />
              Where we go
            </span>
            <span className={s.tabRule} aria-hidden="true">
              <img className={s.ornLeft} src="/figma/tab-orn-right.svg" alt="" />
              <img className={s.rule} src="/figma/tab-rule.svg" alt="" />
              <img className={s.ornRight} src="/figma/tab-orn-left.svg" alt="" />
            </span>
          </Link>
        </div>
        <Link className={s.navLink} href="#calculator">
          <img src="/figma/user-icon.svg" alt="" width={16} height={16} />
          Dream Calculator
        </Link>
      </nav>

      <div className={s.navRight}>
        <button className={s.langPill} type="button" aria-label="Change language — English">
          <span>
            <span className={`${s.icon18} ${s.iconGlobe}`}>
              <img src="/figma/globe.svg" alt="" />
            </span>
            <span className={s.langCode}>En</span>
          </span>
          <span className={`${s.icon18} ${s.iconCaret}`}>
            <img src="/figma/caret-down.svg" alt="" />
          </span>
        </button>

        <span className={s.navDivider} aria-hidden="true">
          <span className={s.navDividerInner}>
            <img className={s.cap} src="/figma/divider-down.svg" alt="" width={7.445} />
            <img className={s.line} src="/figma/divider-line.svg" alt="" />
            <img className={s.cap} src="/figma/divider-up.svg" alt="" width={7} />
          </span>
        </span>

        <Link className={`${s.btnPlate} ${s.planBtn}`} href="/book">
          <span>Plan Your Trip</span>
        </Link>
      </div>

      <img className={s.motif} src="/figma/motif-lotus.png" alt="" />
      <span className={`${s.motifDot} ${s.motifDotLeft}`} aria-hidden="true" />
      <span className={`${s.motifDot} ${s.motifDotRight}`} aria-hidden="true" />
    </header>
  );
}
