import { create } from "zustand";

type MenuItemModalStore = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useMenuItemModal = create<MenuItemModalStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: "" }),
}));
