import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
import Configurator from "@/components/Configurator";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Features />
      <Configurator />
      <Services />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
