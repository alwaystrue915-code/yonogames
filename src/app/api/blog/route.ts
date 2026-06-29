import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const posts = await db.blog.find({ status: 'published', featured: undefined });
    return NextResponse.json(posts);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
