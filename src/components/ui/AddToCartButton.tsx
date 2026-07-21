'use client';
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToastStore } from "@/store/useToastStore";
import { useCartStore } from "@/store/useCartStore"; // 1. Import your cart store

export default function AddToCartButton({ 
  productId, 
  qty, 
  className, 
  children 
}: { 
  productId: string, 
  qty: number, 
  className: string, 
  children: React.ReactNode 
}) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();
  const { setCartItems } = useCartStore(); // 2. Extract setCartItems

  const handleAddToCart = async () => {
    setLoading(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            showToast("Please create an account to add to cart");
            setLoading(false);
            return;
        }

        // 1. Check if the item already exists in the cart for this user
        const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

        if (existingItem) {
          // 2. If it exists, update the quantity
          const { error } = await supabase
              .from('cart_items')
              .update({ quantity: existingItem.quantity + qty })
              .eq('id', existingItem.id);
          
          if (error) throw error;
        } else {
          // 3. If it doesn't exist, insert the new row
          const { error } = await supabase
              .from('cart_items')
              .insert([{ user_id: user.id, product_id: productId, quantity: qty }]);
          
          if (error) throw error;
        }

        // 4. FETCH FRESH CART DATA FROM SUPABASE AND UPDATE ZUSTAND STORE INSTANTLY
        const { data: updatedCart, error: fetchError } = await supabase
          .from('cart_items')
          .select('id, product_id, quantity, product:products(name, price, image_url)')
          .eq('user_id', user.id);

        if (!fetchError && updatedCart) {
          setCartItems(updatedCart as any); // This updates the UI immediately!
        }

        showToast("Added to cart!");

    } catch (error) {
        console.error("Error:", error);
        showToast("Failed to update cart.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? "Adding..." : children}
    </button>
  );
}