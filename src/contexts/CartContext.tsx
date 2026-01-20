import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  day: string;
  calories: string;
  price: number;
  menu: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
  deliveryDate?: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems([...items, { ...item, id: Date.now().toString() }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const getTotalItems = () => {
    return items.length;
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
