// src/components/product/NoReviews.tsx
import Image from "next/image";

export default function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-300 rounded-[24px]">
      <div className="relative w-16 h-16 mb-4">
        <Image 
          src="https://esmcaeovdxcriamenysu.supabase.co/storage/v1/object/public/pictures/CommentBubble.png"
          alt="No comments"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-mono font-bold text-lg text-black">No reviews yet</h3>
      <p className="font-mono text-sm text-gray-500">Be the first to give a review.</p>
    </div>
  );
}