import { readSession } from '@/lib/auth';
import { listBookings } from '@/lib/repo';
export const dynamic = 'force-dynamic';

// Customers are derived from bookings - one row per email, with lifetime value.
export async function GET() {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const bookings = await listBookings({});
  const map = new Map();
  for (const b of bookings) {
    const key = (b.guestEmail || '').toLowerCase();
    const row = map.get(key) || { email: b.guestEmail, name: b.guestName, phone: b.guestPhone, trips: 0, spent: 0 };
    row.trips += 1;
    row.spent += b.paid || 0;
    map.set(key, row);
  }
  return Response.json({ customers: [...map.values()].sort((a, b) => b.spent - a.spent) });
}
