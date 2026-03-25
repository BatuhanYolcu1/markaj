import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container w-full py-16 px-8 mt-20 border-t border-outline-variant/20 font-body text-sm leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="col-span-1 border-r border-outline-variant/20 pr-8">
          <h2 className="text-xl font-black text-on-background mb-6 tracking-tighter uppercase font-headline">MARKAJ</h2>
          <p className="text-secondary mb-8">
            Sokak modasının kuralsız mimarisi. Oversize fitler, özgür stiller. Kendi tarzını Markaj ile yarat.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-orange-500 transition-colors">share</span>
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-orange-500 transition-colors">public</span>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-on-surface uppercase tracking-widest text-xs">Müşteri İlişkileri</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Hakkımızda</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Mağazalar</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Bize Ulaşın</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-on-surface uppercase tracking-widest text-xs">Kurumsal</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Kariyer</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Sürdürülebilirlik</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">KVKK</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-on-surface uppercase tracking-widest text-xs">Alışveriş</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Teslimat & İade</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Beden Rehberi</Link></li>
            <li><Link href="/" className="text-secondary hover:text-orange-500 transition-colors hover:underline decoration-orange-500 underline-offset-4">Sipariş Takibi</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-secondary text-xs">© 2024 MARKAJ. Streetwear Edition.</p>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-outline text-xl">payments</span>
          <span className="material-symbols-outlined text-outline text-xl">shield_locked</span>
          <span className="material-symbols-outlined text-outline text-xl">verified</span>
        </div>
      </div>
    </footer>
  );
}
