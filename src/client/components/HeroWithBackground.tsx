"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { useTranslation } from "react-i18next";

// Charger IsometricCube avec plus basse priorité
const DynamicIsometricCube = dynamic(
  () => import("@/components/IsometricCube"),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-black" style={{ background: 'radial-gradient(circle at center, #27272a 0%, #000 70%)' }} />
    )
  }
);

const HeroWithBackground = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative min-h-screen">
      {/* Background 3D - Absolu pour tester */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <DynamicIsometricCube />
      </div>
      
      {/* Contenu Hero par-dessus */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Hero t={t} />
      </div>
    </div>
  );
};

export default HeroWithBackground;