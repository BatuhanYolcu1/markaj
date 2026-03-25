import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        stock: true,
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const parsedProduct = {
      ...product,
      details: JSON.parse(product.details),
      images: JSON.parse(product.images)
    };

    return NextResponse.json(parsedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
