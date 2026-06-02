'use client'; // Required for useState

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Button label="LOGIN" href="/login" color="#C1F8F2" />
        <Button label="BASKET • 0" href="/basket" color="#DDC8F8" icon={<FontAwesomeIcon icon={faBasketShopping} className="text-xs" />} />
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
             <Button label="LOGIN" href="/login" color="#C1F8F2" />
             <Button label="BASKET • 0" href="/basket" color="#DDC8F8" />
          </div>
        </div>
      )}
    </nav>
  );
}