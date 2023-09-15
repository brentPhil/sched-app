import { create } from "zustand"
interface NewSchedStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onOpenChange: (isOpen: boolean | undefined) => void
}

export const useNewSched = create<NewSchedStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenChange: (isOpen) => set({ isOpen }),
}))

interface ViewSchedStore {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (isOpen: boolean | undefined) => void
  id: string | null
  userid: any
  viewSched: (id: string | null) => void
  onSelectUser: (userid: any) => void
}

export const useViewSched = create<ViewSchedStore>((set) => ({
  isOpen: false,
  id: null,
  userid: undefined,
  onSelectUser: (userid) => set({ userid }),
  onClose: () => set({ isOpen: false, id: null }),
  onOpenChange: (isOpen) => set({ isOpen }),
  viewSched: (id) => {
    set({ isOpen: true, id })
  },
}))
