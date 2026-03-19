import Image from "next/image";

const services = [
  {
    image: "/images/considerate-agency-UrzN-8K1PCE-unsplash.jpg",
    alt: "Photobooth pour mariage en Suisse - Souvenirs uniques pour vos invités",
    title: "Mariages",
    description:
      "Ajoutez une touche de magie à votre mariage avec des souvenirs uniques pour vos invités.",
  },
  {
    image: "/images/elevate-nYgy58eb9aw-unsplash.jpg",
    alt: "Photobooth pour événement d'entreprise - Animation professionnelle",
    title: "Événements d'Entreprise",
    description:
      "Renforcez votre marque et engagez vos clients lors de vos événements professionnels.",
  },
  {
    image: "/images/priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg",
    alt: "Photobooth pour anniversaire - Photos amusantes et créatives",
    title: "Anniversaires",
    description:
      "Rendez votre anniversaire inoubliable avec des photos amusantes et créatives.",
  },
  {
    image: "/images/considerate-agency-UrzN-8K1PCE-unsplash.jpg",
    alt: "Photobooth pour fête privée - Animation unique et amusante",
    title: "Fêtes Privées",
    description:
      "Animation unique et amusante pour tous vos événements spéciaux.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-bg-light py-16 px-8"
      aria-label="Nos services de location de photobooth"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-dark px-8 mx-16">
          Nos Services
        </h2>
        <div className="h-8"></div>
        <div className="grid gap-8 mt-12 px-8 mx-16 justify-items-center justify-center pt-24" style={{ gridTemplateColumns: "repeat(4, 357px)" }}>
          {services.map((service) => (
            <article
              key={service.title}
              className="bg-white p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 max-w-[357px]"
            >
              <div className="relative w-full h-[150px] rounded-lg mb-4 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark">
                {service.title}
              </h3>
              <p className="text-text-light text-sm">{service.description}</p>
            </article>
          ))}
        </div>
    </section>
  );
}
