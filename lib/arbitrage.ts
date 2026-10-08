/**
 * Content arbitrage — the partner-facing dossier.
 *
 * This page is a business-development asset aimed at monetisation platforms
 * and performance networks who will run diligence on it. Two rules govern
 * everything here:
 *
 * 1. Figures Newton has given us are stated with the label they were given
 *    with. We do not derive new claims from them (no "sustained monthly rate"
 *    inferred from a quarterly total).
 * 2. Anything we cannot evidence is a marked placeholder, and absence is
 *    distinguished from confidentiality — `nda` means the number exists and
 *    travels under NDA, `todo` means Newton must supply or the row is cut.
 *
 * Nothing on this page borrows a third party's credibility. Partner companies
 * are described from public sources, descriptively, with no implied endorsement.
 */

export type Gap = { kind: "nda" | "todo"; note: string };

export const CURRENCY_NOTE =
  "All figures in USD unless stated otherwise.";

/** Capacity. Both figures supplied by Newton, stated with their own labels. */
export const CAPACITY = [
  {
    figure: "$400K",
    unit: "/ MONTH",
    label: "Monthly deployment",
    body: "What we place across native, social and search inside a calendar month. A deployment figure, not a forecast and not a peak month quoted as a rate.",
  },
  {
    figure: "$1M",
    unit: "/ QUARTER",
    label: "Committed in a quarter",
    body: "The largest commitment we have carried across a single quarter. We state the quarter total rather than back-solving a monthly average from it, because the two are not the same claim.",
  },
] as const;

/** Second-order capacity facts. Every one of these is Newton's to fill in. */
export const CAPACITY_LEDGER: Array<{
  label: string;
  value: string;
  body: string;
  gap?: Gap;
}> = [
  {
    label: "DAILY PACING AT CAPACITY",
    value: "≈ $13.1K / day",
    body: "$400K spread across a month. This is the number to forecast yield against, because a monthly figure never arrives all at once.",
  },
  {
    label: "HIGHEST DAILY SPEND ABSORBED",
    value: "[X]K / day",
    body: "This matters more than the monthly figure. It decides whether we can keep pace with a creative on the day it validates rather than the week after.",
    gap: { kind: "todo", note: "NEWTON TO CONFIRM" },
  },
  {
    label: "MONTHLY AD REVENUE",
    value: "[X]",
    body: "Stated in the bracket ActiveView's partner form uses, so the application routes correctly rather than sitting in the standard queue.",
    gap: { kind: "todo", note: "NEWTON TO CONFIRM — ACTIVEVIEW BRACKETS TOP OUT AT 50K-PLUS" },
  },
  {
    label: "ACTIVE AD ACCOUNTS, IN GOOD STANDING",
    value: "[X] Meta · [X] Google · [X] TikTok · [X] native",
    body: "Accounts are the asset in this business, so we count them rather than describe them.",
    gap: { kind: "todo", note: "NEWTON TO CONFIRM" },
  },
  {
    label: "SETTLEMENT TERMS WE WORK ON",
    value: "[NET-?]",
    body: "Spend leaves daily; monetisation settles on partner terms. Who funds that gap is the first commercial question, and we answer it on the call rather than asserting a balance sheet here.",
    gap: { kind: "todo", note: "NEWTON TO CONFIRM TERMS AND FUNDING" },
  },
];

/** The six-step loop. Owners are deliberately configurable per deal. */
export const LOOP = [
  {
    no: "01",
    owner: "MIXED",
    title: "Content",
    body: "Some properties are ours; some belong to the partner we are buying for. We state which on a per-deal basis rather than implying a portfolio we do not wholly own.",
  },
  {
    no: "02",
    owner: "PARTNER",
    title: "Plumbing",
    body: "Placements, header-bidding wrapper, and ads.txt and sellers.json entries for every demand partner before a click is bought. Where the content is ours, this is ours too.",
  },
  {
    no: "03",
    owner: "NEWTON",
    title: "Acquisition",
    body: "Traffic bought into that content across native and social, every click carrying an ID that survives to the session. This is the half of the loop we fund.",
  },
  {
    no: "04",
    owner: "PARTNER",
    title: "Session",
    body: "The auction fires on every pageview. Revenue is session RPM × sessions × fill. We report session RPM, not page RPM — pagination inflates one and not the other.",
  },
  {
    no: "05",
    owner: "SHARED",
    title: "Attribution",
    body: "Revenue reconciled back to the campaign, ad set and creative that bought the click. Most publishers do not have this step. Its absence is the whole difference between arbitrage and guessing.",
  },
  {
    no: "06",
    owner: "NEWTON",
    title: "Reinvestment",
    body: "Margin funds tomorrow's spend. The loop is bounded by cash cycle, not by ideas — which is why the first commercial question is settlement terms.",
  },
] as const;

export const IDENTITIES = [
  {
    label: "PROFIT / 1,000 VISITORS",
    formula: "Session RPM − (CPC × 1,000)",
    body: "The business in one line. Every other number here moves one of those two terms. There is no third term to hide in.",
  },
  {
    label: "SESSION RPM",
    formula: "(revenue ÷ sessions) × 1,000",
    body: "Sessions, not pageviews. A visitor who reads five pages is one visitor; counting them five times is how a dashboard talks an operator into scaling a loss.",
  },
  {
    label: "MARGIN",
    formula: "(revenue − spend) ÷ revenue",
    body: "We are judged on this and not on spend. Volume is only evidence that the margin held while the volume grew.",
  },
] as const;

/**
 * The ANA/4A's/ISBA/WFA shared criteria for made-for-advertising inventory.
 * Trait 03 is true of any arbitrage operator. Conceding it is the point.
 */
export type MfaTrait = {
  no: string;
  trait: string;
  stance: string;
  /** True for the one trait every arbitrage operator genuinely fails. */
  conceded?: boolean;
  gap?: Gap;
};

export const MFA_TRAITS: MfaTrait[] = [
  {
    no: "01",
    trait: "Ad-to-content ratio at or above roughly twice the internet average.",
    stance: "Capped at [X]% per template, counting Google and non-Google units together.",
    gap: { kind: "todo", note: "CONFIRM CAP AND TEMPLATE AUDIT" },
  },
  {
    no: "02",
    trait: "Auto-refreshing placements, autoplay, forced slideshow pagination.",
    stance:
      "Our standard is none of the three. On properties we operate this is ours to hold; on partner properties it is a condition we ask for.",
    gap: { kind: "todo", note: "CONFIRM THIS HOLDS ACROSS ALL OPERATED PROPERTIES" },
  },
  {
    no: "03",
    trait: "High paid-traffic share with little organic audience.",
    stance:
      "True of us. That is what content arbitrage is. We print the split rather than leave your analyst to estimate it.",
    conceded: true,
  },
  {
    no: "04",
    trait: "Generic, syndicated or templated content.",
    stance:
      "Original editorial with named bylines and human sign-off before publication. Where we use AI assistance we say so, which raises the review burden rather than lowering it.",
    gap: { kind: "todo", note: "EDITORIAL STANDARDS DOCUMENT — CONFIRM IT EXISTS" },
  },
  {
    no: "05",
    trait: "Poorly designed, templated layouts.",
    stance: "Own templates and hosting on our properties, measured on Core Web Vitals.",
    gap: { kind: "todo", note: "CONFIRM CWV FIGURES PER TEMPLATE" },
  },
];

export type RiskRow = {
  label: string;
  title: string;
  body: string;
  gap?: Gap;
};

export const RISK_POSTURE: RiskRow[] = [
  {
    label: "INVALID TRAFFIC",
    title: "Measured by someone who is not us.",
    body: "GIVT and SIVT reported separately, by an MRC-accredited vendor. We will name the vendor on the call; if we are not engaged with one, we will say that instead of implying we are.",
    gap: { kind: "todo", note: "NAME VENDOR OR CUT THIS ROW" },
  },
  {
    label: "SUPPLY CHAIN",
    title: "Declared before a click is bought.",
    body: "ads.txt and sellers.json entries in place for every demand partner, kept current as the partner list changes. Buyers validate those files pre-bid, so a stale entry is lost revenue before it is a compliance problem.",
  },
  {
    label: "CONSENT · BRAZIL",
    title: "LGPD, and what the ANPD says consent is not.",
    body: "The ANPD has been explicit that a cookie wall is not consent, that reject must sit at equal prominence to accept, and that non-essential tags must not fire before a choice is made. Our implementation against each point is a question we answer with a screenshot, not a sentence.",
    gap: { kind: "todo", note: "CONFIRM CMP, BANNER LANGUAGE, PER-PURPOSE GRANULARITY" },
  },
  {
    label: "POLICY HISTORY",
    title: "Our enforcement record, stated as elapsed time.",
    body: "A partner underwriting our traffic is underwriting our enforcement history. We give the review period and the count rather than a claim of being clean.",
    gap: { kind: "todo", note: "MONTHS WITHOUT POLICY-DRIVEN ACCOUNT LOSS" },
  },
];

/**
 * Partner facts below are from public sources and used descriptively. Neither
 * company has made any statement about Newton Infotech, and the page says so.
 * Deliberately no parent-company name-dropping: borrowing a listed group's
 * credibility invites a diligence reader to go read that group's filings.
 */
export const COUNTERPARTIES = [
  {
    name: "Shinez",
    role: "CONTENT & MONETISATION",
    body: "A Tel Aviv content-monetisation operator running a portfolio of owned portals across fashion, food and travel. Buying to their standards means our traffic clears an operator that monetises at scale every day.",
  },
  {
    name: "Pub+",
    role: "ATTRIBUTION & RECONCILIATION",
    body: "The attribution platform built for content distribution: it ties ad revenue back to the campaign that bought the visit. Running on it means our spend is reconciled against the revenue it returned, at campaign level, rather than at month end.",
  },
] as const;

/** The two deal shapes. One per target company, without naming either. */
export const DEAL_SHAPES = [
  {
    key: "monetisation",
    kicker: "IF YOU MONETISE INVENTORY",
    title: "You hold the demand path. We hold the spend.",
    body: "You run the ad stack, the yield optimisation and the policy surface. We bring funded, tracked traffic into it and take the margin risk on the buy.",
    asks: [
      "The demand path named: direct Ad Manager with AdX, MCM Manage Inventory with us as child publisher, or a defined header-bidding stack. It changes who holds the policy liability.",
      "Settlement terms in writing — net days, currency, and any holdback against clawback. That number sets our daily ceiling.",
      "Revenue at campaign level, not account level. Site to campaign to country, intraday if you have it.",
      "Shared alerting both ways. A policy notice or invalid-traffic flag on your side should reach us the moment it reaches you.",
    ],
  },
  {
    key: "content",
    kicker: "IF YOU OWN CONTENT AND OFFERS",
    title: "You hold the inventory. We become the buying desk.",
    body: "You have validated content, creative and a monetisation path. We add funded buying capacity against it — no headcount, no onboarding runway, no office.",
    asks: [
      "Access to the content and offers we may buy into, with the approval route for new assets and who signs off.",
      "Which accounts we buy on — yours or ours — and whose entity carries the platform relationship.",
      "The margin basis: rev-share, CPA, or spend-plus, and how a bad day is split.",
      "Geos and languages you are not already staffing. That is where added capacity earns rather than cannibalises.",
    ],
  },
] as const;

export const RAMP = [
  {
    t: "WEEK 01",
    e: "Tracking and reconciliation stood up before a dollar moves. Campaign IDs agreed on both sides.",
  },
  { t: "WEEK 02", e: "Live at a deliberately small daily number. We are proving the pipe, not the margin." },
  { t: "WEEK 03–04", e: "Daily spend steps up only while attributed margin holds. First reconciliation against your figures." },
  { t: "MONTH 02", e: "Creative cycle at full rate. Spend moves to whatever cleared the inequality last week." },
  { t: "MONTH 03", e: "Review against the numbers we agreed in week one, then set the next ceiling together." },
] as const;

export const FIRST_CALL = [
  "Which geos and languages, and which platforms you want the volume on.",
  "Which side monetises, and which demand path that puts the policy liability on.",
  "How margin splits, and what happens on a day that loses money.",
  "Starting daily volume, and the number we step to once it holds.",
  "What each side needs to see before the first dollar moves.",
] as const;

export const PACK = [
  { label: "01", title: "Property and inventory list", body: "What we operate, what we buy into, with ads.txt and sellers.json state for each." },
  { label: "02", title: "Source ledger", body: "Every platform we buy on and its share of monthly spend, refreshed each reporting cycle." },
  { label: "03", title: "Invalid-traffic measurement", body: "GIVT and SIVT separately, from a named third party." },
  { label: "04", title: "Consent setup by market", body: "CMP, banner behaviour and per-purpose granularity, with Brazil called out separately." },
  { label: "05", title: "Attribution sample", body: "One quarter of spend against attributed revenue at campaign level, redacted for property names." },
] as const;
