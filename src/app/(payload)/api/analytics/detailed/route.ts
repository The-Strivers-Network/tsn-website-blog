import { NextRequest, NextResponse } from 'next/server';
import { getGAData } from '@/lib/ganalytics';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const period = searchParams.get('period') || '7d';
    const data = await getGAData(period);

    if (!data) {
      return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics detailed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
