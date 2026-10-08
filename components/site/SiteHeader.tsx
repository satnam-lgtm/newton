"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

/** Header for the standalone routes. Responsive, with a disclosure menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should never leave the menu hanging open.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: solid || open ? "var(--nav)" : "transparent",
        backdropFilter: solid || open ? "blur(16px)" : undefined,
        WebkitBackdropFilter: solid || open ? "blur(16px)" : undefined,
        borderBottom: `1px solid ${solid || open ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex h-[84px] max-w-[1328px] items-center justify-between gap-6 px-6 sm:px-10">
        <Link href="/" aria-label="Newton Infotech home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors"
                style={{ color: active ? "var(--fg)" : "var(--muted)" }}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="toggle-lite" />
          <Link
            href="/audit"
            className="u-btn u-btn-primary hidden h-[46px] px-[22px] text-sm sm:inline-flex"
          >
            Free growth audit <span aria-hidden="true">&rarr;</span>
          </Link>
          <button
            type="button"
            className="toggle-lite lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <path
                  d="M2 5h14M2 12h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="mx-auto flex max-w-[1328px] flex-col px-6 pb-6 sm:px-10">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3 text-lg font-medium"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/audit"
              className="u-btn u-btn-primary mt-5 h-[52px] px-6 text-[15px]"
            >
              Free growth audit <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
