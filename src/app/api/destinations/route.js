import { listDestinations } from '@/lib/repo';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const data = await listDestinations({
    q: p.get('q') || '',
    region: p.get('region') || '',
    maxBudget: Number(p.get('maxBudget') || 0),
    sort: p.get('sort') || 'popular',
    includeHidden: p.get('flagshipOnly') !== '1',
    limit: Math.min(Number(p.get('limit') || 24), 120),
    offset: Number(p.get('offset') || 0)
  });
  return Response.json(data);
}
