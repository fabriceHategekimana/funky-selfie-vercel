import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Configurator from "@/components/Configurator";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Configurator />
      <Services />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
