import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ui/ProductCard";

export default async function FeaturedProducts() {
  // Fetch only featured products
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true);

  if (error) return <p>Error loading featured products.</p>;

  return (
    <section className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="mb-8">
        <div className="text-[#B892FF] text-xs font-mono flex items-center gap-1 mb-2">
          <span>★</span> FEATURED DROP
        </div>

        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-mono">New on the shelf</h2>
          <a href="#" className="text-sm underline underline-offset-4">VIEW ALL →</a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
          />
        ))}
      </div>
    </section>
  );
}