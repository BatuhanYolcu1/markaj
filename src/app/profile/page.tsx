"use client";

import Link from 'next/link';

export default function Profile() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-16 lg:py-24 font-body min-h-[calc(100vh-80px)] flex items-center justify-center relative">
      
      {/* Decorative Text */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 -rotate-90 pointer-events-none opacity-[0.03]">
        <h1 className="font-headline font-black text-[15rem] uppercase whitespace-nowrap">MARKAJ</h1>
      </div>

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 bg-surface-container-low rounded-3xl overflow-hidden shadow-2xl relative border border-outline-variant/20 z-10">
        
        {/* Left Side: Imagery/Brand */}
        <div className="relative hidden md:block aspect-[4/5] bg-black">
          <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-70" alt="Urban style" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-12 flex flex-col justify-end">
            <span className="text-orange-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Sadece Üyeler</span>
            <h2 className="text-white font-headline font-black text-5xl tracking-tighter mb-4 uppercase leading-none">Sokağa<br/>Adım At.</h2>
            <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[280px]">Koleksiyonlardaki en yeni droplardan ilk senin haberin olsun. İndirimleri yakala, tarzını sokağa yansıt.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative bg-surface">
          <div className="text-left md:text-center mb-10">
            <h1 className="font-headline font-black text-3xl uppercase tracking-tighter text-on-surface mb-2">Giriş Yap</h1>
            <p className="text-secondary text-sm font-bold tracking-wide">MARKAJ dünyasına hoş geldin.</p>
          </div>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">E-Posta Adresi</label>
              <input 
                 type="email" 
                 placeholder="hello@markaj.com" 
                 className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Şifre</label>
              <input 
                 type="password" 
                 placeholder="••••••••" 
                 className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline" 
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-outline-variant/40 text-primary w-4 h-4 accent-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">Beni Hatırla</span>
              </label>
              <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors underline underline-offset-4">Şifremi Unuttum</button>
            </div>

            <button className="w-full py-5 bg-on-surface text-surface font-headline font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-orange-600 shadow-xl shadow-on-surface/10 transition-all flex items-center justify-center gap-3 mt-4">
              Giriş Yap
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-outline-variant/20 text-center">
            <p className="text-secondary text-[11px] font-bold uppercase tracking-widest">
              Sokağa yeni mi çıktın? <Link href="#" className="text-orange-600 hover:text-orange-700 underline underline-offset-4 ml-1">Hesap Oluştur</Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
