import type { Metadata } from "next";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et utilisation des cookies de FunkySelfie (LPD suisse).",
  alternates: { canonical: "https://www.funkyselfie.ch/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
