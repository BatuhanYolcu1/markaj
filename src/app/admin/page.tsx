import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();
  const promoCount = await prisma.promoCode.count();
  
  // Calculate critically low stock items
  const lowStockItems = await prisma.product.findMany({
    where: {
      stock: {
        OR: [
          { S: { lte: 2 } },
          { M: { lte: 2 } },
          { L: { lte: 2 } },
        ]
      }
    },
    take: 5,
    include: { stock: true }
  });

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-end mb-8">
         <h2 className="font-headline text-4xl font-black uppercase tracking-tighter text-on-surface">Sisteme Hoş Geldin.</h2>
         <Link href="/admin/products" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg">
            + Yeni Drop Ekle
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden group hover:border-orange-600 transition-colors cursor-pointer">
          <div className="absolute top-4 right-4 text-orange-600/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl">inventory_2</span>
          </div>
          <h3 className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Mağazada Aktif</h3>
          <p className="text-4xl font-headline font-black text-on-surface">{productCount} <span className="text-sm text-secondary font-medium tracking-widest uppercase">Parça</span></p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden group hover:border-primary transition-colors cursor-pointer">
          <div className="absolute top-4 right-4 text-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl">shopping_cart</span>
          </div>
          <h3 className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Bekleyen Sipariş</h3>
          <p className="text-4xl font-headline font-black text-on-surface">WhatsApp <span className="text-sm text-secondary font-medium tracking-widest uppercase">Aktif</span></p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden group hover:border-error transition-colors cursor-pointer">
          <div className="absolute top-4 right-4 text-error/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-6xl">loyalty</span>
          </div>
          <h3 className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Tanımlı Kuponlar</h3>
          <p className="text-4xl font-headline font-black text-on-surface">{promoCount} <span className="text-sm text-secondary font-medium tracking-widest uppercase">Kod</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-error">warning</span>
            <h2 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface">Kritik Stok Uyarısı (Son 2)</h2>
          </div>
          
          {lowStockItems.length === 0 ? (
            <div className="text-secondary text-sm font-medium py-4 text-center border border-dashed border-outline-variant/30 rounded-lg">Kritik seviyede ürün bulunmuyor.</div>
          ) : (
            <ul className="space-y-4">
              {lowStockItems.map(item => (
                <li key={item.id} className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-lg overflow-hidden shrink-0">
                      <img src={JSON.parse(item.images)[0]} className="w-full h-full object-cover" alt="Product" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{item.name}</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-orange-600 mt-1">Stoku Azalan Beden Var</p>
                    </div>
                  </div>
                  <Link href="/admin/products" className="text-[10px] font-bold uppercase text-primary hover:text-primary-container transition-colors underline underline-offset-4">Yönet</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">bolt</span>
            <h2 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface">Hızlı İşlemler</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <Link href="/admin/products" className="p-6 bg-surface-container rounded-xl text-center hover:bg-surface-container-high hover:scale-105 transition-all group">
                <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-orange-600 mb-2">add_circle</span>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface">Ürün Ekle</p>
             </Link>
             <Link href="/admin/promos" className="p-6 bg-surface-container rounded-xl text-center hover:bg-surface-container-high hover:scale-105 transition-all group">
                <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-primary mb-2">local_offer</span>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface">Kupon Üret</p>
             </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
