'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/useCartStore";

interface XPpopupProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  userId: string;
  formData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  userXp: number;
}

export default function XPpopup({ isOpen, onClose, cartItems, userId, formData, userXp }: XPpopupProps) {
  const router = useRouter();
  const { setCartItems } = useCartStore();
  const [selectedTier, setSelectedTier] = useState<string>("none");
  const [submitting, setSubmitting] = useState(false);
  const [popupError, setPopupError] = useState("");

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handleConfirmPurchase = async () => {
    setSubmitting(true);
    setPopupError("");

    try {
      let discountPercent = 0;
      let xpCost = 0;

      if (selectedTier === "bronze") {
        if (userXp < 50) {
          setPopupError("You don't have enough XP for Bronze Tier (50 XP required).");
          setSubmitting(false);
          return;
        }
        discountPercent = 0.05;
        xpCost = 50;
      } else if (selectedTier === "silver") {
        if (userXp < 150) {
          setPopupError("You don't have enough XP for Silver Tier (150 XP required).");
          setSubmitting(false);
          return;
        }
        discountPercent = 0.10;
        xpCost = 150;
      } else if (selectedTier === "gold") {
        if (userXp < 350) {
          setPopupError("You don't have enough XP for Gold Tier (350 XP required).");
          setSubmitting(false);
          return;
        }
        discountPercent = 0.20;
        xpCost = 350;
      }

      const subtotal = calculateSubtotal();
      const discountAmount = subtotal * discountPercent;
      const finalTotalPrice = Math.max(0, subtotal - discountAmount);

      // Calculate new XP gained from this purchase (10% cashback / 1 XP per $1 spent)
      const earnedXp = Math.round(finalTotalPrice * 0.10);
      const updatedUserXp = userXp - xpCost + earnedXp;

      // Step 3: Create the Order Header in 'orders' table (including shipping info)
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_price: finalTotalPrice,
          status: 'pending',
          full_name: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
        })
        .select('id')
        .single();

      if (orderError) throw orderError;
      const orderId = orderData.id;

      // Step 5: Prepare items for 'order_items' table (locking in the historical price)
      const orderItemsPayload = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price, // Lock in price at the moment of purchase
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsPayload);

      if (itemsError) throw itemsError;

      // Update user's XP balance in 'users' table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ xp_points: updatedUserXp })
        .eq('id', userId);

      if (userUpdateError) throw userUpdateError;

      // Step 6: Clear the user's cart in 'cart_items' table
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (clearCartError) throw clearCartError;

      // Step 7: Clear global state and alert user about XP gained before redirecting
      setCartItems([]);
      alert(`Purchase successful!\nYou gained +${earnedXp} XP!\nYour total current XP: ${updatedUserXp}`);
      router.push(`/purchase_completed`);

    } catch (err: any) {
      console.error("Order processing error:", err.message);
      setPopupError("Failed to process order. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Title Bar */}
        <div className="bg-[#282041] text-white px-4 py-2 flex justify-between items-center border-b-2 border-black">
          <div className="flex gap-2 text-xs">
            <span className="text-[#36e1ff]">■</span>
            <span className="text-[#f5bfff]">■</span>
            <span className="text-[#FDFD96]">■</span>
          </div>
          {/* Non-functional Close Button on top right */}
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold cursor-pointer">✕</button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="font-jersey text-2xl uppercase tracking-wide">Redeem Your XP</h2>
            <p className="text-xs text-gray-500 font-mono mt-1">
              Your Current Balance: <span className="font-bold text-black">{userXp} XP</span>
            </p>
          </div>

          {popupError && (
            <div className="bg-red-100 border-2 border-black p-3 text-red-700 text-xs font-bold">
              {popupError}
            </div>
          )}

          {/* Options List */}
          <div className="space-y-3 font-mono text-xs">
            
            {/* Bronze Tier */}
            <label className={`flex items-center justify-between p-3 border-2 border-black cursor-pointer transition-all ${selectedTier === 'bronze' ? 'bg-[#CD7F32]/20 ring-2 ring-black' : 'bg-[#CD7F32]/10 hover:bg-[#CD7F32]/15'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="xpTier" value="bronze" checked={selectedTier === 'bronze'} onChange={() => setSelectedTier('bronze')} className="accent-black" />
                <span className="font-bold uppercase">Bronze Tier (5% OFF)</span>
              </div>
              <span className="font-bold">50 XP</span>
            </label>

            {/* Silver Tier */}
            <label className={`flex items-center justify-between p-3 border-2 border-black cursor-pointer transition-all ${selectedTier === 'silver' ? 'bg-gray-300 ring-2 ring-black' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="xpTier" value="silver" checked={selectedTier === 'silver'} onChange={() => setSelectedTier('silver')} className="accent-black" />
                <span className="font-bold uppercase">Silver Tier (10% OFF)</span>
              </div>
              <span className="font-bold">150 XP</span>
            </label>

            {/* Gold Tier */}
            <label className={`flex items-center justify-between p-3 border-2 border-black cursor-pointer transition-all ${selectedTier === 'gold' ? 'bg-[#FDFD96] ring-2 ring-black' : 'bg-[#FFF9C4]/50 hover:bg-[#FFF9C4]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="xpTier" value="gold" checked={selectedTier === 'gold'} onChange={() => setSelectedTier('gold')} className="accent-black" />
                <span className="font-bold uppercase">Gold Tier (20% OFF)</span>
              </div>
              <span className="font-bold">350 XP</span>
            </label>

            {/* No XP Option */}
            <label className={`flex items-center justify-between p-3 border-2 border-black cursor-pointer transition-all ${selectedTier === 'none' ? 'bg-gray-200 ring-2 ring-black' : 'bg-white hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="xpTier" value="none" checked={selectedTier === 'none'} onChange={() => setSelectedTier('none')} className="accent-black" />
                <span className="font-bold uppercase">Do Not Use XP</span>
              </div>
              <span className="font-bold">0 XP</span>
            </label>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-1/2 bg-red-200 text-black border-2 border-black py-3 font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
            >
              Cancel Purchase
            </button>

            <button
              type="button"
              onClick={handleConfirmPurchase}
              disabled={submitting}
              className="w-1/2 bg-[#32c0fc] text-black border-2 border-black py-3 font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}