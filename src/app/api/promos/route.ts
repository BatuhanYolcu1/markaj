import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const promos = await prisma.promoCode.findMany({
      where: { isActive: true }
    });
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 });
  }
}
