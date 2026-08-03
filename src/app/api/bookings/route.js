import { createBooking, getDestination, getStay, listBookings, logAudit } from '@/lib/repo';
import { quote } from '@/lib/pricing';
import { bookingRef } from '@/lib/ids';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const email = p.get('email');
  if (!email) return Response.json({ error: 'email is required' }, { status: 400 });
  return Response.json({ bookings: await listBookings({ email }) });
}

// Creates the booking server-side and re-prices it from the DB, so a tampered
// client can't decide its own total.
export async function POST(req) {
  const b = await req.json();
  const errors = [];
  if (!b.destId) errors.push('destId');
  if (!b.guestName?.trim()) errors.push('guestName');
  if (!/^\S+@\S+\.\S+$/.test(b.guestEmail || '')) errors.push('guestEmail');
  if (!/^[0-9+\- ]{8,}$/.test(b.guestPhone || '')) errors.push('guestPhone');
  if (errors.length) return Response.json({ error: 'Check these fields', fields: errors }, { status: 400 });

  const destination = await getDestination(b.destId);
  if (!destination) return Response.json({ error: 'Destination not found' }, { status: 404 });
  const stay = b.stayId ? await getStay(b.stayId) : null;

  const days = Math.max(1, Number(b.days) || destination.days);
  const pax = Math.max(1, Number(b.pax) || 2);
  const q = quote({
    destination, days, pax, style: b.style || 'comfort',
    meal: b.meal, pickup: b.pickup, addons: b.addons, stay, roomTier: b.roomTier
  });

  const booking = {
    id: bookingRef(), destId: b.destId,
    guestName: b.guestName.trim(), guestEmail: b.guestEmail.trim(), guestPhone: b.guestPhone.trim(),
    days, pax, style: b.style || 'comfort', pace: b.pace || 'balanced',
    meal: b.meal || 'breakfast', pickup: b.pickup || 'self', occasion: b.occasion || 'none',
    addons: b.addons || [], guideId: b.guideId || null, driverId: b.driverId || null,
    stayId: b.stayId || null, roomTier: b.roomTier || 'standard',
    total: q.total, paid: 0, status: 'pending', startDate: b.startDate || null,
    createdAt: new Date().toISOString()
  };
  await createBooking(booking);
  await logAudit('Booking created', `${booking.id} · ${destination.title} · ${booking.guestName}`, 'system');
  return Response.json({ booking, quote: q }, { status: 201 });
}
