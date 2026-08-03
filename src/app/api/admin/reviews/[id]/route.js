import { readSession } from '@/lib/auth';
import { setReviewStatus, logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function PATCH(req, { params }) {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json();
  if (!['published', 'hidden', 'pending'].includes(status)) return Response.json({ error: 'Unknown status' }, { status: 400 });
  await setReviewStatus(id, status);
  await logAudit('Review ' + status, id);
  return Response.json({ ok: true });
}
