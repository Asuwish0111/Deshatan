import { listGuides, listDrivers } from '@/lib/repo';
export const dynamic = 'force-dynamic';
export async function GET() {
  const [guides, drivers] = await Promise.all([listGuides(), listDrivers()]);
  return Response.json({ guides, drivers });
}
