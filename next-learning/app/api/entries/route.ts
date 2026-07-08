import { prisma } from '@/lib/prisma';
import { findEntriesByText } from '@/lib/search';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? '';

  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(findEntriesByText(entries, q));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const text = typeof body.text === 'string' ? body.text.trim() : '';

  if (!text) {
    return NextResponse.json(
      { message: '文章を入力してください。' },
      { status: 400 },
    );
  }

  const entry = await prisma.entry.create({
    data: { text },
  });

  return NextResponse.json(entry, { status: 201 });
}
