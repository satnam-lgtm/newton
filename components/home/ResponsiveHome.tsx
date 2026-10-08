import Link from "next/link";
import {
  LAUNCH_LOG,
  MARQUEE,
  ORBIT_SERVICES,
  PARTNER_BADGES,
  PILLARS,
  PLATFORMS,
  POSTS,
  PROCESS,
  QUALITY_CHECKS,
  SERVICES,
  SITE,
  STATS,
} from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Cta } from "@/components/site/Cta";
import { ArrowRight, Check, Star } from "@/components/site/Icons";

/**
 * The home page for screens too narrow for the flight canvas.
 *
 * Same fourteen stages and the same copy, reflowed into an ordinary
 * responsive document. This is also what is server-rendered on every device,
 * so the full narrative is in the HTML for crawlers regardless of which
 * presentation the browser ends up showing.
 */
export function ResponsiveHome() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
        <div
          className="u-grid-bg pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 95%, rgba(255,212,0,.22), transparent 70%)",
          }}
        />
        <Container className="relative pt-14 pb-20 sm:pt-20">
          <p className="u-kicker">STAGE 00 / MISSION CONTROL</p>
          <h1 className="t-h1 mt-7 text-[clamp(2.75rem,11vw,5rem)]">
            We put <span style={{ color: "var(--wordc)" }}>brands</span> in motion
            <span style={{ color: "#FFD400" }}>.</span>
          </h1>
          <p className="t-lead mt-7 max-w-[52ch]">{SITE.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/audit" className="u-btn u-btn-primary h-14 px-7 text-base">
              Get a free growth audit
              <ArrowRight />
            </Link>
            <Link href="/services" className="u-btn u-btn-ghost h-14 px-6 text-base">
              See how we work
            </Link>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px]"
            style={{ color: "var(--muted)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Star />
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
                {SITE.rating}
              </strong>{" "}
              on Google
            </span>
            <span className="u-chip">Google Partner</span>
            <span className="u-chip">Meta Business Partner</span>
            <span className="u-ph">PLACEHOLDER &middot; USE ONLY IF REAL</span>
          </div>

          {/* The launch pad. The rocket itself is flown over the page by
              ScrollRocket, so only its glow is drawn here. */}
          <div className="relative mt-16 h-32" aria-hidden="true">
            <div
              className="absolute bottom-0 left-1/2 h-24 w-[min(420px,90%)] -translate-x-1/2 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,212,0,.35), rgba(255,212,0,0))",
              }}
            />
          </div>
        </Container>

        <div
          className="flex items-center overflow-hidden py-4"
          style={{
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {/* Duplicated so the -50% translate loops seamlessly. */}
          <div className="marqueeStrip flex w-max items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span
                key={`${m}-${i}`}
                className="t-h3 whitespace-nowrap text-base"
                style={{ color: "var(--muted)" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 01 · Your brand, our focus ──────────────────────────── */}
      <Section alt>
        <SectionHeading
          kicker="STAGE 01 / YOUR BRAND, OUR FOCUS"
          title="Multi-channel advertising that sells."
          lead={`${SITE.name} puts your brand in front of the right people on every channel that matters, then turns that attention into qualified leads and sales.`}
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.no}>
              <p className="t-mono t-acc text-[11px]">
                {p.no} &middot; {p.kicker}
              </p>
              <h3 className="t-h3 mt-3 text-xl">{p.title}</h3>
              <p className="t-small mt-2">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 02 · Free growth audit ──────────────────────────────── */}
      <Section>
        <SectionHeading
          kicker="STAGE 02 / FREE GROWTH AUDIT"
          title="First, we find the leaks."
          lead="Before you spend another click, we audit your ad accounts, targeting, tracking, landing pages and funnel. You get a plain-English report and a prioritised list of fixes."
        />
        <Link href="/audit" className="u-btn u-btn-primary mt-9 h-13 px-6 py-3.5 text-[15px]">
          Get a free growth audit <span aria-hidden="true">&rarr;</span>
        </Link>
      </Section>

      {/* ── 03 · Services ───────────────────────────────────────── */}
      <Section alt>
        <SectionHeading
          kicker="STAGE 03 / SERVICES"
          title="Every paid channel. One crew."
          lead="Pick one service or let us run the full mix. Every campaign is planned around one number: what it earns you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="u-card u-tile flex flex-col gap-3 p-7"
            >
              <span className="t-mono t-acc text-[11px]">{s.no}</span>
              <h3 className="t-h3 text-2xl">{s.title}</h3>
              <p className="t-small text-[15px] leading-relaxed">{s.text}</p>
              <p className="t-mono mt-auto pt-4 text-[10px]" style={{ color: "var(--soft)" }}>
                {s.tags}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 04 · Ad partners ────────────────────────────────────── */}
      <Section>
        <SectionHeading
          kicker="STAGE 04 / AD PARTNERS"
          title="We advertise where your buyers are."
          lead="One plan and one budget view across search, social, video, native and retail media. We move spend to whichever platform is earning the most this week."
        />
        <div className="mt-12 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="u-card u-tile flex h-[120px] flex-col justify-between rounded-[14px] p-4"
            >
              <span className="t-mono text-[9px]" style={{ color: "var(--muted)" }}>
                {p.cat}
              </span>
              <span className="t-h3 text-lg">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {PARTNER_BADGES.map((b) => (
            <span key={b} className="u-chip">
              {b}
            </span>
          ))}
        </div>
      </Section>

      {/* ── 05 · How we work ────────────────────────────────────── */}
      <Section alt>
        <SectionHeading
          kicker="STAGE 05 / HOW WE WORK"
          title="A flight plan, not a guess."
          lead="Your first quarter is mapped before we touch the budget: who we target, what we say, where we show up and how we measure it. Then we correct course every week."
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.no} className="pt-6" style={{ borderTop: "1px solid var(--line2)" }}>
              <p className="t-mono t-acc text-xs">
                {p.no} &middot; {p.title}
              </p>
              <h3 className="t-h3 mt-4 text-lg">{p.text}</h3>
              <p className="t-small mt-3 text-[15px]">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 06 & 07 · Pages and tracking ────────────────────────── */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              kicker="STAGE 06 / LANDING PAGES & CRO"
              title="Pages built to convert."
              lead="Most ad budgets leak on the landing page. We build fast WordPress and Shopify pages, test headlines and offers, and keep lifting conversion rate after launch."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {["Landing pages", "A/B testing", "Shopify", "WordPress", "Page speed"].map(
                (c) => (
                  <span key={c} className="u-chip">
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <SectionHeading
              kicker="STAGE 07 / TRACKING & TRAFFIC QUALITY"
              title="Clean data. Real traffic."
              lead="Server-side tracking, conversion APIs and fraud filtering, so every number is real and your budget only pays for real people."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {QUALITY_CHECKS.map((q) => (
                <span key={q} className="u-chip">
                  <Check />
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 08 · Media buying ───────────────────────────────────── */}
      <Section alt>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            kicker="STAGE 08 / MEDIA BUYING"
            title="Go live."
            lead="Campaigns launch across every channel at once. In the first weeks we watch the numbers daily and move budget to the ads, audiences and placements that convert."
          />
          <div>
            <p className="t-mono text-[11px]" style={{ color: "var(--muted)" }}>
              LAUNCH LOG
            </p>
            <div className="mt-4">
              {LAUNCH_LOG.map((g) => (
                <div
                  key={g.t}
                  className="flex gap-4 py-3.5 text-[15px]"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="t-mono t-acc w-[76px] shrink-0 text-xs">{g.t}</span>
                  <span>{g.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 09 · Remarketing ────────────────────────────────────── */}
      <Section>
        <SectionHeading
          kicker="STAGE 09 / REMARKETING"
          title="Stay in orbit."
          lead="Most buyers don&rsquo;t convert on the first visit. Remarketing, email and content keep your brand circling them until they do."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {ORBIT_SERVICES.map((o) => (
            <div key={o.kicker}>
              <p className="t-mono t-acc text-[11px]">{o.kicker}</p>
              <p className="t-small mt-2.5 text-[15px]">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 10 & 11 · Numbers and dashboards ────────────────────── */}
      <Section alt>
        <SectionHeading
          kicker="STAGE 10 / NUMBERS DON&rsquo;T LIE"
          title="Numbers don&rsquo;t lie."
          lead="Growth that compounds: flat for a while, then it takes off. These are the numbers we report on every month."
        />
        <div className="mt-12 grid gap-3.5 sm:grid-cols-3">
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
          PLACEHOLDER FIGURES &middot; ILLUSTRATIVE CURVE
        </span>

        <div className="mt-16">
          <SectionHeading
            kicker="STAGE 11 / LIVE DASHBOARDS"
            title="Live stats, real results."
            lead="A real-time dashboard for every campaign, a monthly report in plain English and one account lead who knows your numbers."
          />
        </div>
      </Section>

      {/* ── 12 · Blog ───────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          kicker="STAGE 12 / READ THE BLOG"
          title="Notes from the flight deck."
          lead="How we think about budgets, creative and the ad platforms that change every week."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="u-card u-tile flex flex-col overflow-hidden"
            >
              <div className="h-36" style={{ background: b.bg }} aria-hidden="true" />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="t-mono t-acc text-[10px]">{b.cat}</span>
                <h3 className="t-h3 text-xl leading-snug">{b.title}</h3>
                <span
                  className="t-mono mt-auto pt-3 text-[10px]"
                  style={{ color: "var(--muted)" }}
                >
                  {b.readMinutes} MIN READ
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 13 · Let's talk ─────────────────────────────────────── */}
      <Cta />
    </>
  );
}
