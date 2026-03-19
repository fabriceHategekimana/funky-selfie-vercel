const features = [
  {
    title: "Zéro effort de votre côté",
    description:
      "Livraison, installation, opération et reprise : FunkySelfie gère l'intégralité de la logistique. Vous déléguez, vous profitez. Vos invités aussi.",
  },
  {
    title: "Votre identité visuelle, en vedette",
    description:
      "Cadres, overlays, fond de décor et écran d'accueil aux couleurs de votre charte graphique. Chaque photo devient un ambassadeur de votre marque — et circule bien au-delà de la salle.",
  },
  {
    title: "Un souvenir partagé en un clic",
    description:
      "Impression instantanée sur place, galerie en ligne sécurisée, envoi par SMS ou email. Vos invités repartent avec leur photo. Votre marque les accompagne.",
  },
];

export default function Features() {
  return (
    <section
      className="py-12 md:py-20 px-4 md:px-8"
      aria-label="Ce que FunkySelfie apporte à votre événement"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Ce que FunkySelfie apporte à votre événement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-7 md:p-10 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">
                {feature.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
