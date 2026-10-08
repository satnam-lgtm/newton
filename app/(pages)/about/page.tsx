import type { Metadata } from "next";
import { Cta } from "@/components/site/Cta";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { LAUNCH_LOG, PILLARS, SITE, STATS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Newton Infotech is a performance marketing team that treats advertising as physics: find the force that moves your numbers, then keep applying it.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    no: "01",
    title: "One number decides",
    text: "Impressions, clicks and engagement are diagnostics. The only score that counts is what a campaign earns against what it costs, and we agree on it before launch.",
  },
  {
    no: "02",
    title: "You own everything",
    text: "Your accounts, your pixels, your creative files, your data. If we part ways, nothing has to be rebuilt and nothing leaves with us.",
  },
  {
    no: "03",
    title: "Plain language, always",
    text: "No dashboards you cannot read and no reports that hide a bad month. If something is not working you will hear it from us first.",
  },
  {
    no: "04",
    title: "We say no",
    text: "If paid media is the wrong answer for your budget or your stage, we will tell you on the first call rather than take the retainer.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="ABOUT NEWTON INFOTECH"
        title={
          <>
            Advertising, treated as{" "}
            <span style={{ color: "var(--color-yellow)" }}>physics</span>.
          </>
        }
        lead="A body at rest stays at rest. Most brands are not short of ideas, they are short of force in the right direction. We find the force that moves your numbers and keep applying it."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <SectionHeading kicker="WHY WE EXIST" title="Growth is a force, not a campaign." />
          <div className="u-prose">
            <p>
              {SITE.name} was built by media buyers who got tired of watching good
              budgets die in badly built accounts. The pattern repeated: strong product,
              reasonable spend, and no one looking at whether the tracking was even
              telling the truth.
            </p>
            <p>
              So we start where most agencies finish. We audit before we pitch, we fix
              measurement before we touch budget, and we only then decide which channels
              deserve money. It is slower in week one and considerably faster by week
              twelve.
            </p>
            <p>
              The result is a team that behaves less like a creative shop and more like
              a flight crew: a plan written down, instruments you can read, and someone
              correcting course every single week.
            </p>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionHeading kicker="HOW WE OPERATE" title="Four principles we do not bend." />
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.no} className="pt-6" style={{ borderTop: "1px solid var(--line2)" }}>
              <p className="t-mono t-acc text-xs">{p.no}</p>
              <h3 className="t-h3 mt-4 text-2xl">{p.title}</h3>
              <p className="t-small mt-3 text-[15px]">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="THE THREE MOVES"
          title="Find, attract, convert."
          lead="Every engagement reduces to these three. Each one has an owner and a number."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.no}>
              <p className="t-mono t-acc text-xs">
                {p.no} &middot; {p.kicker}
              </p>
              <h3 className="t-h3 mt-3 text-2xl">{p.title}</h3>
              <p className="t-small mt-3 text-[15px]">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-3.5 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.l} className="u-card rounded-[14px] p-5">
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 34,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.v}
              </p>
              <p
                className="t-mono mt-2 text-[9px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>
        <span className="u-ph mt-4 inline-block">
          PLACEHOLDER FIGURES &middot; REPLACE WITH REAL NUMBERS
        </span>
      </Section>

      <Section alt>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            kicker="STAGE 08 / MEDIA BUYING"
            title="What launch week looks like."
            lead="Campaigns go live across every channel at once, and the first days are watched daily."
          />
          <div>
            <p className="t-mono text-[11px]" style={{ color: "var(--muted)" }}>
              LAUNCH LOG
            </p>
            <div className="mt-4">
              {LAUNCH_LOG.map((g) => (
                <div
                  key={g.t}
                  className="flex gap-5 py-3.5 text-[15px]"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="t-mono t-acc w-20 shrink-0 text-xs">{g.t}</span>
                  <span>{g.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Cta title="Want to see the plan for your brand?" />
    </>
  );
}
