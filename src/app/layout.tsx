import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollReveal from "@/components/ScrollReveal";
import Analytics from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SanityLive } from "@/sanity/lib/live";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PromoProvider } from "@/contexts/PromoContext";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { sanityFetch } from "@/sanity/lib/live";
import { promoQuery } from "@/sanity/lib/queries";
import { resolvePromo, type PromoSettings } from "@/lib/promo";

// Recalcule l'état de la promo (notamment l'activation par dates) au moins
// toutes les 30 min, sans redéploiement.
export const revalidate = 1800;

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b1e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.funkyselfie.ch"),
  title: {
    default: "FunkySelfie | Location Photobooth en Suisse — Livré & Installé",
    template: "%s | FunkySelfie",
  },
  description:
    "Louez un photobooth professionnel en Suisse. Livré, installé, géré de A à Z. Impressions instantanées, galerie cloud, 100% personnalisable. Devis gratuit sous 48h.",
  keywords: [
    "photobooth corporate",
    "location photobooth Suisse",
    "photobooth événement entreprise",
    "photobooth corporate Suisse",
    "location photobooth Genève",
    "location photobooth Lausanne",
    "location photobooth Zurich",
    "animation photobooth team building",
    "prix photobooth corporate Suisse",
    "louer photobooth séminaire entreprise",
    "photobooth mariage Suisse",
    "FunkySelfie",
  ],
  authors: [{ name: "FunkySelfie" }],
  creator: "FunkySelfie",
  publisher: "FunkySelfie",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://www.funkyselfie.ch",
    siteName: "FunkySelfie",
    title: "FunkySelfie | Location Photobooth en Suisse",
    description:
      "Photobooth professionnel. Livré, installé, géré de A à Z. Devis gratuit sous 48h.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunkySelfie - Location de Photobooth en Suisse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FunkySelfie | Location Photobooth en Suisse",
    description:
      "Photobooth professionnel. Livré, installé, géré de A à Z. Devis gratuit sous 48h.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    // Site mono-URL : le contenu FR/EN/DE est servi à la même adresse via un
    // changement de langue côté client (localStorage). Pas de hreflang par locale
    // (qui exigerait des URLs distinctes). Voir LanguageContext.
    canonical: "https://www.funkyselfie.ch",
  },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = (await sanityFetch({ query: promoQuery })) as { data: PromoSettings };
  const promo = resolvePromo(data);

  return (
    <html lang="fr">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <noscript>
          <style>{`.fade-up { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <StyledComponentsRegistry>
          <LanguageProvider>
            <PromoProvider value={promo}>
              <ConsentProvider>
                <JsonLd />
                <PromoBanner />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
                <ScrollReveal />
                <SanityLive />
                <Analytics />
              </ConsentProvider>
            </PromoProvider>
          </LanguageProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
