"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./flight.css";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  STAGE_ENTRY,
  STAGE_NAMES,
  pad2,
} from "@/lib/flight";
import { useCanvasScale } from "@/hooks/useCanvasScale";
import { useFlightEngine } from "@/hooks/useFlightEngine";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { FlightNav } from "./FlightNav";
import { HeroStage } from "./HeroStage";
import { Hud } from "./Hud";
import { Rocket } from "./Rocket";
import { StageSections } from "./StageSections";

type Props = {
  /** Draws the flight path and its stage nodes — useful while tuning layout. */
  showPath?: boolean;
  /** Force reduced motion regardless of the OS setting. */
  forceReducedMotion?: boolean;
  /** The ring-and-dot cursor. Disabled automatically on touch devices. */
  customCursor?: boolean;
};

/**
 * The full-flight hero: one scroll-driven canvas holding all fourteen stages.
 *
 * The canvas keeps the design's 1440px coordinate space and is scaled to fit,
 * because the rocket's trajectory is defined in those coordinates. Standalone
 * routes (/services, /contact, …) carry the same content responsively.
 */
export function FlightExperience({
  showPath = false,
  forceReducedMotion = false,
  customCursor = true,
}: Props) {
  const reducedMotion = useReducedMotion(forceReducedMotion);
  const { hostRef, scale, viewportHeight, stageHeight, maxScroll } =
    useCanvasScale();
  const engine = useFlightEngine(reducedMotion);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ringRaf = useRef<number | null>(null);
  const pointer = useRef({ tx: 0, ty: 0, rx: 0, ry: 0, primed: false });

  const [cursorOn, setCursorOn] = useState(false);
  const [tipOn, setTipOn] = useState(false);

  /** Eases the outer ring toward the pointer so it lags the dot. */
  const ringLoop = useCallback(() => {
    const p = pointer.current;
    if (!p.primed) {
      p.rx = p.tx;
      p.ry = p.ty;
      p.primed = true;
    }
    p.rx += (p.tx - p.rx) * 0.2;
    p.ry += (p.ty - p.ry) * 0.2;
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${p.rx.toFixed(1)}px,${p.ry.toFixed(1)}px)`;
    }
    ringRaf.current =
      Math.abs(p.tx - p.rx) + Math.abs(p.ty - p.ry) > 0.3
        ? requestAnimationFrame(ringLoop)
        : null;
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const root = rootRef.current;
      if (!root) return;
      const b = root.getBoundingClientRect();
      if (!b.width) return;

      // Map viewport pixels back into the canvas's own coordinate space, so
      // parallax and the cursor stay correct at any scale factor.
      const s = root.offsetWidth / b.width;
      const x = (e.clientX - b.left) * s;
      const y = (e.clientY - b.top) * s;
      pointer.current.tx = x;
      pointer.current.ty = y;

      if (!reducedMotion) {
        root.style.setProperty(
          "--mx",
          ((x / root.offsetWidth) * 2 - 1).toFixed(3),
        );
        root.style.setProperty(
          "--my",
          ((y / root.offsetHeight) * 2 - 1).toFixed(3),
        );
      }

      if (!customCursor) return;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px,${y}px)`;
      }
      if (ringRef.current) {
        const hot = (e.target as Element | null)?.closest?.("a,button,.rocket");
        ringRef.current.classList.toggle("hot", !!hot);
      }
      if (!cursorOn) setCursorOn(true);
      if (ringRaf.current == null)
        ringRaf.current = requestAnimationFrame(ringLoop);
    },
    [cursorOn, customCursor, reducedMotion, ringLoop],
  );

  const onLeave = useCallback(() => {
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--mx", "0");
      root.style.setProperty("--my", "0");
    }
    setCursorOn(false);
  }, []);

  const {
    state,
    lit,
    refs,
    setScrollTop,
    goToStage,
    setCtaHover,
    setRocketHover,
  } = engine;

  const rootClass = [
    "flight",
    reducedMotion && "rm",
    state.phase !== "idle" &&
      (state.phase === "ignite" ? "isIgnite" : "isFlight"),
    cursorOn && customCursor && "hasCursor",
    tipOn && "tipOn",
  ]
    .filter(Boolean)
    .join(" ");

  /**
   * Converts a canvas scroll offset into a document scroll position, so stage
   * jumps and the window listener agree on one coordinate system.
   */
  const toWindowY = useCallback(
    (canvasScroll: number) => {
      const host = hostRef.current;
      if (!host) return 0;
      const stageTop = host.getBoundingClientRect().top + window.scrollY;
      return stageTop + canvasScroll * scale;
    },
    [hostRef, scale],
  );

  /**
   * The window owns the scroll; the engine is told where the canvas should be.
   *
   * This samples the stage's position once per frame rather than listening for
   * scroll events. Scroll events are throttled, can be delivered late, and are
   * not emitted at all for some programmatic scrolls — whereas the rect is
   * always current, costs one read, and keeps the canvas in step with the
   * rocket's own animation frame.
   */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;
    let last = NaN;

    const sync = () => {
      raf = requestAnimationFrame(sync);
      const top = host.getBoundingClientRect().top;
      // How far past the top of the stage we are, back in design pixels.
      const st = Math.min(maxScroll, Math.max(0, -top / scale));
      if (st !== last) {
        last = st;
        setScrollTop(st);
      }
    };

    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [hostRef, maxScroll, scale, setScrollTop]);

  const jumpToStage = useCallback(
    (i: number) => goToStage(i, toWindowY),
    [goToStage, toWindowY],
  );

  const onRocketHover = useCallback(
    (on: boolean) => {
      setRocketHover(on);
      setTipOn(on);
    },
    [setRocketHover],
  );

  return (
    <div className="flightStage" ref={hostRef} style={{ height: stageHeight }}>
      <div className="flightSticky" style={{ height: viewportHeight }}>
        <div
          className={rootClass}
          ref={rootRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ "--flight-scale": scale } as React.CSSProperties}
        >
          <div className="viewport" ref={refs.viewportRef}>
            <div className="content">
              <HeroStage
                phase={state.phase}
                reducedMotion={reducedMotion}
                onGoToStage={jumpToStage}
                onCtaHover={setCtaHover}
              />
              <StageSections lit={lit} onCtaHover={setCtaHover} />

              {/* The trajectory. Always rendered so the engine can sample it;
                only painted when `showPath` is on. */}
              <svg
                aria-hidden="true"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  overflow: "visible",
                  visibility: showPath ? "visible" : "hidden",
                }}
              >
                <path
                  ref={refs.pathRef}
                  d={engine.path}
                  fill="none"
                  style={{ stroke: "var(--fg)" }}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="11 15"
                  opacity=".5"
                />
              </svg>

              {showPath &&
                STAGE_ENTRY.slice(1).map(([x, y], k) => (
                  <div
                    key={`${x}-${y}`}
                    className={
                      "node" + (state.stage >= k + 1 ? " reached" : "")
                    }
                    style={{ left: x, top: y }}
                  />
                ))}

              {/* Exhaust particles, recycled round-robin by the engine. */}
              {Array.from({ length: engine.trailLength }, (_, i) => (
                <div
                  key={i}
                  className="tp"
                  ref={(el) => {
                    refs.trailRefs.current[i] = el;
                  }}
                />
              ))}

              <Rocket
                rocketRef={refs.rocketRef}
                flameRef={refs.flameRef}
                onHover={onRocketHover}
              />

              <div className="jtip" ref={refs.tipRef}>
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "#0A0A0B",
                    background: "#FFD400",
                    padding: "7px 11px",
                    borderRadius: 999,
                    boxShadow: "0 8px 24px rgba(0,0,0,.25)",
                  }}
                >
                  Stage {pad2(state.stage)} &middot; {STAGE_NAMES[state.stage]}{" "}
                  &middot; {state.alt}% of mission complete
                </span>
              </div>
            </div>
          </div>

          <FlightNav solid={state.navSolid} onGoToStage={jumpToStage} />
          <Hud
            state={state}
            stageName={engine.stageName}
            onGoToStage={jumpToStage}
          />

          {/* Film grain over the whole canvas. */}
          <svg
            className="grain"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-50%",
              top: "-50%",
              width: "200%",
              height: "200%",
              pointerEvents: "none",
              opacity: 0.06,
              zIndex: 40,
            }}
          >
            <filter id="grainFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".85"
                numOctaves="2"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grainFilter)" />
          </svg>

          {customCursor && (
            <>
              <div className="curRing" ref={ringRef} aria-hidden="true">
                <i />
              </div>
              <div className="curDot" ref={cursorRef} aria-hidden="true">
                <i />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
