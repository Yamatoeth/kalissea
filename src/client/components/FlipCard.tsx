"use client";

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ReactNode } from "react";

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
}

/**
 * FlipCard Component
 * 3D flip animation on hover using react-card-flip
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
      className={`w-full h-full ${className}`}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div key="front" className="w-full h-full">
          {frontContent}
        </div>

        <div key="back" className="w-full h-full">
          {backContent}
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
