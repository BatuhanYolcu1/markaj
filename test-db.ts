import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const products = await prisma.product.findMany();
    console.log("Success! Found products:", products.length);
  } catch (e) {
    console.error("Prisma error:", e);
  }
}

main();
