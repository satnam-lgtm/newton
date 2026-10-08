import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1328px] px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  alt = false,
  className = "",
  id,
}: {
  children: ReactNode;
  /** Use the secondary surface, alternating like the canvas sections do. */
  alt?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${className}`}
      style={{ background: alt ? "var(--bg2)" : "var(--bg)" }}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Page hero: kicker, title, lead, optional actions, over a blueprint grid. */
export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="u-grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% -10%, rgba(255,212,0,.16), transparent 70%)",
        }}
      />
      <Container className="relative pt-16 pb-16 sm:pt-24 sm:pb-24">
        <p className="u-kicker">{kicker}</p>
        <h1
          className="t-h1 mt-7 max-w-[20ch] text-[clamp(2.75rem,7vw,5.5rem)]"
        >
          {title}
        </h1>
        {lead && (
          <p className="t-lead mt-7 max-w-[60ch] text-[clamp(1rem,2vw,1.25rem)]">{lead}</p>
        )}
        {children && <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>}
      </Container>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="max-w-[44ch]">
      {kicker && <p className="u-kicker">{kicker}</p>}
      <h2 className="t-h2 mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">{title}</h2>
      {lead && <p className="t-lead mt-6">{lead}</p>}
    </div>
  );
}
