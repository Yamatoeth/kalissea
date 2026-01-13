import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroWithBackground from "@/components/HeroWithBackground";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";

// Lazy load uniquement les composants lourds et non critiques
const Maintenance = dynamic(() => import("@/components/Maintenance"), { ssr: true });
const SEOPricing = dynamic(() => import("@/components/SEOPricing"), { ssr: true });
const Features = dynamic(() => import("@/components/Features"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Process = dynamic(() => import("@/components/Process"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        {/* Hero section avec background 3D */}
        <HeroWithBackground />
        
        {/* Sections critiques chargées normalement */}
        <Services />
        <Pricing />
        
        {/* Reste du contenu - chargé à la demande */}
        <Maintenance />
        <SEOPricing />
        <Features />
        <Portfolio />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;