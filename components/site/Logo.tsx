/**
 * The Newton mark: two uprights (an "N" cut as two slabs), a dashed blue
 * trajectory between them, an arrowhead, and the falling apple.
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      viewBox="14 10 106 108"
      width={size}
      height={Math.round((size * 35) / 34)}
      aria-hidden="true"
    >
      <polygon points="16,12 36,12 36,79 25,90 16,90" style={{ fill: "var(--fg)" }} />
      <polygon points="101,48 112,48 112,116 92,116 92,57" style={{ fill: "var(--fg)" }} />
      <line
        x1="37.3"
        y1="94.7"
        x2="99.6"
        y2="32.4"
        stroke="#1E6BFF"
        strokeWidth="12"
        strokeDasharray="15.2 8 22.8 8 34.2 40"
      />
      <polygon
        points="0,0 -26,-12 -20,0 -26,12"
        transform="translate(118 14) rotate(-45)"
        fill="#1E6BFF"
      />
      <circle cx="26" cy="106" r="10" fill="#FFD400" />
    </svg>
  );
}

export function LogoWordmark() {
  return (
    <span style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-brand)" }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: 1 }}>NEWTON</span>
      <span
        style={{
          fontWeight: 500,
          fontSize: 7.5,
          lineHeight: 1,
          marginTop: 4,
          textAlign: "justify",
          textAlignLast: "justify",
        }}
      >
        I N F O T E C H
      </span>
    </span>
  );
}

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <LogoMark size={size} />
      <LogoWordmark />
    </span>
  );
}
