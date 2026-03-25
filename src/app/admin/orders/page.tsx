import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex justify-between items-end mb-8">
         <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface">Sipariş Yönetimi</h2>
      </div>

      <div className="bg-surface-container-low p-12 lg:p-24 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6 text-center">
        <span className="material-symbols-outlined text-[8rem] text-[#25D366] opacity-20 block mb-6">mark_chat_unread</span>
        <h3 className="font-headline text-2xl font-black uppercase tracking-widest text-on-surface">WhatsApp Optimizasyonu Aktif</h3>
        <p className="text-secondary text-base font-medium max-w-xl mx-auto leading-relaxed">
          Mevcut yapılandırmanızda müşterilerinizin siparişleri, sepette oluşturduğumuz otomasyon şablonu sayesinde <strong>doğrudan WhatsApp hattınıza</strong> düşmektedir. 
          <br /><br />
          Sipariş alımı ve kargo iletişimlerini bu aşamada sistem dışından birebir müşterinizle yürütmeniz gerekiyor. Gelecek fazlarda Kredi Kartı entegrasyonu tamamlandığında, sipariş akışları komple bu dijital ekrana entegre edilecektir.
        </p>
      </div>
    </div>
  )
}
