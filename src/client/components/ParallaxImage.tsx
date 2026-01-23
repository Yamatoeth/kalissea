"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { ImageProps } from "next/image";

interface ParallaxImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  intensity?: number; // 0-100, how much parallax movement
  direction?: "up" | "down";
  className?: string;
}

/**
 * ParallaxImage Component
 * Creates smooth parallax effect on images as user scrolls
 * Perfect for portfolio items, hero backgrounds, etc.
 */
const ParallaxImage = ({
  alt,
  intensity = 30,
  direction = "up",
  className = "",
  ...imageProps
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax movement
  const sign = direction === "down" ? 1 : -1;
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [intensity * sign, -intensity * sign]
  );

  return (
    <motion.div ref={ref} className="relative overflow-hidden" style={{ y: yParallax }}>
      <Image alt={alt} className={className} {...imageProps} />
    </motion.div>
  );
};

export default ParallaxImage;
