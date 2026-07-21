'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this import path is correct
import Image from "next/image";
import NoReviews from "./NoReviews";

export default function CommentSection({ productId, comments: initialComments = [] }: { productId: string, comments: any[] }) {
  const [comments, setComments] = useState(initialComments);
  const [visibleCount, setVisibleCount] = useState(3); // Start by showing 3
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  // This effect runs whenever the 'error' state changes
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5000ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or error changes
    }
  }, [error]);

  const handlePostComment = async () => {
    setError("");

    // 1. Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setError("Please create an account to add a review");
      return;
    }

    if (!newComment.trim()) return;

    // 2. Insert into Supabase
    const { data, error: insertError } = await supabase
      .from("comments")
      .insert([
        { 
          product_id: productId, 
          user_id: session.user.id, 
          content: newComment 
        }
      ])
      .select("*, users (username, avatar_id)")
      .single();

    if (insertError) {
      console.error(insertError);
      return;
    }

    // 3. Update UI in real-time
    setComments([data, ...comments]);
    setNewComment("");

  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#FDFD96] border-2 border-black px-3 py-1 font-mono text-xs font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg uppercase">
          ★ Reviews
        </div>
        <h2 className="text-2xl font-mono font-bold">Player Comments</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Write a Review Card */}
        <div className="border-2 border-black rounded-[24px] p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-mono font-bold text-lg mb-1">Write a review</h3>
          <p className="font-mono text-xs text-gray-600 mb-4">Rate this item and share your thoughts.</p>
          
          <div className="space-y-4">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 font-mono text-sm shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:outline-none"
              placeholder="Tell other players what you think..."
              rows={4}
            />
            {error && <p className="text-red-500 font-mono text-xs font-bold">{error}</p>}
            <button 
              onClick={handlePostComment}
              className="cursor-pointer w-full bg-[#f5bfff] border-2 border-black px-4 py-3 font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all uppercase"
            >
              Post Review
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <NoReviews />
          ) : (
            <>
              {comments.slice(0, visibleCount).map((comment) => (
                <div key={comment.id} className="border-2 border-black rounded-[24px] p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-black">
                        <Image 
                          src={comment.users.avatars?.avatar_url || "/default-avatar.png"} 
                          alt={comment.users.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-mono font-bold">{comment.users.username}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-mono text-sm mt-2 text-gray-600">{comment.content}</p>
                </div>
              ))}

              {/* Load More Button */}
              {visibleCount < comments.length && (
                <button 
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="cursor-pointer w-full py-2 font-mono text-xs font-bold uppercase underline text-gray-500 hover:text-[#B892FF] transition-colors"
                >
                  Load more reviews
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}