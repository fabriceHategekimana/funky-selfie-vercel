"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Contact() {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize calendar scheduling button when script loads
    const initCalendar = () => {
      if (
        typeof window !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).calendar?.schedulingButton &&
        calendarRef.current
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0M2oHNx-BdoFQnFouN3ne26QbHU90E1qFfAlSqCiwyVSCUIzy85P85ASrlthUx6202p7SLpEmC?gv=true",
          color: "#039BE5",
          label: "Réserver un rendez-vous",
          target: calendarRef.current,
        });
      }
    };

    // Try to initialize immediately (in case script already loaded)
    initCalendar();

    // Also listen for load event
    window.addEventListener("load", initCalendar);
    return () => window.removeEventListener("load", initCalendar);
  }, []);

  return (
    <section
      id="contact"
      className="text-white py-16 px-8 text-center"
      style={{
        background: "linear-gradient(135deg, #36949e 0%, #bd3ca1 100%)",
      }}
      aria-label="Réservation de photobooth"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Réservez votre Photobooth
      </h2>

      {/* Google Calendar Scheduling Button */}
      <link
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
        rel="stylesheet"
      />
      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).calendar?.schedulingButton &&
            calendarRef.current
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).calendar.schedulingButton.load({
              url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0M2oHNx-BdoFQnFouN3ne26QbHU90E1qFfAlSqCiwyVSCUIzy85P85ASrlthUx6202p7SLpEmC?gv=true",
              color: "#039BE5",
              label: "Réserver un rendez-vous",
              target: calendarRef.current,
            });
          }
        }}
      />
      <div ref={calendarRef} className="inline-block" />
    </section>
  );
}
