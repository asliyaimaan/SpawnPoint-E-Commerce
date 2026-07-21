'use client';
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import QuantitySelector from "../ui/QuantitySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { isCartOpen, toggleCart, cartItems, setCartItems } = useCartStore();

  // Function to remove an item completely
  const removeItem = async (id: string) => {
    await supabase.from('cart_items').delete().eq('id', id);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to update the quantity when +/- is clicked
  const updateQty = async (id: string, newQty: number) => {
    if (newQty < 1) return; // Prevent going below 1 (they should use the trash can to delete)

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', id);

    if (!error) {
      // Update local state instantly so the UI reflects the new number
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQty } : item
      ));
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={toggleCart} />
      
      <div className="relative z-[101] w-full max-w-md bg-white border-l-2 border-black h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-jersey text-2xl uppercase">Your Cart</h2>
          <button onClick={toggleCart} className="text-2xl font-bold cursor-pointer hover:text-red-500">✕</button>
        </div>

        {cartItems.length === 0 ? <EmptyCart /> : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b-2 border-black pb-4">
                
                {/* Product Image */}
                <div className="relative w-16 h-16 border border-black overflow-hidden flex-shrink-0">
                  {item.product?.image_url ? (
                    <Image 
                      src={item.product.image_url} 
                      alt={item.product.name} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px]">
                      No img
                    </div>
                  )}
                </div>
                
                {/* Name & Price */}
                <div className="flex-grow">
                  <p className="font-bold leading-tight">{item.product.name}</p>
                  <p className="text-sm mt-1">${item.product.price}</p>
                </div>

                {/* Right side controls: Quantity + Trash */}
                <div className="flex items-center gap-3">
                  <QuantitySelector 
                    qty={item.quantity} 
                    setQty={(newQty) => updateQty(item.id, newQty)} 
                    size="sm" 
                  />
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer text-lg"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

              </div>
            ))}
            
            <Link href="/checkout" className="block text-center mt-8 w-full bg-[#32c0fc] py-3 border-2 border-black font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
              Go to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}