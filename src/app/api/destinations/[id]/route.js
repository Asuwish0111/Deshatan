import { getDestination, listStays } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  const { id } = await params;
  const destination = await getDestination(id);
  if (!destination) return Response.json({ error: 'Destination not found' }, { status: 404 });
  const stays = await listStays({ region: destination.region, limit: 8 });
  return Response.json({ destination, stays });
}
