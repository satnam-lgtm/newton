"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

/**
 * The design's two palettes are carried by the `.night` / `.day` classes, so
 * next-themes writes the theme name straight onto <html> as a class.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="night"
      enableSystem={false}
      themes={["night", "day"]}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemes>
  );
}
