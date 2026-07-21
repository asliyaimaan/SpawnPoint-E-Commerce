'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OrderForm from "@/components/checkout/OrderForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCheckoutData() {
      // 1. Check user session in the browser (just like your profile page)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      // 2. Fetch cart items
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity, product:products(name, price, image_url)')
        .eq('user_id', user.id);

      // If cart is empty, send them back to the shop or home
      if (error || !data || data.length === 0) {
        router.push("/shop");
        return;
      }

      setCartItems(data);
      setLoading(false);
    }

    loadCheckoutData();
  }, [router]);

  if (loading) return <LoadingSpinner />;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-jersey text-4xl md:text-5xl uppercase mb-8 border-b-2 border-black pb-4">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Shipping Form */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <OrderForm cartItems={cartItems} userId={user.id} />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-fit">
            <h2 className="font-jersey text-2xl uppercase mb-6 pb-2 border-b-2 border-black">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="relative w-14 h-14 border border-black flex-shrink-0">
                    {item.product?.image_url && (
                      <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t-2 border-black pt-4 text-sm font-mono">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-black pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}