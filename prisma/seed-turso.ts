/**
 * Turso uzak veritabanını seed'lemek için script.
 * 
 * Kullanım:
 *   set TURSO_DATABASE_URL=libsql://...
 *   set TURSO_AUTH_TOKEN=eyJ...
 *   npx tsx prisma/seed-turso.ts
 */

import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { products } from '../src/data/products';

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoToken) {
  console.error('❌ TURSO_DATABASE_URL ve TURSO_AUTH_TOKEN env değişkenleri gerekli!');
  console.error('   set TURSO_DATABASE_URL=libsql://...');
  console.error('   set TURSO_AUTH_TOKEN=eyJ...');
  process.exit(1);
}

const adapter = new PrismaLibSQL({ url: tursoUrl!, authToken: tursoToken });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('🚀 Turso veritabanı seed ediliyor...\n');

  // Promo code
  await prisma.promoCode.upsert({
    where: { code: 'STREET20' },
    update: {},
    create: {
      code: 'STREET20',
      discount: 0.20,
      isActive: true,
    },
  });
  console.log('✅ Promo kodu: STREET20');

  // Products
  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name }
    });

    if (!existing) {
      await prisma.product.create({
        data: {
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          fit: product.fit,
          price: product.price,
          originalPrice: product.originalPrice,
          description: product.description,
          details: JSON.stringify(product.details),
          images: JSON.stringify(product.images),
          isNew: product.isNew || false,
          stock: {
            create: {
              S: product.stock.S,
              M: product.stock.M,
              L: product.stock.L,
              XL: product.stock.XL,
              XXL: product.stock.XXL,
            }
          }
        }
      });
      console.log(`✅ Ürün eklendi: ${product.name}`);
    } else {
      console.log(`⏭️  Zaten mevcut: ${product.name}`);
    }
  }

  console.log('\n🎉 Turso veritabanı başarıyla seed edildi!');
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
