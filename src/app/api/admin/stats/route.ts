import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { getGa4Analytics, getGa4Realtime } from '@/lib/ga4';

export async function GET(request: Request) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || undefined;
    const gaData = await getGa4Analytics(range);
    if (gaData) {
      const realtime = await getGa4Realtime();
      gaData.realtimeUsers = realtime.activeUsers;
      return NextResponse.json(gaData);
    }

    return NextResponse.json(null);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
