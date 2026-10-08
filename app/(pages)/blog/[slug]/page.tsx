import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/site/Cta";
import { Container, Section } from "@/components/site/Section";
import { ArrowRight } from "@/components/site/Icons";
import { POSTS, SITE } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug);
  const published = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
        <div
          className="u-grid-bg pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <Container className="relative pt-14 pb-14 sm:pt-20 sm:pb-20">
          <Link
            href="/blog"
            className="t-mono text-[10px]"
            style={{ color: "var(--muted)" }}
          >
            &larr; ALL POSTS
          </Link>
          <p className="t-mono t-acc mt-8 text-[11px]">{post.cat}</p>
          <h1 className="t-h1 mt-5 max-w-[26ch] text-[clamp(2.25rem,5.5vw,4rem)]">
            {post.title}
          </h1>
          <p className="t-lead mt-7 max-w-[58ch]">{post.excerpt}</p>
          <p className="t-mono mt-8 text-[10px]" style={{ color: "var(--muted)" }}>
            {published.toUpperCase()} &middot; {post.readMinutes} MIN READ
          </p>
        </Container>
        <div className="h-40 sm:h-56" style={{ background: post.bg }} aria-hidden="true" />
      </div>

      <Section>
        <div className="u-prose max-w-[68ch]">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      <Section alt>
        <h2 className="t-h2 text-[clamp(1.5rem,3vw,2.25rem)]">Keep reading</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="u-card u-tile flex flex-col gap-3 p-7"
            >
              <span className="t-mono t-acc text-[10px]">{p.cat}</span>
              <h3 className="t-h3 text-xl leading-snug">{p.title}</h3>
              <span className="mt-2 inline-flex items-center gap-2 text-sm">
                Read it <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Cta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
