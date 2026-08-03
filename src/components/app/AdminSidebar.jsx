'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  ['/admin', 'Dashboard'],
  ['/admin/bookings', 'Bookings'],
  ['/admin/listings', 'Destinations & stays'],
  ['/admin/partners', 'Guides & drivers'],
  ['/admin/applications', 'Applications'],
  ['/admin/reviews', 'Reviews'],
  ['/admin/customers', 'Customers'],
  ['/admin/analytics', 'Analytics'],
  ['/admin/audit', 'Audit log'],
  ['/admin/settings', 'Settings']
];

export default function AdminSidebar({ email }) {
  const path = usePathname();
  const router = useRouter();
  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };
  return (
    <aside className="app-sidebar">
      {NAV.map(([href, label]) => (
        <Link key={href} href={href} className={path === href ? 'on' : ''}>{label}</Link>
      ))}
      <div className="field-hint" style={{ marginTop: '18px' }}>{email}</div>
      <button className="btn" style={{ marginTop: '8px', fontSize: '13px' }} onClick={signOut}>Sign out</button>
    </aside>
  );
}
