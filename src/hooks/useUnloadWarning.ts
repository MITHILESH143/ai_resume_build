import { useEffect } from "react";

const useUnload = (condition = true) => {
  useEffect(() => {
    if (!condition) return;

    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  },[condition]);
};

export default useUnload;
