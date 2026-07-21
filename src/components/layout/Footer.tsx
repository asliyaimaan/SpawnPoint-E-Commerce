import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#282041] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section: Logo & Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/SPswitch.png"
              alt="SpawnPoint icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <h2 className="font-jersey text-2xl">SpawnPoint</h2>
              <span className="text-xs text-gray-400">スポーン・ポイント</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            THE spawn point for all game enthusiasts and collectors.
          </p>
        </div>

        {/* Middle Section: Shop */}
        <div>
          <h3 className="font-bold uppercase mb-3 text-xs text-gray-400 tracking-wider">Shop</h3>
          <ul className="flex flex-col gap-1 text-[13px] text-gray-300">
            <li><Link href="/shop/games" className="hover:text-white hover:underline transition-all">Games</Link></li>
            <li><Link href="/shop/accessories" className="hover:text-white hover:underline transition-all">Accessories</Link></li>
            <li><Link href="/shop/consoles" className="hover:text-white hover:underline transition-all">Consoles</Link></li>
          </ul>
        </div>

        {/* Right Section: Help */}
        <div>
          <h3 className="font-bold uppercase mb-3 text-xs text-gray-400 tracking-wider">Links</h3>
          <ul className="flex flex-col gap-1 text-[13px] text-gray-300">
            <li><Link href="/" className="hover:text-white hover:underline transition-all">Home</Link></li>
            <li><Link href="/about" className="hover:text-white hover:underline transition-all">About</Link></li>
            <li><Link href="/shop" className="hover:text-white hover:underline transition-all">Shop</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center mt-12 pt-8 border-t border-gray-700 text-xs text-gray-400">
        &copy; 2026 SPAWNPOINT • INSERT COIN TO CONTINUE
      </div>
    </footer>
  );
}