import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 401 });
    }
    return NextResponse.json({ valid: true });
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
