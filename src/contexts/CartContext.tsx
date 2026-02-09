import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductFlavor } from '@/types/database';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, flavor?: ProductFlavor) => void;
  removeFromCart: (productId: string, flavorId?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavorId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, flavor?: ProductFlavor) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.flavor?.id === flavor?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, flavor, quantity }];
    });
  };

  const removeFromCart = (productId: string, flavorId?: string) => {
    setItems(prev => 
      prev.filter(item => 
        !(item.product.id === productId && item.flavor?.id === flavorId)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, flavorId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, flavorId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.flavor?.id === flavorId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discounted_price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
