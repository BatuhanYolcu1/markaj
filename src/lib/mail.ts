import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');

export async function sendLowStockEmail(productName: string, size: string, remainingStock: number) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY bulunamadı, e-posta gönderimi simüle edildi.', { productName, size, remainingStock });
      return { success: true, simulated: true };
    }

    const { data, error } = await resend.emails.send({
      from: 'Markaj Sistem <onboarding@resend.dev>', // Resend'ın ücretsiz deneme domaini
      to: [process.env.ADMIN_EMAIL || 'admin@markaj.com'], // Yönetici e-postası (ENV'den de alabilirsiniz)
      subject: `🚨 Stok Uyarısı: ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #ba1a1a;">Stok Uyarı Sistemi</h2>
          <p>Merhaba, mağazanızdaki bir ürünün stoğu kritik seviyeye indi veya tükendi.</p>
          <hr />
          <ul style="font-size: 16px;">
            <li><strong>Ürün Adı:</strong> ${productName}</li>
            <li><strong>Beden:</strong> ${size}</li>
            <li><strong>Kalan Stok:</strong> <span style="color: ${remainingStock === 0 ? 'red' : 'orange'}; font-weight: bold;">${remainingStock} Adet</span></li>
          </ul>
          <hr />
          <p style="font-size: 12px; color: #666;">Bu mesaj Markaj geçici WhatsApp Sipariş sistemi tarafından otomatik oluşturulmuştur.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Resend catch error:', error);
    return { success: false, error };
  }
}
