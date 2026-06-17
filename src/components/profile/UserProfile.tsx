import Image from "next/image";
import Button from "../ui/Button";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserProfileProps {
  profile: {
    username: string;
    xp_points: number;
    avatar_url: string;
  };
}

export default function UserProfile({
  profile,
}: UserProfileProps) {
  return (
    <section className="max-w-5xl mx-auto">
      {/* Fake Button */}
      <div className="inline-flex items-center gap-2 bg-[#FDFD96] border-2 border-black rounded-xl px-5 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase font-mono font-bold text-sm">
        ▶ Player Profile
      </div>

      <h1 className="text-4xl font-bold mt-8 mb-8">
        Your stats
      </h1>

      <div className="bg-white border-2 border-black rounded-[30px] p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-10">
        
        {/* LEFT SIDE */}
        <div className="flex-1">
          <p className="uppercase tracking-widest text-sm font-bold text-slate-600 mb-3">
            ▸ Username
          </p>

          <h2 className="font-mono text-4xl mb-8">
            {profile.username}
          </h2>

          <hr className="mb-8 text-zinc-300" />

          <p className="uppercase tracking-widest text-sm font-bold text-slate-600 mb-4">
            ▸ XP Points
          </p>

          {/* Decorative XP Button */}
          <div className="inline-flex items-center gap-3 bg-[#C1F8F2] border-2 border-black rounded-xl px-6 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono font-bold text-l">
            ★ {profile.xp_points.toLocaleString()} XP
          </div>

          <div className="mt-10">
            <Button
              label="Edit Profile"
              href="/edit"
              color="#FDFD96"
              icon={<FontAwesomeIcon icon={faPencil} className="text-xs" />}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center">
            <div className="border-3 border-black rounded-full">
                <Image
                src={profile.avatar_url || "/default-pfp.png"}
                alt="Profile Avatar"
                width={220}
                height={220}
                className="rounded-full object-cover w-[220px] h-[220px]"
                />
            </div>
        </div>
      </div>
    </section>
  );
}