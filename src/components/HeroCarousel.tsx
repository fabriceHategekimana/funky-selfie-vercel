"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroImages = [
  {
    src: "/images/considerate-agency-UrzN-8K1PCE-unsplash.jpg",
    alt: "Photobooth corporate lors d'un événement d'entreprise en Suisse - FunkySelfie",
  },
  {
    src: "/images/elevate-nYgy58eb9aw-unsplash.jpg",
    alt: "Photobooth personnalisé pour séminaire corporate - FunkySelfie",
  },
  {
    src: "/images/priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg",
    alt: "Animation photobooth lors d'une soirée d'entreprise - FunkySelfie",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeBackground = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(changeBackground, 5000);
    return () => clearInterval(interval);
  }, [changeBackground]);

  return (
    <section
      id="accueil"
      className="relative flex flex-col items-center justify-center text-white py-16 md:py-32 text-center overflow-hidden bg-black/50 min-h-[300px] md:min-h-[420px]"
      aria-label="Section d'accueil"
    >
      {/* Background images carousel */}
      <div className="absolute inset-0 -z-10">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-bold mb-5 md:mb-6 leading-snug md:leading-tight animate-fade-in-up">
          Faites de votre événement un moment dont on parle encore le lendemain.
        </h1>
        <p className="text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay-1">
          Le photobooth corporate qui renforce votre image de marque, engage vos
          collaborateurs et génère du contenu partageable — livré, installé,
          géré de A à Z. On s&apos;occupe de tout.
        </p>
        <a
          href="#contact"
          className="inline-block animate-fade-in-up-delay-2 bg-primary text-white px-8 py-4 md:px-16 md:py-6 border-none rounded-full text-lg md:text-2xl font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-dark no-underline"
          aria-label="Demander un devis gratuit pour un photobooth"
        >
          Demander un devis gratuit
        </a>
      </div>
    </section>
  );
}
