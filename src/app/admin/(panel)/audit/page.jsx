'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminAudit() {
  const [entries, setEntries] = useState([]);
  useEffect(() => { api('/api/admin/audit').then((d) => setEntries(d.entries)).catch(() => {}); }, []);

  return (
    <>
      <h1>Audit log</h1>
      <div className="sub">Every state-changing action, with who did it and when.</div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>When</th><th>Who</th><th>Action</th><th>Detail</th></tr></thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}><td>{e.at}</td><td>{e.who}</td><td>{e.action}</td><td>{e.detail}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
