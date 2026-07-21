import { create } from 'zustand';

interface ToastStore {
  message: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: null,
  showToast: (msg) => {
    set({ message: msg });
    setTimeout(() => set({ message: null }), 3000); // Disappears after 3s
  },
  hideToast: () => set({ message: null }),
}));