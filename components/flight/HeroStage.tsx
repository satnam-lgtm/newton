"use client";

import Link from "next/link";
import { STAR_FIELDS } from "@/lib/flight";
import { MARQUEE, SITE } from "@/lib/content";
import { ArrowDown, ArrowRight, Star } from "@/components/site/Icons";
import { useCountUp } from "@/hooks/useCountUp";
import { useMissionClock } from "@/hooks/useMissionClock";
import { useWordRoller } from "@/hooks/useWordRoller";
import type { FlightPhase } from "@/hooks/useFlightEngine";

const ROLLING_WORDS = ["brands", "leads", "sales", "followers", "revenue", "brands"];

/** Exhaust puff offsets, spread left-to-right across the pad. */
const PUFFS = [
  [-430, -40],
  [-280, -110],
  [-120, -30],
  [40, -150],
  [180, -40],
  [320, -100],
  [450, -30],
] as const;

const METRICS = [
  {
    label: "ROAS",
    cls: "pop1",
    left: 330,
    top: 596,
    depth: "d6",
    z: 6,
    duration: "7s",
    delay: "0s",
    spark: "M0 26 L14 24 L28 25 L42 20 L56 21 L70 15 L84 16 L98 10 L112 11 L126 6 L140 4",
    sparkDelay: "2.45s",
    sparkColor: "#E0B800",
  },
  {
    label: "LEADS",
    cls: "pop2",
    left: 944,
    top: 574,
    depth: "d7",
    z: 7,
    duration: "8.5s",
    delay: "-2s",
    spark: "M0 28 L14 27 L28 26 L42 24 L56 25 L70 20 L84 17 L98 18 L112 11 L126 8 L140 3",
    sparkDelay: "2.6s",
    sparkColor: "#1E6BFF",
  },
  {
    label: "CPC",
    cls: "pop3",
    left: 1182,
    top: 652,
    depth: "d8",
    z: 8,
    duration: "7.8s",
    delay: "-4s",
    spark: "M0 5 L14 7 L28 6 L42 10 L56 12 L70 11 L84 16 L98 19 L112 18 L126 23 L140 25",
    sparkDelay: "2.75s",
    sparkColor: "#E0B800",
  },
] as const;

type Props = {
  phase: FlightPhase;
  reducedMotion: boolean;
  onGoToStage: (i: number) => void;
  onCtaHover: (on: boolean) => void;
};

export function HeroStage({ phase, reducedMotion, onGoToStage, onCtaHover }: Props) {
  const p = useCountUp(reducedMotion);
  const clock = useMissionClock();
  const roller = useWordRoller(ROLLING_WORDS.length - 1, reducedMotion);

  const metricValues = [
    `${(4.2 * p[0]).toFixed(1)}×`,
    `+${Math.round(180 * p[1])}%`,
    `−${Math.round(35 * p[2])}%`,
  ];

  const status =
    phase === "ignite"
      ? "IGNITION"
      : phase === "flight"
        ? "IN FLIGHT"
        : "READY FOR LAUNCH";

  return (
    <section className="sec sa" id="stage-0" style={{ top: 0, height: 900 }}>
      {/* Parallax star fields */}
      <div className="px d1">
        <div className="aStars" style={{ position: "absolute", inset: 0 }}>
          <div
            className="stars"
            style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, borderRadius: "50%", boxShadow: STAR_FIELDS.a }}
          />
          <div
            className="stars"
            style={{ position: "absolute", left: 0, top: 0, width: 2, height: 2, borderRadius: "50%", boxShadow: STAR_FIELDS.b }}
          />
        </div>
      </div>
      <div className="px d2">
        <div className="aStars" style={{ position: "absolute", inset: 0 }}>
          <div
            className="stars"
            style={{ position: "absolute", left: 0, top: 0, width: 2, height: 2, borderRadius: "50%", boxShadow: STAR_FIELDS.c }}
          />
        </div>
      </div>

      {/* Blueprint grid */}
      <div className="px d3">
        <div
          className="aGrid"
          style={{
            position: "absolute",
            inset: -20,
            backgroundImage:
              "radial-gradient(circle, var(--gridd) 1px, transparent 1.6px), linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            backgroundSize: "320px 320px, 80px 80px, 80px 80px",
            backgroundPosition: "-140px -140px, 0 0, 0 0",
          }}
        />
      </div>

      {/* F = m × a, outlined */}
      <div className="px d4">
        <div
          className="aEq"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 440,
            top: 468,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 250,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            color: "transparent",
            WebkitTextStroke: "1.5px var(--eq)",
          }}
        >
          F = m &times; a
        </div>
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 75% 85% at 50% 58%, transparent 40%, var(--vig) 100%)",
        }}
      />

      {/* Launch pad: bloom, glow, the falling apple, shock ring, exhaust */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        <div
          className="bloom"
          style={{
            position: "absolute",
            left: 220,
            top: 190,
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,212,0,.35), rgba(255,212,0,.08) 45%, rgba(255,212,0,0))",
          }}
        />
        <div className="aGlow" style={{ position: "absolute", inset: 0 }}>
          <div
            className="padGlow"
            style={{
              position: "absolute",
              left: 470,
              top: 630,
              width: 500,
              height: 140,
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(255,212,0,.3), rgba(255,212,0,.08) 55%, rgba(255,212,0,0))",
            }}
          />
        </div>
        <div
          className="appleFade"
          aria-hidden="true"
          style={{ position: "absolute", left: 711, top: 672, width: 18, height: 18 }}
        >
          <div className="appleFall" style={{ width: 18, height: 18 }}>
            <div
              className="appleSquash"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#FFD400",
                boxShadow: "0 0 18px rgba(255,212,0,.8)",
              }}
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: 420, top: 600, width: 600, height: 180 }}
        >
          <div
            className="ring"
            style={{
              width: 600,
              height: 180,
              boxSizing: "border-box",
              borderRadius: "50%",
              border: "2px solid #FFD400",
            }}
          />
        </div>
        <div aria-hidden="true">
          {PUFFS.map(([dx, dy], i) => (
            <div
              key={i}
              className="puff"
              style={
                {
                  left: 720,
                  top: 680,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* Floating live-metric cards */}
      {METRICS.map((m, i) => (
        <div key={m.label} className={`px ${m.depth}`} style={{ zIndex: m.z }}>
          <div
            className="float"
            style={{
              position: "absolute",
              left: m.left,
              top: m.top,
              animationDuration: m.duration,
              animationDelay: m.delay,
            }}
          >
            <div
              className={`${m.cls} u-glass`}
              style={{
                width: 172,
                boxSizing: "border-box",
                padding: "14px 16px 12px",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                className="t-mono"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                <span>{m.label}</span>
                <span className="t-acc">&#9679; LIVE</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 32,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {metricValues[i]}
              </div>
              <svg viewBox="0 0 140 32" width="140" height="32" aria-hidden="true">
                <path
                  className="spark"
                  d={m.spark}
                  pathLength={1}
                  fill="none"
                  stroke={m.sparkColor}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  style={{ animationDelay: m.sparkDelay }}
                />
              </svg>
              <span className="u-ph" style={{ alignSelf: "flex-start" }}>
                PLACEHOLDER
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Headline. Split into three masked lines that wipe up in sequence. */}
      <h1
        aria-label={SITE.tagline}
        className="t-h1"
        style={{
          position: "absolute",
          inset: 0,
          margin: 0,
          pointerEvents: "none",
          fontSize: 120,
          zIndex: 10,
        }}
      >
        <span
          className="line l1"
          aria-hidden="true"
          style={{ position: "absolute", right: 884, top: 228, textAlign: "right", whiteSpace: "nowrap" }}
        >
          <span>We put</span>
        </span>
        <span
          className="line l2"
          aria-hidden="true"
          style={{ position: "absolute", left: 884, top: 228, whiteSpace: "nowrap" }}
        >
          <span>
            <span
              className="word"
              style={{
                display: "inline-block",
                verticalAlign: "top",
                height: "0.9em",
                overflow: "hidden",
                width: roller.slotWidth,
                transition: roller.slotTransition,
              }}
            >
              <span
                ref={roller.rollRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transform: roller.rollTransform,
                  transition: roller.rollTransition,
                }}
              >
                {ROLLING_WORDS.map((w, i) => (
                  <span
                    key={`${w}-${i}`}
                    style={{ display: "block", height: "0.9em", whiteSpace: "nowrap" }}
                  >
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
        <span
          className="line l3"
          aria-hidden="true"
          style={{ position: "absolute", right: 884, top: 336, textAlign: "right", whiteSpace: "nowrap" }}
        >
          <span>
            in motion<span style={{ color: "#FFD400" }}>.</span>
          </span>
        </span>
      </h1>

      {/* Sub-copy and calls to action */}
      <div
        style={{
          position: "absolute",
          left: 884,
          top: 350,
          width: 480,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          zIndex: 10,
        }}
      >
        <p className="aSub t-lead" style={{ margin: 0 }}>
          {SITE.description}
        </p>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Link
            href="/audit"
            className="u-btn u-btn-primary aCta1"
            onMouseEnter={() => onCtaHover(true)}
            onMouseLeave={() => onCtaHover(false)}
            style={{ gap: 12, height: 56, padding: "0 26px", fontSize: 16 }}
          >
            Get a free growth audit
            <ArrowRight />
          </Link>
          <a
            href="#stage-5"
            className="u-btn u-btn-ghost aCta2"
            onClick={(e) => {
              e.preventDefault();
              onGoToStage(5);
            }}
            style={{ height: 56, padding: "0 22px", fontSize: 16 }}
          >
            See how we work
            <ArrowDown />
          </a>
        </div>
      </div>

      {/* Trust row */}
      <div
        className="aTrust"
        style={{
          position: "absolute",
          right: 884,
          top: 474,
          width: 500,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px 12px",
          fontSize: 13,
          color: "var(--muted)",
          zIndex: 10,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Star />
          <strong style={{ color: "var(--fg)", fontWeight: 600 }}>{SITE.rating}</strong> on
          Google
        </span>
        <span className="u-chip">Google Partner</span>
        <span className="u-chip">Meta Business Partner</span>
        <span className="u-chip">Shopify Partner</span>
        <span className="u-ph">PLACEHOLDER &middot; USE ONLY IF REAL</span>
      </div>

      {/* Scroll cue */}
      <div
        className="aBottom"
        style={{
          position: "absolute",
          left: 520,
          top: 760,
          width: 400,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <button
          type="button"
          className="cue"
          onClick={() => onGoToStage(1)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
          }}
        >
          <span>
            {phase === "idle"
              ? "T-MINUS 10 · SCROLL TO IGNITE"
              : "IN FLIGHT · KEEP SCROLLING"}
          </span>
          <span className="cueLine" />
        </button>
      </div>

      {/* Platform marquee */}
      <div
        className="aBottom"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid var(--line)",
          zIndex: 10,
          background: "var(--bg)",
        }}
      >
        <p
          className="t-mono"
          style={{
            margin: 0,
            flexShrink: 0,
            width: 300,
            paddingLeft: 56,
            boxSizing: "border-box",
            fontSize: 10,
            lineHeight: 1.5,
            color: "var(--muted)",
          }}
        >
          WE ADVERTISE ON
        </p>
        <div className="marquee" style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <div
            className="marqueeTrack"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 56,
              width: "max-content",
              paddingRight: 56,
            }}
          >
            {/* Duplicated so the -50% translate loops seamlessly. */}
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span
                key={`${m}-${i}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mission-control strip */}
      <div
        className="aStrip t-mono"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 84,
          height: 34,
          padding: "0 56px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          fontSize: 11,
          color: "var(--muted)",
          zIndex: 10,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          NEWTON INFOTECH MISSION CONTROL &middot;{" "}
          <span style={{ color: "var(--fg)" }}>ONLINE</span>
          <span className="pulse" />
        </span>
        <span>
          STATUS: <span className="t-acc">{status}</span>
        </span>
        <span>
          CLIENTS IN ORBIT: <span style={{ color: "var(--fg)" }}>[00]</span>
        </span>
        <span>
          LOCAL <span style={{ color: "var(--fg)" }}>{clock.time}</span> {clock.tz}
        </span>
      </div>
    </section>
  );
}
