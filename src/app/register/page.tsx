import RegisterForm from "@/components/login_register/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div 
        className="w-full max-w-md mb-8 !self-center" 
      >
        <div className="inline-block bg-[#FDFD96] border-2 border-black px-4 py-1 mb-4 font-mono text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          ▶ NEW GAME
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-mono mb-2 font-bold">Create your <span className="text-[#B892FF]">save file.</span></h1>
        <p className="font-mono text-gray-600">Pick a username. Choose your weapon. Loot drops incoming.</p>
      </div>
      
      <RegisterForm />
      
      <p className="mt-6 font-mono text-sm">
        Already have an account? <Link href="/login" className="underline font-bold">Login →</Link>
      </p>
    </main>
  );
}