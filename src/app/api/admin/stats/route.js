import { readSession } from '@/lib/auth';
import { listBookings, listReviews, listApplications, listGuides, listDrivers } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const [bookings, reviews, applications, guides, drivers] = await Promise.all([
    listBookings({}), listReviews({}), listApplications(), listGuides(), listDrivers()
  ]);
  const revenue = bookings.reduce((s, b) => s + (b.paid || 0), 0);
  return Response.json({
    stats: {
      bookings: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      revenue,
      pendingReviews: reviews.filter((r) => r.status === 'pending').length,
      pendingApplications: applications.filter((a) => a.status === 'pending').length,
      partners: guides.length + drivers.length
    },
    recent: bookings.slice(0, 8)
  });
}
