"use client";

import { motion } from "framer-motion";
import React from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number; // milliseconds between characters
  as?: React.ElementType;
}

/**
 * Typewriter Component
 * Reveals text character by character with elegant animation
 * Perfect for headlines and important text
 */
const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = "",
  delay = 0,
  speed = 30,
  as: Component = "span",
}) => {
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed / 1000,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      className={`${className} flex flex-wrap justify-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Typewriter;
