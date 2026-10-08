import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site/Section";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE.name} collects, uses and protects personal data.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="LEGAL"
        title="Privacy policy"
        lead={`How ${SITE.name} handles the personal data you share with us.`}
      />
      <Section>
        <div className="u-prose max-w-[72ch]">
          <p className="u-ph inline-block">
            TEMPLATE &middot; HAVE A QUALIFIED ADVISER REVIEW BEFORE PUBLISHING
          </p>

          <h2>What we collect</h2>
          <p>
            When you submit an enquiry or request an audit we collect the name, email
            address, company, website, phone number, budget range and message you
            provide. We also collect standard server logs, which include IP address and
            user agent, in order to operate the site and limit abuse.
          </p>

          <h2>Why we collect it</h2>
          <ul>
            <li>To reply to your enquiry and prepare the audit you asked for</li>
            <li>To keep a record of our correspondence with you</li>
            <li>To detect and block automated form abuse</li>
          </ul>
          <p>
            We do not sell your data, and we do not share it with third parties except
            the service providers that host this site and deliver our email, who process
            it on our instructions only.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            This site stores your light or dark theme preference in your browser. No
            advertising or cross-site tracking cookies are set without your consent. If
            and when analytics are added, this section will name the provider and the
            data it receives.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiry details are retained for as long as we are in active conversation
            and for a reasonable period afterwards for our records. Server logs are
            retained for a short operational window.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us what data we hold about you, ask us to correct it, or ask us
            to delete it. Write to{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond within
            one month.
          </p>

          <h2>Contact</h2>
          <p>
            {SITE.name}, {SITE.address}. Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
