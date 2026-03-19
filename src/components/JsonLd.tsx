export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FunkySelfie",
    description:
      "Location de photobooth en Suisse pour mariages, anniversaires, événements d'entreprise et fêtes privées.",
    url: "https://funkyselfie.ch",
    logo: "https://funkyselfie.ch/images/logo.png",
    image: "https://funkyselfie.ch/images/Photobooth-bwood.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "Country",
      name: "Suisse",
    },
    serviceType: "Location de Photobooth",
    priceRange: "$$",
    sameAs: [],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Location de Photobooth",
    provider: {
      "@type": "LocalBusiness",
      name: "FunkySelfie",
    },
    description:
      "Location de photobooth personnalisable pour tous vos événements en Suisse : mariages, anniversaires, événements d'entreprise et fêtes privées.",
    areaServed: {
      "@type": "Country",
      name: "Suisse",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services FunkySelfie",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photobooth Mariage",
            description:
              "Location de photobooth pour votre mariage avec accessoires et décoration personnalisés.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photobooth Événement d'Entreprise",
            description:
              "Location de photobooth pour vos événements professionnels et salons.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photobooth Anniversaire",
            description:
              "Location de photobooth pour fêtes d'anniversaire avec photos amusantes et créatives.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Photobooth Fête Privée",
            description:
              "Location de photobooth pour tous vos événements privés et fêtes spéciales.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FunkySelfie",
    url: "https://funkyselfie.ch",
    description:
      "FunkySelfie - Location de Photobooth en Suisse pour vos événements.",
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
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
