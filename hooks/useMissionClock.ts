"use client";

import { useEffect, useState } from "react";

/** Local wall clock for the mission-control strip. */
export function useMissionClock() {
  // Rendered empty on the server so the markup matches on hydration.
  const [clock, setClock] = useState({ time: "--:--:--", tz: "" });

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      let tz = "";
      try {
        const part = new Intl.DateTimeFormat("en-GB", { timeZoneName: "short" })
          .formatToParts(d)
          .find((x) => x.type === "timeZoneName");
        tz = part ? part.value.toUpperCase() : "";
      } catch {
        tz = "";
      }
      setClock({ time: d.toLocaleTimeString("en-GB", { hour12: false }), tz });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
