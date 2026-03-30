import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLowStockEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Geçersiz sepet' }, { status: 400 });
    }

    const updates = [];
    const cartContext = [];

    const validSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    for (const item of cart) {
      if (!item.productId || !item.size || !item.quantity) continue;
      
      const sizeKey = item.size.toUpperCase();
      
      if (!validSizes.includes(sizeKey)) continue;

      const updateQuery = prisma.stock.update({
        where: { productId: Number(item.productId) },
        data: {
          [sizeKey]: { decrement: Number(item.quantity) },
        },
        include: {
           product: true
        }
      });
      
      updates.push(updateQuery);
      cartContext.push({ size: sizeKey, productName: item.name });
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Güncellenecek geçerli ürün bulunamadı' }, { status: 400 });
    }

    // Tüm stok güncellemelerini tek bir işlem havuzunda erit (ya hepsi geçer ya hiçbiri)
    const results = await prisma.$transaction(updates);

    // Stok azaltıldıktan sonra her ürün için limitleri kontrol edip varsa mail gönder
    for (let i = 0; i < results.length; i++) {
        const stockData = results[i];
        const context = cartContext[i];
        
        // Yeni stok miktarını objeden dinamik olarak okuyoruz
        const newSizeStock = stockData[context.size as keyof typeof stockData] as number;
        
        if (typeof newSizeStock === 'number' && newSizeStock <= 2) {
             const pName = stockData.product?.name || context.productName;
             // Vercel servisinde işlemin askıda kalmaması için promise beklenir
             await sendLowStockEmail(pName, context.size, newSizeStock).catch(console.error);
        }
    }

    return NextResponse.json({ success: true, message: 'Stoklar başarılı bir şekilde güncellendi.' });

  } catch (error) {
    console.error('WhatsApp Checkout API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası, lütfen tekrar deneyin.' }, { status: 500 });
  }
}
