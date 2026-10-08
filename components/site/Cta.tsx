import Link from "next/link";
import { SITE } from "@/lib/content";
import { Container } from "./Section";
import { ArrowRight } from "./Icons";

/** The closing call to action, shared by every standalone page. */
export function Cta({
  title = "Ready to put your brand in motion?",
  lead = "Book a free growth audit. In one call we will show you where your ad spend is leaking and which channel to scale first.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      <div
        className="pointer-events-none absolute left-1/2 top-full h-[320px] w-[min(1100px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,212,0,.3), rgba(255,212,0,.06) 60%, rgba(255,212,0,0))",
        }}
      />
      <Container className="relative text-center">
        <h2 className="t-h2 mx-auto max-w-[22ch] text-[clamp(2.25rem,6vw,5rem)]">{title}</h2>
        <p className="t-lead mx-auto mt-7 max-w-[52ch]">{lead}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/audit" className="u-btn u-btn-primary h-14 px-7 text-base">
            Get a free growth audit
            <ArrowRight />
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="u-btn u-btn-ghost h-14 px-6 text-base"
          >
            {SITE.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
