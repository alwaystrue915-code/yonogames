import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const post = await db.blog.findBySlug((await params).slug);
    if (!post || post.status !== 'published') {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const body = await request.json();
    if (body.action === 'view') {
      await db.blog.incrementViews((await params).slug);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
