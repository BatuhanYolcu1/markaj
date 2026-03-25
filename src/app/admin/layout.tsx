"use client";

import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-container font-body overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col">
        <div className="h-20 flex flex-shrink-0 items-center px-8 border-b border-outline-variant/20">
           <Link href="/admin" className="font-headline font-black text-2xl tracking-tighter text-on-surface flex items-center">
             MARKAJ<span className="text-orange-600">.</span> <span className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-2 bg-surface-container px-2 py-1 rounded">Admin</span>
           </Link>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
           <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-on-surface bg-surface-container shadow-sm hover:bg-surface-container-high transition-colors">
             <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
           </Link>
           <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
             <span className="material-symbols-outlined text-[20px]">inventory_2</span> Ürün Yönetimi
           </Link>
           <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
             <span className="material-symbols-outlined text-[20px]">shopping_cart</span> Siparişler
           </Link>
           <Link href="/admin/promos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
             <span className="material-symbols-outlined text-[20px]">loyalty</span> İndirim Kodları
           </Link>
        </nav>
        <div className="p-6 border-t border-outline-variant/20 space-y-2">
           <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-secondary hover:text-primary hover:bg-surface-container transition-colors uppercase tracking-widest">
             <span className="material-symbols-outlined text-[20px]">storefront</span> Mağazaya Dön
           </Link>
           <form action="/api/admin/logout" method="POST">
             <button type="submit" onClick={async (e) => { e.preventDefault(); await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/'; }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-secondary hover:text-error hover:bg-error/10 transition-colors uppercase tracking-widest w-full">
               <span className="material-symbols-outlined text-[20px]">logout</span> Çıkış Yap
             </button>
           </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between px-8 z-10 flex-shrink-0">
           <h1 className="font-headline text-xl font-black uppercase tracking-widest text-on-surface">Yönetim Paneli</h1>
           <div className="flex items-center gap-4">
             <button className="relative p-2 text-secondary hover:text-primary transition-colors">
               <span className="material-symbols-outlined">notifications</span>
               <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
             </button>
             <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-md">
               MA
             </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
           {children}
        </main>
      </div>
    </div>
  );
}
