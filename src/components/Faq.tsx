import { sanityFetch } from "@/sanity/lib/live";
import { faqQuery } from "@/sanity/lib/queries";
import FaqAccordion from "./FaqAccordion";

export default async function Faq() {
  const { data: items } = await sanityFetch({ query: faqQuery });

  return (
    <section
      id="faq"
      className="py-12 md:py-20 px-4 md:px-8"
      aria-label="Questions fréquentes"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Questions fréquentes
        </h2>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
