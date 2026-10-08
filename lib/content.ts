/**
 * Site content. Shared by the flight canvas and the standalone pages so a
 * service, platform or post is described in exactly one place.
 *
 * Values wrapped in [brackets] are placeholders from the design reference and
 * must be replaced with real figures before launch.
 */

export const SITE = {
  name: "Newton Infotech",
  tagline: "We put brands in motion.",
  description:
    "Multi-channel digital advertising for brands that want to grow. We find your ideal customers, attract them with ads that work and convert them into leads and sales.",
  email: "hello@newtoninfotech.com",
  phone: "+91 00000 00000",
  city: "[OFFICE CITY]",
  address: "[STREET ADDRESS], [OFFICE CITY], [POSTCODE]",
  url: "https://newtoninfotech.com",
  rating: "4.9",
  founded: 2026,
} as const;

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** In-canvas nav: these scroll the flight canvas instead of routing. */
export const FLIGHT_NAV = [
  { stage: 3, label: "Services" },
  { stage: 4, label: "Partners" },
  { stage: 5, label: "Process" },
  { stage: 10, label: "Results" },
  { stage: 12, label: "Blog" },
] as const;

export const MARQUEE = [
  "Google Ads",
  "Meta",
  "YouTube",
  "Instagram",
  "LinkedIn",
  "Microsoft Ads",
  "TikTok",
  "Snapchat",
  "X",
  "Amazon Ads",
  "Pinterest",
  "Taboola",
] as const;

export type Platform = { name: string; cat: string };

export const PLATFORMS: Platform[] = [
  { name: "Google Ads", cat: "SEARCH · DISPLAY · PMAX" },
  { name: "Meta Ads", cat: "FACEBOOK · INSTAGRAM" },
  { name: "YouTube", cat: "VIDEO" },
  { name: "LinkedIn Ads", cat: "B2B SOCIAL" },
  { name: "Microsoft Ads", cat: "SEARCH" },
  { name: "TikTok Ads", cat: "SHORT VIDEO" },
  { name: "Snapchat Ads", cat: "SOCIAL" },
  { name: "X Ads", cat: "SOCIAL" },
  { name: "Amazon Ads", cat: "RETAIL MEDIA" },
  { name: "Pinterest Ads", cat: "DISCOVERY" },
  { name: "Taboola", cat: "NATIVE" },
  { name: "Programmatic", cat: "DISPLAY · RTB" },
];

export const AUDIT_ROWS = [
  { name: "Ad account structure", w: "62%" },
  { name: "Targeting & audiences", w: "48%" },
  { name: "Tracking & attribution", w: "30%" },
  { name: "Landing page speed", w: "55%" },
  { name: "Funnel conversion", w: "40%" },
] as const;

export type Service = {
  no: string;
  slug: string;
  title: string;
  text: string;
  tags: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    no: "01",
    slug: "paid-social",
    title: "Paid social",
    text: "Facebook, Instagram, LinkedIn, TikTok and Snapchat campaigns that build awareness and drive demand.",
    tags: "META · LINKEDIN · TIKTOK · SNAPCHAT",
    deliverables: [
      "Audience and interest research",
      "Creative concepts and production briefs",
      "Campaign build, launch and daily pacing",
      "Weekly creative testing cycle",
    ],
  },
  {
    no: "02",
    slug: "paid-search",
    title: "Paid search & display",
    text: "Google and Microsoft search, Performance Max, YouTube and display, set up around your goals.",
    tags: "GOOGLE ADS · YOUTUBE · MICROSOFT",
    deliverables: [
      "Keyword and intent mapping",
      "Account restructure or fresh build",
      "Performance Max and YouTube assets",
      "Search term and placement hygiene",
    ],
  },
  {
    no: "03",
    slug: "native-advertising",
    title: "Native advertising",
    text: "Ads that read like content on premium publishers, adding value instead of noise.",
    tags: "TABOOLA · OUTBRAIN · PROGRAMMATIC",
    deliverables: [
      "Publisher and placement selection",
      "Editorial-style creative and headlines",
      "Supply-path and brand-safety controls",
      "Post-click engagement reporting",
    ],
  },
  {
    no: "04",
    slug: "lead-generation",
    title: "Lead generation",
    text: "Cost-per-lead campaigns with lead validation, so your sales team only calls real prospects.",
    tags: "CPL · LEAD FORMS · CALL TRACKING",
    deliverables: [
      "Offer and lead-magnet design",
      "Form, quiz and call-tracking setup",
      "Lead scoring and validation rules",
      "CRM hand-off and feedback loop",
    ],
  },
  {
    no: "05",
    slug: "ecommerce-growth",
    title: "eCommerce growth",
    text: "Shopping, catalogue and retargeting campaigns built around cost per sale and ROAS.",
    tags: "SHOPIFY · FEEDS · CPA · ROAS",
    deliverables: [
      "Product feed cleanup and enrichment",
      "Shopping and catalogue campaign build",
      "Retargeting and win-back flows",
      "Margin-aware ROAS targets",
    ],
  },
  {
    no: "06",
    slug: "cro-martech",
    title: "CRO & martech",
    text: "Landing pages, tracking and automation that get more from the spend you already have.",
    tags: "GA4 · TAG MANAGER · CRM",
    deliverables: [
      "Landing page design and build",
      "A/B and multivariate testing programme",
      "Server-side tracking and conversion APIs",
      "Dashboards and automated reporting",
    ],
  },
];

export const PILLARS = [
  {
    no: "01",
    kicker: "FIND",
    title: "Your ideal buyers",
    text: "Data-led targeting that reaches the people most likely to buy.",
  },
  {
    no: "02",
    kicker: "ATTRACT",
    title: "Qualified interest",
    text: "Creative and offers that build engagement with the right prospects.",
  },
  {
    no: "03",
    kicker: "CONVERT",
    title: "Leads and sales",
    text: "Pages and follow-up that turn clicks into revenue.",
  },
] as const;

export const PROCESS = [
  {
    no: "01",
    title: "RESEARCH",
    text: "Audience, competitors, numbers",
    detail:
      "We map who actually buys from you, what your competitors are spending on, and the unit economics every campaign has to beat.",
  },
  {
    no: "02",
    title: "STRATEGY",
    text: "Channels, offers, budget",
    detail:
      "A written plan: which channels, which offers, how the budget splits, and the numbers we will be judged on.",
  },
  {
    no: "03",
    title: "LAUNCH",
    text: "Ads, pages, tracking",
    detail:
      "Creative, landing pages and tracking ship together, so the first click is measured correctly.",
  },
  {
    no: "04",
    title: "OPTIMISE",
    text: "Weekly tests and budget shifts",
    detail:
      "Every week we kill what is not working, scale what is, and tell you plainly which is which.",
  },
] as const;

export const QUALITY_CHECKS = [
  "Conversion API",
  "GA4 & Tag Manager",
  "Fraud prevention",
  "Brand safety",
  "Consent mode",
] as const;

export const LAUNCH_LOG = [
  { t: "T+00:00", e: "Tracking verified end to end" },
  { t: "T+00:01", e: "Search campaigns live" },
  { t: "T+00:02", e: "Social campaigns live" },
  { t: "T+00:03", e: "Native & display live" },
  { t: "T+DAILY", e: "Budget moved to what converts" },
] as const;

export const STATS = [
  { v: "[X]M", l: "AD SPEND MANAGED · LAST 12 MONTHS" },
  { v: "[X]M", l: "LEADS GENERATED · LAST 12 MONTHS" },
  { v: "[X]×", l: "AVERAGE ROAS ACROSS CLIENTS" },
] as const;

export const ORBIT_SERVICES = [
  {
    kicker: "REMARKETING",
    text: "Stay visible to people who already showed interest.",
  },
  {
    kicker: "EMAIL & SMS FLOWS",
    text: "Welcome, abandoned cart and win-back sequences.",
  },
  {
    kicker: "CUSTOMER LIFETIME VALUE",
    text: "Offers and timing that bring buyers back again.",
  },
] as const;

export const PARTNER_BADGES = [
  "Google Partner",
  "Meta Business Partner",
  "Microsoft Advertising",
  "Shopify Partner",
] as const;

export type Post = {
  slug: string;
  cat: string;
  title: string;
  excerpt: string;
  bg: string;
  readMinutes: number;
  date: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "static-ad-budgets",
    cat: "BUDGETS",
    title: "Why static ad budgets hold your growth back",
    excerpt:
      "A budget set in January and left alone until December is a decision you stopped making. Here is how we pace spend instead.",
    bg: "radial-gradient(circle at 30% 50%, #FFD400 0 10px, transparent 11px), #18181B",
    readMinutes: 6,
    date: "2026-09-18",
    body: [
      "Most accounts we inherit have a monthly budget that was decided once and then defended for a year. It feels disciplined. In practice it means that in the weeks your ads work best, you are capped, and in the weeks they work worst, you are still spending.",
      "We treat budget as something to be reallocated weekly rather than approved annually. The total can stay fixed: what moves is the split between channels, campaigns and audiences, based on what each one returned in the last seven days.",
      "The mechanics are simple. Every Monday we rank every active campaign by contribution margin, not by click volume or by impressions. Anything below the threshold loses budget. Anything above it gains, up to the point where its cost per acquisition starts to climb.",
      "This only works if your tracking is honest. If you cannot see which campaign produced which sale, reallocation is guesswork dressed up as strategy, and you will reliably move money toward whatever is easiest to measure rather than whatever earns the most.",
    ],
  },
  {
    slug: "thinking-in-probabilities",
    cat: "STRATEGY",
    title: "Thinking in probabilities: the performance marketer’s mindset",
    excerpt:
      "No single ad is a decision. A portfolio of ads is. Why the best media buyers sound more like traders than creatives.",
    bg: "linear-gradient(135deg, #1E6BFF, #0B2E7A)",
    readMinutes: 8,
    date: "2026-08-27",
    body: [
      "Ask a media buyer whether an ad will work and a good one will not say yes or no. They will give you a rough probability and the size of the bet they would place on it.",
      "That framing matters because most individual ads fail. If you treat each launch as a verdict on your judgement, you will stop testing, and the account will calcify around whatever worked eighteen months ago.",
      "Instead, plan in portfolios. A healthy testing slate has a few safe iterations of the current winner, several moderate variations, and one or two things that should not work at all. The expected value comes from the tail, so the tail needs funding.",
      "The discipline is in the exit. Decide, before launch, what result would make you stop. Without that number, every losing test becomes an argument about whether it just needs more time.",
    ],
  },
  {
    slug: "winning-ads-stop-working",
    cat: "CREATIVE",
    title: "Why last month’s winning ad stops working",
    excerpt:
      "Creative fatigue is not a mystery, it is arithmetic. What frequency, audience saturation and novelty actually do to your numbers.",
    bg: "repeating-linear-gradient(-45deg, #FFD400 0 10px, #0A0A0B 10px 20px)",
    readMinutes: 5,
    date: "2026-07-30",
    body: [
      "An ad that beat everything for six weeks and then collapsed did not get worse. Your audience got more familiar with it, and the people most likely to respond already have.",
      "Two forces are at work. Frequency rises as you spend more against a finite audience, and response falls with each additional exposure. Meanwhile the easiest conversions get harvested first, so the remaining pool is structurally harder to persuade.",
      "This is why we keep a creative pipeline rather than a creative project. The goal is not one perfect ad, it is a steady supply of new angles, so there is always a fresh contender ready when the incumbent starts to slip.",
      "Practically: watch frequency and cost per acquisition together. When frequency climbs and CPA follows it, that is fatigue. When CPA climbs while frequency is flat, something else broke, and swapping creative will waste a week.",
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does the free growth audit actually include?",
    a: "We review your ad accounts, targeting, tracking setup, landing pages and funnel, then send a plain-English report with a prioritised list of fixes. You keep the report whether or not you work with us.",
  },
  {
    q: "What is the minimum ad budget you work with?",
    a: "We are honest about this on the first call. Below a certain monthly spend, paid media cannot gather enough data to optimise, and you are better off putting the money elsewhere. If that is your situation we will say so.",
  },
  {
    q: "Do you work on retainer or per project?",
    a: "Most clients are on a monthly retainer, because paid media compounds and needs continuous management. One-off projects such as an audit, a tracking rebuild or a landing page sprint are also available.",
  },
  {
    q: "Who owns the ad accounts and the data?",
    a: "You do, always. We work inside your accounts, your pixels and your analytics. If we ever part ways, nothing has to be rebuilt and nothing leaves with us.",
  },
  {
    q: "How quickly will we see results?",
    a: "Tracking and quick wins land in the first two weeks. Meaningful performance changes usually show in the first six to eight weeks, once there is enough conversion data to optimise against.",
  },
  {
    q: "Which channels will you recommend?",
    a: "Only the ones your buyers actually use. We would rather run two channels well than six badly, and the audit tells us which two to start with.",
  },
];

export const BUDGET_RANGES = [
  "Under ₹1L / month",
  "₹1L – ₹5L / month",
  "₹5L – ₹20L / month",
  "₹20L+ / month",
  "Not sure yet",
] as const;

export const SERVICE_INTERESTS = SERVICES.map((s) => s.title);
