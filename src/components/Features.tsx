import { sanityFetch } from "@/sanity/lib/live";
import { featuresQuery } from "@/sanity/lib/queries";

type Feature = { _id: string; title: string | null; description: string | null };

export default async function Features() {
  const { data: features } = (await sanityFetch({ query: featuresQuery })) as { data: Feature[] };

  return (
    <section
      id="pourquoi"
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
              key={feature._id}
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
