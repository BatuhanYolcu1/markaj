"use client";

import { useState, useEffect } from 'react';

export type FavoriteItem = number; // Sadece Product ID tutacağız

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem('markaj_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
      setLoaded(true);
    };

    loadFavorites();

    const handleStorageChange = () => loadFavorites();
    window.addEventListener('markaj-favs-updated', handleStorageChange);
    return () => window.removeEventListener('markaj-favs-updated', handleStorageChange);
  }, []);

  const saveFavorites = (newFavs: FavoriteItem[]) => {
    localStorage.setItem('markaj_favorites', JSON.stringify(newFavs));
    setFavorites(newFavs);
    window.dispatchEvent(new Event('markaj-favs-updated'));
  };

  const toggleFavorite = (productId: number) => {
    const newFavs = [...favorites];
    const index = newFavs.indexOf(productId);
    if (index > -1) {
      newFavs.splice(index, 1);
    } else {
      newFavs.push(productId);
    }
    saveFavorites(newFavs);
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  return { favorites, loaded, toggleFavorite, isFavorite };
}
