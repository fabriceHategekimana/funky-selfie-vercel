export default function Contact() {
  return (
    <section
      id="contact"
      className="text-white py-12 md:py-20 px-4 md:px-8 text-center bg-gradient-brand"
      aria-label="Contact FunkySelfie"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Une question ? On est là.
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 text-white/90">
          Pour toute demande spécifique ou question avant de réserver, écrivez-nous directement.
          Nous répondons sous 24h.
        </p>
        <a
          href="mailto:hello@funkyselfie.ch"
          className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 no-underline"
        >
          hello@funkyselfie.ch
        </a>
        <p className="text-sm text-white/80 leading-relaxed mt-8">
          Réponse sous 24h · Devis sans engagement · Pick-up gratuit ou
          livraison partout en Suisse · On s&apos;occupe de tout
        </p>
      </div>
    </section>
  );
}
