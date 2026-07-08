import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const entry = await prisma.entry.findUnique({
    where: { id: Number(id) },
  });

  if (!entry) {
    return NextResponse.json({ message: '見つかりません。' }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const text = typeof body.text === 'string' ? body.text.trim() : '';

  if (!text) {
    return NextResponse.json(
      { message: '文章を入力してください。' },
      { status: 400 },
    );
  }

  try {
    const entry = await prisma.entry.update({
      where: { id: Number(id) },
      data: { text },
    });
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json({ message: '見つかりません。' }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const entry = await prisma.entry.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json({ message: '見つかりません。' }, { status: 404 });
  }
}
