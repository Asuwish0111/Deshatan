import { getStay, listReviews } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET(_req, { params }) {
  const { id } = await params;
  const stay = await getStay(id);
  if (!stay) return Response.json({ error: 'Stay not found' }, { status: 404 });
  const reviews = (await listReviews({ status: 'published' })).filter((r) => r.targetName === stay.name);
  return Response.json({ stay, reviews });
}
