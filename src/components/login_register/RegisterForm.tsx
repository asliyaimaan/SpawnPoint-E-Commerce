'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear error when user tries again
    
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: { 
        data: { username: username.trim() } 
      }
    });

    if (error) {
      let msg = error.message;
      if (msg.includes('already exists')) msg = "That username is already taken. Try another one!";
      else if (msg.includes('already registered')) msg = "This email is already in use. Try logging in!";
      
      setErrorMessage(msg);
      
      // Make it disappear after 5 seconds
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    alert("Welcome to the game! Your account has been spawned.");
    router.push('/');
  };

  // Shared styles for consistent UI
  const inputStyle = "w-full border-2 border-black p-3 font-mono rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none";
  const labelStyle = "block text-xs font-mono uppercase mb-2 flex items-center gap-2 font-bold";

  return (
    <form onSubmit={handleRegister} className="border-2 border-black p-8 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-auto">
      {/* This will only show if errorMessage is not an empty string */}
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-100 border-2 border-black font-mono text-red-600 text-xs text-center font-bold">
          ⚠ {errorMessage}
        </div>
      )}

      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> USERNAME</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputStyle} required />
      </div>
      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> EMAIL</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} required />
      </div>
      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> PASSWORD</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} required />
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#FDFD96] border-2 border-black p-4 rounded-xl font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase cursor-pointer"
      >
        ▶ SPAWN ACCOUNT
      </button>
    </form>
  );
}