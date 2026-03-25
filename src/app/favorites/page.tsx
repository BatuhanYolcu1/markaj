"use client";

import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { useState, useEffect } from 'react';

export default function Favorites() {
  const { favorites, loaded: favsLoaded, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (!favsLoaded || loading) return <div className="min-h-screen flex items-center justify-center text-xl font-headline font-black uppercase text-secondary tracking-widest">Yükleniyor...</div>;

  return (
    <main className="max-w-[1920px] mx-auto px-8 lg:px-12 py-16 font-body min-h-screen">
      <div className="mb-16">
        <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface uppercase block">Favorilerim</h1>
        <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-4">{favorites.length} Ürün Bulunuyor</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-32 text-center text-secondary border border-dashed border-outline-variant/30 rounded-xl relative overflow-hidden">
          <span className="material-symbols-outlined text-6xl mb-4 text-outline z-10 relative">favorite_border</span>
          <h2 className="font-headline font-black text-2xl uppercase tracking-tighter text-on-surface mb-2 relative z-10">Henüz favori ürününüz yok</h2>
          <p className="text-sm font-medium relative z-10">Beğendiğiniz parçaları kalp ikonuna tıklayarak buraya ekleyebilir, daha sonra hızlıca sipariş verebilirsiniz.</p>
          <Link href="/catalog" className="inline-block mt-8 px-8 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest rounded-lg hover:bg-on-surface transition-colors shadow-xl relative z-10">
            Sokağı Keşfet
          </Link>
          <span className="material-symbols-outlined text-[30rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">favorite</span>
        </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {favoriteProducts.map(product => (
            <div key={product.id} className="group cursor-pointer flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-surface-container rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={product.images[0]} alt={product.name} />
                
                <button 
                   onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                   className="absolute top-4 right-4 z-20 text-error bg-surface/80 backdrop-blur-md p-2 rounded-full hover:bg-error hover:text-white transition-all shadow-lg hover:scale-110"
                >
                  <span className="material-symbols-outlined block leading-none" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                </button>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
                
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <Link href={`/product/${product.id}`} className="block w-full bg-white/95 backdrop-blur-md text-primary text-center py-4 rounded-lg text-xs font-black uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-colors">
                    Ürünü İncele
                  </Link>
                </div>
              </div>
              <div className="space-y-1 text-left flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <Link href={`/product/${product.id}`} className="font-headline font-black text-on-surface uppercase text-base tracking-tight hover:text-orange-600 transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-secondary font-bold tracking-[0.2em] uppercase bg-surface-container-low px-2 py-1 rounded">{product.fit}</span>
                  <span className="text-[10px] text-outline font-bold tracking-[0.2em] uppercase">{product.subCategory}</span>
                </div>
                <div className="flex items-center gap-3 mt-auto pt-4">
                  <p className="text-xl font-headline font-black text-primary">{product.price.toLocaleString('tr-TR')} TL</p>
                  {product.originalPrice && <p className="text-sm font-bold text-outline line-through">{product.originalPrice.toLocaleString('tr-TR')} TL</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
