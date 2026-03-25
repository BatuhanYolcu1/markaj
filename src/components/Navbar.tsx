"use client";

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { cart, loaded: cartLoaded } = useCart();
  const { favorites, loaded: favsLoaded } = useFavorites();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const router = useRouter();

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  // Search logic
  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const filtered = products.filter((p: any) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        setSearchResults(filtered);
      } catch (e) {}
      setSearching(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navigateAndClose = (href: string) => {
    setMobileMenuOpen(false);
    setMobileSubMenu(null);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-low/95 backdrop-blur-2xl border-b border-outline-variant/30 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex items-center h-[80px] px-6 lg:px-12 relative">
        
        {/* Mobile Hamburger */}
        <button onClick={() => setMobileMenuOpen(true)} className="flex items-center lg:hidden mr-4 text-on-surface p-1">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Logo */}
        <Link href="/" className="font-headline font-black text-3xl tracking-tighter text-on-surface z-20 hover:opacity-80 transition-opacity">
          MARKAJ<span className="text-orange-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full ml-16 xl:ml-24 gap-10">
          
          <Link href="/catalog?cat=Yeni+Gelenler" className="h-full flex items-center font-bold text-sm text-secondary hover:text-orange-600 transition-colors uppercase tracking-[0.2em] relative group">
            Yeni Gelenler
            <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* ÜST GİYİM MEGA MENÜ */}
          <div className="group h-full flex items-center cursor-pointer">
            <Link href="/catalog?cat=Üst+Giyim" className="font-bold text-sm text-on-surface uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors flex items-center gap-1">
              Üst Giyim <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:-rotate-180">keyboard_arrow_down</span>
            </Link>
            <div className="absolute top-[80px] left-0 w-full bg-surface-container-low/95 backdrop-blur-3xl border-b border-outline-variant/20 shadow-2xl invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
              <div className="max-w-[1920px] mx-auto px-12 py-16 grid grid-cols-4 gap-12">
                <div className="space-y-8">
                  <h3 className="font-headline text-sm font-black uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/20 pb-4">Alt Kategoriler</h3>
                  <ul className="space-y-5">
                    <li><Link href="/catalog?cat=Üst+Giyim&sub=T-Shirt" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">T-Shirt</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&sub=Hoodie" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Hoodie</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&sub=Sweatshirt" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Sweatshirt</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&sub=Gömlek" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Gömlek</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&sub=Kazak" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Kazak & Triko</Link></li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h3 className="font-headline text-sm font-black uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/20 pb-4">Koleksiyon / Fit</h3>
                  <ul className="space-y-5">
                    <li><Link href="/catalog?cat=Üst+Giyim&fit=Oversize" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Oversize Seçimi</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&fit=Boxy" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Boxy Kesimler</Link></li>
                    <li><Link href="/catalog?cat=Üst+Giyim&fit=Relaxed" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Relaxed Rahatlık</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 flex gap-6">
                  <Link href="/catalog?cat=Üst+Giyim&sub=Hoodie" className="relative flex-1 rounded-2xl overflow-hidden group/img aspect-[16/7]">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" alt="Hoodie Banner" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Ağır Gramaj</span>
                      <span className="text-white font-headline font-black uppercase tracking-widest text-xl">Boxy Hoodies</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ALT GİYİM MEGA MENÜ */}
          <div className="group h-full flex items-center cursor-pointer">
            <Link href="/catalog?cat=Alt+Giyim" className="font-bold text-sm text-secondary uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors flex items-center gap-1">
              Alt Giyim <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:-rotate-180">keyboard_arrow_down</span>
            </Link>
            <div className="absolute top-[80px] left-0 w-full bg-surface-container-low/95 backdrop-blur-3xl border-b border-outline-variant/20 shadow-2xl invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
              <div className="max-w-[1920px] mx-auto px-12 py-16 grid grid-cols-4 gap-12">
                <div className="space-y-8">
                  <h3 className="font-headline text-sm font-black uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/20 pb-4">Alt Kategoriler</h3>
                  <ul className="space-y-5">
                    <li><Link href="/catalog?cat=Alt+Giyim&sub=Baggy+Jean" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Baggy Jean</Link></li>
                    <li><Link href="/catalog?cat=Alt+Giyim&sub=Kargo+Pantolon" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Kargo Pantolon</Link></li>
                    <li><Link href="/catalog?cat=Alt+Giyim&sub=Eşofman+Altı" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Eşofman Altı</Link></li>
                    <li><Link href="/catalog?cat=Alt+Giyim&sub=Şort" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Şort</Link></li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <h3 className="font-headline text-sm font-black uppercase tracking-[0.3em] text-on-surface border-b border-outline-variant/20 pb-4">Koleksiyon / Fit</h3>
                  <ul className="space-y-5">
                    <li><Link href="/catalog?cat=Alt+Giyim&fit=Baggy" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Baggy Fit</Link></li>
                    <li><Link href="/catalog?cat=Alt+Giyim&fit=Relaxed" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors block">Relaxed Joggers</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 flex gap-6">
                  <Link href="/catalog?cat=Alt+Giyim&fit=Baggy" className="relative flex-1 rounded-2xl overflow-hidden group/img aspect-[16/7]">
                    <img src="https://images.unsplash.com/photo-1620012253295-c15bc3a6f444?w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" alt="Baggy Bottoms" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <span className="text-white font-headline font-black uppercase tracking-widest text-xl">The Baggy Era</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/catalog?cat=Dış+Giyim" className="h-full flex items-center font-bold text-sm text-secondary hover:text-orange-600 transition-colors uppercase tracking-[0.2em] relative group">
            Dış Giyim
            <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/catalog?cat=İkili+Takım" className="h-full flex items-center font-bold text-sm text-secondary hover:text-orange-600 transition-colors uppercase tracking-[0.2em] relative group">
            İkili Takım
            <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/catalog?discount=true" className="h-full flex items-center font-black text-[11px] uppercase tracking-[0.25em] relative group">
            <span className="relative bg-gradient-to-r from-orange-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:scale-105 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
              İNDİRİM
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full"></span>
            </span>
          </Link>
        </nav>

        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-4 z-20" ref={searchRef}>
          {/* Search */}
          <div className="relative">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-on-surface hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-surface-container">
              <span className="material-symbols-outlined text-[28px] lg:text-[24px]">{searchOpen ? 'close' : 'search'}</span>
            </button>

            {searchOpen && (
              <div className="absolute top-14 right-0 w-[90vw] max-w-[420px] bg-surface-container-low/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50">
                <div className="p-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3">
                    <span className="material-symbols-outlined text-secondary text-xl">search</span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ürün, kategori veya stil ara..."
                      className="flex-1 bg-transparent text-sm font-bold outline-none text-on-surface placeholder:text-outline"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-outline hover:text-on-surface">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {searching && <p className="p-6 text-center text-xs font-bold uppercase tracking-widest text-secondary">Aranıyor...</p>}
                  {!searching && searchQuery.length >= 2 && searchResults.length === 0 && (
                    <p className="p-6 text-center text-xs font-bold uppercase tracking-widest text-secondary">Sonuç bulunamadı.</p>
                  )}
                  {searchResults.map((product: any) => {
                    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                        className="flex items-center gap-4 p-4 hover:bg-surface-container transition-colors border-b border-outline-variant/10 last:border-none"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0">
                          <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-headline font-black text-xs uppercase tracking-tight text-on-surface truncate">{product.name}</p>
                          <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">{product.category} — {product.subCategory}</p>
                        </div>
                        <p className="font-headline font-black text-sm text-primary shrink-0">{product.price.toLocaleString('tr-TR')} TL</p>
                      </Link>
                    );
                  })}
                </div>
                {searchQuery.length >= 2 && searchResults.length > 0 && (
                  <Link
                    href={`/catalog?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="block p-4 text-center text-xs font-bold uppercase tracking-widest text-orange-600 hover:bg-surface-container transition-colors border-t border-outline-variant/20"
                  >
                    Tüm sonuçları gör →
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <Link href="/profile" className="hidden sm:flex text-on-surface hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined text-[24px]">person</span>
          </Link>
          
          <Link href="/favorites" className="relative flex items-center text-on-surface hover:text-error transition-colors p-2 rounded-full hover:bg-surface-container group">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
            {favsLoaded && favorites.length > 0 && (
              <span className="absolute -top-1 -right-0 bg-error text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-surface">
                {favorites.length}
              </span>
            )}
          </Link>
          
          <Link href="/cart" className="relative flex items-center text-primary bg-primary/10 hover:bg-primary/20 p-3 lg:px-4 lg:py-3 rounded-full transition-colors group ml-2 gap-2">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="hidden lg:block text-xs font-black uppercase tracking-widest">Sepet</span>
            {cartLoaded && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse border-2 border-surface">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ==================== MOBILE MENU OVERLAY ==================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setMobileMenuOpen(false); setMobileSubMenu(null); }}></div>
          
          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-[85vw] max-w-[380px] bg-surface-container-low shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-8 border-b border-outline-variant/20 shrink-0">
              <span className="font-headline font-black text-2xl tracking-tighter">MARKAJ<span className="text-orange-600">.</span></span>
              <button onClick={() => { setMobileMenuOpen(false); setMobileSubMenu(null); }} className="p-2 text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-1">
                <li>
                  <button onClick={() => navigateAndClose('/catalog?cat=Yeni+Gelenler')} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                    Yeni Gelenler
                    <span className="material-symbols-outlined text-orange-600 text-sm">fiber_new</span>
                  </button>
                </li>

                {/* Üst Giyim */}
                <li>
                  <button onClick={() => setMobileSubMenu(mobileSubMenu === 'ust' ? null : 'ust')} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                    Üst Giyim
                    <span className={`material-symbols-outlined text-lg transition-transform ${mobileSubMenu === 'ust' ? '-rotate-180' : ''}`}>keyboard_arrow_down</span>
                  </button>
                  {mobileSubMenu === 'ust' && (
                    <ul className="ml-4 border-l-2 border-orange-600/20 pl-4 py-2 space-y-1">
                      {['T-Shirt', 'Hoodie', 'Sweatshirt', 'Gömlek', 'Kazak'].map(sub => (
                        <li key={sub}><button onClick={() => navigateAndClose(`/catalog?cat=Üst+Giyim&sub=${sub}`)} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors rounded-lg hover:bg-surface-container">{sub}</button></li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Alt Giyim */}
                <li>
                  <button onClick={() => setMobileSubMenu(mobileSubMenu === 'alt' ? null : 'alt')} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                    Alt Giyim
                    <span className={`material-symbols-outlined text-lg transition-transform ${mobileSubMenu === 'alt' ? '-rotate-180' : ''}`}>keyboard_arrow_down</span>
                  </button>
                  {mobileSubMenu === 'alt' && (
                    <ul className="ml-4 border-l-2 border-orange-600/20 pl-4 py-2 space-y-1">
                      {['Baggy Jean', 'Kargo Pantolon', 'Eşofman Altı', 'Şort'].map(sub => (
                        <li key={sub}><button onClick={() => navigateAndClose(`/catalog?cat=Alt+Giyim&sub=${sub}`)} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-orange-600 transition-colors rounded-lg hover:bg-surface-container">{sub}</button></li>
                      ))}
                    </ul>
                  )}
                </li>

                <li>
                  <button onClick={() => navigateAndClose('/catalog?cat=Dış+Giyim')} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                    Dış Giyim
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateAndClose('/catalog?cat=İkili+Takım')} className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                    İkili Takım
                  </button>
                </li>
              </ul>

              {/* İndirim CTA */}
              <button onClick={() => navigateAndClose('/catalog?discount=true')} className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg">
                <span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                İNDİRİMLİ ÜRÜNLER
              </button>
            </nav>

            {/* Bottom Links */}
            <div className="border-t border-outline-variant/20 p-6 space-y-3 shrink-0">
              <button onClick={() => navigateAndClose('/profile')} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-on-surface transition-colors rounded-xl hover:bg-surface-container">
                <span className="material-symbols-outlined text-xl">person</span> Hesabım
              </button>
              <button onClick={() => navigateAndClose('/favorites')} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-on-surface transition-colors rounded-xl hover:bg-surface-container">
                <span className="material-symbols-outlined text-xl">favorite</span> Favorilerim
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
