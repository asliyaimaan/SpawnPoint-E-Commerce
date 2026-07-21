'use client';
import { useToastStore } from '@/store/useToastStore';

export default function ToastNotification() {
  const { message } = useToastStore();

  // Debug: check if the component renders
  console.log("Current Toast Message:", message);

  if (!message) return null;

  return (
    <div className="fixed top-5 left-5 z-[9999] bg-red-500 text-white px-6 py-3 rounded-lg font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
      {message}
    </div>
  );
}