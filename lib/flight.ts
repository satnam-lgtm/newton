/**
 * Geometry and copy for the "Full flight" hero canvas.
 *
 * The canvas is a fixed 1440 x 13260 coordinate space. The rocket is
 * positioned by arc length along a single SVG path (`FLIGHT_PATH`), and each
 * stage has an ENTRY point on that path which the scroll position maps onto.
 */

export const CANVAS_WIDTH = 1440;
export const CANVAS_HEIGHT = 13260;
export const VIEWPORT_HEIGHT = 900;

export const STAGE_NAMES = [
  "Home",
  "Your Brand, Our Focus",
  "Free Growth Audit",
  "Services",
  "Ad Partners",
  "How We Work",
  "Landing Pages & CRO",
  "Tracking & Quality",
  "Media Buying",
  "Remarketing",
  "Numbers",
  "Live Dashboards",
  "Blog",
  "Let’s Talk",
] as const;

/** Scroll offset at which each stage begins. */
export const STAGE_TOPS = [
  0, 900, 1800, 2600, 3600, 4500, 5500, 6500, 7400, 8400, 9500, 10400, 11300,
  12100,
] as const;

/** Canvas coordinate at which the flight path enters each stage. */
export const STAGE_ENTRY: ReadonlyArray<readonly [number, number]> = [
  [720, 434],
  [1400, 900],
  [620, 1800],
  [1330, 2600],
  [70, 3600],
  [1240, 4500],
  [300, 5500],
  [900, 6500],
  [1380, 7400],
  [700, 8400],
  [160, 9500],
  [1390, 10400],
  [110, 11300],
  [1360, 12100],
];

/**
 * Shift every y-coordinate in a path fragment by `dy`.
 *
 * The tail of the flight path was authored 200px lower than it sits in the
 * final composition; rather than rewrite the curve by hand, the original
 * design offsets it programmatically. Kept as-is so the curve is identical.
 */
function shiftY(d: string, dy: number): string {
  return d
    .replace(/([MLCSQTA])([^MLCSQTA]*)/g, (_m, cmd: string, args: string) => {
      const n = args.trim().split(/[\s,]+/).filter(Boolean).map(Number);
      if (cmd === "A") {
        // Arc: only the final x,y pair of each 7-tuple is a coordinate.
        for (let i = 6; i < n.length; i += 7) n[i] += dy;
      } else {
        for (let i = 1; i < n.length; i += 2) n[i] += dy;
      }
      return cmd + n.join(" ") + " ";
    })
    .trim();
}

const PATH_HEAD = [
  "M720 434 L720 250 C720 205 745 180 800 180 L1290 180 C1365 180 1400 215 1400 290 L1400 900",
  "C1400 1160 1000 1250 700 1340 S300 1520 420 1680 C470 1745 620 1720 620 1800",
  "C620 1980 820 2060 820 2200 A190 190 0 1 0 1200 2200 A190 190 0 1 0 820 2200 A190 190 0 0 0 1144 2334 L1300 2490 C1330 2520 1330 2560 1330 2600",
];

const PATH_TAIL = [
  "L1330 2950 C1330 2990 1300 3010 1240 3010 L200 3010 C110 3010 70 3050 70 3140 L70 3800",
  "L70 4300 C70 4430 200 4470 380 4470 C460 4470 480 4400 540 4410 C610 4422 560 4500 640 4490 C720 4480 740 4410 800 4430 C850 4448 840 4500 780 4512 C700 4528 560 4520 500 4505 C700 4545 1000 4560 1240 4600 L1240 4700",
  "L880 4900 L1220 5080 L860 5260 C760 5313 300 5400 300 5560 L300 5700",
  "C300 5800 260 5900 260 6060 Q260 6200 320 6200 L320 5860 Q320 5840 340 5840 L860 5840 Q880 5840 880 5860 L880 6200 L320 6200 L250 6236 L250 6250 L950 6250 C1000 6250 980 6450 900 6700",
  "C900 6800 300 6850 300 7060 L560 7340 L1180 6820 C1260 6750 1380 6800 1380 6950 L1380 7600",
  "C1380 7700 760 7660 740 7800 L700 8600",
  "C700 8750 640 8850 720 8850 A300 300 0 1 1 720 9450 A300 300 0 1 1 720 8850 A300 300 0 0 1 1020 9150 C1020 9400 600 9500 160 9700",
  "L160 10420 C600 10420 900 10400 1060 10250 C1180 10130 1260 9980 1300 9820 C1330 9760 1390 9800 1390 9900 L1390 10600",
  "C1390 10700 1300 10780 1180 10780 C1080 10780 1040 10860 940 10860 S800 10780 700 10780 S560 10860 460 10860 S320 10780 220 10780 C150 10780 110 10840 110 10920 L110 11500",
  "C110 11560 140 11600 220 11600 C285 11600 315 11570 380 11570 S475 11630 540 11630 S635 11570 700 11570 S795 11630 860 11630 S955 11570 1020 11570 S1115 11630 1180 11630 S1275 11600 1300 11600 C1340 11600 1360 11640 1360 11720 L1360 12300",
  "C1360 12460 1140 12420 720 12420 C240 12420 150 12660 320 12860 C440 13000 720 12930 720 13051",
];

export const FLIGHT_PATH =
  PATH_HEAD.join(" ") +
  " " +
  PATH_TAIL.map((s) => shiftY(s, -200)).join(" ");

/**
 * Deterministic star field, emitted as a single `box-shadow` value so a whole
 * layer of stars costs one DOM node. Uses the same seeded PRNG (mulberry32)
 * as the design so the constellations are pixel-identical.
 */
export function starField(
  count: number,
  width: number,
  height: number,
  seed: number,
  size: number,
  alphaMin: number,
  alphaMax: number,
): string {
  let s = seed;
  const rand = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * width - 30);
    const y = Math.round(rand() * height - 30);
    const a = (alphaMin + rand() * (alphaMax - alphaMin)).toFixed(2);
    out.push(`${x}px ${y}px 0 ${size}px rgba(245,245,242,${a})`);
  }
  return out.join(", ");
}

export const STAR_FIELDS = {
  a: starField(170, 1500, 960, 7, 0, 0.18, 0.55),
  b: starField(60, 1500, 960, 21, 0, 0.3, 0.75),
  c: starField(16, 1500, 960, 99, 1, 0.5, 0.95),
  s: starField(120, 1500, 1100, 42, 0, 0.15, 0.6),
};

export const pad2 = (n: number) => (n < 10 ? "0" : "") + n;
