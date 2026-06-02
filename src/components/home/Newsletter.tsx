'use client';

export default function Newsletter() {
  const handleJoin = () => {
    alert("Thank you for joining our newsletter!");
  };

  return (
    <section className="w-full py-20 px-6 flex flex-col items-center justify-center text-center border-t-2 border-black">
      {/* Increased max-w-lg to give the paragraph more breathing room on one line */}
      <div className="w-full max-w-lg space-y-4">
        
        <h2 className="text-2xl font-mono flex items-center justify-center gap-2">
          ▶ Press start, enter email.
        </h2>

        <p className="text-gray-600 font-bold">
          Get cozy drops before they sell out. No spam, only sparkles.
        </p>

        {/* Changed flex to flex-col on mobile, flex-row on md+ */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-6">
          <input
            type="email"
            placeholder="player1@spawn.gg"
            className="w-full md:w-[350px] border-2 border-black px-4 py-2 focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          <button
            onClick={handleJoin}
            className="w-full md:w-auto border-2 border-black px-4 py-2 bg-[#e3b8ff] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
          >
            JOIN
          </button>
        </div>
      </div>
    </section>
  );
}