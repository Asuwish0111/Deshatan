import { checkCredentials, createSession } from '@/lib/auth';
import { logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const { email, password } = await req.json();
  if (!checkCredentials(email, password)) {
    return Response.json({ error: 'That email and password combination did not match.' }, { status: 401 });
  }
  await createSession(email);
  await logAudit('Admin signed in', email);
  return Response.json({ ok: true });
}
