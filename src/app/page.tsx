import Hero from "@/components/Hero";
import Formules from "@/components/Formules";
import Comment from "@/components/Comment";
import Features from "@/components/Features";
import Prints from "@/components/Prints";
import Pourquoi from "@/components/Pourquoi";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";

// Ordre validé et définitif (brief §1.1) — ne rien déplacer.
export default function Home() {
  return (
    <>
      <Hero />
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
