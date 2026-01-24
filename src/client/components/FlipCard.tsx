"use client";

import { useState } from "react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
}

/**
 * FlipCard Component
 * 3D flip animation on hover using Framer Motion
 * Shows front content by default, flips to show back content on hover
 */
const FlipCard: React.FC<FlipCardProps> = ({
  frontContent,
  backContent,
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className={`w-full h-full perspective ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Front side */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          {frontContent}
        </motion.div>

        {/* Back side */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            rotateY: 180,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
