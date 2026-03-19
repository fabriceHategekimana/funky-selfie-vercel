const features = [
  {
    icon: "\uD83D\uDCF8",
    title: "Interface Intuitive",
    description:
      "Notre interface tactile vous guide à chaque étape, de la prise de photos à l'impression instantanée.",
  },
  {
    icon: "\uD83C\uDFA8",
    title: "Personnalisation",
    description:
      "Personnalisez chaque séance photo selon votre style et votre thème d'événement.",
  },
  {
    icon: "\uD83C\uDF10",
    title: "Galerie en Ligne",
    description:
      "Accédez à toutes vos photos via une galerie en ligne sécurisée.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-8 flex flex-col items-center" aria-label="Avantages FunkySelfie">
      <h2 className="w-full text-center text-3xl md:text-4xl font-bold mb-16 text-dark px-8 mx-16">
        Pourquoi choisir FunkySelfie ?
      </h2>
      <div className="h-8"></div>
      <div className="grid gap-8 justify-items-center justify-center px-8 mx-16 pt-24" style={{ gridTemplateColumns: "repeat(3, 357px)" }}>
        {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 max-w-[357px]"
            >
            <div
              className="w-full h-[200px] rounded-xl mb-6 flex items-center justify-center text-6xl"
              style={{
                background: "linear-gradient(135deg, #36949e 0%, #bd3ca1 100%)",
              }}
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-primary">
              {feature.title}
            </h3>
            <p className="text-text-light">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
