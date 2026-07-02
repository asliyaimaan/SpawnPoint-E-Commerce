'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import EditForm from "@/components/edit/EditForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EditPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase
        .from("users")
        .select("id, username, avatar_id, avatars(id, avatar_url)")
        .eq("id", user.id)
        .single();
      const { data: allAvatars } = await supabase.from("avatars").select("*");
      setData({ profile, allAvatars, email: user.email });
      setLoading(false);
    }
    fetchData();
  }, [router]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 pt-20 md:pt-24 bg-[#FDFBF7] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
      
      {/* Container aligned to left, same width as form */}
      <div className="w-full max-w-2xl mb-12">
        {/* Left aligned button */}
        <div className="inline-block bg-[#FDFD96] border-2 border-black px-4 py-1 mb-6 font-mono text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          ▶ EDIT PROFILE
        </div>
        
        {/* Header text left-aligned with consistent gap */}
        <div className="space-y-2">
          <h1 className="text-4xl font-mono font-bold">
            Update your <span className="text-[#B892FF]">save file.</span>
          </h1>
          <p className="font-mono text-gray-600">
            Change your avatar, username, or password. Email is locked.
          </p>
        </div>
      </div>
      
      {/* The form, with extra bottom padding in the main to prevent clipping */}
      <div className="w-full max-w-2xl mb-24">
        <EditForm profile={data.profile} allAvatars={data.allAvatars} email={data.email} />
      </div>
      
    </main>
  );
}