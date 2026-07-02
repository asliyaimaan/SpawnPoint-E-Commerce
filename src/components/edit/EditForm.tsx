'use client';
import { useState } from 'react';
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function EditForm({ profile, allAvatars, email }: any) {
  const router = useRouter();
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatar_id);
  const [showPicker, setShowPicker] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const inputStyle = "w-full border-2 border-black p-3 font-mono rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none transition-all outline-none";

  const handleSave = async () => {
    // 1. Password Match Validation
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 2. Update user profile
    const { error } = await supabase
      .from('users')
      .update({ username, avatar_id: selectedAvatarId })
      .eq('id', profile.id);

    if (error) { alert("Error: " + error.message); return; }

    // 3. Update password
    if (password) {
      const { error: pError } = await supabase.auth.updateUser({ password });
      if (pError) { alert("Auth error: " + pError.message); return; }
    }

    router.push('/profile');
  };

  return (
    <div className="w-full max-w-2xl border-2 border-black bg-white rounded-3xl p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-10 relative">
        <div className="relative w-32 h-32">
          <Image 
            src={allAvatars.find((a: any) => a.id === selectedAvatarId)?.avatar_url}
            width={128} height={128} alt="Avatar" className="rounded-full border-2 border-black object-cover"
          />
          {/* Corrected button: w-10 h-10 ensures perfect circle, flex centers the icon */}
          <button type="button" onClick={() => setShowPicker(!showPicker)} 
            className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-[#FDFD96] border-2 border-black rounded-full cursor-pointer hover:bg-yellow-200">
            ✎
          </button>
        </div>

        {showPicker && (
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-8 p-6 border-2 border-black rounded-xl">
            {allAvatars.map((a: any) => (
              <button key={a.id} type="button" onClick={() => setSelectedAvatarId(a.id)} 
                className="cursor-pointer hover:scale-105 transition-transform">
                <Image src={a.avatar_url} width={60} height={60} alt="pick" className="rounded-full border-2 border-black"/>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        {/* Standard Fields */}
        <div>
          <label className="text-xs font-mono font-bold uppercase mb-2 block">▶ Email (locked)</label>
          <input disabled value={email} className={`${inputStyle} bg-gray-100 cursor-not-allowed`} />
        </div>
        <div>
          <label className="text-xs font-mono font-bold uppercase mb-2 block">▶ Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-mono font-bold uppercase mb-2 block">▶ New Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} className={inputStyle} />
        </div>
        <div>
          <label className="text-xs font-mono font-bold uppercase mb-2 block">▶ Confirm Password</label>
          <input type="password" onChange={e => setConfirmPassword(e.target.value)} className={inputStyle} />
        </div>

        {/* Button Row */}
        <div className="flex gap-4 pt-2">
          <Button label="← Back" href="/profile" color="#C1F8F2" />
          <button onClick={handleSave} className="flex-1 bg-[#DDC8F8] border-2 border-black p-3 rounded-xl font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase cursor-pointer">
            ▶ SAVE CHANGES
          </button>
        </div>

        {/* Logout */}
        <button onClick={async () => {
          await supabase.auth.signOut();
          router.push('/login');
        }} className="w-full bg-[#FDFD96] border-2 border-black p-3 rounded-xl font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase cursor-pointer">
          ▶ LOGOUT
        </button>

        {/* Danger Zone */}
        <div className="border-t-2 border-black pt-8">
          <h3 className="text-sm font-mono font-bold uppercase mb-6 text-red-600">▶ Danger Zone</h3>
          <div className="mb-6">
            <label className="text-xs font-mono font-bold uppercase mb-2 block">▶ Enter password to confirm delete</label>
            <input type="password" onChange={e => setDeletePassword(e.target.value)} className={inputStyle} />
          </div>
          
          <button onClick={async () => {
            // 1. First, verify the user's password
            const { error: verifyError } = await supabase.auth.signInWithPassword({
              email: email, 
              password: deletePassword // Use the new dedicated state
            });

            if (verifyError) {
              alert("Password incorrect. Please try again.");
              return;
            }

            // 2. If password is correct, proceed to delete
            if (confirm("Are you sure? This action cannot be undone.")) {
              // NOTE: This must call a Server Action or Edge Function
              // Replace this with your secure API route/Server Action
              const { error: deleteError } = await supabase.rpc('delete_user_securely');
              
              if (deleteError) {
                alert("Error deleting account: " + deleteError.message);
              } else {
                await supabase.auth.signOut();
                router.push('/login');
              }
            }
          }} className="w-full bg-red-400 border-2 border-black p-3 rounded-xl font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase cursor-pointer">
            ▶ DELETE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
}