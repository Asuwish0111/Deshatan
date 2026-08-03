import { listRegions } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET() { return Response.json({ regions: await listRegions() }); }
