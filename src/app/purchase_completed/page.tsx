import Link from "next/link";

export default function PurchaseCompletedPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-6">
      
      {/* Retro Dialogue Box Container */}
      <div className="w-full max-w-lg bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Title Bar */}
        <div className="bg-[#282041] text-white px-4 py-2 flex justify-between items-center border-b-2 border-black">
          {/* Fake Pixel Icons */}
          <div className="flex gap-2 text-xs">
            <span className="text-[#36e1ff]">■</span>
            <span className="text-[#f5bfff]">■</span>
            <span className="text-[#FDFD96]">■</span>
          </div>
          {/* Non-functional Close Button */}
          <span className="text-gray-400 font-bold cursor-not-allowed select-none">✕</span>
        </div>

        {/* Content Body */}
        <div className="p-8 text-center flex flex-col items-center gap-6">
          
          {/* Success Label */}
          <h1 className="font-jersey text-2xl md:text-3xl uppercase tracking-wide leading-snug">
            Your order has been successfully placed. Return to home?
          </h1>

          {/* Option Button ("Yes") */}
          <Link 
            href="/"
            className="mt-2 inline-block bg-[#FDFD96] text-black border-2 border-black px-8 py-3 font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
          >
            Yes
          </Link>

        </div>

      </div>
    </main>
  );
}