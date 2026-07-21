'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const inputStyle = "w-full border-2 border-black p-3 font-mono rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none transition-all outline-none text-sm";
  const labelStyle = "text-xs font-mono font-bold uppercase mb-2 block flex items-center gap-1";

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Use Supabase's built-in password reset flow. 
      // This securely checks if the email exists in Auth and triggers a reset email.
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`, // Optional: page where they type their new password after clicking the email link
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Password reset link sent! Check your email inbox.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordResetRequest} className="border-2 border-black p-8 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-auto">
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-100 border-2 border-black font-mono text-red-600 text-xs text-center font-bold">
          ⚠ {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-3 bg-green-100 border-2 border-black font-mono text-green-700 text-xs text-center font-bold">
          ✔ {successMessage}
        </div>
      )}

      <div className="mb-6">
        <label className={labelStyle}><span>▶</span> EMAIL</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={inputStyle} 
          required 
        />
        <p className="text-[10px] font-mono text-gray-500 mt-2">
          We'll send a password recovery link to this email if it matches an existing account.
        </p>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full bg-[#DDC8F8] border-2 border-black p-4 rounded-xl font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? "SENDING..." : "▶ SEND RESET LINK"}
      </button>
    </form>
  );
}