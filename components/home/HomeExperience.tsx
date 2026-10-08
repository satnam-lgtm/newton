"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ResponsiveHome } from "./ResponsiveHome";
import { ScrollRocket } from "./ScrollRocket";

/** The canvas is heavy and desktop-only, so it is never sent to phones. */
const FlightExperience = dynamic(
  () => import("@/components/flight/FlightExperience").then((m) => m.FlightExperience),
  { ssr: false },
);

/**
 * Chooses how to present the home page.
 *
 * The flight canvas is authored at a fixed 1440px and cannot reflow — below
 * about a laptop width it would scale down to illegibility. So narrow screens
 * get `ResponsiveHome`, which tells the same fourteen-stage story in ordinary
 * flowed layout.
 *
 * `ResponsiveHome` is also what renders on the server for every device: the
 * full narrative is then in the initial HTML for crawlers and for anyone
 * whose JavaScript has not arrived, and wide screens upgrade to the canvas
 * once mounted.
 *
 * Narrow screens still get the rocket: `ScrollRocket` flies it down a
 * trajectory generated to fit the reflowed document, so the scroll-driven
 * flight survives on phones and tablets even though the artboard does not.
 */
export function HomeExperience() {
  const wideEnough = useMediaQuery("(min-width: 1024px)");

  if (wideEnough) return <FlightExperience />;

  return (
    <>
      <SiteHeader />
      {/* The footer is inside the track so the trajectory spans the whole
          page and the rocket stays in view right to the bottom. */}
      <ScrollRocket>
        <ResponsiveHome />
        <SiteFooter />
      </ScrollRocket>
    </>
  );
}
