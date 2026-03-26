import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const hasToken = !!process.env.TURSO_AUTH_TOKEN;
  const dbUrl = process.env.DATABASE_URL;
  
  const envInfo = {
    tursoUrl: tursoUrl ? `${tursoUrl.substring(0, 15)}...` : 'MISSING',
    hasToken,
    dbUrl: dbUrl ? `${dbUrl.substring(0, 15)}...` : 'MISSING',
    nodeEnv: process.env.NODE_ENV
  };

  try {
    // Try a simple query
    const productCount = await prisma.product.count();

    return NextResponse.json({
      status: 'success',
      environment: envInfo,
      productCount
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      environment: envInfo,
      message: error.message,
      name: error.name,
      stack: error.stack
    }, { status: 500 });
  }
}
