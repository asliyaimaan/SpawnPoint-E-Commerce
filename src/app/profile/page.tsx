'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import UserProfile from '@/components/profile/UserProfile';
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('users')
        .select(`
          username,
          xp_points,
          avatars (
            avatar_url
          )
        `)
        .eq('id', user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }

    getProfile();
  }, [router]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-[#FDFBF7] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] p-6 md:p-10">
      <UserProfile profile={profile} />
    </main>
  );
}