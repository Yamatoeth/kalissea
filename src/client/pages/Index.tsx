import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "@/components/Header";
import HeroWithBackground from "@/components/HeroWithBackground";
import Services from "@/components/Services";
import Process from "@/components/Process";

// Loading fallback component
const SectionFallback = () => (
  <div className="min-h-screen bg-linear-to-b from-card to-background animate-pulse" />
);

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  ssr: true,
  loading: SectionFallback,
});
const About = dynamic(() => import("@/components/About"), {
  ssr: true,
  loading: SectionFallback,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: true,
  loading: SectionFallback,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: SectionFallback,
});

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroWithBackground />
        <Suspense fallback={<SectionFallback />}>
          <Portfolio />
        </Suspense>
        <Services />
        <Process />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
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
