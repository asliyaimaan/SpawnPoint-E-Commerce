import LoginForm from "@/components/login_register/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* 1. Badge is now a direct child. !self-start will work here! */}
      <div 
        className="w-full max-w-md mb-8 !self-center" 
      >
        <div className="inline-block bg-[#DDC8F8] border-2 border-black px-4 py-1 font-mono text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          ▶ CONTINUE
        </div>
      </div>

      {/* 2. Heading and text are in their own centered container */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-mono mb-2 font-bold">Welcome back, <span className="text-[#B892FF]">player 1.</span></h1>
        <p className="font-mono text-gray-600">Resume your save file. Your basket is waiting in the cloud.</p>
      </div>
      
      <LoginForm />
      
      <p className="mt-6 font-mono text-sm">
        New here? <Link href="/register" className="underline font-bold">Create an account →</Link>
      </p>
    </main>
  );
}