import { readSession } from '@/lib/auth';
import { listBookings, listDestinations } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const status = new URL(req.url).searchParams.get('status') || '';
  const bookings = await listBookings({ status });
  const { items } = await listDestinations({ limit: 400 });
  const titles = new Map(items.map((d) => [d.id, d.title]));
  return Response.json({ bookings: bookings.map((b) => ({ ...b, destTitle: titles.get(b.destId) || b.destId })) });
}
