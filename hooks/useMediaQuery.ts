"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query on the client.
 *
 * Returns `false` during server rendering and on the first client render, so
 * the server and the browser always agree on the initial markup.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
