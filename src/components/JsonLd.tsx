export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FunkySelfie",
    description: "Location de photobooth professionnel en Suisse",
    url: "https://www.funkyselfie.ch",
    email: "hello@funkyselfie.ch",
    priceRange: "CHF 499–1500",
    areaServed: "CH",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bienne",
      addressCountry: "CH",
    },
    logo: "https://www.funkyselfie.ch/images/logo.png",
    image: "https://www.funkyselfie.ch/images/photobooth_face.jpeg",
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
        price: "499",
      },
      {
        "@type": "Offer",
        name: "Premium",
        priceCurrency: "CHF",
        price: "799",
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
        name: "Combien de temps faut-il pour installer le photobooth ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On arrive 30 à 45 minutes avant le début de votre événement. L'installation est rapide et discrète — quand vos invités arrivent, tout est prêt.",
        },
      },
      {
        "@type": "Question",
        name: "Que se passe-t-il si je dois annuler ou changer de date ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pas de panique. Un changement de date est possible sans frais si vous nous prévenez plus de 14 jours avant. En cas d'annulation, l'acompte de 50% est retenu mais le reste vous est remboursé intégralement.",
        },
      },
      {
        "@type": "Question",
        name: "Le déplacement est-il inclus dans le prix ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le pick-up gratuit est disponible à Bienne. Pour une livraison sur site, un forfait de CHF 1.00/km A/R depuis Bienne est appliqué — sans surprise, calculé à l'avance dans votre devis.",
        },
      },
      {
        "@type": "Question",
        name: "Peut-on mettre notre logo sur les photos ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, dès la formule Premium. Votre logo apparaît sur chaque impression et dans la galerie digitale. Envoyez-nous simplement votre fichier et on s'occupe de tout.",
        },
      },
    ],
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
