import Link from "next/link";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/content";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg2)" }}>
      <div className="mx-auto max-w-[1328px] px-6 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Newton Infotech home">
              <LogoMark size={30} />
              <span className="t-h3 text-lg">{SITE.name}</span>
            </Link>
            <p className="t-small mt-5 max-w-[34ch]">{SITE.description}</p>
            <p className="t-mono mt-6 text-[10px]" style={{ color: "var(--muted)" }}>
              {SITE.city.toUpperCase()}
            </p>
          </div>

          <FooterColumn title="Services">
            {SERVICES.map((s) => (
              <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
            <FooterLink href="/content-arbitrage">Content arbitrage</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/audit">Free growth audit</FooterLink>
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <FooterLink href={`mailto:${SITE.email}`}>{SITE.email}</FooterLink>
            <FooterLink href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</FooterLink>
            <FooterLink href="/privacy">Privacy policy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterColumn>
        </div>

        <div
          className="mt-14 flex flex-col gap-4 pt-8 text-[13px] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
        >
          <span>
            &copy; {SITE.founded} {SITE.name} &middot; {SITE.city}
          </span>
          <span className="t-mono text-[10px]">
            PERFORMANCE MARKETING &middot; PAID SOCIAL &middot; SEARCH &middot; NATIVE
            &middot; LEAD GEN &middot; CRO
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
        {title.toUpperCase()}
      </h2>
      <ul className="mt-5 flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("mailto:") || href.startsWith("tel:");
  return (
    <li>
      {external ? (
        <a href={href} style={{ color: "var(--soft)" }}>
          {children}
        </a>
      ) : (
        <Link href={href} style={{ color: "var(--soft)" }}>
          {children}
        </Link>
      )}
    </li>
  );
}
