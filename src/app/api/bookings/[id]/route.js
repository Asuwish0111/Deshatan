import { getBooking, getDestination, getStay, listGuides, listDrivers } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 });
  const [destination, stay, guides, drivers] = await Promise.all([
    getDestination(booking.destId), booking.stayId ? getStay(booking.stayId) : null,
    listGuides(), listDrivers()
  ]);
  return Response.json({
    booking, destination, stay,
    guide: guides.find((g) => g.id === booking.guideId) || null,
    driver: drivers.find((d) => d.id === booking.driverId) || null
  });
}
