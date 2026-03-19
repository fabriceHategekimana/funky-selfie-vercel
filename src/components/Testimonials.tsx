const testimonials = [
  {
    quote:
      "Notre mariage en Suisse a été rendu encore plus inoubliable grâce au photobooth Funk Selfie. Nos invités ont adoré se prendre en photo et se laisser aller à leur créativité.",
    author: "Client Mariage",
    event: "Mariage",
  },
  {
    quote:
      "Nous avons loué le photobooth Funk Selfie pour notre salon professionnel. Cela a été un excellent moyen d'attirer l'attention des visiteurs et de les engager avec notre marque.",
    author: "Client Entreprise",
    event: "Salon professionnel",
  },
  {
    quote:
      "La qualité des photos était excellente. La livraison a été rapide et le personnel était sympathique et professionnel. Mes invités ont adoré !",
    author: "Client Anniversaire",
    event: "Anniversaire",
  },
];

export default function Testimonials() {
  return (
    <section
      id="temoignages"
      className="py-16 px-8"
      aria-label="Témoignages de nos clients"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-dark px-8 mx-16">
        Ce que disent nos clients
      </h2>
      <div className="h-8"></div>
      <div className="grid gap-8 mt-12 px-8 mx-16 justify-items-center justify-center pt-24" style={{ gridTemplateColumns: "repeat(3, 357px)" }}>
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.author}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primary max-w-[357px]"
          >
            <blockquote>
              <p className="italic mb-4 text-text-light leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <footer>
              <cite className="font-bold text-primary not-italic">
                - {testimonial.author}
              </cite>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
