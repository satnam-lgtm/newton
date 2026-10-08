import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/site/Cta";
import { PageHero, Section } from "@/components/site/Section";
import { POSTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the flight deck: how we think about budgets, creative and the ad platforms that change every week.",
  alternates: { canonical: "/blog" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="STAGE 12 / READ THE BLOG"
        title="Notes from the flight deck."
        lead="How we think about budgets, creative and the ad platforms that change every week."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.slug} className="u-card u-tile overflow-hidden">
              <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                <div className="h-40" style={{ background: p.bg }} aria-hidden="true" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="t-mono t-acc text-[10px]">{p.cat}</span>
                  <h2 className="t-h3 text-[22px] leading-snug">{p.title}</h2>
                  <p className="t-small text-[15px]">{p.excerpt}</p>
                  <span
                    className="t-mono mt-auto pt-4 text-[10px]"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(p.date).toUpperCase()} &middot; {p.readMinutes} MIN READ
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Cta
        title="Rather talk than read?"
        lead="Book a free growth audit and we will apply all of this to your account directly."
      />
    </>
  );
}
