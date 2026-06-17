'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear errors on new attempt

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setErrorMessage(error.message);
      // Auto-hide error after 5 seconds
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    
    router.push('/');
  };

  const inputStyle = "w-full border-2 border-black p-3 font-mono rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none";
  const labelStyle = "block text-xs font-mono uppercase mb-2 flex items-center gap-2 font-bold";

  return (
    <form onSubmit={handleLogin} className="border-2 border-black p-8 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-auto">
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-100 border-2 border-black font-mono text-red-600 text-xs text-center font-bold">
          ⚠ {errorMessage}
        </div>
      )}

      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> EMAIL</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} required />
      </div>
      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> PASSWORD</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} required />
      </div>

      <div className="flex justify-between items-center mb-6 text-xs font-mono font-bold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="accent-black" /> REMEMBER ME
        </label>
        <a href="/forgot-password" className="underline hover:text-[#B892FF]">FORGOT?</a>
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#DDC8F8] border-2 border-black p-4 rounded-xl font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase cursor-pointer"
      >
        ▶ PRESS START
      </button>
    </form>
  );
}