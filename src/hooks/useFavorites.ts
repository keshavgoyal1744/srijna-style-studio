import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('fashionFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fashionFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: FavoriteItem) => {
    setFavorites(prev => {
      if (!prev.some(item => item.id === product.id)) {
        toast.success('Added to favorites');
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => {
      const filtered = prev.filter(item => item.id !== productId);
      toast.success('Removed from favorites');
      return filtered;
    });
  };

  const toggleFavorite = (product: FavoriteItem) => {
    const isFavorite = favorites.some(item => item.id === product.id);
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.success('Favorites cleared');
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};