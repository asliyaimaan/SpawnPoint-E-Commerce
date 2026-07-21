'use client';
import { useState } from "react";
import Image from "next/image";
import QuantitySelector from "@/components/ui/QuantitySelector"; // Adjust path as needed
import AddToCartButton from "@/components/ui/AddToCartButton";

export default function ProductDetails({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  // Extract category name safely
  const categoryName = product.categories?.name || "Uncategorized";

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start h-fit">
      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-[24px] overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          fill 
          className="object-cover" 
        />
      </div>
      
      {/* Product Details */}
      <div className="space-y-6">
        <div className="inline-block bg-[#FDFD96] border-2 border-black px-3 py-1 font-mono font-bold text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg uppercase">
          ★ {categoryName}
        </div>
        <h1 className="text-4xl font-mono font-bold leading-tight">{product.name}</h1>
        <p className="font-mono text-gray-600 text-sm">{product.description}</p>
        
        <div className="text-3xl font-mono font-bold">${product.price}</div>
        
        <div className="flex gap-4 items-center">
          <QuantitySelector qty={qty} setQty={setQty} size="md" />
          
          <AddToCartButton 
            productId={product.id} 
            qty={qty} 
            className="cursor-pointer flex-1 bg-[#DDC8F8] border-2 border-black px-4 py-3 font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase"
          >
            Add {qty} to cart
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}