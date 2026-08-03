import AppBar from '@/components/app/AppBar';
import DraftProvider from '@/components/app/DraftProvider';

export const metadata = { title: 'Book a yatra — Deshatan' };

export default function BookLayout({ children }) {
  return (
    <DraftProvider>
      <div id="app-shell">
        <AppBar mode="book" />
        <div className="app-body">
          <main className="app-view">{children}</main>
        </div>
      </div>
    </DraftProvider>
  );
}
