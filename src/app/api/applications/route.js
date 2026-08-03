import { createApplication, logAudit } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const b = await req.json();
  if (!b.name?.trim() || !b.city?.trim()) return Response.json({ error: 'Name and city are required' }, { status: 400 });
  const app = {
    id: 'AP-' + Math.floor(1000 + Math.random() * 8999),
    name: b.name.trim(), kind: b.kind === 'Driver' ? 'Driver' : 'Guide', city: b.city.trim(),
    submitted: new Date().toISOString().slice(0, 10),
    docs: b.docs || 'Pending document upload', note: b.note || '', status: 'pending'
  };
  await createApplication(app);
  await logAudit('Partner application received', `${app.name} (${app.kind}, ${app.city})`, 'system');
  return Response.json({ application: app }, { status: 201 });
}
