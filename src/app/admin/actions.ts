"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath('/');
}

export async function deletePromo(id: number) {
  await prisma.promoCode.delete({ where: { id } });
  revalidatePath('/admin/promos');
}

export async function createProduct(data: FormData) {
  const name = data.get('name') as string;
  const category = data.get('category') as string;
  const subCategory = data.get('subCategory') as string;
  const fit = data.get('fit') as string;
  const price = parseFloat(data.get('price') as string);
  const originalPrice = data.get('originalPrice') ? parseFloat(data.get('originalPrice') as string) : null;
  const description = data.get('description') as string;
  const s = parseInt(data.get('stockS') as string) || 0;
  const m = parseInt(data.get('stockM') as string) || 0;
  const l = parseInt(data.get('stockL') as string) || 0;
  const xl = parseInt(data.get('stockXL') as string) || 0;
  const xxl = parseInt(data.get('stockXXL') as string) || 0;
  const details = (data.get('details') as string).split(',').map(s => s.trim()).filter(Boolean);
  const images = (data.get('images') as string).split(',').map(s => s.trim()).filter(Boolean);

  await prisma.product.create({
    data: {
      name, category, subCategory, fit, price, originalPrice, description,
      details: JSON.stringify(details),
      images: JSON.stringify(images),
      isNew: true,
      stock: { create: { S: s, M: m, L: l, XL: xl, XXL: xxl } }
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function updateProduct(id: number, data: FormData) {
  const name = data.get('name') as string;
  const category = data.get('category') as string;
  const subCategory = data.get('subCategory') as string;
  const fit = data.get('fit') as string;
  const price = parseFloat(data.get('price') as string);
  const originalPrice = data.get('originalPrice') ? parseFloat(data.get('originalPrice') as string) : null;
  const description = data.get('description') as string;
  const s = parseInt(data.get('stockS') as string) || 0;
  const m = parseInt(data.get('stockM') as string) || 0;
  const l = parseInt(data.get('stockL') as string) || 0;
  const xl = parseInt(data.get('stockXL') as string) || 0;
  const xxl = parseInt(data.get('stockXXL') as string) || 0;
  const details = (data.get('details') as string).split(',').map(s => s.trim()).filter(Boolean);
  const images = (data.get('images') as string).split(',').map(s => s.trim()).filter(Boolean);

  await prisma.product.update({
    where: { id },
    data: {
      name, category, subCategory, fit, price, originalPrice, description,
      details: JSON.stringify(details),
      images: JSON.stringify(images),
      stock: {
        upsert: {
          create: { S: s, M: m, L: l, XL: xl, XXL: xxl },
          update: { S: s, M: m, L: l, XL: xl, XXL: xxl }
        }
      }
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function createPromo(data: FormData) {
  const code = data.get('code') as string;
  const discount = parseFloat(data.get('discount') as string) / 100;

  await prisma.promoCode.create({
    data: { code: code.toUpperCase(), discount, isActive: true }
  });
  revalidatePath('/admin/promos');
}

export async function togglePromoStatus(id: number, isActive: boolean) {
  await prisma.promoCode.update({
    where: { id },
    data: { isActive }
  });
  revalidatePath('/admin/promos');
}
