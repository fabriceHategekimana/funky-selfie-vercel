import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
import Offers from "@/components/Offers";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Features />
      <Offers />
      <Services />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
