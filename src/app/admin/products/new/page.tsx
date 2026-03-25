"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { createProduct } from '../../actions';

export default function NewProductPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
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

  const handleSubmit = async (formData: FormData) => {
    // Inject uploaded image URLs into form data
    formData.set('images', uploadedImages.join(','));
    await createProduct(formData);
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500 pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-on-surface">Yeni Ürün Ekle</h2>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Temel Bilgiler</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Adı</label>
              <input required name="name" type="text" placeholder="Örn: Heavyweight Boxy T-Shirt" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Fiyat (TL)</label>
              <input required name="price" type="number" placeholder="Örn: 850" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ana Kategori</label>
              <select required name="category" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-secondary">
                <option value="Üst Giyim">Üst Giyim</option>
                <option value="Alt Giyim">Alt Giyim</option>
                <option value="Dış Giyim">Dış Giyim</option>
                <option value="İkili Takım">İkili Takım</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Alt Kategori</label>
              <input required name="subCategory" type="text" placeholder="Örn: T-Shirt, Hoodie" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Kalıp (Fit)</label>
              <input required name="fit" type="text" placeholder="Örn: Oversize, Baggy" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Açıklaması</label>
            <textarea required name="description" rows={3} placeholder="Ürün detayları..." className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"></textarea>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Stok Yönetimi</h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">S Beden</label>
              <input name="stockS" type="number" defaultValue="0" min="0" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">M Beden</label>
              <input name="stockM" type="number" defaultValue="0" min="0" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">L Beden</label>
              <input name="stockL" type="number" defaultValue="0" min="0" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">XL Beden</label>
              <input name="stockXL" type="number" defaultValue="0" min="0" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">XXL Beden</label>
              <input name="stockXXL" type="number" defaultValue="0" min="0" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none text-center" />
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Ürün Görselleri</h3>
          
          {/* Upload Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-orange-600', 'bg-orange-600/5'); }}
            onDragLeave={(e) => { e.currentTarget.classList.remove('border-orange-600', 'bg-orange-600/5'); }}
            onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-orange-600', 'bg-orange-600/5'); handleFileUpload(e.dataTransfer.files); }}
            className="border-2 border-dashed border-outline-variant/40 rounded-2xl p-12 text-center cursor-pointer hover:border-orange-600 hover:bg-orange-600/5 transition-all relative"
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
              <div className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-5xl text-orange-600 animate-spin">progress_activity</span>
                <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Yükleniyor...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-5xl text-outline">cloud_upload</span>
                <p className="text-sm font-bold text-on-surface uppercase tracking-widest">Fotoğrafları Sürükle & Bırak</p>
                <p className="text-xs text-secondary font-medium">veya tıklayarak dosya seçin • JPG, PNG, WEBP</p>
              </div>
            )}
          </div>

          {/* Preview Grid */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
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

          {/* Hidden images field */}
          <input type="hidden" name="images" value={uploadedImages.join(',')} />
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6">
          <h3 className="font-headline text-lg font-black uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Özellikler</h3>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Ürün Özellikleri (Virgülle Ayırın)</label>
            <input required name="details" type="text" placeholder="Örn: %100 Pamuk, Yıkamalı, Boxy Fit" className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={uploadedImages.length === 0} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3">
            <span className="material-symbols-outlined">publish</span>
            Koleksiyona Ekle & Yayınla
          </button>
        </div>
      </form>
    </div>
  )
}
