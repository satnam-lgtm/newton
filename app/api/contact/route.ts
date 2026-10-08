import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

/**
 * Enquiry endpoint.
 *
 * Validation and spam screening happen here; actual delivery is left as a
 * single clearly marked seam, because the mail provider is a deployment
 * decision rather than a design one.
 */

/** Naive per-IP rate limit. Replace with a shared store before scaling out. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot filled in: accept silently so the bot sees success and stops.
  if (data.referralSource) {
    return NextResponse.json({ ok: true });
  }

  // ─── Delivery seam ───────────────────────────────────────────────
  // Wire this to your transactional mail provider or CRM. Until then the
  // enquiry is logged server-side so nothing submitted is silently lost.
  console.info("[contact] enquiry received", {
    name: data.name,
    email: data.email,
    company: data.company || null,
    website: data.website || null,
    budget: data.budget ?? null,
    services: data.services,
    messageLength: data.message.length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
