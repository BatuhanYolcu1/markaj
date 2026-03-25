import { PrismaClient } from '@prisma/client';
import EditProductClient from './EditProductClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function EditProductPage(props: any) {
  const resolvedParams = await Promise.resolve(props.params);
  const productId = parseInt(resolvedParams.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { stock: true }
  });

  if (!product) {
    return <div className="text-center py-32 font-headline text-4xl font-black uppercase tracking-tighter">Ürün Bulunamadı</div>;
  }

  return <EditProductClient product={product} />;
}
