"use client";

import Link from 'next/link';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';

export type ProductType = {
  id: number; name: string; category: string; subCategory: string;
  fit: string; price: number; originalPrice?: number;
  description: string; details: string[]; images: string[];
  isNew: boolean; stock: Record<string, number>;
};

function CatalogContent() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toggleFavorite, isFavorite } = useFavorites();
  const searchParams = useSearchParams();

  // URL parametreleri değiştiğinde state'i güncelle
  useEffect(() => {
    const cat = searchParams.get('cat');
    const sub = searchParams.get('sub');
    const fit = searchParams.get('fit');
    
    setSelectedCategory(cat || null);
    setSelectedSubCategory(sub || null);
    setSelectedFits(fit ? [fit] : []);
    setSelectedSizes([]); 
  }, [searchParams]);

  const toggleSize = (size: string) => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  const toggleFit = (fit: string) => setSelectedFits(prev => prev.includes(fit) ? prev.filter(f => f !== fit) : [...prev, fit]);

  const categories = [
    { name: 'Üst Giyim', icon: 'apparel' },
    { name: 'Alt Giyim', icon: 'dry_cleaning' },
    { name: 'Dış Giyim', icon: 'checkroom' },
    { name: 'İkili Takım', icon: 'accessibility_new' }
  ];

  const subcategoriesMap: Record<string, string[]> = {
    'Üst Giyim': ['T-Shirt', 'Hoodie', 'Sweatshirt', 'Gömlek', 'Kazak'],
    'Alt Giyim': ['Baggy Jean', 'Kargo Pantolon', 'Eşofman Altı', 'Şort'],
    'Dış Giyim': ['Ceket', 'Rüzgarlık', 'Kaban']
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Oversize', 'Baggy', 'Boxy', 'Relaxed'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Mega Menü'den "Yeni Gelenler" gelirse
      if (selectedCategory === 'Yeni Gelenler' && !p.isNew) return false;
      
      // Standart Ana Kategori
      if (selectedCategory && selectedCategory !== 'Yeni Gelenler' && p.category !== selectedCategory) return false;
      
      // Alt Kategori
      if (selectedSubCategory && p.subCategory !== selectedSubCategory) return false;

      // Fit 
      if (selectedFits.length > 0 && !selectedFits.includes(p.fit)) return false;
      
      // Beden Stok
      if (selectedSizes.length > 0) {
        const hasStock = selectedSizes.some(s => p.stock[s as keyof typeof p.stock] > 0);
        if (!hasStock) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSubCategory, selectedSizes, selectedFits, products]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-headline font-black text-2xl uppercase text-secondary tracking-widest w-full">Yükleniyor...</div>;

  return (
    <main className="max-w-[1920px] mx-auto flex min-h-screen w-full relative">
      {/* Side Filter Panel */}
      <aside className="hidden lg:flex flex-col w-72 p-8 gap-8 bg-surface-container border-r border-outline-variant/10 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
        <div className="pt-8">
          <div className="flex justify-between items-end mb-8">
             <h2 className="font-headline font-black text-2xl tracking-tighter text-on-surface uppercase">Filtrele</h2>
             {(selectedCategory || selectedSubCategory || selectedSizes.length > 0 || selectedFits.length > 0) && (
               <button onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); setSelectedSizes([]); setSelectedFits([]); window.history.pushState({}, '', '/catalog'); }} className="text-[10px] font-bold uppercase tracking-widest text-error underline underline-offset-4">Temizle</button>
             )}
          </div>

          {/* Kategoriler */}
          <div className="mb-10 border-b border-outline-variant/20 pb-8">
            <h3 className="font-headline uppercase text-[0.7rem] tracking-[0.2em] font-bold text-secondary mb-4">Ana Kategoriler</h3>
            <nav className="flex flex-col gap-4">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.name;
                return (
                  <button
                     key={cat.name}
                     onClick={() => {
                        setSelectedCategory(isActive ? null : cat.name);
                        if (!isActive) setSelectedSubCategory(null); // Reset sub auf yeni kategori
                     }}
                     className={`flex items-center gap-3 text-sm transition-all duration-300 group ${isActive ? 'text-orange-600 font-bold' : 'text-outline hover:text-on-surface'}`}
                  >
                    <span className={`material-symbols-outlined text-lg transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{cat.icon}</span>
                    <span className="uppercase tracking-widest text-xs">{cat.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Alt Kategoriler (Pills) */}
          {selectedCategory && subcategoriesMap[selectedCategory] && (
            <div className="mb-10 border-b border-outline-variant/20 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 className="font-headline uppercase text-[0.7rem] tracking-[0.2em] font-bold text-primary mb-4">Alt Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                {subcategoriesMap[selectedCategory].map(sub => {
                  const isActive = selectedSubCategory === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(isActive ? null : sub)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all ${isActive ? 'border-primary bg-primary text-white shadow-md' : 'border-outline-variant/50 text-secondary hover:border-primary'}`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kalıp / Fit */}
          <div className="mb-10 border-b border-outline-variant/20 pb-8">
            <h3 className="font-headline uppercase text-[0.7rem] tracking-[0.2em] font-bold text-secondary mb-4">Kalıp / Fit</h3>
            <div className="flex flex-col gap-4">
              {fits.map(fit => (
                <label key={fit} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFits.includes(fit)}
                    onChange={() => toggleFit(fit)}
                    className="rounded border-outline-variant/40 text-primary w-5 h-5 accent-primary" 
                  />
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${selectedFits.includes(fit) ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}>{fit}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Beden */}
          <div className="mb-10">
            <h3 className="font-headline uppercase text-[0.7rem] tracking-[0.2em] font-bold text-secondary mb-4">Stokta Olan Beden</h3>
            <div className="grid grid-cols-3 gap-2">
               {sizes.map(size => {
                 const isActive = selectedSizes.includes(size);
                 return (
                   <button 
                     key={size}
                     onClick={() => toggleSize(size)}
                     className={`py-3 text-xs border transition-colors rounded uppercase font-bold ${isActive ? 'border-primary bg-primary text-on-primary shadow-md shadow-primary/20' : 'border-outline-variant/30 hover:border-primary bg-background text-secondary'}`}
                   >
                     {size}
                   </button>
                 )
               })}
            </div>
          </div>

        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-1 p-8 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative">
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-orange-600 font-black">
              {selectedCategory === 'Yeni Gelenler' ? 'Son Eklenenler' : 'Koleksiyon'}
            </span>
            <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface mt-2 uppercase">
              {selectedCategory || 'Tüm Ürünler'} {selectedSubCategory && <span className="text-secondary font-medium">/ {selectedSubCategory}</span>}
            </h1>
            <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-4">{filteredProducts.length} Ürün Bulundu</p>
          </div>
          <div className="relative">
            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase border-b border-outline-variant/30 pb-2 min-w-[200px] justify-between cursor-pointer text-secondary hover:text-primary transition-colors">
              <span>Sırala: Önerilenler</span>
              <span className={`material-symbols-outlined !text-lg transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isSortOpen && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline-variant/30 rounded-lg shadow-2xl z-20 flex flex-col p-2">
                 <button onClick={() => setIsSortOpen(false)} className="text-left text-xs font-bold text-primary p-3 bg-surface rounded">Önerilenler</button>
                 <button onClick={() => setIsSortOpen(false)} className="text-left text-xs font-bold text-secondary hover:text-primary hover:bg-surface p-3 rounded transition-colors">Fiyat: Artan</button>
                 <button onClick={() => setIsSortOpen(false)} className="text-left text-xs font-bold text-secondary hover:text-primary hover:bg-surface p-3 rounded transition-colors">Fiyat: Azalan</button>
                 <button onClick={() => setIsSortOpen(false)} className="text-left text-xs font-bold text-secondary hover:text-primary hover:bg-surface p-3 rounded transition-colors">En Yeniler</button>
               </div>
            )}
          </div>
        </div>

        {/* DYNAMIC GRID CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer flex flex-col h-full">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-surface-container rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={product.images[0]} alt={product.name} />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] uppercase tracking-widest px-3 py-1 font-bold rounded-sm z-10 shadow-lg">YENİ DROP</div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold rounded-sm z-10 shadow-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
                
                {/* Overlay Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <Link href={`/product/${product.id}`} className="block w-full bg-white/95 backdrop-blur-md text-primary text-center py-4 rounded-lg text-xs font-black uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-colors">
                    Hemen İncele
                  </Link>
                </div>
              </div>
              <div className="space-y-1 text-center md:text-left flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <Link href={`/product/${product.id}`} className="font-headline font-black text-on-surface uppercase text-base tracking-tight hover:text-orange-600 transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} 
                    className={`material-symbols-outlined transition-colors focus:outline-none hover:scale-110 ${isFavorite(product.id) ? 'text-error hover:text-error/80' : 'text-outline hover:text-error'}`} 
                    style={isFavorite(product.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-secondary font-bold tracking-[0.2em] uppercase bg-surface-container-low px-2 py-1 rounded">{product.fit}</span>
                  <span className="text-[10px] text-outline font-bold tracking-[0.2em] uppercase">{product.subCategory}</span>
                </div>
                <div className="flex items-center gap-3 mt-auto pt-4 justify-center md:justify-start">
                  <p className="text-xl font-headline font-black text-primary">{product.price.toLocaleString('tr-TR')} TL</p>
                  {product.originalPrice && <p className="text-sm font-bold text-outline line-through">{product.originalPrice.toLocaleString('tr-TR')} TL</p>}
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
              <h2 className="font-headline font-black text-2xl uppercase tracking-tighter text-on-surface">Sonuç Bulunamadı</h2>
              <p className="text-secondary mt-2">Bu filtre kombinasyonuna uyan stoklu ürün bulunmuyor.</p>
              <button 
                onClick={() => { 
                   setSelectedCategory(null); setSelectedSubCategory(null); setSelectedSizes([]); setSelectedFits([]); 
                   window.history.pushState({}, '', '/catalog');
                }} 
                className="mt-8 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Filtreleri Temizle & Tümünü Gör
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-headline font-black text-2xl uppercase tracking-tighter text-on-surface">Yükleniyor...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
