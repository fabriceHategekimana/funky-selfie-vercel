import { sanityFetch } from "@/sanity/lib/live";
import { contactQuery } from "@/sanity/lib/queries";

const FALLBACK = {
  title: "Une question ? On est là.",
  subtitle: "Pour toute demande spécifique ou question avant de réserver, écrivez-nous directement. Nous répondons sous 24h.",
  email: "hello@funkyselfie.ch",
  note: "Réponse sous 24h · Devis sans engagement · Pick-up gratuit ou livraison partout en Suisse · On s'occupe de tout",
};

type ContactData = { title: string | null; subtitle: string | null; email: string | null; note: string | null } | null;

export default async function Contact() {
  const { data } = (await sanityFetch({ query: contactQuery })) as { data: ContactData };

  const title = data?.title ?? FALLBACK.title;
  const subtitle = data?.subtitle ?? FALLBACK.subtitle;
  const email = data?.email ?? FALLBACK.email;
  const note = data?.note ?? FALLBACK.note;

  return (
    <section
      id="contact"
      className="text-white py-12 md:py-20 px-4 md:px-8 text-center bg-gradient-brand"
      aria-label="Contact FunkySelfie"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          {title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 text-white/90">
          {subtitle}
        </p>
        <a
          href={`mailto:${email}`}
          className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 no-underline"
        >
          {email}
        </a>
        {note && (
          <p className="text-sm text-white/80 leading-relaxed mt-8">{note}</p>
        )}
      </div>
    </section>
  );
}
