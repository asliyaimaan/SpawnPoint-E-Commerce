// src/app/product/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import ProductDetails from "@/components/product/ProductDetails";
import CommentSection from "@/components/product/CommentSection";

//The parameter MUST be named 'id' because your folder is [id]
export default async function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  //Fetch Product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("id", resolvedParams.id)
    .single();

  //Fetch Comments (linking to users table)
  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select(`
      *,
      users (
        username,
        avatars (
          avatar_url
        )
      )
    `)
    .eq("product_id", resolvedParams.id)
    .order("created_at", { ascending: false });

  if (productError || !product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="min-h-screen pt-20 pb-20 px-6 md:px-12 bg-[#FDFBF7] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
      {/* 
          1. Use 'flex flex-col' to manage spacing vertically.
          2. 'gap-y-16' gives a generous, professional gap on all screens.
          3. 'gap-y-20' or 'gap-y-24' for even more breathing room.
      */}
      <div className="max-w-4xl mx-auto flex flex-col gap-y-24">
        <ProductDetails product={product} />
        {/* Pass the fetched comments down to the component */}
        <CommentSection productId={product.id} comments={comments || []} />
      </div>
    </main>
  );
}