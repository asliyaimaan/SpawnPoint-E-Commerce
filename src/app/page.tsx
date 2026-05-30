import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-black">
        <p>Error loading products.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-10 text-black">
      <h1 className="mb-8 text-5xl font-bold">SpawnPoint</h1>

      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <p className="mt-2 text-zinc-400">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
