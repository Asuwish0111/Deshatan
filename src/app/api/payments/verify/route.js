import crypto from 'node:crypto';
import { getBooking, updateBooking, logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

// Confirms a payment. Real mode checks Razorpay's HMAC signature before marking
// the booking paid - the client is never trusted to say "payment succeeded".
export async function POST(req) {
  const body = await req.json();
  const booking = await getBooking(body.bookingId);
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 });

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (keySecret) {
    const expected = crypto
      .createHmac('sha256', keySecret)
      .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
      .digest('hex');
    if (expected !== body.razorpay_signature) {
      await logAudit('Payment signature rejected', booking.id, 'system');
      return Response.json({ error: 'Payment could not be verified' }, { status: 400 });
    }
  }

  const paid = Number(body.amount) || booking.total;
  const updated = await updateBooking(booking.id, {
    paid, status: paid >= booking.total ? 'confirmed' : 'deposit-paid',
    paymentRef: body.razorpay_payment_id || 'mock_' + Date.now().toString(36)
  });
  await logAudit('Payment received', `${booking.id} · ₹${paid.toLocaleString('en-IN')}`, 'system');
  return Response.json({ booking: updated });
}
