import { create } from "zustand"

interface ToastStore {
  showToast: boolean
  setToast: (value: boolean) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  showToast: false,
  setToast: (value) => set({ showToast: value }),
}))