import { readSession } from '@/lib/auth';
import { updateBooking, logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

const ALLOWED = ['pending', 'confirmed', 'deposit-paid', 'in-progress', 'completed', 'cancelled'];

export async function PATCH(req, { params }) {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json();
  if (!ALLOWED.includes(status)) return Response.json({ error: 'Unknown status' }, { status: 400 });
  const booking = await updateBooking(id, { status });
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 });
  await logAudit('Booking status changed', `${id} → ${status}`);
  return Response.json({ booking });
}
