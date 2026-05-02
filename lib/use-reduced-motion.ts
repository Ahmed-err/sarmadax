"use client";

import { useEffect, useState } from "react";

// Reads `prefers-reduced-motion` and stays in sync with OS-level changes.
// Defaults to `false` on the first render so SSR markup is stable; the real
// value is applied after mount.
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefers(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return prefers;
}
