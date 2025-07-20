import { create } from "zustand";

interface PremiumPlusModelState {
  open: boolean;
  setPremiumPlusOpen: (open: boolean) => void;
}

const usePremiumPlusModel = create<PremiumPlusModelState>((set) => ({
  open: false,
  setPremiumPlusOpen(open) {
    set({ open });
  },
}));

export default usePremiumPlusModel;
