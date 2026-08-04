"use client";

import { useEffect, useRef, useState } from "react";

// Indique si l'élément est actuellement visible à l'écran — sert à couper les
// animations en boucle infinie et les minuteurs JS quand la section est hors
// viewport (économie CPU/GPU/batterie sur mobile).
export function useInView<T extends HTMLElement>(threshold = 0) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
