"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Yanlış şifre. Tekrar deneyin.');
        setPassword('');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface mb-2">
            MARKAJ<span className="text-orange-600">.</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Yönetim Paneli</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-low p-10 rounded-3xl border border-outline-variant/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-600/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 text-2xl">shield_lock</span>
            </div>
            <div>
              <h2 className="font-headline font-black text-lg uppercase tracking-tight text-on-surface">Admin Girişi</h2>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Yetkili Erişim Gerekli</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-secondary">Panel Şifresi</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-orange-600 outline-none pr-12"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-xl">lock</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-error text-xs font-bold uppercase tracking-widest bg-error/10 p-3 rounded-lg">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-4 rounded-xl font-headline font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-orange-600/20 hover:shadow-orange-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  Doğrulanıyor...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">login</span>
                  Panele Giriş Yap
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] font-bold text-outline uppercase tracking-widest mt-8">
          © 2024 Markaj. Tüm hakları saklıdır.
        </p>
      </div>
    </main>
  );
}
