import { getDestination, getStay } from '@/lib/repo';
import { quote } from '@/lib/pricing';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const body = await req.json();
  const destination = await getDestination(body.destId);
  if (!destination) return Response.json({ error: 'Destination not found' }, { status: 404 });
  const stay = body.stayId ? await getStay(body.stayId) : null;
  return Response.json({
    quote: quote({
      destination,
      days: Number(body.days) || destination.days,
      pax: Number(body.pax) || 2,
      style: body.style || 'comfort',
      meal: body.meal, pickup: body.pickup, addons: body.addons,
      stay, roomTier: body.roomTier
    })
  });
}
