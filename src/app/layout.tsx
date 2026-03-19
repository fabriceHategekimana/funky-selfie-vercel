import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://funkyselfie.ch"),
  title: {
    default: "FunkySelfie | Location de Photobooth en Suisse",
    template: "%s | FunkySelfie",
  },
  description:
    "FunkySelfie propose la location de photobooth en Suisse pour vos mariages, anniversaires, événements d'entreprise et fêtes privées. Créez des souvenirs inoubliables avec notre photobooth personnalisable.",
  keywords: [
    "photobooth",
    "location photobooth",
    "photobooth Suisse",
    "photo booth mariage",
    "photobooth entreprise",
    "photobooth anniversaire",
    "location photobooth Suisse",
    "photomaton mariage",
    "animation photo événement",
    "FunkySelfie",
    "photobooth Lausanne",
    "photobooth Genève",
    "photobooth Zurich",
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
    url: "https://funkyselfie.ch",
    siteName: "FunkySelfie",
    title: "FunkySelfie | Location de Photobooth en Suisse",
    description:
      "Location de photobooth en Suisse pour mariages, anniversaires, événements d'entreprise et fêtes privées. Créez des souvenirs inoubliables !",
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
    title: "FunkySelfie | Location de Photobooth en Suisse",
    description:
      "Location de photobooth en Suisse pour mariages, anniversaires et événements. Créez des souvenirs inoubliables !",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://funkyselfie.ch",
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
      <body className="antialiased">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
