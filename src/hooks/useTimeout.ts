import { useRef, useEffect, useCallback } from "react";

export function useTimeout() {
  const timeoutRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const set = useCallback(
    (callback: () => void, delay: number) => {
      // Clear any existing timeout
      clear();
      // Set new timeout
      timeoutRef.current = window.setTimeout(callback, delay);
    },
    [clear]
  );

  // Cleanup on unmount
  useEffect(() => {
    return clear;
  }, [clear]);

  return { set, clear };
}
