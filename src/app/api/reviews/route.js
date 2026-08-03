import { createReview, listReviews, getBooking, logAudit } from '@/lib/repo';
import { uid } from '@/lib/ids';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  return Response.json({ reviews: await listReviews({ status: p.get('status') || 'published' }) });
}

export async function POST(req) {
  const b = await req.json();
  if (!b.rating || b.rating < 1 || b.rating > 5) return Response.json({ error: 'Give a rating from 1 to 5' }, { status: 400 });
  if (!b.targetName) return Response.json({ error: 'Tell us who the review is for' }, { status: 400 });
  if (b.bookingId && !(await getBooking(b.bookingId))) return Response.json({ error: 'Booking not found' }, { status: 404 });

  const review = {
    id: uid('rv'), bookingId: b.bookingId || null,
    targetType: b.targetType || 'guide', targetId: b.targetId || null,
    targetName: b.targetName, rating: Number(b.rating), text: (b.text || '').slice(0, 1000),
    author: b.author || 'Traveller', status: 'pending'
  };
  await createReview(review);
  await logAudit('Review submitted', `${review.targetName} · ${review.rating}★`, 'guest');
  return Response.json({ review }, { status: 201 });
}
