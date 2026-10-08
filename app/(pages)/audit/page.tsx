import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { Check } from "@/components/site/Icons";
import { AUDIT_ROWS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Free growth audit",
  description:
    "We audit your ad accounts, targeting, tracking, landing pages and funnel, then send a plain-English report with a prioritised list of fixes.",
  alternates: { canonical: "/audit" },
};

const COVERED = [
  {
    title: "Ad account structure",
    text: "Campaign and ad-set architecture, naming, overlap between audiences, and budget distribution against return.",
  },
  {
    title: "Targeting & audiences",
    text: "Who you are actually reaching versus who buys, plus the exclusions and lookalikes that are missing.",
  },
  {
    title: "Tracking & attribution",
    text: "Whether your conversions are real, deduplicated and attributed to the right campaign.",
  },
  {
    title: "Landing page & speed",
    text: "Load time on a mid-range phone, message match with the ad, and the first drop-off point in the flow.",
  },
  {
    title: "Funnel conversion",
    text: "Where visitors leave between click and sale, and which single fix is worth the most.",
  },
];

export default function AuditPage() {
  return (
    <>
      <PageHero
        kicker="STAGE 02 / FREE GROWTH AUDIT"
        title="First, we find the leaks."
        lead="Before you spend another click, we audit your ad accounts, targeting, tracking, landing pages and funnel. You get a plain-English report and a prioritised list of fixes — yours to keep, whether or not you work with us."
      >
        <div className="flex flex-wrap gap-2">
          {["No cost", "No obligation", "Delivered in 5 working days"].map((c) => (
            <span key={c} className="u-chip">
              <Check />
              {c}
            </span>
          ))}
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              kicker="WHAT WE LOOK AT"
              title="Five systems, one report."
              lead="Each area gets a score, the evidence behind it, and the specific change we would make first."
            />
            <ul className="mt-12 flex flex-col">
              {COVERED.map((c, i) => (
                <li
                  key={c.title}
                  className="flex gap-6 py-6"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="t-mono t-acc shrink-0 pt-1 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="t-h3 text-xl">{c.title}</h3>
                    <p className="t-small mt-2 text-[15px]">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* A sample of the scored report, mirroring the home-page mock. */}
            <div className="u-card mt-12 p-7" aria-hidden="true">
              <div className="flex items-center justify-between">
                <span className="t-mono text-[11px]" style={{ color: "var(--muted)" }}>
                  AUDIT REPORT &middot; [YOUR SITE]
                </span>
                <span className="u-ph">SAMPLE</span>
              </div>
              <hr className="u-hr mt-4" />
              {AUDIT_ROWS.map((r) => (
                <div
                  key={r.name}
                  className="flex flex-col gap-2.5 py-3.5"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <div className="flex justify-between text-[15px] font-medium">
                    <span>{r.name}</span>
                    <span className="t-mono text-xs" style={{ color: "var(--muted)" }}>
                      [ &ndash;&ndash; /100 ]
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--track)" }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "var(--fg)", width: r.w }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="t-h2 text-[clamp(1.75rem,3.5vw,2.5rem)]">Request your audit</h2>
            <p className="t-lead mt-4">
              We need read-only access to your ad accounts and analytics to do this
              properly. We will send the access request after you submit.
            </p>
            <div className="mt-8">
              <ContactForm submitLabel="Request my free audit" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
