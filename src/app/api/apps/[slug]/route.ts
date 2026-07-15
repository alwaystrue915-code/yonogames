import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { appInputSchema, slugSchema } from '@/lib/security';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const item = await db.apps.findOne({ slug });
    if (!item) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }
    // Record visual view count asynchronously
    db.analytics.recordView(slug).catch(err => console.error('Error tracking view:', err));
    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const slugResult = slugSchema.safeParse((await params).slug);
    const parsed = appInputSchema.safeParse(await request.json());
    if (!slugResult.success || !parsed.success) {
      return NextResponse.json({ message: 'Invalid app data.' }, { status: 400 });
    }
    const updated = await db.apps.update(slugResult.data, parsed.data);
    if (!updated) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const { slug } = await params;
    const deleted = await db.apps.delete(slug);
    if (!deleted) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Application deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
