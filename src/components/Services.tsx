import Image from "next/image";

const services = [
  {
    image: "/images/elevate-nYgy58eb9aw-unsplash.jpg",
    alt: "Photobooth corporate pour événement d'entreprise en Suisse - FunkySelfie",
    title: "Événements Corporate",
    description:
      "Team building, séminaire, salon professionnel, lancement produit, soirée annuelle… FunkySelfie transforme chaque rendez-vous professionnel en expérience de marque. Votre équipe s'anime, vos clients se souviennent — et vos photos circulent sur LinkedIn bien après la fin de la soirée. On s'occupe de tout, vous récoltez les bénéfices.",
    featured: true,
  },
  {
    image: "/images/considerate-agency-UrzN-8K1PCE-unsplash.jpg",
    alt: "Photobooth pour mariage et célébration en Suisse - FunkySelfie",
    title: "Mariages & Célébrations",
    description:
      "Une animation que vos invités attendront toute la soirée. Photos imprimées à emporter, galerie partageable, ambiance garantie.",
    featured: false,
  },
  {
    image: "/images/priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg",
    alt: "Photobooth pour fête privée et anniversaire - FunkySelfie",
    title: "Fêtes Privées & Anniversaires",
    description:
      "Rendez votre fête inoubliable avec des photos créatives et fun à partager instantanément avec tous vos proches.",
    featured: false,
  },
];

export default function Services() {
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
              key={service.title}
              className={`bg-white rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 overflow-hidden ${
                service.featured ? "lg:row-span-1 ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="relative w-full h-[200px] md:h-[240px]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
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
