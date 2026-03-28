import Link from 'next/link';

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { stock: true }
  });

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      {/* Hero Section: Streetwear Impact */}
      <section className="relative h-[800px] w-full overflow-hidden bg-surface-container">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-top"
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop"
            alt="Men's streetwear model urban setting"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full max-w-[1920px] mx-auto px-8 flex flex-col justify-center items-start">
          <span className="font-headline font-extrabold uppercase tracking-[0.3em] text-orange-600 text-sm mb-4">
            SS24 SOKAK KOLEKSİYONU
          </span>
          <h1 className="font-headline text-[clamp(3.5rem,8vw,6rem)] font-extrabold text-on-background leading-[0.9] tracking-tighter mb-8 max-w-2xl uppercase">
            Sokağın <br /><span className="text-primary italic">Ruhu</span>
          </h1>
          <p className="text-on-surface-variant max-w-md text-lg mb-10 leading-relaxed font-body">
            Oversize kesimler, baggy fitler ve kuralsız sokak modası. Kendi tarzınızı özgürce yansıtın.
          </p>
          <div className="flex gap-4">
            <Link
              href="/catalog"
              className="bg-primary text-on-primary px-10 py-5 rounded-md font-headline font-bold text-sm hover:bg-on-background transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              KOLEKSİYONU İNCELE
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Asymmetric Category Grid */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7 bg-surface-container p-12 flex flex-col justify-between group overflow-hidden relative rounded-xl h-[400px]">
            <div className="z-10 bg-white/20 p-6 backdrop-blur-md rounded-lg self-start">
              <h3 className="font-headline text-4xl font-black mb-2 uppercase tracking-tighter">Oversize<br/>Üst Giyim</h3>
              <p className="text-on-background max-w-xs mb-6 font-medium">Sınırları çizenler değil, yıkanlar için.</p>
              <Link href="/catalog?cat=Üst+Giyim" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-orange-600 group-hover:gap-4 transition-all uppercase tracking-widest">
                Kesfet <span className="material-symbols-outlined">trending_flat</span>
              </Link>
            </div>
            <img
              className="absolute -right-10 bottom-0 h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 w-2/3 grayscale hover:grayscale-0"
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"
              alt="Oversize Hoodie Streetwear"
            />
          </div>

          <div className="md:col-span-5 grid grid-rows-2 gap-8">
            <div className="bg-surface-container-high p-8 flex items-center justify-between group rounded-xl relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity mix-blend-multiply" alt="Jeans" />
              <div className="z-10">
                <h3 className="font-headline text-2xl font-black mb-1 uppercase tracking-tighter">Baggy Alt Giyim</h3>
                <Link href="/catalog?cat=Alt+Giyim" className="text-xs font-bold tracking-widest text-on-surface-variant hover:text-orange-600 transition-colors uppercase">Hemen Al</Link>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary z-10">dry_cleaning</span>
            </div>
            <div className="bg-orange-600 p-8 flex items-center justify-between group rounded-xl relative overflow-hidden text-white">
              <div className="z-10">
                <h3 className="font-headline text-2xl font-black mb-1 uppercase tracking-tighter">İndirim & Fırsat</h3>
                <Link href="/catalog?discount=true" className="text-xs font-bold tracking-widest text-white/80 hover:text-white transition-colors uppercase">Tümünü İncele</Link>
              </div>
              <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-white transition-colors z-10">local_fire_department</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Bento Section — Dynamic from DB */}
      <section className="py-24 bg-surface-container-low w-full">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-headline text-4xl font-black tracking-tighter mb-2 uppercase">Günün Drop&apos;u</h2>
              <div className="h-1 w-20 bg-orange-600"></div>
            </div>
            <Link href="/catalog" className="font-headline text-sm font-bold flex items-center gap-2 hover:text-orange-600 transition-colors uppercase">
              TÜMÜNÜ GÖR <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map(product => {
              const images = JSON.parse(product.images) as string[];
              const totalStock = product.stock ? (product.stock.S + product.stock.M + product.stock.L + product.stock.XL + product.stock.XXL) : 0;
              return (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden bg-surface-container mb-6 relative rounded-lg">
                    <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={images[0]} alt={product.name} />
                    {product.isNew && <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm">YENİ</div>}
                    {totalStock <= 5 && totalStock > 0 && <div className="absolute top-4 right-4 bg-error/90 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm">Sınırlı Stok</div>}
                    <Link href={`/product/${product.id}`} className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-primary text-center py-3 rounded text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest shadow-xl">
                      İncele
                    </Link>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1 uppercase tracking-tight">{product.name}</h4>
                  <p className="text-secondary text-xs mb-3 font-medium uppercase tracking-wider">{product.fit} — {product.subCategory}</p>
                  <div className="flex gap-2 items-center">
                    <p className={`font-headline font-black text-xl ${product.originalPrice ? 'text-orange-600' : 'text-primary'}`}>{product.price.toLocaleString('tr-TR')} TL</p>
                    {product.originalPrice && <p className="text-on-surface-variant text-sm line-through decoration-orange-600/30">{product.originalPrice.toLocaleString('tr-TR')} TL</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.2]"
            src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=2000&auto=format&fit=crop"
            alt="Street style background"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8">
          <div className="bg-surface/10 backdrop-blur-xl p-12 md:p-20 text-center rounded-2xl border border-white/10">
            <span className="material-symbols-outlined text-5xl text-orange-500 mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>apparel</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">Sokağın Sesi Ol</h2>
            <p className="text-white/70 mb-10 max-w-lg mx-auto font-medium">Sınırlı sayıdaki koleksiyon drop&apos;larından ve VIP indirimlerden ilk sen haberdar ol.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresin"
                className="flex-1 bg-white border-none px-6 py-4 rounded focus:ring-2 focus:ring-orange-500 text-sm font-body outline-none text-black"
              />
              <button className="bg-orange-600 text-white px-8 py-4 rounded font-headline font-black text-sm uppercase tracking-widest hover:bg-orange-700 transition-all">
                KAYDOL
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
