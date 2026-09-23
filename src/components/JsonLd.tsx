import type { Translation } from "@/locales/translations";
import type { SiteSettings } from "@/lib/siteText";

// Données structurées dérivées du contenu réellement affiché (version française),
// pour qu'une modification dans le Studio ne désynchronise pas le balisage SEO.
export function JsonLd({ t, settings }: { t: Translation; settings: SiteSettings }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FunkySelfie",
    description: "Location de photobooth professionnel en Suisse",
    url: "https://www.funkyselfie.ch",
    email: settings.contactEmail,
    priceRange: "CHF 499–1500",
    areaServed: "CH",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bienne",
      addressCountry: "CH",
    },
    logo: "https://www.funkyselfie.ch/images/logo.png",
    image: "https://www.funkyselfie.ch/images/photobooth_face.png",
    sameAs: [
      settings.footer.instagram,
      settings.footer.tiktok,
      settings.footer.linkedin,
    ].filter(Boolean),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Location Photobooth Corporate",
    provider: { "@type": "LocalBusiness", name: "FunkySelfie" },
    areaServed: "Switzerland",
    serviceType: "Photobooth Rental",
    offers: [
      { "@type": "Offer", name: t.basicName, priceCurrency: "CHF", price: "499" },
      { "@type": "Offer", name: t.premiumName, priceCurrency: "CHF", price: "799" },
      { "@type": "Offer", name: t.prestigeName, priceCurrency: "CHF", price: "1500" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FunkySelfie",
    url: "https://www.funkyselfie.ch",
    description:
      "FunkySelfie — Location de photobooth professionnel en Suisse pour vos événements.",
    inLanguage: "fr",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
