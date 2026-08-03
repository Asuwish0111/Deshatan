import { listStays } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  const p = new URL(req.url).searchParams;
  return Response.json({ stays: await listStays({ region: p.get('region') || '', limit: Number(p.get('limit') || 24) }) });
}
