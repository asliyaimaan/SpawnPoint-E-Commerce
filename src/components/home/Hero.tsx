import Image from "next/image";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section 
      className="relative w-full py-32 px-6 border-b-2 border-black"
      style={{
        backgroundImage: `linear-gradient(to right, #e5e5e5 1px, transparent 1px), 
                          linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-16">
        {/* Left Content */}
        <div className="max-w-lg space-y-6">
          <div className="bg-[#FDFD96] border-2 border-black inline-block px-3 py-1 font-mono text-sm">
            ▶ PRESS START
          </div>
          
          {/* Title: 3xl on mobile, 6xl on large screens */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-mono leading-tight">
            Spawn into <span className="text-[#B892FF]">cozy</span> gaming.
          </h1>
          
          {/* Paragraph: base size on mobile, text-lg on medium screens+ */}
          <p className="text-base md:text-lg font-mono text-gray-700">
            Consoles, controllers and pixel-perfect carts curated from 
            Tokyo&apos;s softest cyber arcades.
          </p>

          <Button 
            label="SHOP NOW" 
            href="/shop" 
            color="#f5bfff" 
            icon={<FontAwesomeIcon icon={faPlay} className="text-xs" />}
          />
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-[600px]">
          <Image 
            src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/hero-scene.jpg"
            alt="Hero Scene"
            width={600}
            height={360}
            className="border-2 border-black rounded-[32px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
      </div>
    </section>
  );
}