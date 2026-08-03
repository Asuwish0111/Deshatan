import { readSession } from '@/lib/auth';
import { setApplicationStatus, logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function PATCH(req, { params }) {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json();
  if (!['approved', 'rejected', 'pending'].includes(status)) return Response.json({ error: 'Unknown status' }, { status: 400 });
  const application = await setApplicationStatus(id, status);
  if (!application) return Response.json({ error: 'Application not found' }, { status: 404 });
  await logAudit(status === 'approved' ? 'Approved application' : 'Application ' + status, `${application.name} (${application.kind}, ${application.city})`);
  return Response.json({ application });
}
