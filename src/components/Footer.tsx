import { sanityFetch } from "@/sanity/lib/live";
import { footerQuery } from "@/sanity/lib/queries";

const FALLBACK = {
  tagline: "FunkySelfie — L'expérience photo clé en main qui donne de la valeur à vos événements.",
  seoText: "FunkySelfie propose la location de photobooth corporate dans toute la Suisse : Genève, Lausanne, Zurich, Berne, Bâle, Fribourg, Neuchâtel, Sion et toutes les villes suisses. Service clé en main pour start-ups, PME et grandes entreprises.",
  copyright: "© 2025 FunkySelfie. Tous droits réservés. — funky-selfie.ch",
};

type FooterData = { tagline: string | null; seoText: string | null; copyright: string | null } | null;

export default async function Footer() {
  const { data } = (await sanityFetch({ query: footerQuery })) as { data: FooterData };

  const tagline = data?.tagline ?? FALLBACK.tagline;
  const seoText = data?.seoText ?? FALLBACK.seoText;
  const copyright = data?.copyright ?? FALLBACK.copyright;

  return (
    <footer className="bg-footer text-white text-center py-10 md:py-12 px-4">
      <p className="font-medium">{tagline}</p>
      {seoText && (
        <p className="mt-4 text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {seoText}
        </p>
      )}
      <p className="mt-4 text-sm text-gray-400">{copyright}</p>
    </footer>
  );
}
