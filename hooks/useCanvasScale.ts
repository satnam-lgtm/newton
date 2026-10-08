"use client";

import { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, VIEWPORT_HEIGHT } from "@/lib/flight";

const MAX_SCROLL = CANVAS_HEIGHT - VIEWPORT_HEIGHT;

/**
 * The flight canvas is authored at a fixed 1440 x 900 viewport. Rather than
 * reflow a design whose every element is absolutely positioned (and whose
 * rocket follows coordinates in that space), we scale the whole canvas
 * uniformly and reserve its full scroll travel in the document.
 *
 * Scale is "contain": the smaller of the width and height ratios, so the
 * canvas always fits entirely and nothing is ever cropped. A 16:10 artboard
 * in a window of a different ratio must leave slack somewhere; the pinned
 * area is the full viewport and the canvas is centred inside it, so that
 * slack is balanced framing in the same background colour rather than a
 * strip hanging off one edge.
 */
export function useCanvasScale() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(VIEWPORT_HEIGHT);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const w = host.clientWidth;
      // visualViewport tracks mobile browser chrome collapsing; innerHeight
      // is the fallback and is correct on desktop.
      const h = window.visualViewport?.height ?? window.innerHeight;
      if (!w || !h) return;
      // Never scale up past the authored size: a wide monitor shows the
      // design at 1:1, which is how it was composed.
      setScale(Math.min(1, w / CANVAS_WIDTH, h / VIEWPORT_HEIGHT));
      setViewportHeight(h);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, []);

  return {
    hostRef,
    scale,
    /** Height of the pinned area: the whole viewport, so nothing shows under it. */
    viewportHeight,
    maxScroll: MAX_SCROLL,
    /** Total document height the canvas occupies. */
    stageHeight: Math.round(viewportHeight + MAX_SCROLL * scale),
  };
}
