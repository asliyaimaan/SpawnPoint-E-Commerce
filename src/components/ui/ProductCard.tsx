'use client';

import Image from "next/image";
import Link from "next/link"; // Import Link
import AddToCartButton from "@/components/ui/AddToCartButton";

interface ProductProps {
  id: string; // Add this
  name: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ id,name, price, image_url }: ProductProps) {
  return (
    <div className="border-2 border-black bg-white rounded-[24px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full overflow-hidden">
      
      {/* Image Container with Zoom Effect */}
      <Link href={`/product/${id}`} className="relative w-full aspect-square border-b-2 border-black bg-gray-50 overflow-hidden cursor-pointer group">
        <Image 
          src={image_url} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-grow">
        <h3 className="text-sm leading-tight mb-4 font-mono">{name}</h3>
        
        {/* Footer*/}
        <div className="flex justify-between items-center">
          <span className="text-xl font-mono">${price}</span>
          <AddToCartButton 
            productId={id} 
            qty={1} 
            className="cursor-pointer border-2 border-black px-3 py-2 bg-[#FDFD96] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[10px] font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            + ADD
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}