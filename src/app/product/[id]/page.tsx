"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

export default function ProductDetail() {
  const params = useParams();
  const productId = Number(params?.id);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`).then(res => res.json()).then(data => {
        if (!data.error) setProduct(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [productId]);

  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product && !selectedSize) {
      const firstAvailable = Object.keys(product.stock).find(s => product.stock[s as keyof typeof product.stock] > 0);
      if (firstAvailable) setSelectedSize(firstAvailable);
    }
  }, [product, selectedSize]);

  if (loading) return <div className="text-center py-48 font-headline text-lg font-black uppercase tracking-widest text-secondary">Yükleniyor...</div>;
  if (!product) return <div className="text-center py-48 font-headline text-4xl font-black uppercase tracking-tighter">Ürün Bulunamadı</div>;

  const handleAddToCart = () => {
    if (!selectedSize || product.stock[selectedSize as keyof typeof product.stock] === 0) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      collection: product.category,
      size: selectedSize,
      color: "Resimdeki Renk",
      price: product.price,
      image: product.images[0],
      stock: product.stock[selectedSize as keyof typeof product.stock]
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasStock = selectedSize ? product.stock[selectedSize as keyof typeof product.stock] > 0 : false;
  
  // Calculate how many are in cart already
  const inCartId = `${product.id}-${selectedSize}`;
  const inCartAmount = cart.find(c => c.id === inCartId)?.quantity || 0;
  const remainingStock = selectedSize ? product.stock[selectedSize as keyof typeof product.stock] - inCartAmount : 0;
  const canAddMore = remainingStock > 0;

  return (
    <main className="max-w-[1920px] mx-auto px-8 pt-12 pb-24 font-body relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Visuals */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
           {product.images.map((img: string, idx: number) => (
             <div key={idx} className={`overflow-hidden bg-surface-container rounded-xl ${idx === 0 ? 'md:col-span-2' : ''} ${idx === 0 ? 'h-[700px]' : 'h-[500px]'} md:h-auto`}>
               <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src={img} alt={`${product.name} Görsel ${idx+1}`} />
             </div>
           ))}
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32 self-start">
          <div>
            <Link href="/catalog" className="text-[0.7rem] uppercase tracking-[0.3em] font-black text-orange-600 hover:text-orange-700 mb-2 block transition-colors w-max">{product.category}</Link>
            <h1 className="text-4xl font-headline font-black text-on-surface tracking-tighter leading-none mb-4 uppercase">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-headline font-black text-primary">{product.price.toLocaleString('tr-TR')} TL</span>
              {product.originalPrice && <span className="text-sm font-bold text-outline line-through">{product.originalPrice.toLocaleString('tr-TR')} TL</span>}
            </div>
            <p className="mt-6 text-sm text-secondary leading-relaxed font-medium">{product.description}</p>
          </div>

          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="font-headline text-sm font-black uppercase tracking-widest mb-4">Detaylar & Kesim</h3>
            <ul className="space-y-4">
              {product.details.map((detail: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-xl">check_box</span>
                  <p className="text-sm font-bold uppercase tracking-tight">{detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-headline text-sm font-black uppercase tracking-widest">Beden</h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {Object.entries(product.stock).map(([size, quantity]) => {
                const isActive = size === selectedSize;
                const isOutOfStock = quantity === 0;
                return (
                  <button 
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-sm font-bold rounded-lg uppercase transition-all ${isOutOfStock ? 'opacity-30 cursor-not-allowed border border-dashed border-outline-variant' : isActive ? 'border-2 border-primary bg-primary text-white shadow-md shadow-primary/20 font-black' : 'border border-outline-variant/30 hover:border-primary bg-surface text-secondary'}`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
            {selectedSize && product.stock[selectedSize as keyof typeof product.stock] <= 3 && product.stock[selectedSize as keyof typeof product.stock] > 0 && (
              <p className="text-[10px] font-bold text-orange-600 mt-2 uppercase tracking-wider">Sınırlı Stok: Son {product.stock[selectedSize as keyof typeof product.stock]} ürün, acele et!</p>
            )}
            {selectedSize && product.stock[selectedSize as keyof typeof product.stock] === 0 && (
              <p className="text-[10px] font-bold text-error mt-2 uppercase tracking-wider">Tükendi.</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={!hasStock || !canAddMore || isAdded}
              className={`w-full py-5 font-headline font-black text-sm tracking-widest uppercase rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:cursor-not-allowed ${!hasStock || !canAddMore ? 'bg-outline-variant/30 text-secondary shadow-none border border-outline-variant/50' : isAdded ? 'bg-green-600 text-white shadow-green-900/10' : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/10'}`}
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>{isAdded ? 'check_circle' : (hasStock ? (canAddMore ? 'shopping_bag' : 'remove_shopping_cart') : 'remove_shopping_cart')}</span>
              {isAdded ? 'SEPETE EKLENDİ' : (hasStock ? (canAddMore ? 'SEPETE EKLE' : 'STOK TÜKENDİ (MAKS SİPARİŞ)') : 'STOKTA YOK')}
            </button>
            <button
               onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
               className={`w-full py-4 font-headline text-sm font-black uppercase tracking-widest rounded-xl transition-all border-2 flex items-center justify-center gap-3 ${isFavorite(product.id) ? 'border-error text-error bg-error/5 hover:bg-error/10' : 'border-outline-variant/30 text-secondary hover:border-error hover:text-error'}`}
            >
               <span className="material-symbols-outlined" style={isFavorite(product.id) ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
               {isFavorite(product.id) ? 'FAVORİLERDEN ÇIKAR' : 'FAVORİLERE EKLE'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
