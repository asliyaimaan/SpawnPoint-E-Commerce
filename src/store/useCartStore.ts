import { create } from 'zustand';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: { name: string; price: number; image_url: string }; // Added image_url
}

interface CartStore {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  totalQuantity: number;
}

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  cartItems: [],
  // This updates both the items and the total count automatically
  setCartItems: (items) => set({ 
    cartItems: items, 
    totalQuantity: items.reduce((acc, item) => acc + item.quantity, 0) 
  }),
  totalQuantity: 0,
}));