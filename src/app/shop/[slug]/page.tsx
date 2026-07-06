'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ui/ProductCard";
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const [products, setProducts] = useState<any[]>([]);
  const [sort, setSort] = useState<'low-to-high' | 'high-to-low' | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase
        .from("products")
        .select("*, categories!inner(name)")
        .eq("categories.name", categoryName);

      //Only add the order clause if a sort is selected
      if (sort) {
        query = query.order('price', { ascending: sort === 'low-to-high' });
      }

      const { data } = await query;
      setProducts(data || []);
    }
    fetchProducts();
  }, [categoryName, sort]);

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-mono capitalize">{categoryName}</h1>
          <p className="text-gray-500 font-mono mt-2">{products.length} items</p>
        </div>

        {/* Sorting Dropdown */}
        <select 
          value={sort || ""} 
          onChange={(e) => setSort(e.target.value as any || null)}
          className="border-2 border-black p-2 font-mono text-sm cursor-pointer"
        >
          <option value="">Sort by price</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard id={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}