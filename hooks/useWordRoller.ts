"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The rolling word in the headline ("brands / leads / sales / ...").
 *
 * The list is duplicated at the end (…revenue, brands) so the roll can run
 * past the last item and then snap back to index 0 without a visible jump.
 * Widths are measured after fonts load so the highlight box can animate to
 * each word's exact width.
 */
export function useWordRoller(wordCount: number, reducedMotion: boolean) {
  const rollRef = useRef<HTMLSpanElement | null>(null);
  const [index, setIndex] = useState(0);
  const [snap, setSnap] = useState(false);
  const [widths, setWidths] = useState<number[] | null>(null);

  // Measure each word once the webfont is ready.
  useEffect(() => {
    const measure = () => {
      const el = rollRef.current;
      if (!el) return;
      const ws = Array.from(el.children).map((c) => (c as HTMLElement).offsetWidth);
      if (ws.length && ws[0] > 0) setWidths(ws);
    };
    measure();
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 1800);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Advance after the intro has played out.
  useEffect(() => {
    const snapBack: ReturnType<typeof setTimeout>[] = [];
    const begin = setTimeout(
      () => {
        const id = setInterval(() => {
          setIndex((prev) => {
            const next = prev + 1;
            if (reducedMotion) {
              setSnap(true);
              return next % wordCount;
            }
            setSnap(false);
            if (next === wordCount) {
              // Landed on the duplicate: let it settle, then snap to 0.
              snapBack.push(
                setTimeout(() => {
                  setSnap(true);
                  setIndex(0);
                  snapBack.push(setTimeout(() => setSnap(false), 80));
                }, 800),
              );
            }
            return next;
          });
        }, 2500);
        snapBack.push(id as unknown as ReturnType<typeof setTimeout>);
      },
      reducedMotion ? 600 : 3200,
    );

    return () => {
      clearTimeout(begin);
      snapBack.forEach((t) => {
        clearTimeout(t);
        clearInterval(t as unknown as ReturnType<typeof setInterval>);
      });
    };
  }, [reducedMotion, wordCount]);

  const ease = "cubic-bezier(.75,0,.2,1)";
  const still = snap || reducedMotion;

  return {
    rollRef,
    index,
    slotWidth: widths ? `${widths[Math.min(index, widths.length - 1)]}px` : "auto",
    slotTransition: still ? "none" : `width .75s ${ease}`,
    rollTransform: `translateY(${(-0.9 * index).toFixed(2)}em)`,
    rollTransition: still ? "none" : `transform .75s ${ease}`,
  };
}
