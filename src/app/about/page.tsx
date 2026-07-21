import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-6 md:p-12">
      
      {/* Outer Card Container with Neobrutalist Shadow */}
      <div className="relative w-full max-w-4xl bg-white border-2 border-black rounded-[32px] p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Photo Frame */}
        <div className="relative w-full aspect-[4/5] bg-[#EBF4FF] border-2 border-black rounded-[24px] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          
          {/* Profile Picture */}
          <Image 
            src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/pfpLinkedin.JPG" 
            alt="Founder Photo" 
            fill 
            className="object-cover"
          />

          {/* Founder Badge overlayed on bottom right */}
          <span className="absolute bottom-4 right-4 bg-[#FDFD96] border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Founder
          </span>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex flex-col gap-6">
          
          {/* Section Tag */}
          <div className="inline-flex items-center gap-2 bg-[#C1F8F2] border-2 border-black px-3 py-1 rounded-full w-max text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            About the Studio
          </div>

          {/* Heading */}
          <h1 className="font-jersey text-4xl md:text-5xl leading-none uppercase">
            Hey, player one.
          </h1>

          {/* Description paragraphs */}
          <div className="text-gray-700 text-sm md:text-base space-y-4 font-mono">
            <p>
              I started SpawnPoint to share the kind of gaming gear I always wished I could find — beautiful, playful, and built with love. Every item in the shop is something I would proudly add to my own setup.
            </p>
            <p>
              Thank you for being here. Whether you are a casual player or a hardcore collector, this store is for you. Let’s make your next respawn unforgettable.
            </p>
          </div>

          {/* Enter the Shop Button */}
          <Link 
            href="/shop"
            className="inline-block text-center mt-2 w-full md:w-max bg-[#282041] text-white px-6 py-3 border-2 border-black font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
          >
            ▶ Enter the Shop
          </Link>

        </div>

      </div>
    </main>
  );
}