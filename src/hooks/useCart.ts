import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashionCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashionCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: { 
    id: number; 
    name: string; 
    price: number; 
    image: string; 
  }, size?: string, color?: string) => {
    const cartItemId = `${product.id}-${size || 'default'}-${color || 'default'}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === cartItemId);
      
      if (existingItem) {
        toast.success('Updated cart quantity');
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prev, {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          size,
          color
        }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => {
      const filtered = prev.filter(item => item.id !== cartItemId);
      toast.success('Removed from cart');
      return filtered;
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isInCart = (productId: number, size?: string, color?: string) => {
    const cartItemId = `${productId}-${size || 'default'}-${color || 'default'}`;
    return cartItems.some(item => item.id === cartItemId);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart
  };
};