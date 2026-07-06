// src/app/product/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import ProductDetails from "@/components/product/ProductDetails";

// The parameter MUST be named 'id' because your folder is [id]
export default async function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", resolvedParams.id) // Query using the ID
    .single();

  if (error || !product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[#FDFBF7] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
      <ProductDetails product={product} />
    </main>
  );
}