"use client";

import { useEffect } from "react";

// Observe toutes les .fade-up et ajoute .visible à l'entrée dans le viewport.
// Reproduit l'IntersectionObserver unique du prototype v9.
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));

    // Filet de sécurité : sur une connexion lente, l'hydratation peut traîner
    // assez pour que la page paraisse vide le temps que l'observer démarre.
    const failsafe = setTimeout(() => {
      els.forEach((el) => el.classList.add("visible"));
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return null;
}
