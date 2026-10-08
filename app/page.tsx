import { HomeExperience } from "@/components/home/HomeExperience";
import { SITE } from "@/lib/content";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    slogan: SITE.tagline,
  };

  return (
    <main>
      <HomeExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
