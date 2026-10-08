import Image from "next/image";
import type { RefObject } from "react";

type Props = {
  rocketRef: RefObject<HTMLDivElement | null>;
  flameRef: RefObject<HTMLDivElement | null>;
  onHover: (on: boolean) => void;
};

/**
 * The rocket. Its transform is written every frame by the flight engine, so
 * this component renders once and never re-renders.
 */
export function Rocket({ rocketRef, flameRef, onHover }: Props) {
  return (
    <div
      className="rocket"
      ref={rocketRef}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ transform: "translate(580px, 214px)" }}
    >
      <div className="rocketInner" style={{ position: "absolute", inset: 0 }}>
        <div className="flame" ref={flameRef} aria-hidden="true">
          <svg viewBox="0 0 60 140" width="60" height="140">
            <defs>
              <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFD400" />
                <stop offset=".35" stopColor="#FF6A1A" />
                <stop offset="1" stopColor="#FF6A1A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset=".4" stopColor="#FFD400" />
                <stop offset="1" stopColor="#FFD400" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M30 0 C50 8 58 38 47 72 C41 96 34 118 30 140 C26 118 19 96 13 72 C2 38 10 8 30 0 Z"
              fill="url(#flameOuter)"
            />
            <path
              d="M30 6 C42 12 46 34 40 58 C36 76 33 90 30 104 C27 90 24 76 20 58 C14 34 18 12 30 6 Z"
              fill="url(#flameInner)"
            />
          </svg>
        </div>
        <Image
          src="/assets/rocket.png"
          alt="Your brand as a rocket"
          width={280}
          height={440}
          priority
          draggable={false}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 280,
            height: 440,
            display: "block",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
}
