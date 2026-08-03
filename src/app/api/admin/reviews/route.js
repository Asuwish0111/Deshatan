import { readSession } from '@/lib/auth';
import { listReviews } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const status = new URL(req.url).searchParams.get('status') || '';
  return Response.json({ reviews: await listReviews({ status }) });
}
