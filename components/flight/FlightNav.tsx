"use client";

import Link from "next/link";
import { FLIGHT_NAV } from "@/lib/content";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";

type Props = {
  solid: boolean;
  onGoToStage: (i: number) => void;
};

/**
 * In-canvas navigation. The section links scroll the flight canvas; "Contact"
 * and the CTA leave for real routes.
 */
export function FlightNav({ solid, onGoToStage }: Props) {
  /** Nudges the pill toward the pointer — a light magnetic hover. */
  const magnetise = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    if (!b.width) return;
    const s = el.offsetWidth / b.width;
    const dx = (e.clientX - (b.left + b.width / 2)) * s;
    const dy = (e.clientY - (b.top + b.height / 2)) * s;
    el.style.transform = `translate(${(dx * 0.28).toFixed(1)}px,${(dy * 0.4).toFixed(1)}px)`;
  };

  return (
    <nav
      className={"nav aNav" + (solid ? " solid" : "")}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 84,
        padding: "0 56px",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
        alignItems: "center",
        zIndex: 30,
      }}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onGoToStage(0);
        }}
        aria-label="Newton Infotech home"
        style={{ justifySelf: "start" }}
      >
        <Logo />
      </a>

      <div style={{ display: "flex", gap: 34, fontSize: 14, fontWeight: 500 }}>
        {FLIGHT_NAV.map((item) => (
          <a
            key={item.label}
            href={`#stage-${item.stage}`}
            className="navlink"
            onClick={(e) => {
              e.preventDefault();
              onGoToStage(item.stage);
            }}
          >
            {item.label}
          </a>
        ))}
        <Link href="/contact" className="navlink">
          Contact
        </Link>
      </div>

      <div
        style={{
          justifySelf: "end",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <ThemeToggle className="toggle" />
        <Link
          href="/contact"
          className="pill"
          onMouseMove={magnetise}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0,0)";
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 46,
            padding: "0 22px",
            boxSizing: "border-box",
            borderRadius: 999,
            background: "#FFD400",
            color: "#0A0A0B",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Let&rsquo;s work together <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </nav>
  );
}
