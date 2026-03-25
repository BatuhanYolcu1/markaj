"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { updateProduct } from '../../../actions';

export default function EditProductClient({ product }: { product: any }) {
  const images = JSON.parse(product.images) as string[];
  const details = JSON.parse(product.details) as string[];

  const [uploadedImages, setUploadedImages] = useState<string[]>(images);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.urls) {
        setUploadedImages(prev => [...prev, ...data.urls]);
      }
    } catch (err) {
      alert('Görsel yükleme başarısız!');
    }
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== idx));
  };

  const updateWithId = updateProduct.bind(null, product.id);

  const handleSubmit = async (formData: FormData) => {
    formData.set('images', uploadedImages.join(','));
    await updateWithId(formData);
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500 pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface">Ürünü Düzenle</h2>
          <p className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">{product.name}</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Temel Bilgiler</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Adı</label>
              <input required name="name" type="text" defaultValue={product.name} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Fiyat (TL)</label>
              <input required name="price" type="number" step="0.01" defaultValue={product.price} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Eski Fiyat (İndirimli gösterim, opsiyonel)</label>
              <input name="originalPrice" type="number" step="0.01" defaultValue={product.originalPrice ?? ''} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Kalıp (Fit)</label>
              <input required name="fit" type="text" defaultValue={product.fit} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ana Kategori</label>
              <select required name="category" defaultValue={product.category} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-secondary">
                <option value="Üst Giyim">Üst Giyim</option>
                <option value="Alt Giyim">Alt Giyim</option>
                <option value="Dış Giyim">Dış Giyim</option>
                <option value="İkili Takım">İkili Takım</option>
                <option value="Yeni Gelenler">Yeni Gelenler</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Alt Kategori</label>
              <input required name="subCategory" type="text" defaultValue={product.subCategory} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Açıklaması</label>
            <textarea required name="description" rows={3} defaultValue={product.description} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"></textarea>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Stok Yönetimi (Beden Bazlı)</h3>
          <div className="grid grid-cols-5 gap-4">
            {(['S', 'M', 'L', 'XL', 'XXL'] as const).map(size => (
              <div key={size} className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">{size} Beden</label>
                <input name={`stock${size}`} type="number" min="0" defaultValue={product.stock?.[size] ?? 0} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Ürün Görselleri</h3>
          
          {/* Current Images */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              {uploadedImages.map((url, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant/20">
                  <img src={url} alt={`Görsel ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeImage(idx)} className="bg-error text-white p-2 rounded-full hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                  {idx === 0 && <span className="absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest">Kapak</span>}
                </div>
              ))}
            </div>
          )}

          {/* Upload Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-orange-600', 'bg-orange-600/5'); }}
            onDragLeave={(e) => { e.currentTarget.classList.remove('border-orange-600', 'bg-orange-600/5'); }}
            onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-orange-600', 'bg-orange-600/5'); handleFileUpload(e.dataTransfer.files); }}
            className="border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-600 hover:bg-orange-600/5 transition-all"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            {uploading ? (
              <div className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-3xl text-orange-600 animate-spin">progress_activity</span>
                <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Yükleniyor...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-3xl text-outline">add_photo_alternate</span>
                <p className="text-sm font-bold text-secondary uppercase tracking-widest">Yeni Fotoğraf Ekle</p>
              </div>
            )}
          </div>

          <input type="hidden" name="images" value={uploadedImages.join(',')} />
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Özellikler</h3>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Özellikleri (Virgülle Ayırın)</label>
            <input required name="details" type="text" defaultValue={details.join(', ')} className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Link href="/admin/products" className="text-sm font-bold text-secondary hover:text-error transition-colors uppercase tracking-widest">İptal Et</Link>
          <button type="submit" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-xl flex items-center gap-3">
            <span className="material-symbols-outlined">save</span>
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
