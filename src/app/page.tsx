import Hero from "@/components/Hero";
import Formules from "@/components/Formules";
import Comment from "@/components/Comment";
import Features from "@/components/Features";
import Prints from "@/components/Prints";
import Pourquoi from "@/components/Pourquoi";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { sanityFetch } from "@/sanity/lib/live";
import { heroQuery } from "@/sanity/lib/queries";

// Ordre validé et définitif (brief §1.1) — ne rien déplacer.
export default async function Home() {
  const { data } = await sanityFetch({
    query: heroQuery,
  });

  return (
    <>
      <Hero title={data?.title} subtitle={data?.subtitle} />
      <Formules />
      <Comment />
      <Features />
      <Prints />
      <Pourquoi />
      <Events />
      <Contact />
      <Faq />
    </>
  );
}
