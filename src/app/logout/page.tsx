'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      // Use a join to get the avatar_url from the related table
      const { data } = await supabase
        .from('users')
        .select(`
          username,
          avatars ( avatar_url )
        `)
        .eq('id', user.id)
        .single();
      
      // Note: data.avatars will be an object { avatar_url: '...' }
      setProfile({ ...data, email: user.email });
    }
    getProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] p-6">
      
      {profile && (
        <div className="bg-white p-6 border-2 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 text-center font-mono w-full max-w-sm">
          <h2 className="font-bold uppercase mb-4">▶ CURRENT SESSION</h2>
          <img 
            src={profile.avatars?.avatar_url || 'https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/profile%20pics/pfp0.jpg'} 
            alt="PFP" 
            className="w-20 h-20 mx-auto rounded-full border-2 border-black mb-4" 
          />
          <p><strong>USER:</strong> {profile.username}</p>
          <p><strong>EMAIL:</strong> {profile.email}</p>
        </div>
      )}

      <button 
        onClick={handleLogout}
        className="bg-[#FF9292] border-2 border-black p-6 rounded-xl font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer uppercase"
      >
        ▶ EXIT SAVE FILE (LOGOUT)
      </button>
    </main>
  );
}