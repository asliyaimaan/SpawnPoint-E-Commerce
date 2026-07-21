'use client';
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import XPpopup from "./XPpopup";

interface CartItemWithProduct {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

interface OrderFormProps {
  cartItems: CartItemWithProduct[];
  userId: string;
}

export default function OrderForm({ cartItems, userId }: OrderFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [userXp, setUserXp] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Trigger popup after validating the form fields
  const handleOpenPopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    setErrorMsg("");

    try {
      // Fetch user's current XP before opening popup
      const { data, error } = await supabase
        .from('users')
        .select('xp_points')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUserXp(data?.xp_points || 0);
      setShowPopup(true);
    } catch (err: any) {
      console.error("Error fetching user XP:", err.message);
      setErrorMsg("Failed to verify user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleOpenPopup} className="space-y-6">
        {errorMsg && (
          <div className="bg-red-100 border-2 border-black p-3 text-red-700 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {errorMsg}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-jersey text-2xl uppercase tracking-wide">Shipping Details</h2>
          
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Player One"
              className="w-full border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#32c0fc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="player@spawnpoint.com"
              className="w-full border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#32c0fc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Street Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Arcade Lane"
              className="w-full border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#32c0fc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Neo Tokyo"
                className="w-full border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#32c0fc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="90210"
                className="w-full border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#32c0fc] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || cartItems.length === 0}
          className="w-full bg-[#32c0fc] text-black border-2 border-black py-4 font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Checking details..." : "Place Order & Pay"}
        </button>
      </form>

      {/* XP Redemption Popup */}
      {showPopup && (
        <XPpopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          cartItems={cartItems}
          userId={userId}
          formData={formData}
          userXp={userXp}
        />
      )}
    </>
  );
}