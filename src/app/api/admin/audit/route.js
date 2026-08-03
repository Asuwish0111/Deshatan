import { readSession } from '@/lib/auth';
import { listAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET() {
  if (!(await readSession())) return Response.json({ error: 'Sign in to continue' }, { status: 401 });
  return Response.json({ entries: await listAudit() });
}
