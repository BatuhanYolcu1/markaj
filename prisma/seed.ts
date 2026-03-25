import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Markaj products...');

  // Create default promo code
  await prisma.promoCode.upsert({
    where: { code: 'STREET20' },
    update: {},
    create: {
      code: 'STREET20',
      discount: 0.20,
      isActive: true,
    },
  });

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
      console.log(`Created product: ${product.name}`);
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
