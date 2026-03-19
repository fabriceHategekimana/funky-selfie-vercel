import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
import UniversPhoto from "@/components/UniversPhoto";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="h-16"></div>
      <Features />
      <div className="h-16"></div>
      <UniversPhoto />
      <div className="h-16"></div>
      <Services />
      <div className="h-16"></div>
      <Testimonials />
      <div className="h-16"></div>
      <Contact />
    </>
  );
}
