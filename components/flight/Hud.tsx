"use client";

import { useState } from "react";
import { STAGE_NAMES, pad2 } from "@/lib/flight";
import { RocketGlyph } from "@/components/site/Icons";
import type { FlightState } from "@/hooks/useFlightEngine";

type Props = {
  state: FlightState;
  stageName: string;
  onGoToStage: (i: number) => void;
};

/** Mission-control readout, bottom-left: progress, telemetry, stage jump. */
export function Hud({ state, stageName, onGoToStage }: Props) {
  const [open, setOpen] = useState(false);
  const hudX = (2 + (232 * state.alt) / 100).toFixed(1);

  return (
    <div className="hud">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <RocketGlyph />
        <svg width="236" height="10" viewBox="0 0 236 10" aria-hidden="true">
          <line
            x1="2"
            y1="5"
            x2="234"
            y2="5"
            style={{ stroke: "var(--track)" }}
            strokeWidth="2"
            strokeDasharray="6 5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="5"
            x2={hudX}
            y2="5"
            stroke="#E0B800"
            strokeWidth="2"
            strokeDasharray="6 5"
            strokeLinecap="round"
          />
          <circle cx={hudX} cy="5" r="3.5" fill="#FFD400" />
        </svg>
      </div>

      <p
        className="t-mono"
        style={{ margin: "12px 0 0", fontSize: 10, color: "var(--muted)" }}
      >
        STAGE {pad2(state.stage)} / 13
      </p>
      <p className="t-h3" style={{ marginTop: 4, fontSize: 18 }}>
        {stageName}
      </p>

      <div
        className="t-mono"
        style={{
          marginTop: 10,
          display: "flex",
          gap: 16,
          fontSize: 11,
          color: "var(--muted)",
        }}
      >
        <span>
          ALT <span style={{ color: "var(--fg)" }}>{state.alt}%</span>
        </span>
        <span>
          VEL <span style={{ color: "var(--fg)" }}>{state.vel}</span> PX/S
        </span>
        <span>{state.thrust}</span>
      </div>

      <button
        type="button"
        className="t-mono t-acc"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ marginTop: 12, minHeight: 24, fontSize: 10, letterSpacing: ".14em" }}
      >
        {open ? "HIDE STAGES ▴" : "ALL STAGES ▾"}
      </button>

      {open && (
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {STAGE_NAMES.map((name, i) => (
            <button
              key={name}
              type="button"
              className={
                "stagebtn" +
                (i === state.stage ? " cur" : i < state.stage ? " done" : "")
              }
              onClick={() => {
                onGoToStage(i);
                setOpen(false);
              }}
            >
              <span>{pad2(i)}</span>
              <span>{name.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
