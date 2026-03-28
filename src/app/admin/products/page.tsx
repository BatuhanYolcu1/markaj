import Link from 'next/link';
import { deleteProduct } from '../actions';

import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { stock: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
         <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface">Ürün Yönetimi</h2>
         <Link href="/admin/products/new" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> Yeni Ekipman
         </Link>
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/30 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              <th className="p-6">Ürün</th>
              <th className="p-6">Kategori</th>
              <th className="p-6 text-center">Toplam Stok</th>
              <th className="p-6">Fiyat</th>
              <th className="p-6 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {products.map(product => {
               const images = JSON.parse(product.images);
               const totalStock = product.stock ? (product.stock.S + product.stock.M + product.stock.L + product.stock.XL + product.stock.XXL) : 0;
               return (
                 <tr key={product.id} className="hover:bg-surface-container/50 transition-colors group">
                   <td className="p-6">
                     <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/10">
                         <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <p className="font-headline font-black text-sm uppercase tracking-tight text-on-surface">{product.name}</p>
                         {product.isNew && <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest rounded-sm">Yeni Drop</span>}
                         {totalStock <= 2 && totalStock > 0 && <span className="inline-block mt-1 ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-600 text-[8px] font-bold uppercase tracking-widest rounded-sm">Kritik</span>}
                       </div>
                     </div>
                   </td>
                   <td className="p-6">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-surface px-2 py-1 rounded w-max border border-outline-variant/20">{product.category}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-outline w-max">{product.subCategory}</span>
                     </div>
                   </td>
                   <td className="p-6 text-center">
                     <span className={`text-xs font-black px-3 py-1 rounded-full ${totalStock > 10 ? 'bg-green-500/10 text-green-600' : totalStock > 0 ? 'bg-orange-500/10 text-orange-600' : 'bg-error/10 text-error'}`}>
                       {totalStock > 0 ? `${totalStock} Adet` : 'Tükendi'}
                     </span>
                   </td>
                   <td className="p-6">
                     <p className="font-headline font-black text-on-surface">{product.price.toLocaleString('tr-TR')} TL</p>
                   </td>
                   <td className="p-6 text-right">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-secondary hover:text-primary bg-surface rounded-lg transition-colors border border-outline-variant/20 shadow-sm">
                         <span className="material-symbols-outlined text-[18px] block">edit</span>
                       </Link>
                       <form action={async () => {
                         "use server";
                         await deleteProduct(product.id);
                       }}>
                         <button type="submit" className="p-2 text-secondary hover:text-error bg-surface rounded-lg transition-colors border border-outline-variant/20 shadow-sm cursor-pointer">
                           <span className="material-symbols-outlined text-[18px] block">delete</span>
                         </button>
                       </form>
                     </div>
                   </td>
                 </tr>
               )
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-sm font-bold text-secondary uppercase tracking-widest">Henüz ürün eklenmedi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
