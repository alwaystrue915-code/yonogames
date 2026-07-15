import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { appInputSchema } from '@/lib/security';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const status = searchParams.get('status');

  const filter: any = {};
  if (category) filter.category = category;
  if (featured !== null) filter.featured = featured === 'true';
  if (status) filter.status = status;

  try {
    const list = await db.apps.find(filter);
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const deletedCount = await db.apps.deleteAll();
    return NextResponse.json({ message: `Deleted ${deletedCount} apps.`, deletedCount });
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const parsed = appInputSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid app data.', issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const created = await db.apps.create(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
