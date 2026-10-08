type IconProps = { size?: number; className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRight({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} aria-hidden="true">
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowDown({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} aria-hidden="true">
      <path d="M8 3v10" />
      <path d="M4 9l4 4 4-4" />
    </svg>
  );
}

export function Check({ size = 12, color = "#1FA35B" }: IconProps & { color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6.5l2.5 2.5L10 3" />
    </svg>
  );
}

export function Star({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E0B800" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
    </svg>
  );
}

export function Sun({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </svg>
  );
}

export function Moon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function RocketGlyph({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E0B800"
      strokeWidth={1.6}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2c3 2.2 5 6 5 10v5H7v-5c0-4 2-7.8 5-10z" />
      <path d="M7 13l-3 3v3l3-2" />
      <path d="M17 13l3 3v3l-3-2" />
      <circle cx="12" cy="9" r="1.8" />
      <path d="M10 20h4" />
    </svg>
  );
}

export function Plus({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} aria-hidden="true">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function Minus({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke} aria-hidden="true">
      <path d="M3 8h10" />
    </svg>
  );
}
