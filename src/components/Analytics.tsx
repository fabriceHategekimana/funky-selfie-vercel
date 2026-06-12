"use client";

import Script from "next/script";
import { useConsent } from "@/contexts/ConsentContext";

// Charge Google Analytics 4 UNIQUEMENT après consentement explicite (LPD suisse, §6).
// Le Measurement ID vient de NEXT_PUBLIC_GA_ID (fourni par Déborah).
export default function Analytics() {
  const { consent, ready } = useConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!ready || consent !== "accepted" || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
