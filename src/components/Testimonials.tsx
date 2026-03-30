import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

type Testimonial = { _id: string; quote: string | null; author: string | null };

export default async function Testimonials() {
  const { data: testimonials } = await sanityFetch({ query: testimonialsQuery }) as { data: Testimonial[] };

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
              key={testimonial._id}
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
