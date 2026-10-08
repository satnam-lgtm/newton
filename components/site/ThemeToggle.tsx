"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Before hydration the resolved theme is unknown; render the night icon so
  // the button never flickers between two glyphs.
  const isNight = !mounted || resolvedTheme !== "day";
  const label = isNight ? "Switch to day mode" : "Switch to night mode";

  return (
    <button
      type="button"
      className={className}
      onClick={() => setTheme(isNight ? "day" : "night")}
      aria-label={label}
      title={label}
    >
      {isNight ? <Sun /> : <Moon />}
    </button>
  );
}
