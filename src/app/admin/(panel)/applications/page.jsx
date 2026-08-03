'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [message, setMessage] = useState('');

  const load = () => api('/api/admin/applications').then((d) => setApps(d.applications)).catch((e) => setMessage(e.message));
  useEffect(() => { load(); }, []);

  const decide = async (id, status) => {
    try {
      await api('/api/admin/applications/' + id, { method: 'PATCH', body: JSON.stringify({ status }) });
      setMessage(status === 'approved' ? 'Approved — the partner record is live.' : 'Application rejected.');
      load();
    } catch (e) { setMessage(e.message); }
  };

  return (
    <>
      <h1>Partner applications</h1>
      <div className="sub">Approving a guide or driver creates their partner record immediately.</div>
      {message && <div className="demo-note">{message}</div>}

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Ref</th><th>Name</th><th>Role</th><th>City</th><th>Submitted</th><th>Documents</th><th>Status</th><th>Decision</th></tr></thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td><td>{a.name}</td><td>{a.kind}</td><td>{a.city}</td><td>{a.submitted}</td>
                <td>{a.docs}<br /><small>{a.note}</small></td>
                <td><span className={'status-pill ' + a.status}>{a.status}</span></td>
                <td className="table-actions">
                  {a.status === 'pending' ? (
                    <>
                      <button className="btn red" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={() => decide(a.id, 'approved')}>Approve</button>
                      <button className="btn" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={() => decide(a.id, 'rejected')}>Reject</button>
                    </>
                  ) : <span className="meta">Decided</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
