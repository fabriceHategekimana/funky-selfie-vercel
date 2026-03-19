const offers = [
  {
    name: "Basic",
    price: "CHF 600",
    tagline: "L'essentiel du professionnel, sans compromis.",
    includes: [
      "Photobooth HD",
      "Cadre personnalisé (logo + couleurs)",
      "Impressions illimitées",
      "Galerie en ligne",
      "Livraison + installation + reprise",
    ],
    options:
      "En option : animateur (CHF 45/h) · props & accessoires · fond de décor · déplacement (CHF 1.00/km A/R)",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "CHF 850",
    tagline:
      "Votre marque sous les projecteurs, votre équipe sous le charme.",
    includes: [
      "Tout le contenu Basic",
      "Animations GIF & Boomerang",
      "Partage instantané SMS/email",
      "Habillage complet",
      "Écran d'accueil brandé",
    ],
    options:
      "En option : animateur (CHF 45/h) · props premium · fond de décor luxe · déplacement (CHF 1.00/km A/R)",
    highlighted: true,
  },
  {
    name: "Prestige",
    price: "CHF 1'500",
    tagline:
      "L'expérience signature pour les événements qui ne laissent rien au hasard.",
    includes: [
      "Tout le contenu Premium",
      "Animateur dédié (4h incluses)",
      "Backdrop & décor sur mesure",
      "Props & accessoires",
      "Rapport post-événement",
      "Contact dédié",
    ],
    options:
      "En option : heures animateur supplémentaires (CHF 45/h) · déplacement (CHF 1.00/km A/R)",
    highlighted: false,
  },
];

export default function Offers() {
  return (
    <section
      id="offres"
      className="bg-bg-light py-12 md:py-20 px-4 md:px-8"
      aria-label="Nos offres de location de photobooth"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Une formule pour chaque événement — tout est inclus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offers.map((offer) => (
            <article
              key={offer.name}
              className={`rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col ${
                offer.highlighted
                  ? "bg-primary text-white ring-4 ring-primary/30 scale-[1.02]"
                  : "bg-white"
              }`}
            >
              <div className="p-7 md:p-10 flex flex-col flex-1">
                <h3
                  className={`text-2xl font-bold mb-1 ${
                    offer.highlighted ? "text-white" : "text-dark"
                  }`}
                >
                  {offer.name}
                </h3>
                <span
                  className={`text-3xl md:text-4xl font-extrabold mb-3 ${
                    offer.highlighted ? "text-white" : "text-primary"
                  }`}
                >
                  {offer.price}
                </span>
                <p
                  className={`italic mb-6 leading-relaxed ${
                    offer.highlighted ? "text-white/90" : "text-text-light"
                  }`}
                >
                  {offer.tagline}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-sm leading-relaxed ${
                        offer.highlighted ? "text-white/90" : "text-text-light"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0" aria-hidden="true">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  className={`text-xs mb-4 leading-relaxed ${
                    offer.highlighted ? "text-white/80" : "text-text-light/80"
                  }`}
                >
                  {offer.options}
                </p>
                <p
                  className={`text-sm font-medium mb-6 ${
                    offer.highlighted ? "text-white" : "text-primary"
                  }`}
                >
                  Pick-up gratuit disponible
                </p>
                <a
                  href="#contact"
                  className={`block text-center font-bold py-3 px-6 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg no-underline ${
                    offer.highlighted
                      ? "bg-white text-primary hover:bg-gray-100"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  Demander un devis
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bloc transport */}
        <div className="mt-10 md:mt-14 bg-white rounded-xl shadow-md p-6 md:p-8 text-center max-w-3xl mx-auto">
          <p className="text-text leading-relaxed">
            <strong>Pick-up : GRATUIT</strong> — Livraison :{" "}
            <strong>CHF 1.00/km</strong> (aller-retour) — Le montant est
            calculé automatiquement dans votre devis, selon votre adresse. Zéro
            surprise.
          </p>
        </div>
      </div>
    </section>
  );
}
