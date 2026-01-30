'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SplashPageProps {
  onEnter: () => void;
}

const SplashPage = ({ onEnter }: SplashPageProps) => {
  const splashRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initial animation for elements
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { 
      opacity: 0,
      y: 30
    });
    
    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Add subtle floating animations
    gsap.to(titleRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  const handleEnter = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const tl = gsap.timeline({
      onComplete: onEnter
    });

    // Fade out content
    tl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in"
    })
    // Split panel animation
    .to(leftPanelRef.current, {
      x: '-100%',
      duration: 1.2,
      ease: "power3.inOut"
    }, "+=0.2")
    .to(rightPanelRef.current, {
      x: '100%',
      duration: 1.2,
      ease: "power3.inOut"
    }, "<");
  };

  return (
    <div ref={splashRef} className="fixed inset-0 z-50 overflow-hidden bg-background">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-background to-muted/20"
      />
      
      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-background to-muted/20"
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={titleRef} className="text-center mb-8">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 text-foreground tracking-wider">
            KALISSEA
          </h1>
        </div>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl font-light mb-16 text-center max-w-2xl tracking-wide text-muted-foreground"
        >
          Agence Web Premium
        </p>
        
        <button
          ref={buttonRef}
          onClick={handleEnter}
          disabled={isAnimating}
          className="group relative px-10 py-4 text-lg font-medium text-foreground bg-transparent border-2 border-border rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-foreground transition-transform duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
          <span className="relative z-10 flex items-center space-x-3 transition-colors duration-500 group-hover:text-background">
            <span>ENTRER</span>
            <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
      
      {/* Minimal animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-muted-foreground rounded-full opacity-30"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animation: `subtleTwinkle ${3 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes subtleTwinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default SplashPage;