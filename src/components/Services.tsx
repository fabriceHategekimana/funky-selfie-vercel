import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { servicesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Service = {
  _id: string;
  title: string | null;
  description: string | null;
  featured: boolean | null;
  image: { asset: SanityImageSource; alt: string | null } | null;
};

export default async function Services() {
  const { data: services } = (await sanityFetch({ query: servicesQuery })) as { data: Service[] };

  return (
    <section
      id="services"
      className="py-12 md:py-20 px-4 md:px-8"
      aria-label="Nos services de location de photobooth"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-dark">
          Chaque événement mérite une expérience mémorable
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <article
              key={service._id}
              className={`bg-white rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 overflow-hidden ${
                service.featured ? "lg:row-span-1 ring-2 ring-primary/20" : ""
              }`}
            >
              {service.image?.asset && (
                <div className="relative w-full h-[200px] md:h-[240px]">
                  <Image
                    src={urlFor(service.image.asset).width(800).height(480).url()}
                    alt={service.image.alt ?? service.title ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-7 md:p-10">
                <h3 className="text-xl font-bold mb-3 text-dark">
                  {service.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
