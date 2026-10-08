"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CANVAS_HEIGHT,
  FLIGHT_PATH,
  STAGE_ENTRY,
  STAGE_NAMES,
  STAGE_TOPS,
  VIEWPORT_HEIGHT,
} from "@/lib/flight";

/** Total scroll travel available inside the canvas, in design pixels. */
export const MAX_SCROLL = CANVAS_HEIGHT - VIEWPORT_HEIGHT;

export type FlightPhase = "idle" | "ignite" | "flight";
export type Thrust = "IDLE" | "HOVER" | "THRUST" | "RETURN BURN";

export type FlightState = {
  phase: FlightPhase;
  stage: number;
  /** Mission progress, 0-100. */
  alt: number;
  /** Smoothed scroll velocity in px/s, rounded to the nearest 10. */
  vel: number;
  thrust: Thrust;
  navSolid: boolean;
};

const TRAIL_LENGTH = 28;

/**
 * Drives the rocket.
 *
 * Two coordinate systems meet here. The scroller moves in pixels; the rocket
 * moves in arc length along the flight path. `buildMap` precomputes a
 * monotonic scroll -> arc-length table once the path is in the DOM, and the
 * animation frame then eases the rocket toward the mapped target with a
 * critically damped spring, so flicking the scrollbar never teleports it.
 *
 * All per-frame work writes transforms directly to the DOM. React state is
 * only updated for the HUD readout, and then at most every ~120ms.
 */
export function useFlightEngine(reducedMotion: boolean) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const flameRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [state, setState] = useState<FlightState>({
    phase: "idle",
    stage: 0,
    alt: 0,
    vel: 0,
    thrust: "IDLE",
    navSolid: false,
  });

  /** Hover inputs that brighten the flame without re-rendering. */
  const hover = useRef({ cta: false, rocket: false });

  // Mutable engine state. Kept in one ref so the frame loop never re-binds.
  const eng = useRef({
    totalLength: 0,
    step: 6,
    /** scrollTop at which each sampled point of the path is reached. */
    map: null as Float64Array | null,
    /** arc length at which each stage is entered. */
    entryLength: [] as number[],
    cur: 0,
    vel: 0,
    flame: 0.3,
    targetLength: 0,
    holdUntil: 0,
    ignited: false,
    lastEmit: 0,
    trailIdx: 0,
    scrollVel: 0,
    stillFor: 0,
    scrollTop: 0,
    lastScrollTop: undefined as number | undefined,
    lastScrollAt: 0,
    angle: undefined as number | undefined,
    facing: 1,
    lastFrameAt: 0,
    hudAt: 0,
  });

  const rm = reducedMotion;
  const rmRef = useRef(rm);
  rmRef.current = rm;

  const stateRef = useRef(state);
  stateRef.current = state;

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  /** Inverse of the map: scrollTop -> arc length, by binary search. */
  const lengthFor = useCallback((scrollTop: number) => {
    const s = eng.current.map;
    if (!s) return 0;
    if (scrollTop <= 0.5) return 0;
    let lo = 0;
    let hi = s.length - 1;
    if (scrollTop >= s[hi]) return eng.current.totalLength;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (s[mid] <= scrollTop) lo = mid;
      else hi = mid;
    }
    const span = s[hi] - s[lo];
    const f = span > 0 ? (scrollTop - s[lo]) / span : 1;
    return Math.min(eng.current.totalLength, (lo + f) * eng.current.step);
  }, []);

  /**
   * Builds the scroll -> arc-length table.
   *
   * The raw mapping (`scrollTop = pathY - focus`) is not monotonic, because
   * the path doubles back on itself in several places. We enforce a minimum
   * forward rate `k` in both directions, then box-blur the result so the
   * rocket's speed does not jump at the seams.
   */
  const buildMap = useCallback(() => {
    const path = pathRef.current;
    if (!path) {
      later(buildMap, 200);
      return;
    }
    const L = path.getTotalLength();
    if (!L) {
      later(buildMap, 200);
      return;
    }

    const step = 6;
    const n = Math.ceil(L / step) + 1;
    const xs = new Float64Array(n);
    const ys = new Float64Array(n);
    for (let j = 0; j < n; j++) {
      const p = path.getPointAtLength(Math.min(L, j * step));
      xs[j] = p.x;
      ys[j] = p.y;
    }

    const vh = VIEWPORT_HEIGHT;
    const max = MAX_SCROLL;
    const focus = vh * 0.55; // keep the rocket just above centre
    const k = 0.15; // minimum scroll per unit of arc length
    const topPad = 120;

    const s = new Float64Array(n);
    s[0] = 0;
    for (let j = 1; j < n; j++) {
      s[j] = Math.max(ys[j] - focus, s[j - 1] + k * step);
    }
    for (let j = n - 2; j >= 0; j--) {
      s[j] = Math.min(s[j], s[j + 1] - k * step, ys[j] - topPad);
    }
    s[0] = 0;
    for (let j = 1; j < n; j++) {
      s[j] = Math.min(max, Math.max(s[j], s[j - 1], 0));
    }

    // Box blur over a +/-30 sample window via a prefix sum.
    const R = 30;
    const pre = new Float64Array(n + 1);
    for (let j = 0; j < n; j++) pre[j + 1] = pre[j] + s[j];
    const sm = new Float64Array(n);
    for (let j = 0; j < n; j++) {
      const a = Math.max(0, j - R);
      const b = Math.min(n - 1, j + R);
      sm[j] = (pre[b + 1] - pre[a]) / (b - a + 1);
    }
    sm[0] = 0;
    for (let j = 1; j < n; j++) sm[j] = Math.max(sm[j], sm[j - 1]);
    for (let j = 0; j < n; j++) s[j] = sm[j];
    s[n - 1] = Math.max(s[n - 1], max - 1);

    // Find the arc length nearest each stage's entry coordinate, searching
    // only forward so a path that revisits a region cannot match backwards.
    const entryLength = [0];
    let from = 0;
    for (let i = 1; i < STAGE_ENTRY.length; i++) {
      const [ex, ey] = STAGE_ENTRY[i];
      let best = Infinity;
      let bj = from;
      for (let j = from; j < n; j++) {
        const d = Math.hypot(xs[j] - ex, ys[j] - ey);
        if (d < best) {
          best = d;
          bj = j;
        }
        if (best < 8 && d > best + 40) break;
      }
      entryLength.push(bj * step);
      from = bj + 1;
    }

    eng.current.totalLength = L;
    eng.current.step = step;
    eng.current.map = s;
    eng.current.entryLength = entryLength;
    eng.current.targetLength = lengthFor(eng.current.scrollTop);
  }, [later, lengthFor]);

  /**
   * Feeds the engine a scroll position in canvas pixels. Called from the
   * window scroll listener, which owns the actual scrolling.
   */
  const setScrollTop = useCallback(
    (st: number) => {
      const now = performance.now();
      const E = eng.current;

      if (E.lastScrollTop !== undefined) {
        const dt = Math.max(16, now - E.lastScrollAt);
        E.scrollVel =
          E.scrollVel * 0.6 +
          (Math.abs(st - E.lastScrollTop) / dt) * 1000 * 0.4;
      }
      E.lastScrollTop = st;
      E.lastScrollAt = now;
      E.scrollTop = st;
      E.targetLength = lengthFor(st);

      if (viewportRef.current) viewportRef.current.scrollTop = st;

      // The first scroll lights the engine. The hold keeps the rocket on the
      // pad for the ignition beat before it actually moves.
      if (!E.ignited && st > 2) {
        E.ignited = true;
        E.holdUntil = rmRef.current ? 0 : now + 650;
        setState((s) => ({ ...s, phase: "ignite" }));
        later(() => {
          setState((s) =>
            s.phase === "ignite" ? { ...s, phase: "flight" } : s,
          );
        }, 750);
      }

      const solid = st > 40;
      if (solid !== stateRef.current.navSolid) {
        setState((s) => ({ ...s, navSolid: solid }));
      }
    },
    [later, lengthFor],
  );

  // ── The frame loop ──────────────────────────────────────────────
  useEffect(() => {
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
      const E = eng.current;
      const last = E.lastFrameAt || t;
      let dt = (t - last) / 1000;
      E.lastFrameAt = t;
      if (dt > 0.05) dt = 0.05; // a backgrounded tab must not fling the rocket

      const path = pathRef.current;
      const L = E.totalLength;
      if (!path || !L || dt <= 0) return;

      const now = performance.now();
      const reduced = rmRef.current;
      const target = now < E.holdUntil ? 0 : E.targetLength;

      if (reduced) {
        E.vel = ((target - E.cur) / dt) * 0.3;
        E.cur = target;
      } else {
        const k = 38;
        const c = 2 * Math.sqrt(k); // critically damped: no overshoot
        E.vel += (k * (target - E.cur) - c * E.vel) * dt;
        E.vel = Math.max(-2400, Math.min(2400, E.vel));
        E.cur += E.vel * dt;
      }
      if (E.cur < 0) {
        E.cur = 0;
        if (E.vel < 0) E.vel = 0;
      }
      if (E.cur > L) {
        E.cur = L;
        if (E.vel > 0) E.vel = 0;
      }

      const cur = E.cur;
      const p = path.getPointAtLength(cur);
      const a = path.getPointAtLength(Math.max(0, Math.min(L - 4, cur - 24)));
      const b = path.getPointAtLength(Math.min(L, Math.max(4, cur + 48)));

      if (E.vel > 30) E.facing = 1;
      else if (E.vel < -30) E.facing = -1;

      // Point the nose along the tangent, flipping when flying backwards.
      let tgt = wrap(
        (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI +
          90 +
          (E.facing < 0 ? 180 : 0),
      );
      // Blend to upright on the pad and at touchdown.
      if (cur < 300) tgt = tgt + wrap(0 - tgt) * (1 - ease(cur / 300));
      if (cur > L - 360)
        tgt = tgt + wrap(0 - tgt) * ease((cur - (L - 360)) / 360);

      if (E.angle === undefined) E.angle = tgt;
      E.angle = wrap(
        E.angle + wrap(tgt - E.angle) * (reduced ? 1 : 1 - Math.exp(-dt * 5.5)),
      );
      const ang = E.angle;

      // Large on the pad, small in flight, growing again on approach.
      let sc = cur < 520 ? 1 - 0.68 * ease(cur / 520) : 0.32;
      if (cur > L - 600) sc = 0.32 + 0.13 * ease((cur - (L - 600)) / 600);

      E.stillFor = Math.abs(E.vel) < 6 ? E.stillFor + dt : 0;
      const bob =
        !reduced && cur < L - 4 && E.stillFor > 0.3
          ? Math.sin((t / 1000) * 2.2) *
            (cur < 2 ? 6 : 4) *
            Math.min(1, (E.stillFor - 0.3) * 1.5)
          : 0;

      if (rocketRef.current) {
        rocketRef.current.style.transform =
          `translate(${(p.x - 140).toFixed(1)}px,${(p.y - 220 + bob).toFixed(1)}px)` +
          ` rotate(${ang.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      }

      const speed = Math.abs(E.vel);
      let ft =
        stateRef.current.phase === "ignite"
          ? 2.6
          : 0.3 + Math.min(1, speed / 1600) * 1.9;
      if (hover.current.cta) ft = Math.max(ft, 0.95);
      if (hover.current.rocket) ft = Math.max(ft, 0.65);
      E.flame += (ft - E.flame) * Math.min(1, dt * 8);
      if (flameRef.current) {
        flameRef.current.style.transform = `scale(${(0.3 + E.flame * 0.4).toFixed(3)},${Math.max(0.001, E.flame).toFixed(3)})`;
      }

      // Exhaust puffs, emitted at fixed arc-length intervals so the trail is
      // evenly spaced regardless of frame rate.
      const rad = (ang * Math.PI) / 180;
      const ux = Math.sin(rad);
      const uy = -Math.cos(rad);
      const half = 220 * sc;
      if (
        Math.abs(cur - E.lastEmit) > 22 &&
        !reduced &&
        speed > 40 &&
        cur > 40
      ) {
        E.lastEmit = cur;
        const els = trailRefs.current;
        const el = els[E.trailIdx % TRAIL_LENGTH];
        E.trailIdx++;
        if (el?.animate) {
          el.style.left = `${(p.x - ux * half).toFixed(1)}px`;
          el.style.top = `${(p.y - uy * half + bob).toFixed(1)}px`;
          el.animate(
            [
              { opacity: 0.6, transform: "translate(-50%,-50%) scale(.5)" },
              { opacity: 0, transform: "translate(-50%,-50%) scale(2.4)" },
            ],
            { duration: 1300, easing: "cubic-bezier(.2,.7,.3,1)" },
          );
        }
      }

      if (tipRef.current) {
        const nx = p.x + ux * half;
        const ny = p.y + uy * half;
        tipRef.current.style.transform = `translate(${(nx + 22).toFixed(1)}px,${(ny - 16 + bob).toFixed(1)}px)`;
      }

      // Scrolling all the way back to the pad re-arms the launch.
      if (
        E.ignited &&
        E.scrollTop <= 0 &&
        cur < 2 &&
        stateRef.current.phase !== "idle"
      ) {
        E.ignited = false;
        setState((s) => ({ ...s, phase: "idle" }));
      }

      E.scrollVel *= Math.exp(-dt * 3);

      let stg = 0;
      for (let i = 1; i < E.entryLength.length; i++) {
        if (cur >= E.entryLength[i] - 3) stg = i;
      }
      if (stg !== stateRef.current.stage || now - E.hudAt > 120) {
        E.hudAt = now;
        const alt = Math.round((cur / L) * 100);
        const vel = Math.round(E.scrollVel / 10) * 10;
        const thrust: Thrust =
          E.vel < -40
            ? "RETURN BURN"
            : E.vel > 40
              ? "THRUST"
              : cur > 2
                ? "HOVER"
                : "IDLE";
        const s = stateRef.current;
        if (
          stg !== s.stage ||
          alt !== s.alt ||
          vel !== s.vel ||
          thrust !== s.thrust
        ) {
          setState((prev) => ({ ...prev, stage: stg, alt, vel, thrust }));
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Build the map once the path has laid out.
  useEffect(() => {
    const id = setTimeout(buildMap, 60);
    return () => clearTimeout(id);
  }, [buildMap]);

  useEffect(() => {
    const t = timers.current;
    return () => {
      t.forEach(clearTimeout);
    };
  }, []);

  /**
   * Scrolls the window so the canvas sits at stage `i`.
   * `toWindowY` converts a canvas scroll offset into a document position; the
   * shell supplies it because only it knows the stage's offset and scale.
   */
  const goToStage = useCallback(
    (i: number, toWindowY: (canvasScroll: number) => number) => {
      window.scrollTo({
        top: toWindowY(STAGE_TOPS[i]),
        behavior: rmRef.current ? "auto" : "smooth",
      });
    },
    [],
  );

  const setCtaHover = useCallback((on: boolean) => {
    hover.current.cta = on;
  }, []);
  const setRocketHover = useCallback((on: boolean) => {
    hover.current.rocket = on;
  }, []);

  const stageName = STAGE_NAMES[state.stage] ?? STAGE_NAMES[0];

  /** `lit.s3` is truthy once stage 3 has been reached — drives stage labels. */
  const lit = useMemo(() => {
    const out: Record<string, boolean> = {};
    for (let i = 1; i < STAGE_NAMES.length; i++)
      out[`s${i}`] = state.stage >= i;
    return out;
  }, [state.stage]);

  return {
    refs: { viewportRef, pathRef, rocketRef, flameRef, tipRef, trailRefs },
    state,
    stageName,
    lit,
    path: FLIGHT_PATH,
    trailLength: TRAIL_LENGTH,
    setScrollTop,
    goToStage,
    setCtaHover,
    setRocketHover,
  };
}
