import { createPromo, deletePromo } from '../actions';

import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function AdminPromosPage() {
  const promos = await prisma.promoCode.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex justify-between items-end mb-8">
         <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface">Promosyon Yönetimi</h2>
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 bg-surface-container/50">
          <form action={createPromo} className="flex items-end gap-4">
            <div className="space-y-2 flex-1">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Kupon Kodu</label>
              <input required name="code" type="text" placeholder="Örn: YAZGELDI20" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold uppercase focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2 w-48">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">İndirim Oranı (%)</label>
              <input required name="discount" type="number" placeholder="20" min="1" max="100" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <button type="submit" className="bg-primary text-on-primary h-[46px] px-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-orange-600 transition-colors">
              Oluştur
            </button>
          </form>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/30 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              <th className="p-6">Kupon Kodu</th>
              <th className="p-6">İndirim Oranı</th>
              <th className="p-6">Durum</th>
              <th className="p-6 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {promos.map(promo => (
               <tr key={promo.id} className="hover:bg-surface-container/50 transition-colors group">
                 <td className="p-6">
                   <span className="font-headline font-black text-sm uppercase tracking-widest text-on-surface bg-surface border border-outline-variant/20 px-3 py-1.5 rounded-lg">{promo.code}</span>
                 </td>
                 <td className="p-6">
                   <p className="font-headline font-black text-orange-600">% {promo.discount * 100}</p>
                 </td>
                 <td className="p-6">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded w-max">Aktif</span>
                 </td>
                 <td className="p-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <form action={async () => {
                       "use server";
                       await deletePromo(promo.id);
                     }}>
                       <button type="submit" className="p-2 text-secondary hover:text-error bg-surface rounded-lg transition-colors border border-outline-variant/20 shadow-sm cursor-pointer">
                         <span className="material-symbols-outlined text-[18px] block">delete</span>
                       </button>
                     </form>
                   </div>
                 </td>
               </tr>
            ))}
            {promos.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-sm font-bold text-secondary uppercase tracking-widest">Henüz kupon oluşturulmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
        <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[#25D366]">chat</span> WhatsApp Optimizasyonu Aktif</h3>
        <p className="text-secondary text-sm font-medium">Bütün ödeme akışları şu an WhatsApp üzerinden manuel olarak sağlanmaktadır. Müşterileriniz sepetin fotoğrafını değil, doğrudan okunaklı bir sipariş şablonu (Kupon indirimi uygulanmış) iletir.</p>
      </div>

    </div>
  )
}
