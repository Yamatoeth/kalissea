import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "@/components/Header";
import HeroWithBackground from "@/components/HeroWithBackground";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";

// Loading fallback component
const SectionFallback = () => (
  <div className="min-h-screen bg-linear-to-b from-card to-background animate-pulse" />
);

// Lazy load uniquement les composants lourds et non critiques
const Maintenance = dynamic(() => import("@/components/Maintenance"), { 
  ssr: true,
  loading: SectionFallback 
});
const SEOPricing = dynamic(() => import("@/components/SEOPricing"), { 
  ssr: true,
  loading: SectionFallback 
});
const Features = dynamic(() => import("@/components/Features"), { 
  ssr: true,
  loading: SectionFallback 
});
const Portfolio = dynamic(() => import("@/components/Portfolio"), { 
  ssr: true,
  loading: SectionFallback 
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), { 
  ssr: true,
  loading: SectionFallback 
});
const Process = dynamic(() => import("@/components/Process"), { 
  ssr: true,
  loading: SectionFallback 
});
const Contact = dynamic(() => import("@/components/Contact"), { 
  ssr: true,
  loading: SectionFallback 
});
const Footer = dynamic(() => import("@/components/Footer"), { 
  ssr: true,
  loading: SectionFallback 
});

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
        
        {/* Maintenance section */}
        <Suspense fallback={<SectionFallback />}>
          <Maintenance />
        </Suspense>
        
        {/* SEO Pricing section */}
        <Suspense fallback={<SectionFallback />}>
          <SEOPricing />
        </Suspense>
        
        {/* Features section */}
        <Suspense fallback={<SectionFallback />}>
          <Features />
        </Suspense>
        
        {/* Portfolio section */}
        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>
        
        {/* Testimonials section */}
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        
        {/* Process section */}
        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        
        {/* Contact section */}
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;