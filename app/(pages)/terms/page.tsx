import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site/Section";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms governing use of the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="LEGAL"
        title="Terms of use"
        lead={`The terms that govern your use of this website. Client engagements are governed by a separate signed agreement.`}
      />
      <Section>
        <div className="u-prose max-w-[72ch]">
          <p className="u-ph inline-block">
            TEMPLATE &middot; HAVE A QUALIFIED ADVISER REVIEW BEFORE PUBLISHING
          </p>

          <h2>Using this site</h2>
          <p>
            You may browse this site and submit enquiries for legitimate business
            purposes. You may not attempt to disrupt the site, probe it for
            vulnerabilities without written permission, or submit automated form traffic.
          </p>

          <h2>The figures shown here</h2>
          <p>
            Performance figures, case studies and statistics on this site are
            illustrative unless explicitly labelled otherwise. Advertising results depend
            on your market, offer, budget and product, and nothing here is a guarantee
            of any particular outcome.
          </p>

          <h2>Our content</h2>
          <p>
            The text, design, code and marks on this site belong to {SITE.name} unless
            attributed otherwise. You may quote and link to our articles with
            attribution; you may not republish them wholesale.
          </p>

          <h2>Third-party platforms</h2>
          <p>
            We reference platforms such as Google Ads, Meta, LinkedIn and Shopify as the
            channels we work in. Their names and marks belong to their respective
            owners, and partner status is only claimed where we hold it.
          </p>

          <h2>Liability</h2>
          <p>
            This site is provided as is. To the extent permitted by law we are not liable
            for losses arising from reliance on its general informational content.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
