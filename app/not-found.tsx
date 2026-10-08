import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/site/Logo";
import { ArrowRight } from "@/components/site/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="u-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(255,212,0,.14), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <Link href="/" aria-label="Newton Infotech home">
          <Logo />
        </Link>

        <p className="u-kicker mt-14">TELEMETRY LOST</p>
        <p
          className="t-h1 mt-6 text-[clamp(5rem,18vw,12rem)]"
          style={{ color: "var(--color-yellow)" }}
        >
          404
        </p>
        <h1 className="t-h2 mt-2 max-w-[22ch] text-[clamp(1.75rem,4.5vw,3rem)]">
          This stage is not on the flight plan.
        </h1>
        <p className="t-lead mt-6 max-w-[48ch]">
          The page you asked for does not exist, or it has moved. Here is the way back.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="u-btn u-btn-primary h-14 px-7 text-base">
            Back to the launch pad
            <ArrowRight />
          </Link>
          <Link href="/contact" className="u-btn u-btn-ghost h-14 px-6 text-base">
            Contact us
          </Link>
        </div>

        <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "var(--muted)" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
