# Newton Infotech

Production site built from the "B · Full flight, scroll prototype" design reference.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
next-themes · React Hook Form + Zod

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## The home page

The design is a fixed 1440 × 13260 artboard: a rocket flies one SVG path while the
scroll position drives it through fourteen stages. Every element is absolutely
positioned in that coordinate space, so it cannot reflow.

Two presentations handle this:

| Viewport | What renders |
| --- | --- |
| ≥ 1024px | `components/flight/FlightExperience` — the canvas, scaled uniformly to fit |
| < 1024px | `components/home/ResponsiveHome`, flown by `ScrollRocket` |

Both presentations are scroll-driven and both fly the rocket.

`ResponsiveHome` is also what the server renders on every device, so the complete
narrative is in the initial HTML for crawlers; wide screens upgrade to the canvas
after mount. The canvas is a `dynamic(..., { ssr: false })` import and is never
downloaded by phones.

### How the canvas works

- `lib/flight.ts` holds the geometry: the path, the stage offsets and entry points,
  and the seeded star fields. Values are ported 1:1 from the reference.
- `useCanvasScale` reserves the mission's full scroll travel in the document, so the
  page uses the browser's own scrollbar, keyboard paging and anchors. A sticky wrapper
  pins the scaled canvas while that travel is consumed.
- `useFlightEngine` maps scroll position to arc length along the path (precomputed,
  smoothed and forced monotonic, because the path doubles back on itself), then eases
  the rocket toward it with a critically damped spring. All per-frame work writes
  transforms straight to the DOM; React state updates only for the HUD, at most every
  ~120 ms.
- Position is sampled in the animation frame rather than from `scroll` events, which
  are throttled and are not emitted for some programmatic scrolls.

`FlightExperience` accepts `showPath` to draw the trajectory and its stage nodes,
`forceReducedMotion`, and `customCursor`.

### How the touch flight works

Phones and tablets cannot use the artboard path — it is tied to 1440px coordinates.
`useScrollRocket` generates a trajectory to fit whatever the reflowed document turns
out to be, and rebuilds it whenever the page resizes. The motion model is the canvas's,
so both read as the same rocket: scroll sets a target, a critically damped spring eases
toward it, the flame tracks speed.

Three things differ from the desktop engine, each for a reason:

- **Scroll maps to vertical position, not arc length.** Every weave adds horizontal
  travel, so equal steps of arc length cover shrinking amounts of page. The path is
  sampled once and inverted, which holds the rocket at a constant height in the
  viewport from the first screen to the last.
- **The rocket banks; it does not follow the tangent.** This trajectory only descends,
  so a true tangent would hold the rocket upside down for the whole page. The
  horizontal component of the tangent drives a bank of up to 24°, nose always up.
- **Below 640px it stays in the gutter instead of weaving.** On a phone the text column
  is the full width, so a rocket crossing it would sit on top of the copy.

`ScrollRocket` accepts `showPath` to draw the trajectory while tuning the weave.

## Layout

```
app/
  page.tsx              home (switches between the two presentations)
  (pages)/              every other route, under shared header/footer chrome
    services  content-arbitrage  work  about  blog  blog/[slug]
    contact  audit  privacy  terms
  api/contact/          enquiry endpoint
  not-found.tsx  sitemap.ts  robots.ts
components/
  flight/               the canvas: engine shell, hero, stages, rocket, HUD, nav
  home/                 home presentation switch, responsive home, touch rocket
  site/                 header, footer, sections, CTA, form, icons, logo, theme
hooks/                  flight engines (canvas + touch), canvas scale,
                        media query, clock, counters
lib/                    content.ts (all copy), flight.ts (geometry), work.ts,
                        schemas.ts (shared Zod validation)
```

### Content

All copy lives in `lib/content.ts` and `lib/work.ts` — one source shared by the canvas
and the standalone pages, so a service or post is described once.

### /content-arbitrage

A partner-facing dossier aimed at monetisation platforms and performance networks,
written on the assumption that its reader will run diligence on it. Two rules govern
`lib/arbitrage.ts`:

1. **Figures keep the label they arrived with.** $400K is monthly deployment; $1M is
   what was committed in a quarter. Nothing is derived from them — no "sustained
   monthly rate" back-solved from a quarterly total, because that is a different claim
   and a numerate reader will say so.
2. **Gaps are typed, not hidden.** A `Gap` is either `nda` (the number exists and
   travels under NDA) or `todo` (Newton must supply it, or the row comes out). An
   analyst can then tell confidentiality from absence. Several rows ship as `todo` on
   purpose; fill or delete them before sending the link.

Two deliberate omissions, both load-bearing:

- **No parent-company name-dropping.** Shinez and Pub+ are named as partners and
  nothing more. Their acquirers are not mentioned: borrowing a listed group'"'"'s
  credibility invites a diligence reader to go and read that group'"'"'s filings, and in
  this case what they find does not help.
- **No claimed endorsement.** The page states in the hero that the relationships are
  Newton'"'"'s own characterisation and that neither company has said anything about
  Newton Infotech.

The one trait of five that the page concedes outright is deliberate too. Every
arbitrage operator fails the "high paid-traffic share, little organic audience"
criterion; conceding it buys the credibility to contest the other four.

### Styling

- `app/globals.css` — design tokens, the `.night` / `.day` palettes (ported exactly),
  and the shared `t-*` / `u-*` component classes.
- `components/flight/flight.css` — the canvas: positioning, choreography, keyframes.

Component classes sit in `@layer components` so Tailwind utilities can still override
them in markup. An unlayered rule would beat every utility.

### Theming

`.night` / `.day` classes on `<html>`, driven by next-themes. Night is the default.

## Forms

`lib/schemas.ts` defines one Zod schema used by both the client form and the API route,
so browser and server cannot disagree. The route validates, rate-limits per IP, and
silently accepts honeypot submissions so bots get a success response.

**The route does not send mail yet.** Enquiries are validated and logged server-side.
Wire the marked delivery seam in `app/api/contact/route.ts` to your mail provider or
CRM before launch, and replace the in-memory rate limiter with a shared store if you
run more than one instance.

## Before launch

The design ships with deliberate placeholders. Search for `PLACEHOLDER`, and for
bracketed values like `[X]M` and `[OFFICE CITY]`:

- `lib/content.ts` — `SITE` (email, phone, address, city, url), `STATS`, the rating
- `lib/arbitrage.ts` — every row marked `TO CONFIRM`; the page is designed to be sent
  only once those are filled or removed
- `lib/work.ts` — every case-study figure; publish only client-approved numbers
- Partner badges — show only the ones Newton Infotech actually holds
- `app/(pages)/privacy` and `/terms` — templates; have a qualified adviser review them
- `public/assets/rocket.png` — the rocket art from the reference export
