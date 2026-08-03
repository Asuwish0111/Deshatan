import { redirect } from 'next/navigation';
import { readSession } from '@/lib/auth';
import AppBar from '@/components/app/AppBar';
import AdminSidebar from '@/components/app/AdminSidebar';

export default async function AdminPanelLayout({ children }) {
  const session = await readSession();
  if (!session) redirect('/admin/login');
  return (
    <div id="app-shell">
      <AppBar mode="admin" />
      <div className="app-body">
        <AdminSidebar email={session.email} />
        <main className="app-view">{children}</main>
      </div>
    </div>
  );
}
