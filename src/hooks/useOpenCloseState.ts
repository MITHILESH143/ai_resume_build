import { create } from "zustand";

interface openCloseState {
  open: boolean;
  setOpenCloseState: (open: boolean) => void;
}

const useOpenCloseState = create<openCloseState>((set) => ({
  open: false,
  setOpenCloseState(open) {
    set({ open });
  },
}));

export default useOpenCloseState
;
