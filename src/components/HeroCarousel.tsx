"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroImages = [
  {
    src: "/images/considerate-agency-UrzN-8K1PCE-unsplash.jpg",
    alt: "Photobooth lors d'un mariage en Suisse - FunkySelfie",
  },
  {
    src: "/images/elevate-nYgy58eb9aw-unsplash.jpg",
    alt: "Photobooth lors d'un événement d'entreprise - FunkySelfie",
  },
  {
    src: "/images/priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg",
    alt: "Photobooth lors d'une fête d'anniversaire - FunkySelfie",
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

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="accueil"
      className="relative flex flex-col items-center justify-center text-white py-24 md:py-32 text-center overflow-hidden bg-black/50 min-h-[418.8px]"
      aria-label="Section d'accueil avec carrousel d'images"
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
            sizes="100vw"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
          Location de Photobooth en Suisse
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up-delay-1">
          Créez des souvenirs inoubliables pour vos événements
        </p>
        <button
          onClick={scrollToContact}
          className="animate-fade-in-up-delay-2 bg-primary text-white px-20 py-10 border-none rounded-full text-3xl font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-dark"
          aria-label="Réserver un photobooth maintenant"
        >
          Réserver Maintenant
        </button>
      </div>
    </section>
  );
}
