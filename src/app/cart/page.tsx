"use client";

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export default function Cart() {
  const { cart, loaded, updateQuantity, removeItem } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  if (!loaded) return <div className="min-h-screen flex items-center justify-center text-xl font-headline font-black uppercase tracking-widest text-secondary">Yükleniyor...</div>;

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/promos');
      const promos = await res.json();
      const validPromo = promos.find((p: any) => p.code === discountCode.toUpperCase());
      if (validPromo) {
         setDiscountRate(validPromo.discount);
      } else {
         alert('Geçersiz indirim kodu!');
         setDiscountRate(0);
      }
    } catch(err) {
      alert('Sistem hatası!');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = discountRate > 0 ? subtotal * discountRate : 0;
  const total = subtotal - discountAmount;

  // WHATSAPP CHECKOUT LOGIC
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "905550000000"; 
    let message = "Selam MARKAJ! Şiparişim aşağıdaki gibidir:\n\n";
    
    cart.forEach(item => {
      message += `▪️ ${item.name} (${item.size})\n   Birim Fiyat: ${item.price} TL x ${item.quantity} Adet\n`;
    });

    message += `\n------------------\n`;
    message += `🛒 Ara Toplam: ${subtotal.toLocaleString('tr-TR')} TL\n`;
    
    if (discountRate > 0) {
      message += `🎟️ İndirim Kodu (${discountCode.toUpperCase()} - %${discountRate * 100}): -${discountAmount.toLocaleString('tr-TR')} TL\n`;
    }
    
    message += `📦 Kargo: Ücretsiz\n`;
    message += `🚀 *Ödenecek Tutar: ${total.toLocaleString('tr-TR')} TL*\n`;
    message += `\nÖdemeyi EFT/Havale yoluyla gerçekleştirmek istiyorum, adımları alabilir miyim?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="max-w-7xl mx-auto px-8 py-16 font-body min-h-screen w-full">
      <div className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase mb-12">
        <span className="text-primary flex items-center gap-1"><span className="material-symbols-outlined !text-sm">shopping_cart</span> Sepet</span>
        <span className="w-12 h-[2px] bg-primary"></span>
        <span className="text-on-surface">WhatsApp Sipariş</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-2">
            <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface uppercase">Sepetin</h1>
            <p className="text-secondary font-medium tracking-wide">Sepetinizde {cart.length} çeşit ürün bulunuyor. Stoklar tükenmeden tamamla.</p>
          </div>

          <div className="space-y-8">
            {cart.length === 0 ? (
              <div className="py-24 text-center text-secondary border border-dashed border-outline-variant/30 rounded-xl">
                <span className="material-symbols-outlined text-6xl mb-4 text-outline">remove_shopping_cart</span>
                <p className="font-bold uppercase tracking-widest text-lg text-primary">Sepetin boş</p>
                <Link href="/catalog" className="inline-block mt-4 text-sm font-bold text-orange-600 underline hover:text-orange-700 transition-colors">Koleksiyonlara dön ve sokağı keşfet</Link>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-outline-variant/20">
                  <Link href={`/product/${item.productId}`} className="w-full sm:w-32 aspect-[3/4] bg-surface-container overflow-hidden rounded-xl group shrink-0 block relative">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} alt={item.name} />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <Link href={`/product/${item.productId}`} className="font-headline text-lg font-black text-on-surface uppercase tracking-tight hover:text-orange-600 transition-colors block">{item.name}</Link>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] bg-surface-container-low inline-block px-2 py-1 rounded">{item.collection}</p>
                        <p className="text-sm text-secondary font-medium pt-1">Beden: <strong className="text-primary">{item.size}</strong> | Renk: {item.color}</p>
                        {item.quantity === item.stock && <p className="text-[10px] text-error font-bold uppercase tracking-widest">Maksimum stok miktarına ulaştınız.</p>}
                      </div>
                      <p className="font-headline text-xl font-black">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 border-t border-outline-variant/10 pt-4">
                      <div className="flex items-center bg-surface-container rounded-lg px-2 py-1 gap-4 shadow-inner">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-secondary hover:text-primary p-1 transition-colors disabled:opacity-50" disabled={item.quantity <= 1}><span className="material-symbols-outlined !text-sm leading-none block">remove</span></button>
                        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-secondary hover:text-primary p-1 transition-colors disabled:opacity-50" disabled={item.quantity >= item.stock}><span className="material-symbols-outlined !text-sm leading-none block">add</span></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-error transition-colors">
                        <span className="material-symbols-outlined !text-[14px]">delete</span> Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-32">
          <div className="bg-surface-container-low p-8 md:p-10 rounded-2xl space-y-8 border border-outline-variant/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[10rem]">forum</span>
            </div>

            <h2 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight relative z-10 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#25D366]">chat</span>
              Sipariş Özeti
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-sm font-medium text-secondary">
                <span>Ara Toplam</span>
                <span className="text-on-surface font-black">{subtotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-secondary">
                <span>Kargo</span>
                <span className="text-primary font-black uppercase tracking-wider text-[10px]">Ücretsiz</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-sm font-medium text-[#25D366]">
                  <span>İndirim (%{discountRate * 100})</span>
                  <span className="font-black">-{discountAmount.toLocaleString('tr-TR')} TL</span>
                </div>
              )}
            </div>

            <form onSubmit={handleApplyDiscount} className="space-y-3 relative z-10 border-t border-outline-variant/20 pt-8">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">İndirim Kodu / Promosyon</label>
              <div className="flex gap-2">
                <input 
                   type="text" 
                   value={discountCode}
                   onChange={(e) => setDiscountCode(e.target.value)}
                   disabled={discountRate > 0 || cart.length === 0}
                   placeholder="KOD GİRİN" 
                   className="flex-1 bg-surface-container border-none rounded-lg px-4 py-3 text-xs font-bold tracking-widest focus:ring-2 focus:ring-primary transition-all uppercase text-on-surface placeholder:text-outline outline-none disabled:opacity-50 focus:outline-none" 
                />
                <button type="submit" disabled={discountRate > 0 || !discountCode || cart.length === 0} className="bg-on-surface text-surface px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-orange-600 hover:text-white transition-colors cursor-pointer disabled:opacity-50">Uygula</button>
              </div>
            </form>

            <div className="pt-8 border-t border-outline-variant/20 relative z-10">
              <div className="flex justify-between items-end mb-8">
                <span className="font-headline font-black uppercase text-xs tracking-[0.3em] text-secondary">Toplam</span>
                <span className="font-headline text-4xl font-black tracking-tighter text-[#25D366]">{total.toLocaleString('tr-TR')} TL</span>
              </div>
              
              <button 
                 onClick={handleWhatsAppCheckout}
                 disabled={cart.length === 0}
                 className="w-full bg-[#25D366] text-white py-5 rounded-xl font-headline font-black uppercase tracking-[0.2em] text-[13px] shadow-xl shadow-[#25D366]/20 hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                WhatsApp İle Sipariş Ver
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
