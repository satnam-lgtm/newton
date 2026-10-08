import type { Metadata } from "next";
import { Cta } from "@/components/site/Cta";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { Check } from "@/components/site/Icons";
import { CASE_STUDIES } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "How Newton Infotech rebuilt accounts, fixed tracking and moved budget for brands in eCommerce, SaaS and local services.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="STAGE 10 / NUMBERS DON’T LIE"
        title="What the work looks like."
        lead="Three accounts, three different problems. In each case the first month went on measurement and structure, not on new creative."
      >
        <span className="u-ph">
          PLACEHOLDER FIGURES &middot; PUBLISH ONLY CLIENT-APPROVED NUMBERS
        </span>
      </PageHero>

      {CASE_STUDIES.map((c, i) => (
        <Section key={c.slug} alt={i % 2 === 1} id={c.slug}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <div
                className="h-44 rounded-[18px]"
                style={{ background: c.bg }}
                aria-hidden="true"
              />
              <p className="t-mono t-acc mt-8 text-[11px]">{c.sector.toUpperCase()}</p>
              <h2 className="t-h2 mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">{c.client}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.channels.map((ch) => (
                  <span key={ch} className="u-chip">
                    {ch}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-3.5 sm:grid-cols-3">
                {c.results.map((r) => (
                  <div key={r.label} className="u-card rounded-[14px] p-4">
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 28,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {r.value}
                    </p>
                    <p
                      className="t-mono mt-2 text-[9px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {r.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
                THE PROBLEM
              </h3>
              <p className="t-lead mt-4">{c.challenge}</p>

              <h3 className="t-mono mt-10 text-[10px]" style={{ color: "var(--muted)" }}>
                WHAT WE DID
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {c.approach.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-1.5 shrink-0">
                      <Check />
                    </span>
                    <span style={{ color: "var(--soft)" }}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeading
          kicker="WHAT THEY HAVE IN COMMON"
          title="The first win is almost never new creative."
          lead="In all three accounts, the biggest single improvement came from fixing how performance was measured, structured or routed — before a single new ad was written."
        />
      </Section>

      <Cta title="Want this kind of read on your account?" />
    </>
  );
}
