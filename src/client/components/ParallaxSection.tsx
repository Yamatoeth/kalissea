"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  intensity?: number; // 0-100, parallax intensity
  direction?: "up" | "down";
  className?: string;
  speed?: "slow" | "normal" | "fast"; // Predefined speeds
}

const speedMap = {
  slow: 20,
  normal: 50,
  fast: 80,
};

/**
 * ParallaxSection Component
 * Wraps content to create parallax scrolling effect
 * Use for text, cards, or any layered content
 */
const ParallaxSection = ({
  children,
  intensity,
  direction = "up",
  className = "",
  speed = "normal",
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use intensity if provided, otherwise use speed preset
  const parallaxIntensity = intensity ?? speedMap[speed];

  const sign = direction === "down" ? 1 : -1;
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxIntensity * sign, -parallaxIntensity * sign]
  );

  return (
    <motion.div ref={ref} style={{ y: yParallax }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
