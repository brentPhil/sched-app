import { create } from "zustand";

interface NewSchedStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenChange: (isOpen: boolean | undefined) => void
}

const useNewSched = create<NewSchedStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenChange: (isOpen) => set({ isOpen }),
}))

export default useNewSched
