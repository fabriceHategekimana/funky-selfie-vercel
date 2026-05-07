export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FunkySelfie",
    description:
      "Location de photobooth professionnel clé en main pour événements corporate en Suisse. Livraison, installation et reprise incluses. Pick-up gratuit.",
    url: "https://funky-selfie.ch",
    telephone: "+41-XX-XXX-XX-XX",
    email: "contact@funky-selfie.ch",
    priceRange: "CHF 600–1500",
    areaServed: { "@type": "Country", name: "Switzerland" },
    address: { "@type": "PostalAddress", addressCountry: "CH" },
    logo: "https://funky-selfie.ch/images/logo.png",
    image: "https://funky-selfie.ch/images/photobooth_face.jpeg",
    sameAs: [],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Location Photobooth Corporate",
    provider: { "@type": "LocalBusiness", name: "FunkySelfie" },
    areaServed: "Switzerland",
    serviceType: "Photobooth Rental",
    offers: [
      {
        "@type": "Offer",
        name: "Basic",
        priceCurrency: "CHF",
        price: "600",
      },
      {
        "@type": "Offer",
        name: "Premium",
        priceCurrency: "CHF",
        price: "850",
      },
      {
        "@type": "Offer",
        name: "Prestige",
        priceCurrency: "CHF",
        price: "1500",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "FunkySelfie se déplace-t-il partout en Suisse ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, FunkySelfie intervient dans toute la Suisse. La livraison et l'installation sont incluses au tarif de CHF 1.00/km aller-retour. Le pick-up est gratuit.",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on personnaliser le photobooth aux couleurs de notre entreprise ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, dès la formule Basic. Logos, couleurs, cadres, overlays et fond de décor sont personnalisables selon votre charte graphique.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles options peut-on ajouter ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Animateur dédié (CHF 45/h), props & accessoires, fond de décor sur mesure, animations GIF et Boomerang — sélectionnables au moment du devis.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FunkySelfie",
    url: "https://funky-selfie.ch",
    description:
      "FunkySelfie — Location de Photobooth Corporate en Suisse pour vos événements.",
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
