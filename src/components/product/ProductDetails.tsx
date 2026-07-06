'use client';
import Image from "next/image";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
      {/* Product Image */}
      <div className="border-2 border-black bg-white rounded-[32px] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative w-full aspect-square rounded-[24px] overflow-hidden">
          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div className="inline-block bg-[#FDFD96] border-2 border-black px-3 py-1 font-mono text-xs font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          ★ FEATURED ITEM
        </div>
        <h1 className="text-4xl font-mono font-bold leading-tight">{product.name}</h1>
        <p className="font-mono text-gray-600 text-sm">{product.description}</p>
        
        <div className="text-3xl font-mono font-bold text-[#6D28D9]">${product.price}</div>
        
        <div className="flex gap-4 items-center">
          <div className="flex border-2 border-black rounded-xl overflow-hidden font-mono shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <button className="px-4 py-2 bg-white border-r-2 border-black">-</button>
            <span className="px-6 py-2 bg-white">1</span>
            <button className="px-4 py-2 bg-white border-l-2 border-black">+</button>
          </div>
          <button className="flex-1 bg-[#DDC8F8] border-2 border-black px-6 py-3 rounded-xl font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase">
            Add 1 to cart →
          </button>
        </div>
      </div>
    </div>
  );
}