import { readSession } from '@/lib/auth';
import { listBookings, listDestinations } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const bookings = await listBookings({});
  const { items: destinations } = await listDestinations({ limit: 400 });
  const byId = new Map(destinations.map((d) => [d.id, d]));

  const byRegion = {}, byMonth = {}, byStyle = {};
  for (const b of bookings) {
    const region = byId.get(b.destId)?.region || 'Unknown';
    byRegion[region] = (byRegion[region] || 0) + (b.paid || b.total || 0);
    const month = (b.createdAt ? new Date(b.createdAt) : new Date()).toISOString().slice(0, 7);
    byMonth[month] = (byMonth[month] || 0) + 1;
    byStyle[b.style || 'comfort'] = (byStyle[b.style || 'comfort'] || 0) + 1;
  }
  const toArr = (o) => Object.entries(o).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  return Response.json({ revenueByRegion: toArr(byRegion), bookingsByMonth: toArr(byMonth).sort((a, b) => a.label.localeCompare(b.label)), styleSplit: toArr(byStyle) });
}
