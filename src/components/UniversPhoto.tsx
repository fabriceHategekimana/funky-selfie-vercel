import Image from "next/image";

const products = [
  {
    image: "/images/Photobooth-bwood.png",
    alt: "Photobooth en bois FunkySelfie - Borne photo professionnelle",
    title: "Photobooth",
    description:
      "Notre photobooth au design élégant en bois s'intègre parfaitement à tous vos événements. Équipé d'une technologie de pointe pour des photos de qualité professionnelle.",
  },
  {
    image: "/images/accessoires.png",
    alt: "Accessoires photobooth - Chapeaux, lunettes et props amusants",
    title: "Accessoires",
    description:
      "Un large choix d'accessoires fun et tendance pour animer vos séances photo : chapeaux, lunettes, pancartes et bien plus encore.",
  },
  {
    image: "/images/decoration.jpg",
    alt: "Décoration photobooth - Mise en scène personnalisable",
    title: "Décoration",
    description:
      "Une mise en scène soignée et personnalisable pour créer une ambiance unique autour de votre photobooth. Backdrop, éclairage et décorations incluses.",
  },
];

export default function UniversPhoto() {
  return (
    <section
      id="univers-photo"
      className="bg-bg-light py-16 px-8"
      aria-label="Notre univers photo"
    >
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-dark px-8 mx-16">
          Notre Univers Photo
        </h2>
        <div className="h-8"></div>
        <div className="grid gap-8 mt-12 px-8 mx-16 justify-items-center justify-center pt-24" style={{ gridTemplateColumns: "repeat(3, 357px)" }}>
          {products.map((product) => (
            <article
              key={product.title}
              className="bg-white p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 max-w-[357px]"
            >
              <div className="relative w-full h-[200px] rounded-xl mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">
                {product.title}
              </h3>
              <p className="text-text-light">{product.description}</p>
            </article>
          ))}
        </div>
    </section>
  );
}
