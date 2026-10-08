import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Cta } from "@/components/site/Cta";
import { Container, PageHero, Section, SectionHeading } from "@/components/site/Section";
import { Check } from "@/components/site/Icons";
import { FAQS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Newton Infotech about paid search, paid social, native advertising, lead generation and CRO. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

const WHAT_HAPPENS = [
  {
    no: "01",
    title: "We read it ourselves",
    text: "No form queue and no chatbot. One of the people who would run your account reads your enquiry.",
  },
  {
    no: "02",
    title: "A 30-minute call",
    text: "We ask about your numbers, your margins and what you have already tried. You can ask us anything.",
  },
  {
    no: "03",
    title: "A written plan",
    text: "If there is a fit, you get a plan with channels, budget and the metric we expect to move first.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phone,
    },
  };

  return (
    <>
      <PageHero
        kicker="STAGE 13 / LET’S TALK"
        title={
          <>
            Tell us what you want to{" "}
            <span style={{ color: "var(--color-yellow)" }}>grow</span>.
          </>
        }
        lead="Whether you know exactly which channel to scale or just know the numbers are not moving, start here. We reply within one working day."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <ContactForm />

          <div>
            <SectionHeading
              kicker="DIRECT LINES"
              title="Prefer to skip the form?"
              lead="Email or call and you will reach a person, not a ticket."
            />

            <dl className="mt-10 flex flex-col gap-7">
              <DetailRow label="EMAIL">
                <a href={`mailto:${SITE.email}`} className="t-h3 text-xl">
                  {SITE.email}
                </a>
              </DetailRow>
              <DetailRow label="PHONE">
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="t-h3 text-xl">
                  {SITE.phone}
                </a>
                <p className="t-small mt-2">Mon&ndash;Fri, 10:00&ndash;19:00 IST</p>
              </DetailRow>
              <DetailRow label="OFFICE">
                <p className="t-h3 text-xl">{SITE.address}</p>
                <span className="u-ph mt-3 inline-block">
                  PLACEHOLDER &middot; ADD REAL ADDRESS
                </span>
              </DetailRow>
            </dl>

            <hr className="u-hr my-10" />

            <h3 className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
              WHAT HAPPENS NEXT
            </h3>
            <ol className="mt-6 flex flex-col gap-6">
              {WHAT_HAPPENS.map((s) => (
                <li key={s.no} className="flex gap-4">
                  <span className="t-mono t-acc shrink-0 text-xs">{s.no}</span>
                  <div>
                    <p className="t-h3 text-base">{s.title}</p>
                    <p className="t-small mt-1.5">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className="mt-10 flex flex-wrap gap-2"
              aria-label="What is included at no cost"
            >
              {["No obligation", "No lock-in pitch", "You keep the audit"].map((c) => (
                <span key={c} className="u-chip">
                  <Check />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section alt id="faq">
        <SectionHeading kicker="BEFORE YOU WRITE" title="Common questions." />
        <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="t-h3 text-xl">{f.q}</h3>
              <p className="t-small mt-3 text-[15px] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Cta
        title="Or start with the free audit."
        lead="We will show you where the spend is leaking before you commit to anything."
      />

      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Container>
    </>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
        {label}
      </dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}
