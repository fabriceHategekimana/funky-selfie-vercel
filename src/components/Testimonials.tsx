const testimonials = [
  {
    quote:
      "FunkySelfie a géré notre soirée annuelle de A à Z. Installation, animation, reprise : nous n'avons eu à nous occuper de rien. Nos 200 collaborateurs en parlent encore.",
    author: "Responsable Communication, groupe industriel, Genève",
  },
  {
    quote:
      "Le photobooth aux couleurs de notre marque a attiré un trafic remarquable sur notre stand. Les photos brandées ont été partagées massivement sur LinkedIn dès le soir même.",
    author: "Directeur Marketing, PME tech, Lausanne",
  },
  {
    quote:
      "Qualité impeccable, équipe ponctuelle et souriante. Nos invités ont adoré et nous avons récupéré des centaines de photos via la galerie. Un sans-faute.",
    author: "Couple marié, Fribourg",
  },
];

export default function Testimonials() {
  return (
    <section
      id="temoignages"
      className="bg-bg-light py-12 md:py-20 px-4 md:px-8"
      aria-label="Témoignages de nos clients"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Ils nous ont fait confiance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="bg-white p-7 md:p-10 rounded-xl shadow-lg border-l-4 border-primary"
            >
              <blockquote>
                <p className="italic mb-5 text-text-light leading-loose">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <footer>
                <cite className="font-bold text-primary not-italic text-sm">
                  — {testimonial.author}
                </cite>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
