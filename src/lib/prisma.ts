import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (process.env.NODE_ENV === 'production' && !tursoUrl) {
    console.error('[Prisma] CRITICAL ERROR: TURSO_DATABASE_URL is not defined in production environments. Please add this variable to your Vercel project settings.');
    throw new Error("Missing 'TURSO_DATABASE_URL' environment variable in production! Please configure it in your Vercel Dashboard.");
  }

  if (tursoUrl) {
    console.log('[Prisma] Using Turso cloud database:', tursoUrl.substring(0, 40));
    try {
      const adapter = new PrismaLibSQL({
        url: tursoUrl,
        authToken: tursoToken, // Token could be undefined if only url is provided.
      });
      return new PrismaClient({ adapter });
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
