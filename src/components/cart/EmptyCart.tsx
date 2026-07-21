import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6">
      <div className="relative w-64 h-64">
        <Image
          src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/EmptyCart.png"
          alt="Sad empty cart"
          fill
          className="object-contain"
        />
      </div>
      <p className="font-mono text-sm md:text-base text-gray-700 max-w-[250px]">
        Your cart is empty. Log in and start your shopping!
      </p>
    </div>
  );
}