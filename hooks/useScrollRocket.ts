"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Flies the rocket down a reflowed page.
 *
 * The desktop canvas interpolates along a hand-authored 13260px path. That
 * path is tied to artboard coordinates and cannot survive reflow, so here the
 * trajectory is generated to fit whatever the document turns out to be: a
 * weave between two columns, spanning the page, rebuilt whenever the document
 * resizes.
 *
 * The motion model is the same one the canvas uses, so both presentations
 * feel like the same rocket: scroll sets a target arc length, a critically
 * damped spring eases toward it, the nose follows the tangent and the flame
 * tracks speed.
 */

/** How far down the viewport the rocket rides, as a fraction of its height. */
const RIDE = 0.58;
/** Vertical distance between direction changes. */
const WEAVE_SPAN = 760;
/** Maximum bank angle, in degrees, as the rocket crosses between lanes. */
const MAX_BANK = 24;
/** Below this width the rocket stays in the gutter instead of weaving. */
const WEAVE_MIN_WIDTH = 640;

export type RocketTelemetry = {
  /** Mission progress, 0-100. */
  progress: number;
  moving: boolean;
};

/**
 * Inverts the sample table: the arc length at which the path reaches `y`.
 * The trajectory only ever descends, so the samples are monotonic and a
 * binary search is exact.
 */
function lengthAtY(
  ys: Float64Array,
  step: number,
  total: number,
  y: number,
): number {
  const n = ys.length;
  if (y <= ys[0]) return 0;
  if (y >= ys[n - 1]) return total;
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] <= y) lo = mid;
    else hi = mid;
  }
  const span = ys[hi] - ys[lo];
  const f = span > 0 ? (y - ys[lo]) / span : 0;
  return Math.min(total, (lo + f) * step);
}

export function useScrollRocket(enabled: boolean, reducedMotion: boolean) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const flameRef = useRef<HTMLDivElement | null>(null);

  const [path, setPath] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });
  /** Bumped whenever the trajectory is rebuilt, so the loop re-samples it. */
  const pathVersion = useRef(0);
  const [telemetry, setTelemetry] = useState<RocketTelemetry>({
    progress: 0,
    moving: false,
  });

  const eng = useRef({
    length: 0,
    /** Arc length sampled every `sampleStep`, with the y reached at each. */
    sampleY: null as Float64Array | null,
    sampleStep: 8,
    /** Which build of the path `sampleY` was taken from. */
    sampledVersion: -1,
    cur: 0,
    vel: 0,
    flame: 0.3,
    target: 0,
    angle: undefined as number | undefined,
    lastFrame: 0,
    lastReport: 0,
    stillFor: 0,
  });

  const rmRef = useRef(reducedMotion);
  rmRef.current = reducedMotion;

  /**
   * Builds the trajectory for the current document.
   *
   * Starts under the hero, weaves between a left and a right lane, and ends
   * above the footer. Lanes are inset from the edges so the rocket never
   * covers the text column on a narrow screen.
   */
  const build = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const w = track.clientWidth;
    const h = track.scrollHeight;
    if (!w || !h) return;

    const vh = window.innerHeight || 800;
    const startY = vh * RIDE;
    // End where the last scroll position puts the rocket, so its height in
    // the viewport stays constant all the way to the bottom of the page
    // instead of the path running out underneath it.
    const endY = Math.max(startY + 200, h - vh + startY);

    // On a phone the text column is the full width, so a rocket weaving
    // across it would sit on top of the copy. Below the weave threshold it
    // stays in the right-hand gutter instead, half off the edge, drifting
    // just enough to feel alive. Wider screens have margins to fly in.
    const weaves = w >= WEAVE_MIN_WIDTH;
    const lanes: [number, number] = weaves
      ? [Math.max(44, w * 0.15), Math.min(w - 44, w * 0.85)]
      : [w - 34, w - 10];

    const span = weaves ? WEAVE_SPAN : WEAVE_SPAN * 0.7;
    const segments = Math.max(2, Math.round((endY - startY) / span));
    const step = (endY - startY) / segments;

    const startX = weaves ? w / 2 : lanes[0];
    let d = `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    let y = startY;
    for (let i = 0; i < segments; i++) {
      const from = i === 0 ? startX : i % 2 ? lanes[0] : lanes[1];
      const to = i % 2 ? lanes[1] : lanes[0];
      const nextY = y + step;
      // Cubic with vertical control handles: the curve leaves and arrives
      // travelling downward, so the nose never swings wildly sideways.
      d +=
        ` C ${from.toFixed(1)} ${(y + step * 0.45).toFixed(1)}` +
        ` ${to.toFixed(1)} ${(nextY - step * 0.45).toFixed(1)}` +
        ` ${to.toFixed(1)} ${nextY.toFixed(1)}`;
      y = nextY;
    }

    setPath((prev) => {
      if (prev === d) return prev;
      pathVersion.current += 1;
      return d;
    });
    setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, []);

  // Rebuild on mount and whenever the document changes shape. Images and
  // webfonts land after first paint, so the first height is rarely final.
  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    build();
    const ro = new ResizeObserver(build);
    ro.observe(track);
    window.addEventListener("resize", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [build, enabled]);

  // Deliberately depends only on `enabled`: restarting this loop resets the
  // frame clock, and a loop that restarts often never accumulates real time.
  // It reads the path through `pathRef` and re-samples when the version
  // counter moves.
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const wrap = (x: number) => {
      while (x > 180) x -= 360;
      while (x < -180) x += 360;
      return x;
    };
    const ease = (x: number) => {
      x = Math.min(1, Math.max(0, x));
      return x * x * (3 - 2 * x);
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const el = pathRef.current;
      const rocket = rocketRef.current;
      if (!el || !rocket) return;

      const E = eng.current;
      if (!E.sampleY || E.sampledVersion !== pathVersion.current) {
        E.length = el.getTotalLength();
        if (!E.length) return;
        E.sampledVersion = pathVersion.current;
        // Sample the path once so scroll can be mapped to a vertical
        // position rather than to raw arc length. The two are not
        // proportional: every weave adds horizontal travel, so equal steps
        // of arc length cover shrinking amounts of page.
        const n = Math.ceil(E.length / E.sampleStep) + 1;
        const ys = new Float64Array(n);
        for (let i = 0; i < n; i++) {
          ys[i] = el.getPointAtLength(Math.min(E.length, i * E.sampleStep)).y;
        }
        E.sampleY = ys;
      }

      if (!E.lastFrame) {
        E.lastFrame = t;
        return;
      }
      let dt = (t - E.lastFrame) / 1000;
      E.lastFrame = t;
      if (dt > 0.05) dt = 0.05; // a backgrounded tab must not fling the rocket

      // Keep the rocket at a fixed height in the viewport, then let the
      // spring lag and overshoot around it.
      E.target = lengthAtY(E.sampleY, E.sampleStep, E.length, window.scrollY + window.innerHeight * RIDE);

      const reduced = rmRef.current;
      if (reduced) {
        E.vel = 0;
        E.cur = E.target;
      } else {
        const k = 38;
        const c = 2 * Math.sqrt(k); // critically damped: no overshoot
        E.vel += (k * (E.target - E.cur) - c * E.vel) * dt;
        // Cap relative to the path's own length rather than at a fixed
        // pixel rate: a jump to an anchor or back to the top should still
        // resolve in about a second, whatever the document's height.
        const cap = Math.max(2400, E.length);
        E.vel = Math.max(-cap, Math.min(cap, E.vel));
        E.cur += E.vel * dt;
      }
      E.cur = Math.max(0, Math.min(E.length, E.cur));

      const pt = el.getPointAtLength(E.cur);
      const ahead = el.getPointAtLength(Math.min(E.length, E.cur + 40));
      const behind = el.getPointAtLength(Math.max(0, E.cur - 20));

      // The rocket banks into the weave but always stays nose-up.
      //
      // The desktop canvas points the nose along the tangent, which works
      // because that path loops and climbs. Here the trajectory only ever
      // descends, so a true tangent would hold the rocket upside down for
      // the whole page. Instead the horizontal component of the tangent
      // drives a limited bank, which reads as a rocket climbing past the
      // content while the page scrolls down.
      const dx = ahead.x - behind.x;
      const dy = Math.max(1, Math.abs(ahead.y - behind.y));
      let tgt = Math.max(-MAX_BANK, Math.min(MAX_BANK, (dx / dy) * MAX_BANK));
      // Settle upright at launch and at touchdown.
      if (E.cur < 260) tgt *= ease(E.cur / 260);
      if (E.cur > E.length - 300) {
        tgt *= 1 - ease((E.cur - (E.length - 300)) / 300);
      }

      if (E.angle === undefined) E.angle = tgt;
      E.angle = wrap(
        E.angle + wrap(tgt - E.angle) * (reduced ? 1 : 1 - Math.exp(-dt * 5.5)),
      );

      const speed = Math.abs(E.vel);
      E.stillFor = speed < 6 ? E.stillFor + dt : 0;
      const bob =
        !reduced && E.stillFor > 0.3
          ? Math.sin((t / 1000) * 2.2) * 4 * Math.min(1, (E.stillFor - 0.3) * 1.5)
          : 0;

      rocket.style.transform =
        `translate3d(${pt.x.toFixed(1)}px, ${(pt.y + bob).toFixed(1)}px, 0)` +
        ` rotate(${E.angle.toFixed(2)}deg)`;

      const want = 0.3 + Math.min(1, speed / 1200) * 1.9;
      E.flame += (want - E.flame) * Math.min(1, dt * 8);
      if (flameRef.current) {
        flameRef.current.style.transform =
          `scale(${(0.3 + E.flame * 0.4).toFixed(3)}, ${Math.max(0.001, E.flame).toFixed(3)})`;
      }

      // Throttle React updates: the readout does not need 60fps.
      const now = performance.now();
      if (now - E.lastReport > 150) {
        E.lastReport = now;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const progress = Math.round(
          Math.min(1, Math.max(0, window.scrollY / maxScroll)) * 100,
        );
        const moving = speed > 40;
        setTelemetry((prev) =>
          prev.progress === progress && prev.moving === moving
            ? prev
            : { progress, moving },
        );
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  return { trackRef, pathRef, rocketRef, flameRef, path, box, telemetry };
}
