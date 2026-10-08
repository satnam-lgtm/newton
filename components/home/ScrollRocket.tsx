"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollRocket } from "@/hooks/useScrollRocket";
import "./scroll-rocket.css";

type Props = {
  children: ReactNode;
  /** Draw the trajectory — useful while tuning the weave. */
  showPath?: boolean;
};

/**
 * Wraps the reflowed home page and flies the rocket down it.
 *
 * The rocket layer is absolutely positioned over the whole document and does
 * not take pointer events, so it never interferes with reading or tapping.
 * When motion is reduced it still travels, but without the spring lag, bob or
 * flame flicker.
 */
export function ScrollRocket({ children, showPath = false }: Props) {
  const reducedMotion = useReducedMotion();
  const { trackRef, pathRef, rocketRef, flameRef, path, box, telemetry } =
    useScrollRocket(true, reducedMotion);

  return (
    <div className="rocketTrack" ref={trackRef}>
      {children}

      <div className="rocketLayer" aria-hidden="true">
        {/* The trajectory. Always rendered so it can be sampled; only painted
            when showPath is on. */}
        {path && (
          <svg
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
            className="rocketPathSvg"
            style={{ visibility: showPath ? "visible" : "hidden" }}
          >
            <path
              ref={pathRef}
              d={path}
              fill="none"
              style={{ stroke: "var(--fg)" }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 12"
              opacity=".4"
            />
          </svg>
        )}

        <div className="rocketCraft" ref={rocketRef}>
          <div className="rocketFlame" ref={flameRef}>
            <svg viewBox="0 0 60 140" width="60" height="140">
              <defs>
                <linearGradient id="mFlameOuter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFD400" />
                  <stop offset=".35" stopColor="#FF6A1A" />
                  <stop offset="1" stopColor="#FF6A1A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="mFlameInner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset=".4" stopColor="#FFD400" />
                  <stop offset="1" stopColor="#FFD400" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M30 0 C50 8 58 38 47 72 C41 96 34 118 30 140 C26 118 19 96 13 72 C2 38 10 8 30 0 Z"
                fill="url(#mFlameOuter)"
              />
              <path
                d="M30 6 C42 12 46 34 40 58 C36 76 33 90 30 104 C27 90 24 76 20 58 C14 34 18 12 30 6 Z"
                fill="url(#mFlameInner)"
              />
            </svg>
          </div>
          <Image
            src="/assets/rocket.png"
            alt=""
            width={280}
            height={440}
            className="rocketArt"
            draggable={false}
          />
        </div>
      </div>

      {/* Compact mission readout, the touch counterpart of the desktop HUD. */}
      <div className="rocketHud" role="status" aria-live="off">
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle
            cx="17"
            cy="17"
            r="14.5"
            fill="none"
            style={{ stroke: "var(--track)" }}
            strokeWidth="3"
          />
          <circle
            cx="17"
            cy="17"
            r="14.5"
            fill="none"
            stroke="#FFD400"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 14.5}
            strokeDashoffset={2 * Math.PI * 14.5 * (1 - telemetry.progress / 100)}
            transform="rotate(-90 17 17)"
            style={{ transition: "stroke-dashoffset .15s linear" }}
          />
        </svg>
        <span className="rocketHudText">
          <span>ALT</span>
          <strong>{telemetry.progress}%</strong>
        </span>
      </div>
    </div>
  );
}
