'use client'; // Required for useState

import { useState, useEffect } from 'react'; // Add useEffect
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { supabase } from "@/lib/supabase"; // Import your supabase client
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const { toggleCart, totalQuantity, setCartItems } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session?.user) fetchCart(session.user.id);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user) fetchCart(session.user.id);
      else setCartItems([]); // Clear cart on logout
    });

    return () => subscription.unsubscribe();
  }, [setCartItems]);

  const fetchCart = async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      // Make sure 'image_url' is included in the selection inside the join!
      .select('id, product_id, quantity, product:products(name, price, image_url)') 
      .eq('user_id', userId);
    
    if (data) {
      console.log("Cart Data:", data); // Check your browser console to see if image_url is present
      setCartItems(data as any);
    }
  };

  return (
    <nav className="sticky top-0 z-50 relative flex items-center justify-between px-4 md:px-8 py-4 border-b-2 border-black bg-white">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3">
        <Image
          src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/SPswitch.png"
          alt="SpawnPoint icon"
          width={45} height={45}
          className="md:w-[60px] md:h-[60px]"
        />
        <div className="flex flex-col">
          <h1 className="font-jersey text-2xl md:text-4xl leading-none">SpawnPoint</h1>
          <span className="text-[10px] sm:text-xs md:text-sm tracking-widest text-gray-600">
            スポーン・ポイント
          </span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-lg font-bold uppercase text-gray-900">
        <Link href="/" className="hover:text-[#B892FF]">Home</Link>
        <Link href="/shop" className="hover:text-[#B892FF]">Shop</Link>
        <Link href="/about" className="hover:text-[#B892FF]">About</Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4">
        {/* Dynamic Button */}
        {isLoggedIn ? (
          <Button label="PROFILE" href="/profile" color="#C1F8F2" />
        ) : (
          <Button label="LOGIN" href="/login" color="#C1F8F2" />
        )}
        <button 
          onClick={toggleCart}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase"
          style={{ backgroundColor: "#DDC8F8" }}
        >
          <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
          CART • {totalQuantity}
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button className="md:hidden p-2 border-2 border-black" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-2 border-black flex flex-col items-center gap-6 py-8 md:hidden shadow-lg z-50">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <div className="flex gap-4">
             {/* Dynamic Button */}
              {isLoggedIn ? (
                <Button label="PROFILE" href="/profile" color="#C1F8F2" />
              ) : (
                <Button label="LOGIN" href="/login" color="#C1F8F2" />
              )}
            <button 
              onClick={toggleCart}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase"
              style={{ backgroundColor: "#DDC8F8" }}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
              CART • {totalQuantity}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}