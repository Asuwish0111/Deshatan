import { readSession } from '@/lib/auth';
import { listGuides, listDrivers, listReviews } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const [guides, drivers, reviews] = await Promise.all([listGuides(), listDrivers(), listReviews({})]);
  const count = (name) => reviews.filter((r) => r.targetName === name).length;
  return Response.json({
    guides: guides.map((g) => ({ ...g, newReviews: count(g.name) })),
    drivers: drivers.map((d) => ({ ...d, newReviews: count(d.name) }))
  });
}
