"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Three staggered 0 -> 1 progress values for the floating metric cards.
 * Returns [1,1,1] immediately when motion is reduced.
 */
export function useCountUp(reducedMotion: boolean, delay = 2400) {
  const [p, setP] = useState<[number, number, number]>([0, 0, 0]);
  const raf = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      setP([1, 1, 1]);
      return;
    }

    const start = setTimeout(() => {
      const t0 = performance.now();
      const step = (now: number) => {
        const t = now - t0;
        const next = [0, 1, 2].map((i) => {
          const x = Math.min(1, Math.max(0, (t - i * 150) / 1100));
          return 1 - Math.pow(1 - x, 3); // ease-out cubic
        }) as [number, number, number];
        setP(next);
        if (t < 1450) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf.current);
    };
  }, [reducedMotion, delay]);

  return p;
}
