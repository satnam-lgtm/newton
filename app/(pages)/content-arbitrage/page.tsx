import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { ArrowRight, Check } from "@/components/site/Icons";
import { SITE } from "@/lib/content";
import {
  CAPACITY,
  CAPACITY_LEDGER,
  COUNTERPARTIES,
  CURRENCY_NOTE,
  DEAL_SHAPES,
  FIRST_CALL,
  IDENTITIES,
  LOOP,
  MFA_TRAITS,
  PACK,
  RAMP,
  RISK_POSTURE,
  type Gap,
} from "@/lib/arbitrage";

export const metadata: Metadata = {
  title: "Content arbitrage",
  description:
    "Newton Infotech buys paid traffic into content and is paid on the margin between what a click costs and what the session earns. $400K monthly deployment, $1M committed in a quarter.",
  alternates: { canonical: "/content-arbitrage" },
};

/** Marks a figure Newton still owes, and whether it is absent or confidential. */
function GapChip({ gap }: { gap?: Gap }) {
  if (!gap) return null;
  return (
    <span className="u-ph mt-3 inline-block">
      {gap.kind === "nda" ? "UNDER NDA · " : "TO CONFIRM · "}
      {gap.note}
    </span>
  );
}

export default function ContentArbitragePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
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
              "radial-gradient(ellipse 60% 70% at 50% -10%, rgba(255,212,0,.16), transparent 70%)",
          }}
        />
        <Container className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
          <p className="u-kicker">DOSSIER 00 / CONTENT ARBITRAGE</p>
          <h1 className="t-h1 mt-7 max-w-[18ch] text-[clamp(2.75rem,7vw,5.5rem)]">
            We bring the spend. You bring the inventory.
          </h1>
          <p className="t-lead mt-7 max-w-[62ch] text-[clamp(1rem,2vw,1.25rem)]">
            {SITE.name} buys paid traffic into content and is paid on the margin between
            what a click costs and what the session earns. We operate the buy side, we
            carry the risk on it, and we are looking for partners who hold the other half
            of the loop.
          </p>

          {/* The two figures. Labels do the reconciling. */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {CAPACITY.map((c) => (
              <div key={c.label} className="u-card p-7">
                <p
                  className="t-mono text-[10px]"
                  style={{ color: "var(--muted)" }}
                >
                  {c.label.toUpperCase()}
                </p>
                <p
                  className="mt-4 flex items-baseline gap-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                  }}
                >
                  <span className="text-[clamp(2.5rem,6vw,3.5rem)] leading-none">
                    {c.figure}
                  </span>
                  <span
                    className="t-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {c.unit}
                  </span>
                </p>
                <p className="t-small mt-4 text-[15px]">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="t-mono mt-4 text-[10px]" style={{ color: "var(--muted)" }}>
            {CURRENCY_NOTE.toUpperCase()}
          </p>

          {/* Partners, named plainly. No logos, no borrowed credibility. */}
          <div className="mt-10" style={{ borderTop: "1px solid var(--line)" }}>
            <p className="t-mono mt-7 text-[10px]" style={{ color: "var(--muted)" }}>
              TRUSTED PARTNERS
            </p>
            <p className="t-h3 mt-3 text-2xl">Shinez &middot; Pub+</p>
            <p className="t-small mt-3 max-w-[58ch]">
              Our own characterisation of the relationships. Neither company has made any
              statement about {SITE.name}, and nothing on this page should be read as an
              endorsement by either.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="u-btn u-btn-primary h-14 px-7 text-base">
              Request the counterparty pack
              <ArrowRight />
            </Link>
            <a href="#first-call" className="u-btn u-btn-ghost h-14 px-6 text-base">
              The thirty-minute call
            </a>
          </div>
        </Container>
      </div>

      {/* ── 01 · Capacity ─────────────────────────────────────── */}
      <Section alt id="capacity">
        <SectionHeading
          kicker="DOSSIER 01 / CAPACITY"
          title="The numbers, with their labels attached."
          lead="Two figures, both ours, stated as what they are. We have not multiplied one into the other or back-solved a monthly average from a quarterly total, because those would be different claims."
        />
        <div className="mt-14 flex flex-col">
          {CAPACITY_LEDGER.map((row) => (
            <div
              key={row.label}
              className="grid gap-4 py-7 md:grid-cols-[minmax(0,22ch)_minmax(0,24ch)_1fr] md:gap-10"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <p className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
                {row.label}
              </p>
              <p className="t-h3 text-xl">{row.value}</p>
              <div>
                <p className="t-small text-[15px]">{row.body}</p>
                <GapChip gap={row.gap} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 02 · The loop ─────────────────────────────────────── */}
      <Section id="the-loop">
        <SectionHeading
          kicker="DOSSIER 02 / HOW THE MONEY MOVES"
          title="Six steps. One inequality."
          lead="Content arbitrage is one closed loop and one inequality: session RPM has to clear the cost of a thousand visitors by enough to survive fees, clawbacks and payout shaving. Which side owns which step is the first thing a call settles, so every step below is marked."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[18px] md:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--line)" }}>
          {LOOP.map((step) => (
            <li key={step.no} className="p-7" style={{ background: "var(--card)" }}>
              <div className="flex items-center justify-between gap-3">
                <span className="t-mono t-acc text-xs">{step.no}</span>
                <span
                  className="t-mono text-[9px]"
                  style={{
                    color: step.owner === "NEWTON" ? "var(--fg)" : "var(--muted)",
                  }}
                >
                  {step.owner}
                </span>
              </div>
              <h3 className="t-h3 mt-4 text-xl">{step.title}</h3>
              <p className="t-small mt-3 text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {IDENTITIES.map((id) => (
            <div key={id.label} className="pt-6" style={{ borderTop: "1px solid var(--line2)" }}>
              <p className="t-mono t-acc text-[10px]">{id.label}</p>
              <p
                className="t-mono mt-4 text-[15px]"
                style={{ color: "var(--fg)", letterSpacing: "0.02em" }}
              >
                {id.formula}
              </p>
              <p className="t-small mt-3 text-[15px]">{id.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 03 · MFA traits ───────────────────────────────────── */}
      <Section alt id="traffic-quality">
        <SectionHeading
          kicker="DOSSIER 03 / TRAFFIC AND INVENTORY"
          title="We fail one trait of five."
          lead="The ANA, 4A's, ISBA and WFA publish shared criteria for identifying made-for-advertising inventory, and buyers apply them with discretion — a flagged property loses demand whether or not it is policy-compliant. One of the five is true of us. We are not going to argue it away; we are going to show you the other four."
        />
        <div className="mt-14 flex flex-col">
          {MFA_TRAITS.map((t) => {
            const conceded = t.conceded === true;
            return (
              <div
                key={t.no}
                className="grid gap-4 py-7 md:grid-cols-[auto_1fr_1.1fr] md:gap-10"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <span
                  className="t-mono text-xs"
                  style={{ color: conceded ? "var(--color-yellow)" : "var(--muted)" }}
                >
                  {t.no}
                </span>
                <p
                  className="text-[15px]"
                  style={{ color: conceded ? "var(--fg)" : "var(--muted)" }}
                >
                  {t.trait}
                </p>
                <div>
                  {conceded && (
                    <span
                      className="t-mono mb-3 inline-block rounded-full px-2.5 py-1 text-[9px]"
                      style={{ background: "var(--color-yellow)", color: "#0A0A0B" }}
                    >
                      TRUE OF US
                    </span>
                  )}
                  <p className="text-[15px]" style={{ color: "var(--soft)" }}>
                    {t.stance}
                  </p>
                  <GapChip gap={t.gap} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 04 · Risk posture ─────────────────────────────────── */}
      <Section id="risk">
        <SectionHeading
          kicker="DOSSIER 04 / WHY WE ARE A SAFE COUNTERPARTY"
          title="Your account is the one at risk."
          lead="A monetisation partner taking our traffic is putting its own policy standing behind our buying. That asymmetry is the real subject of any first conversation, so we would rather open with it than be asked."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {RISK_POSTURE.map((r) => (
            <div key={r.label} className="pt-6" style={{ borderTop: "1px solid var(--line2)" }}>
              <p className="t-mono t-acc text-[10px]">{r.label}</p>
              <h3 className="t-h3 mt-4 text-xl">{r.title}</h3>
              <p className="t-small mt-3 text-[15px]">{r.body}</p>
              <GapChip gap={r.gap} />
            </div>
          ))}
        </div>
        <p className="t-small mt-12 max-w-[62ch] text-[15px]">
          Where a row above is marked <strong style={{ color: "var(--fg)" }}>TO CONFIRM</strong>,
          we would rather leave it visibly empty than fill it with something we cannot put
          a document behind. Everything on this page is intended to survive the diligence
          it invites.
        </p>
      </Section>

      {/* ── 05 · Counterparties ───────────────────────────────── */}
      <Section alt id="counterparties">
        <SectionHeading
          kicker="DOSSIER 05 / WHO WE WORK WITH"
          title="Two partners, named once."
          lead="We name them because of what the integrations require of us operationally, not to borrow anyone's balance sheet."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {COUNTERPARTIES.map((c) => (
            <div key={c.name} className="u-card p-8">
              <p className="t-mono t-acc text-[10px]">{c.role}</p>
              <h3 className="t-h3 mt-4 text-3xl">{c.name}</h3>
              <p className="t-small mt-4 text-[15px]">{c.body}</p>
            </div>
          ))}
        </div>

        {/* The one thing on this page written for a specific reader. */}
        <div className="u-card mt-6 p-8">
          <p className="t-mono t-acc text-[10px]">WHY THE ATTRIBUTION SHAPE MATTERS</p>
          <h3 className="t-h3 mt-4 text-2xl">Our spend data and your revenue data reconcile on campaign.</h3>
          <p className="t-small mt-4 max-w-[70ch] text-[15px]">
            Attribution platforms built for content distribution resolve revenue to
            campaign, ad set and creative. Publisher-side forecasting increasingly drills
            the same way — site, then campaign, then country — specifically so a paid
            campaign diverging from forecast is caught intraday rather than at
            consolidation. Those two datasets are the same shape and join on campaign ID.
            We will push our spend side into that comparison from the first week, so your
            predicted-versus-actual gap has a cause attached to it instead of a question
            mark.
          </p>
        </div>
      </Section>

      {/* ── 06 · Deal shapes ──────────────────────────────────── */}
      <Section id="deal">
        <SectionHeading
          kicker="DOSSIER 06 / TWO WAYS TO WORK TOGETHER"
          title="Pick the half you already own."
          lead="We are useful to two different kinds of company, and the deal is not the same in both cases. What we need from you is listed as plainly as what we bring."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {DEAL_SHAPES.map((d) => (
            <div key={d.key} className="u-card flex flex-col p-8">
              <p className="t-mono t-acc text-[10px]">{d.kicker}</p>
              <h3 className="t-h3 mt-4 text-2xl">{d.title}</h3>
              <p className="t-small mt-4 text-[15px]">{d.body}</p>
              <p
                className="t-mono mt-8 text-[10px]"
                style={{ color: "var(--muted)" }}
              >
                WHAT WE NEED FROM YOU
              </p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {d.asks.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-1.5 shrink-0">
                      <Check />
                    </span>
                    <span style={{ color: "var(--soft)" }}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="t-small mt-10 max-w-[62ch] text-[15px]">
          We answer every one of those questions about ourselves on the first call. We are
          asking the same of you.
        </p>
      </Section>

      {/* ── 07 · Ramp ─────────────────────────────────────────── */}
      <Section alt id="ramp">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            kicker="DOSSIER 07 / THE FIRST 90 DAYS"
            title="Small first, on purpose."
            lead="Nobody should take $400K a month of traffic from a counterparty they have not watched at $5K. The ramp below is the one we propose, and we are happy to start lower than you expect."
          />
          <div>
            <p className="t-mono text-[11px]" style={{ color: "var(--muted)" }}>
              PROPOSED RAMP
            </p>
            <div className="mt-4">
              {RAMP.map((r) => (
                <div
                  key={r.t}
                  className="flex flex-col gap-2 py-4 text-[15px] sm:flex-row sm:gap-6"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="t-mono t-acc w-[92px] shrink-0 text-xs">{r.t}</span>
                  <span style={{ color: "var(--soft)" }}>{r.e}</span>
                </div>
              ))}
            </div>
            <p className="t-small mt-8 text-[15px]">
              We will start on shorter settlement terms, or prepay, and ask to graduate
              against milestones we agree in week one. We are not asking a new partner to
              extend credit against traffic they have not seen yet.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 08 · First call + pack ────────────────────────────── */}
      <Section id="first-call">
        <SectionHeading
          kicker="DOSSIER 08 / FIRST CALL"
          title="Thirty minutes. Five questions."
          lead="The agenda is published so nobody spends the first fifteen minutes establishing what the call is for."
        />
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <ol className="flex flex-col">
            {FIRST_CALL.map((q, i) => (
              <li
                key={q}
                className="flex gap-5 py-5 text-[15px]"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <span className="t-mono t-acc shrink-0 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "var(--soft)" }}>{q}</span>
              </li>
            ))}
          </ol>

          <div>
            <p className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
              OR SKIP THE CALL — THE COUNTERPARTY PACK
            </p>
            <p className="t-small mt-4 text-[15px]">
              One file, sent on request, so your analyst can run the first gate without us
              in the room.
            </p>
            <div className="mt-6 flex flex-col">
              {PACK.map((p) => (
                <div
                  key={p.label}
                  className="flex gap-5 py-4"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="t-mono t-acc shrink-0 pt-0.5 text-xs">{p.label}</span>
                  <div>
                    <p className="text-[15px]" style={{ color: "var(--fg)" }}>
                      {p.title}
                    </p>
                    <p className="t-small mt-1 text-[14px]">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Close ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{ background: "var(--bg2)" }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-full h-[320px] w-[min(1100px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,212,0,.3), rgba(255,212,0,.06) 60%, rgba(255,212,0,0))",
          }}
        />
        <Container className="relative text-center">
          <h2 className="t-h2 mx-auto max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)]">
            Send us the gate. We will answer it.
          </h2>
          <p className="t-lead mx-auto mt-7 max-w-[54ch]">
            If you run a formal partner-onboarding process, tell us which stage you want
            us to enter at and what you need in hand before it. We would rather start at
            your first gate than ask for an exception to it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="u-btn u-btn-primary h-14 px-7 text-base">
              Start the conversation
              <ArrowRight />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="u-btn u-btn-ghost h-14 px-6 text-base"
            >
              {SITE.email}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
