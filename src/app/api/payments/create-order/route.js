import { getBooking } from '@/lib/repo';
export const dynamic = 'force-dynamic';

// Creates a Razorpay order for a booking. With no keys configured the route runs
// in mock mode so the whole flow still works end to end in development.
export async function POST(req) {
  const { bookingId, amount } = await req.json();
  const booking = await getBooking(bookingId);
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 });

  const payable = Number(amount) || booking.total;
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return Response.json({
      mock: true,
      order: { id: 'order_mock_' + booking.id, amount: payable * 100, currency: 'INR' }
    });
  }

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64')
    },
    body: JSON.stringify({
      amount: payable * 100, currency: 'INR', receipt: booking.id,
      notes: { bookingId: booking.id, guest: booking.guestName }
    })
  });
  if (!res.ok) {
    const detail = await res.text();
    return Response.json({ error: 'Payment gateway rejected the order', detail }, { status: 502 });
  }
  return Response.json({ mock: false, order: await res.json() });
}
