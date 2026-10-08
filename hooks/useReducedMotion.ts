"use client";

import { useEffect, useState } from "react";

/** Tracks `prefers-reduced-motion`, with an optional hard override. */
export function useReducedMotion(force = false): boolean {
  const [reduced, setReduced] = useState(force);

  useEffect(() => {
    if (force) {
      setReduced(true);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [force]);

  return reduced;
}
