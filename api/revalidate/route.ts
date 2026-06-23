import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const tag = request.nextUrl.searchParams.get('tag');

    if (tag) {
      // Use 'max' profile → stale-while-revalidate (recommended)
      revalidateTag(tag, 'max');
      console.log(`✅ Revalidated tag: ${tag}`);
    } else {
      // Optional: revalidate everything
      // revalidatePath('/', 'layout');
    }

    return NextResponse.json({ 
      revalidated: true, 
      tag: tag || 'all',
      now: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ 
      revalidated: false, 
      error: 'Failed to revalidate' 
    }, { status: 500 });
  }
}