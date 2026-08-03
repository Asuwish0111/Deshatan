'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true); setMessage('');
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      router.push('/admin');
      router.refresh();
    } catch (e) { setMessage(e.message); setBusy(false); }
  };

  return (
    <div id="app-shell">
      <div className="app-body">
        <main className="app-view">
          <div className="login-wrap">
            <h1>Deshatan admin</h1>
            <p className="sub">Bookings, partners, payouts and moderation.</p>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && signIn()} />
            </div>
            {message && <div className="demo-note" role="alert">{message}</div>}
            <div className="pill-row" style={{ marginTop: '18px' }}>
              <button className="btn red" onClick={signIn} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
            </div>
            <p className="field-hint">Credentials come from ADMIN_EMAIL and ADMIN_PASSWORD in your environment file.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
