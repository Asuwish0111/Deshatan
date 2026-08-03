'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppBar({ mode = 'book' }) {
  const path = usePathname();
  const links = mode === 'admin'
    ? [['/admin', 'Dashboard'], ['/', 'Back to site']]
    : [['/book', 'Find a yatra'], ['/book/mytrips', 'My trips'], ['/', 'Back to site']];
  return (
    <header className="app-bar">
      <Link className="app-logo" href="/">
        <svg viewBox="0 0 44 44" aria-hidden="true" width="30" height="30">
          <path d="M6 42 V22 A16 16 0 0 1 14 12 A10 10 0 0 1 21 7 L22 3 L23 7 A10 10 0 0 1 30 12 A16 16 0 0 1 38 22 V42 Z" fill="#A14834" stroke="#26190E" strokeWidth="2.5" />
          <circle cx="22" cy="24" r="6" fill="#CF9E46" stroke="#26190E" strokeWidth="2" />
        </svg>
        <span>Deshatan</span>
      </Link>
      <nav className="app-bar-nav">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className={path === href ? 'on' : ''}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
