"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0M2oHNx-BdoFQnFouN3ne26QbHU90E1qFfAlSqCiwyVSCUIzy85P85ASrlthUx6202p7SLpEmC?gv=true";

export default function Contact() {
  const calendarRef = useRef<HTMLDivElement>(null);

  const initCalendar = () => {
    if (
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar?.schedulingButton &&
      calendarRef.current
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar.schedulingButton.load({
        url: CALENDAR_URL,
        color: "#039BE5",
        label: "Envoyer ma demande",
        target: calendarRef.current,
      });
    }
  };

  useEffect(() => {
    initCalendar();
  }, []);

  return (
    <section
      id="contact"
      className="text-white py-12 md:py-20 px-4 md:px-8 text-center bg-gradient-brand"
      aria-label="Demande de devis photobooth"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Parlons de votre prochain événement
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 text-white/90">
          Vous préparez un séminaire, une soirée corporate ou un salon
          professionnel ? Décrivez-nous votre événement en quelques lignes. Nous
          vous envoyons un devis personnalisé sous 24h — avec les options, le
          déplacement calculé, et zéro surprise.
        </p>
        <Script
          src="https://calendar.google.com/calendar/scheduling-button-script.js"
          strategy="lazyOnload"
          onLoad={initCalendar}
        />
        <div ref={calendarRef} className="inline-block mb-8" />
        <p className="text-sm text-white/80 leading-relaxed">
          Réponse sous 24h · Devis sans engagement · Pick-up gratuit ou
           livraison partout en Suisse · On s&apos;occupe de tout
        </p>
      </div>
    </section>
  );
}
