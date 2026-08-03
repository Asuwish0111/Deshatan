'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => { api('/api/admin/customers').then((d) => setCustomers(d.customers)).catch(() => {}); }, []);

  return (
    <>
      <h1>Customers</h1>
      <div className="sub">Built from bookings — one row per traveller, ranked by what they have actually paid.</div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Trips</th><th>Lifetime value</th></tr></thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email}>
                <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.trips}</td><td>{rupees(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!customers.length && <p>No customers yet — the first booking creates one.</p>}
    </>
  );
}
