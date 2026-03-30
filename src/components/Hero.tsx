import { sanityFetch } from "@/sanity/lib/live";
import { heroQuery } from "@/sanity/lib/queries";
import HeroCarousel from "./HeroCarousel";

const FALLBACK = {
  title: "Faites de votre événement un moment dont on parle encore le lendemain.",
  subtitle:
    "Le photobooth corporate qui renforce votre image de marque, engage vos collaborateurs et génère du contenu partageable — livré, installé, géré de A à Z. On s'occupe de tout.",
  ctaText: "Demander un devis gratuit",
};

type HeroData = { title: string | null; subtitle: string | null; ctaText: string | null } | null;

export default async function Hero() {
  const { data } = (await sanityFetch({ query: heroQuery })) as { data: HeroData };

  const title = data?.title ?? FALLBACK.title;
  const subtitle = data?.subtitle ?? FALLBACK.subtitle;
  const ctaText = data?.ctaText ?? FALLBACK.ctaText;

  return <HeroCarousel title={title} subtitle={subtitle} ctaText={ctaText} />;
}
