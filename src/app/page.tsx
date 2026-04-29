import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CardsMockup from "@/components/CardsMockup";
import ArcPhotobooth from "@/components/ArcPhotobooth";
import Configurator from "@/components/Configurator";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CardsMockup />
      <ArcPhotobooth />
      <Configurator />
      <Services />
      <Faq />
      <Contact />
    </>
  );
}
