"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";
import {
  textRevealVariants,
  lineRevealVariants,
  staggerContainerVariants,
} from "@/lib/animations";

type SplitMode = "word" | "line" | "char";

interface SplitTextProps {
  text: string;
  mode?: SplitMode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Premium SplitText Component
 * Reveals text with elegant word/line/character-by-character animation
 * Pairs with Framer Motion for cinematic entrances
 */
const SplitText: React.FC<SplitTextProps> = ({
  text,
  mode = "word",
  className = "",
  delay = 0,
  as: Component = "span",
}) => {
  const elements = useMemo(() => {
    const split = (): string[] => {
      if (mode === "char") {
        return text.split("");
      } else if (mode === "line") {
        return text.split("\n");
      } else {
        // word mode
        return text.split(" ");
      }
    };

    return split();
  }, [text, mode]);

  const variantsToUse = mode === "line" ? lineRevealVariants : textRevealVariants;
  const joiner = mode === "line" ? "\n" : mode === "char" ? "" : " ";

  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap gap-0">
        {elements.map((element, i) => (
          <motion.span
            key={`${element}-${i}`}
            custom={i}
            variants={variantsToUse}
            className="inline"
          >
            {element}
            {mode === "word" && i < elements.length - 1 && "\u00A0"}
            {mode === "line" && i < elements.length - 1 && (
              <br />
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SplitText;
