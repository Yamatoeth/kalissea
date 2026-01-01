"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Maintenance from "@/components/Maintenance";
import SEOPricing from "@/components/SEOPricing";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Pricing />
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
