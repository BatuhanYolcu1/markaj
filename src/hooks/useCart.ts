"use client";

import { useState, useEffect } from 'react';

export type CartItem = {
  id: string; // productId-size
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  stock: number;
  collection: string;
  color: string;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const saved = localStorage.getItem('markaj_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
      setLoaded(true);
    };

    loadCart();

    // Dinlemek için event listener eklenebilir, fakat storage 
    // event'i diğer sekmeler için çalışır. Aynı uygulama içi için window eventi kullanıyoruz:
    const handleStorageChange = () => loadCart();
    
    window.addEventListener('markaj-cart-updated', handleStorageChange);
    return () => window.removeEventListener('markaj-cart-updated', handleStorageChange);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    localStorage.setItem('markaj_cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('markaj-cart-updated')); // Bütün bileşenlere haber ver
  };

  const addToCart = (item: Omit<CartItem, 'quantity' | 'id'>) => {
    const id = `${item.productId}-${item.size}`;
    const newCart = [...cart];
    const existing = newCart.find(i => i.id === id);

    if (existing) {
       if (existing.quantity < item.stock) {
           existing.quantity += 1;
           saveCart(newCart);
       }
    } else {
       newCart.push({ ...item, id, quantity: 1 });
       saveCart(newCart);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => {
       if (item.id === id) {
           const newQ = Math.max(1, Math.min(item.quantity + delta, item.stock));
           return { ...item, quantity: newQ };
       }
       return item;
    });
    saveCart(newCart);
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
  };

  return { cart, loaded, addToCart, updateQuantity, removeItem, clearCart };
}
