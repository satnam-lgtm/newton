/**
 * Case studies. Figures are placeholders from the design reference: every
 * bracketed value must be replaced with a verified, client-approved number
 * before this page goes live.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  channels: string[];
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  bg: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "d2c-skincare",
    client: "[D2C SKINCARE BRAND]",
    sector: "eCommerce · Beauty",
    channels: ["Meta Ads", "Google Shopping", "Email & SMS"],
    challenge:
      "Strong repeat purchase rate but acquisition had stalled: a single creative angle was carrying the whole account and frequency had climbed past the point of return.",
    approach: [
      "Rebuilt the catalogue feed so Shopping could bid on the right variants",
      "Introduced a weekly creative slate with three distinct angles",
      "Moved post-purchase flows out of ads and into owned email and SMS",
    ],
    results: [
      { label: "ROAS", value: "[X]×" },
      { label: "CAC", value: "−[X]%" },
      { label: "REVENUE", value: "+[X]%" },
    ],
    bg: "radial-gradient(circle at 30% 50%, #FFD400 0 10px, transparent 11px), #18181B",
  },
  {
    slug: "b2b-saas",
    client: "[B2B SAAS PLATFORM]",
    sector: "SaaS · Lead generation",
    channels: ["LinkedIn Ads", "Google Search", "Native"],
    challenge:
      "Plenty of form fills, almost no qualified pipeline. Sales were spending their week calling students and competitors.",
    approach: [
      "Added firmographic qualification and lead scoring before CRM hand-off",
      "Split search intent into evaluation and problem-aware campaigns",
      "Reported on pipeline value rather than cost per lead",
    ],
    results: [
      { label: "QUALIFIED LEADS", value: "+[X]%" },
      { label: "COST PER SQL", value: "−[X]%" },
      { label: "PIPELINE", value: "[X]M" },
    ],
    bg: "linear-gradient(135deg, #1E6BFF, #0B2E7A)",
  },
  {
    slug: "multi-location-services",
    client: "[MULTI-LOCATION SERVICE BUSINESS]",
    sector: "Local services · Lead generation",
    channels: ["Google Ads", "Performance Max", "Call tracking"],
    challenge:
      "Nine branches competing against each other in the same auctions, with no way to tell which location a call came from.",
    approach: [
      "Geo-split the account so branches stopped bidding against one another",
      "Installed call tracking with per-branch routing and recording",
      "Set budgets by branch capacity rather than by equal share",
    ],
    results: [
      { label: "BOOKED JOBS", value: "+[X]%" },
      { label: "COST PER CALL", value: "−[X]%" },
      { label: "WASTED SPEND", value: "−[X]%" },
    ],
    bg: "repeating-linear-gradient(-45deg, #FFD400 0 10px, #0A0A0B 10px 20px)",
  },
];
