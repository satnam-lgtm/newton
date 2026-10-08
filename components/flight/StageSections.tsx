"use client";

import Link from "next/link";
import {
  AUDIT_ROWS,
  LAUNCH_LOG,
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
import { STAR_FIELDS } from "@/lib/flight";
import { Check } from "@/components/site/Icons";
import { LogoMark } from "@/components/site/Logo";

type Lit = Record<string, boolean>;

type StageProps = {
  lit: Lit;
  onCtaHover: (on: boolean) => void;
};

/** Stage label with its "reached" state. */
function StageLabel({
  lit,
  children,
  style,
  className,
}: {
  lit?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <p className={`slabel${lit ? " lit" : ""}${className ? ` ${className}` : ""}`} style={style}>
      <i />
      {children}
    </p>
  );
}

export function StageSections({ lit, onCtaHover }: StageProps) {
  return (
    <>
      {/* ── 01 · Your brand, our focus ──────────────────────────── */}
      <section className="sec sb" id="stage-1" style={{ top: 900, height: 900 }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -40,
            top: 120,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 300,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px var(--eq)",
            whiteSpace: "nowrap",
          }}
        >
          ROI
        </div>
        <div className="z" style={{ left: 120, top: 80, width: 620 }}>
          <StageLabel lit={lit.s1}>STAGE 01 / YOUR BRAND, OUR FOCUS</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, fontSize: 72 }}>
            Multi-channel advertising that sells.
          </h2>
          <p className="t-lead" style={{ marginTop: 28, width: 470 }}>
            {SITE.name} puts your brand in front of the right people on every channel
            that matters, then turns that attention into qualified leads and sales.
            Strategy, media buying, creative and pages, under one roof.
          </p>
        </div>
        <div
          className="z"
          style={{
            left: 820,
            top: 580,
            width: 520,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.no}>
              <p className="t-mono t-acc" style={{ margin: 0, fontSize: 11 }}>
                {p.no} &middot; {p.kicker}
              </p>
              <h3 className="t-h3" style={{ marginTop: 10, fontSize: 20 }}>
                {p.title}
              </h3>
              <p className="t-small" style={{ marginTop: 8 }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 · Free growth audit ──────────────────────────────── */}
      <section className="sec sa" id="stage-2" style={{ top: 1800, height: 800 }}>
        <div className="z" style={{ left: 120, top: 80, width: 440 }}>
          <StageLabel lit={lit.s2}>STAGE 02 / FREE GROWTH AUDIT</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, fontSize: 64 }}>
            First, we find the leaks.
          </h2>
          <p className="t-lead" style={{ marginTop: 26 }}>
            Before you spend another click, we audit your ad accounts, targeting,
            tracking, landing pages and funnel. You get a plain-English report and a
            prioritised list of fixes.
          </p>
          <Link
            href="/audit"
            className="u-btn u-btn-primary"
            style={{ marginTop: 32, height: 52, padding: "0 24px", fontSize: 15 }}
          >
            Get a free growth audit <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Audit report mock */}
        <div
          className="u-card"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 740,
            top: 120,
            width: 540,
            height: 560,
            padding: 28,
            borderRadius: 20,
            boxShadow: "0 30px 60px var(--shadow)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="t-mono" style={{ fontSize: 11, color: "var(--muted)" }}>
              AUDIT REPORT &middot; [YOUR SITE]
            </span>
            <span className="u-ph">PLACEHOLDER</span>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          {AUDIT_ROWS.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "14px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 500 }}>
                <span>{r.name}</span>
                <span className="t-mono" style={{ fontSize: 12, color: "var(--muted)" }}>
                  [ &ndash;&ndash; /100 ]
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "var(--track)" }}>
                <div style={{ height: 6, borderRadius: 3, background: "var(--fg)", width: r.w }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 · Services ───────────────────────────────────────── */}
      <section className="sec sb" id="stage-3" style={{ top: 2600, height: 1000 }}>
        <div className="z" style={{ left: 120, top: 40, width: 640 }}>
          <StageLabel lit={lit.s3}>STAGE 03 / SERVICES</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 18, fontSize: 56 }}>
            Every paid channel. One crew.
          </h2>
        </div>
        <p
          className="z t-lead"
          style={{ left: 800, top: 70, width: 420, margin: 0, fontSize: 16 }}
        >
          Pick one service or let us run the full mix. Every campaign is planned around
          one number: what it earns you.
        </p>
        <div
          className="z"
          style={{
            left: 120,
            top: 260,
            width: 1200,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <Link
              key={s.no}
              href={`/services#${s.slug}`}
              className="u-card u-tile"
              style={{
                height: 284,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span className="t-mono t-acc" style={{ fontSize: 11 }}>
                {s.no}
              </span>
              <h3 className="t-h3" style={{ fontSize: 26 }}>
                {s.title}
              </h3>
              <p className="t-small" style={{ fontSize: 15, lineHeight: 1.55 }}>
                {s.text}
              </p>
              <p
                className="t-mono"
                style={{ margin: "auto 0 0", fontSize: 10, color: "var(--soft)" }}
              >
                {s.tags}
              </p>
            </Link>
          ))}
        </div>
        <Link
          className="z"
          href="/audit"
          style={{
            left: 120,
            top: 900,
            fontSize: 15,
            borderBottom: "1px solid var(--line2)",
            paddingBottom: 4,
          }}
        >
          Not sure where to start? Get the free audit &rarr;
        </Link>
      </section>

      {/* ── 04 · Ad partners ────────────────────────────────────── */}
      <section className="sec sa" id="stage-4" style={{ top: 3600, height: 900 }}>
        <div
          className="z"
          style={{
            left: 300,
            top: 110,
            width: 610,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {PLATFORMS.map((pl) => (
            <div
              key={pl.name}
              className="u-card u-tile"
              style={{
                height: 132,
                padding: 18,
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span className="t-mono" style={{ fontSize: 9, color: "var(--muted)" }}>
                {pl.cat}
              </span>
              <span className="t-h3" style={{ fontSize: 21 }}>
                {pl.name}
              </span>
            </div>
          ))}
        </div>
        <div className="z" style={{ left: 980, top: 110, width: 380 }}>
          <StageLabel lit={lit.s4}>STAGE 04 / AD PARTNERS</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, fontSize: 54 }}>
            We advertise where your buyers are.
          </h2>
          <p className="t-lead" style={{ marginTop: 24 }}>
            One plan and one budget view across search, social, video, native and retail
            media. We move spend to whichever platform is earning the most this week.
          </p>
          <p
            className="t-mono"
            style={{ margin: "30px 0 12px", fontSize: 10, color: "var(--muted)" }}
          >
            CERTIFIED PARTNERS
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PARTNER_BADGES.map((b) => (
              <span key={b} className="u-chip">
                {b}
              </span>
            ))}
          </div>
          <p className="u-ph" style={{ display: "inline-block", margin: "14px 0 0" }}>
            SHOW ONLY BADGES NEWTON INFOTECH HOLDS
          </p>
        </div>
      </section>

      {/* ── 05 · How we work ────────────────────────────────────── */}
      <section className="sec sb" id="stage-5" style={{ top: 4500, height: 1000 }}>
        <div className="z" style={{ left: 120, top: 80, width: 460 }}>
          <StageLabel lit={lit.s5}>STAGE 05 / HOW WE WORK</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, fontSize: 64 }}>
            A flight plan, not a guess.
          </h2>
          <p className="t-lead" style={{ marginTop: 26 }}>
            Your first quarter is mapped before we touch the budget: who we target, what
            we say, where we show up and how we measure it. Then we correct course every
            week.
          </p>
        </div>
        {/* Each step sits beside the point where the flight path loops past it. */}
        <div className="z" style={{ left: 590, top: 172, width: 260, textAlign: "right" }}>
          <p className="t-mono t-acc" style={{ margin: 0, fontSize: 12 }}>
            01 &middot; {PROCESS[0].title}
          </p>
          <p className="t-small" style={{ marginTop: 6 }}>
            {PROCESS[0].text}
          </p>
        </div>
        <div className="z" style={{ left: 1252, top: 356, width: 170 }}>
          <p className="t-mono t-acc" style={{ margin: 0, fontSize: 12 }}>
            02 &middot; {PROCESS[1].title}
          </p>
          <p className="t-small" style={{ marginTop: 6 }}>
            {PROCESS[1].text}
          </p>
        </div>
        <div className="z" style={{ left: 590, top: 494, width: 250, textAlign: "right" }}>
          <p className="t-mono t-acc" style={{ margin: 0, fontSize: 12 }}>
            03 &middot; {PROCESS[2].title}
          </p>
          <p className="t-small" style={{ marginTop: 6 }}>
            {PROCESS[2].text}
          </p>
        </div>
        <div className="z" style={{ left: 334, top: 850, width: 300 }}>
          <p className="t-mono t-acc" style={{ margin: 0, fontSize: 12 }}>
            04 &middot; {PROCESS[3].title}
          </p>
          <p className="t-small" style={{ marginTop: 6 }}>
            {PROCESS[3].text}
          </p>
        </div>
      </section>

      {/* ── 06 · Landing pages & CRO ────────────────────────────── */}
      <section className="sec sa" id="stage-6" style={{ top: 5500, height: 1000 }}>
        {/* Wireframe of a landing page, drawn in fixed dark values on purpose:
            it is a picture of a screen, not a themed surface. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 320,
            top: 140,
            width: 560,
            height: 360,
            boxSizing: "border-box",
            borderRadius: 20,
            background: "#0A0A0B",
            border: "1px solid #2B2B31",
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ width: 70, height: 10, borderRadius: 5, background: "#2B2B31" }} />
            <span style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 34, height: 8, borderRadius: 4, background: "#2B2B31" }} />
              <span style={{ width: 34, height: 8, borderRadius: 4, background: "#2B2B31" }} />
              <span style={{ width: 50, height: 14, borderRadius: 7, background: "#FFD400" }} />
            </span>
          </div>
          <div style={{ marginTop: 26, width: 300, height: 22, borderRadius: 6, background: "#F5F5F2" }} />
          <div style={{ width: 220, height: 22, borderRadius: 6, background: "#F5F5F2" }} />
          <div style={{ width: 260, height: 8, borderRadius: 4, background: "#3A3A3F" }} />
          <div style={{ width: 90, height: 26, borderRadius: 13, background: "#FFD400" }} />
          <div
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            <span style={{ height: 56, borderRadius: 8, background: "#1B1B1F" }} />
            <span style={{ height: 56, borderRadius: 8, background: "#1B1B1F" }} />
            <span style={{ height: 56, borderRadius: 8, background: "#1B1B1F" }} />
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 250,
            top: 500,
            width: 700,
            height: 50,
            background: "var(--track)",
            clipPath: "polygon(10% 0, 90% 0, 100% 72%, 100% 100%, 0 100%, 0 72%)",
          }}
        />
        <div className="z" style={{ left: 1000, top: 120, width: 360 }}>
          <StageLabel lit={lit.s6}>STAGE 06 / LANDING PAGES &amp; CRO</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, fontSize: 54 }}>
            Pages built to convert.
          </h2>
          <p className="t-lead" style={{ marginTop: 24 }}>
            Most ad budgets leak on the landing page. We build fast WordPress and Shopify
            pages, test headlines and offers, and keep lifting conversion rate after
            launch.
          </p>
          <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Landing pages", "A/B testing", "Shopify", "WordPress", "Page speed"].map((c) => (
              <span key={c} className="u-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 · Tracking & traffic quality ─────────────────────── */}
      <section className="sec sb" id="stage-7" style={{ top: 6500, height: 900 }}>
        <StageLabel lit={lit.s7} className="z" style={{ left: 120, top: 50 }}>
          STAGE 07 / TRACKING &amp; TRAFFIC QUALITY
        </StageLabel>
        <span
          className="z t-mono"
          style={{ left: 600, top: 660, fontSize: 11, color: "#1FA35B" }}
        >
          ALL SYSTEMS GO
        </span>
        <div className="z" style={{ left: 120, top: 690, width: 540 }}>
          <h2 className="t-h2" style={{ fontSize: 54 }}>
            Clean data. Real traffic.
          </h2>
          <p className="t-lead" style={{ marginTop: 16, fontSize: 16 }}>
            Server-side tracking, conversion APIs and fraud filtering, so every number is
            real and your budget only pays for real people.
          </p>
        </div>
        <div
          className="z"
          style={{ left: 720, top: 770, width: 620, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {QUALITY_CHECKS.map((q) => (
            <span key={q} className="u-chip">
              <Check />
              {q}
            </span>
          ))}
        </div>
      </section>

      {/* ── 08 · Media buying ───────────────────────────────────── */}
      <section className="sec sec8" id="stage-8" style={{ top: 7400, height: 1000 }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 600,
            top: 160,
            width: 280,
            height: 800,
            background:
              "repeating-linear-gradient(90deg, transparent 0 46px, var(--line2) 46px 47px)",
            WebkitMaskImage: "linear-gradient(transparent, #000 30%, #000 70%, transparent)",
            maskImage: "linear-gradient(transparent, #000 30%, #000 70%, transparent)",
          }}
        />
        <div className="z" style={{ left: 120, top: 100, width: 470 }}>
          <StageLabel lit={lit.s8}>STAGE 08 / MEDIA BUYING</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 24, fontSize: 150 }}>
            Go live.
          </h2>
          <p className="t-lead" style={{ marginTop: 28 }}>
            Campaigns launch across every channel at once. In the first weeks we watch the
            numbers daily and move budget to the ads, audiences and placements that
            convert.
          </p>
        </div>
        <div className="z" style={{ left: 860, top: 330, width: 460 }}>
          <p
            className="t-mono"
            style={{ margin: "0 0 14px", fontSize: 11, color: "var(--muted)" }}
          >
            LAUNCH LOG
          </p>
          {LAUNCH_LOG.map((g) => (
            <div
              key={g.t}
              style={{
                display: "flex",
                gap: 18,
                padding: "14px 0",
                borderTop: "1px solid var(--line)",
                fontSize: 15,
              }}
            >
              <span className="t-mono t-acc" style={{ fontSize: 12, width: 80 }}>
                {g.t}
              </span>
              <span>{g.e}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 09 · Remarketing ────────────────────────────────────── */}
      <section className="sec sa" id="stage-9" style={{ top: 8400, height: 1100 }}>
        <div
          className="stars"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1,
            height: 1,
            borderRadius: "50%",
            boxShadow: STAR_FIELDS.s,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 420,
            top: 250,
            width: 600,
            height: 600,
            boxSizing: "border-box",
            borderRadius: "50%",
            border: "1px dashed var(--line2)",
          }}
        />
        <div
          className="z"
          aria-hidden="true"
          style={{
            left: 580,
            top: 410,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 34% 30%, #6FA0FF, #1E6BFF 42%, #0B2E7A 100%)",
            boxShadow: "0 0 80px rgba(30,107,255,.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="planetLabel"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24 }}
          >
            YOUR BRAND
          </span>
        </div>
        <div className="z" style={{ left: 100, top: 120, width: 300 }}>
          <StageLabel lit={lit.s9}>STAGE 09 / REMARKETING</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 26, fontSize: 54 }}>
            Stay in orbit.
          </h2>
          <p className="t-lead" style={{ marginTop: 22, fontSize: 16 }}>
            Most buyers don&rsquo;t convert on the first visit. Remarketing, email and
            content keep your brand circling them until they do.
          </p>
        </div>
        <div
          className="z"
          style={{
            left: 1090,
            top: 150,
            width: 270,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {ORBIT_SERVICES.map((o) => (
            <div key={o.kicker}>
              <p className="t-mono t-acc" style={{ margin: 0, fontSize: 11 }}>
                {o.kicker}
              </p>
              <p className="t-small" style={{ marginTop: 6 }}>
                {o.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 · Numbers ────────────────────────────────────────── */}
      <section className="sec sb" id="stage-10" style={{ top: 9500, height: 900 }}>
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: 160, top: 720, width: 1180, height: 1, background: "var(--line2)" }}
        />
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: 160, top: 80, width: 1, height: 640, background: "var(--line2)" }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 160,
            top: 80,
            width: 1180,
            height: 640,
            backgroundImage:
              "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            backgroundSize: "118px 80px",
          }}
        />
        <span
          className="t-mono"
          aria-hidden="true"
          style={{ position: "absolute", left: 176, top: 88, fontSize: 10, color: "var(--muted)" }}
        >
          GROWTH &uarr;
        </span>
        <span
          className="t-mono"
          aria-hidden="true"
          style={{ position: "absolute", left: 1270, top: 736, fontSize: 10, color: "var(--muted)" }}
        >
          TIME &rarr;
        </span>
        <div className="z" style={{ left: 260, top: 120, width: 520 }}>
          <StageLabel lit={lit.s10}>STAGE 10 / NUMBERS DON&rsquo;T LIE</StageLabel>
          <h2 className="t-h2" style={{ marginTop: 26, fontSize: 64 }}>
            Numbers don&rsquo;t lie.
          </h2>
          <p className="t-lead" style={{ marginTop: 22 }}>
            Growth that compounds: flat for a while, then it takes off. These are the
            numbers we report on every month.
          </p>
        </div>
        <div
          className="z"
          style={{
            left: 260,
            top: 450,
            width: 640,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {STATS.map((st) => (
            <div key={st.l} className="u-card" style={{ padding: 18, borderRadius: 14 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 34,
                  letterSpacing: "-0.03em",
                }}
              >
                {st.v}
              </p>
              <p
                className="t-mono"
                style={{ margin: "8px 0 0", fontSize: 9, lineHeight: 1.5, color: "var(--muted)" }}
              >
                {st.l}
              </p>
            </div>
          ))}
        </div>
        <span className="z u-ph" style={{ left: 260, top: 590 }}>
          PLACEHOLDER FIGURES &middot; ILLUSTRATIVE CURVE
        </span>
      </section>

      {/* ── 11 · Live dashboards ────────────────────────────────── */}
      <section className="sec sa" id="stage-11" style={{ top: 10400, height: 900 }}>
        {/* Solar panels and a satellite bus, drawn as the path docks here. */}
        {[500, 760].map((left) => (
          <div
            key={left}
            aria-hidden="true"
            style={{
              position: "absolute",
              left,
              top: 106,
              width: 140,
              height: 34,
              border: "1px solid rgba(91,147,255,.5)",
              background:
                "repeating-linear-gradient(90deg, rgba(30,107,255,.35) 0 18px, rgba(30,107,255,.15) 18px 20px)",
            }}
          />
        ))}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: 640, top: 121, width: 120, height: 4, background: "var(--track)" }}
        />
        <div
          className="u-card"
          aria-hidden="true"
          style={{ position: "absolute", left: 652, top: 90, width: 96, height: 66, borderRadius: 12 }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 688,
            top: 156,
            width: 24,
            height: 16,
            boxSizing: "border-box",
            border: "2px solid #FFD400",
            borderTop: 0,
            borderRadius: "0 0 6px 6px",
          }}
        />
        <StageLabel lit={lit.s11} className="z" style={{ left: 120, top: 60 }}>
          STAGE 11 / LIVE DASHBOARDS
        </StageLabel>
        <div className="z" style={{ left: 200, top: 330, width: 500 }}>
          <h2 className="t-h2" style={{ fontSize: 54 }}>
            Live stats, real results.
          </h2>
          <p className="t-lead" style={{ marginTop: 22 }}>
            A real-time dashboard for every campaign, a monthly report in plain English
            and one account lead who knows your numbers. You always know where your money
            is going.
          </p>
        </div>
        <div className="z u-card" style={{ left: 820, top: 330, width: 500, padding: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="t-mono" style={{ fontSize: 11, color: "var(--muted)" }}>
              CAMPAIGN DASHBOARD &middot; [MONTH]
            </span>
            <span className="u-ph">PLACEHOLDER</span>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {["LEADS", "ROAS", "CPA"].map((k) => (
              <div key={k} style={{ padding: 14, borderRadius: 12, background: "var(--bg)" }}>
                <p className="t-mono" style={{ margin: 0, fontSize: 10, color: "var(--muted)" }}>
                  {k}
                </p>
                <p className="t-h3" style={{ marginTop: 8, fontSize: 24 }}>
                  [ &ndash;&ndash; ]
                </p>
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 448 70"
            width="448"
            height="70"
            style={{ marginTop: 18, display: "block" }}
            aria-hidden="true"
          >
            <path
              d="M0 60 C60 58 90 50 140 46 S230 40 280 30 S380 14 448 8"
              fill="none"
              stroke="#E0B800"
              strokeWidth="2"
            />
          </svg>
        </div>
      </section>

      {/* ── 12 · Blog ───────────────────────────────────────────── */}
      <section className="sec sb" id="stage-12" style={{ top: 11300, height: 800 }}>
        <StageLabel lit={lit.s12} className="z" style={{ left: 140, top: 160 }}>
          STAGE 12 / READ THE BLOG
        </StageLabel>
        <h2 className="z t-h2" style={{ left: 140, top: 200, fontSize: 54 }}>
          Notes from the flight deck.
        </h2>
        <p
          className="z t-lead"
          style={{ left: 800, top: 206, width: 500, margin: 0, fontSize: 16 }}
        >
          How we think about budgets, creative and the ad platforms that change every
          week.
        </p>
        <div
          className="z"
          style={{
            left: 140,
            top: 320,
            width: 1160,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {POSTS.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="u-card u-tile"
              style={{ height: 380, overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ height: 160, background: b.bg }} />
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                }}
              >
                <span className="t-mono t-acc" style={{ fontSize: 10 }}>
                  {b.cat}
                </span>
                <h3 className="t-h3" style={{ fontSize: 22, lineHeight: 1.2 }}>
                  {b.title}
                </h3>
                <span
                  className="t-mono"
                  style={{ marginTop: "auto", fontSize: 10, color: "var(--muted)" }}
                >
                  {b.readMinutes} MIN READ
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 13 · Let's talk ─────────────────────────────────────── */}
      <section className="sec sa" id="stage-13" style={{ top: 12100, height: 1000 }}>
        {/* Landing pad: concentric ellipses picking up the path's touchdown. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 260,
            top: 740,
            width: 920,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255,212,0,.3), rgba(255,212,0,.06) 60%, rgba(255,212,0,0))",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 440,
            top: 815,
            width: 560,
            height: 130,
            boxSizing: "border-box",
            borderRadius: "50%",
            border: "2px solid #FFD400",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 530,
            top: 836,
            width: 380,
            height: 88,
            boxSizing: "border-box",
            borderRadius: "50%",
            border: "1px dashed rgba(224,184,0,.7)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 620,
            top: 857,
            width: 200,
            height: 46,
            boxSizing: "border-box",
            borderRadius: "50%",
            background: "rgba(255,212,0,.22)",
            border: "1px solid #FFD400",
          }}
        />
        <div
          className="z"
          style={{
            left: 0,
            right: 0,
            top: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <StageLabel lit={lit.s13} style={{ margin: 0 }}>
            STAGE 13 / LET&rsquo;S TALK
          </StageLabel>
          <h2 className="t-h2" style={{ marginTop: 28, width: 760, fontSize: 80 }}>
            Ready to put your brand in motion?
          </h2>
          <p className="t-lead" style={{ marginTop: 26, width: 540 }}>
            Book a free growth audit. In one call we will show you where your ad spend is
            leaking and which channel to scale first.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14 }}>
            <Link
              href="/contact"
              className="u-btn u-btn-primary"
              onMouseEnter={() => onCtaHover(true)}
              onMouseLeave={() => onCtaHover(false)}
              style={{ gap: 12, height: 56, padding: "0 26px", fontSize: 16 }}
            >
              Let&rsquo;s work together <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="u-btn u-btn-ghost"
              style={{ height: 56, padding: "0 24px", fontSize: 16 }}
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        className="sec sb"
        style={{
          top: 13100,
          height: 160,
          borderTop: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 56px",
          boxSizing: "border-box",
          fontSize: 13,
          color: "var(--muted)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LogoMark size={28} />
          &copy; {SITE.founded} {SITE.name} &middot; {SITE.city}
        </span>
        <span className="t-mono" style={{ fontSize: 10 }}>
          PERFORMANCE MARKETING &middot; PAID SOCIAL &middot; SEARCH &middot; NATIVE
          &middot; LEAD GEN &middot; CRO
        </span>
      </footer>
    </>
  );
}
