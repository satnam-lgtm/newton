import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

/**
 * Chrome for every route except the home canvas, which supplies its own.
 */
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="u-btn u-btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:h-11 focus:px-5"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
