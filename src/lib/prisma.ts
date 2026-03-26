import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl) {
    console.log('[Prisma] Using Turso cloud database:', tursoUrl.substring(0, 40));
    try {
      const adapter = new PrismaLibSQL({
        url: tursoUrl,
        authToken: tursoToken,
      });
      // Vercel serverless environment bypass
      return new PrismaClient({ 
        adapter,
        datasourceUrl: "file::memory:?cache=shared" 
      } as any);
    } catch (e) {
      console.error('[Prisma] Error creating Turso adapter:', e);
    }
  }

  console.log('[Prisma] Using local SQLite database');
  return new PrismaClient();
}

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
