import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/site/Cta";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { ArrowRight, Check } from "@/components/site/Icons";
import { PARTNER_BADGES, PLATFORMS, PROCESS, QUALITY_CHECKS, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Paid social, paid search and display, native advertising, lead generation, eCommerce growth, CRO and martech — planned around what each campaign earns you.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="STAGE 03 / SERVICES"
        title="Every paid channel. One crew."
        lead="Pick one service or let us run the full mix. Every campaign is planned around one number: what it earns you."
      >
        <Link href="/audit" className="u-btn u-btn-primary h-14 px-7 text-base">
          Not sure where to start?
          <ArrowRight />
        </Link>
      </PageHero>

      <Section>
        <div className="flex flex-col">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 gap-8 py-14 md:grid-cols-[auto_1fr_1fr] md:gap-14"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <span className="t-mono t-acc text-xs md:pt-2">{s.no}</span>
              <div>
                <h2 className="t-h2 text-[clamp(1.75rem,3.5vw,2.75rem)]">{s.title}</h2>
                <p className="t-lead mt-5 max-w-[46ch]">{s.text}</p>
                <p
                  className="t-mono mt-7 text-[10px]"
                  style={{ color: "var(--soft)" }}
                >
                  {s.tags}
                </p>
              </div>
              <div>
                <h3 className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
                  WHAT YOU GET
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-1.5 shrink-0">
                        <Check />
                      </span>
                      <span style={{ color: "var(--soft)" }}>{d}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${encodeURIComponent(s.title)}`}
                  className="mt-7 inline-flex items-center gap-2 text-[15px]"
                  style={{ borderBottom: "1px solid var(--line2)", paddingBottom: 4 }}
                >
                  Talk to us about {s.title.toLowerCase()}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section alt id="content-arbitrage">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            kicker="FOR NETWORKS AND PUBLISHERS"
            title="Content arbitrage, at $400K a month."
            lead="Separate from the brand work above: we buy paid traffic into content and are paid on the margin. If you monetise inventory or own content and offers, there is a dossier written for you."
          />
          <div className="flex flex-col justify-center">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="u-card rounded-[14px] p-5">
                <p className="t-mono text-[9px]" style={{ color: "var(--muted)" }}>
                  MONTHLY DEPLOYMENT
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                  }}
                >
                  $400K
                </p>
              </div>
              <div className="u-card rounded-[14px] p-5">
                <p className="t-mono text-[9px]" style={{ color: "var(--muted)" }}>
                  COMMITTED IN A QUARTER
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                  }}
                >
                  $1M
                </p>
              </div>
            </div>
            <Link
              href="/content-arbitrage"
              className="u-btn u-btn-primary mt-6 h-13 self-start px-6 py-3.5 text-[15px]"
            >
              Read the dossier
              <ArrowRight />
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="STAGE 04 / AD PARTNERS"
          title="We advertise where your buyers are."
          lead="One plan and one budget view across search, social, video, native and retail media. We move spend to whichever platform is earning the most this week."
        />
        <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="u-card u-tile flex h-[132px] flex-col justify-between rounded-[14px] p-[18px]"
            >
              <span className="t-mono text-[9px]" style={{ color: "var(--muted)" }}>
                {p.cat}
              </span>
              <span className="t-h3 text-[21px]">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <p className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
            CERTIFIED PARTNERS
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PARTNER_BADGES.map((b) => (
              <span key={b} className="u-chip">
                {b}
              </span>
            ))}
          </div>
          <p className="u-ph mt-4 inline-block">SHOW ONLY BADGES NEWTON INFOTECH HOLDS</p>
        </div>
      </Section>

      <Section alt>
        <SectionHeading
          kicker="STAGE 05 / HOW WE WORK"
          title="A flight plan, not a guess."
          lead="Your first quarter is mapped before we touch the budget. Then we correct course every week."
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.no} style={{ borderTop: "1px solid var(--line2)" }} className="pt-6">
              <p className="t-mono t-acc text-xs">
                {p.no} &middot; {p.title}
              </p>
              <h3 className="t-h3 mt-4 text-xl">{p.text}</h3>
              <p className="t-small mt-3 text-[15px]">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            kicker="STAGE 07 / TRACKING & TRAFFIC QUALITY"
            title="Clean data. Real traffic."
            lead="Server-side tracking, conversion APIs and fraud filtering, so every number is real and your budget only pays for real people."
          />
          <div className="flex flex-wrap content-start gap-2 lg:pt-16">
            {QUALITY_CHECKS.map((q) => (
              <span key={q} className="u-chip">
                <Check />
                {q}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Cta />
    </>
  );
}
