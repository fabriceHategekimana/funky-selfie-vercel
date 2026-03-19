import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://funky-selfie.ch"),
  title: {
    default: "FunkySelfie | Location Photobooth Corporate — Suisse",
    template: "%s | FunkySelfie",
  },
  description:
    "Louez un photobooth haut de gamme pour vos événements corporate en Suisse. Personnalisé à vos couleurs, livré et installé partout. Devis gratuit sous 24h.",
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
    url: "https://funky-selfie.ch",
    siteName: "FunkySelfie",
    title: "FunkySelfie | Photobooth Corporate Clé en Main — Suisse",
    description:
      "Le photobooth corporate qui renforce votre marque. Service intégral partout en Suisse. On s'occupe de tout.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunkySelfie - Location de Photobooth Corporate en Suisse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FunkySelfie | Photobooth Corporate Clé en Main — Suisse",
    description:
      "Le photobooth corporate qui renforce votre marque. Service intégral partout en Suisse. On s'occupe de tout.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://funky-selfie.ch",
  },
  icons: {
    icon: "/images/logo_square.png",
    apple: "/images/logo_square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://calendar.google.com/calendar/scheduling-button-script.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
