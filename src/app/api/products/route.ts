import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        stock: true,
      }
    });

    const parsedProducts = products.map(p => ({
      ...p,
      details: JSON.parse(p.details),
      images: JSON.parse(p.images)
    }));

    return NextResponse.json(parsedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
