import { Variants } from "framer-motion";

/**
 * Premium Animation Constants & Utilities
 * Cinematic, world-class agency-standard animations
 */

// ============================================================================
// SPRING CONFIGURATIONS (Lean Spring for micro-interactions)
// ============================================================================

export const SPRING_CONFIG = {
  // Ultra-responsive micro-interactions
  tight: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
  // Smooth, natural feel for UI elements
  smooth: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  },
  // Bouncy, playful feel for interactive elements
  bouncy: {
    type: "spring",
    stiffness: 80,
    damping: 10,
    mass: 0.6,
  },
  // Very slow, elegant entrance animations
  slow: {
    type: "spring",
    stiffness: 50,
    damping: 20,
    mass: 1.2,
  },
} as const;

// ============================================================================
// TYPOGRAPHIC ANIMATIONS (Split Text & Staggered Reveals)
// ============================================================================

export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const lineRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

// ============================================================================
// CONTAINER & STAGGER ANIMATIONS (Orchestrated Child Elements)
// ============================================================================

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.320, 1],
    },
  },
};

export const fadeInUpChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.320, 1],
    },
  },
};

// ============================================================================
// SCROLL-BASED ANIMATIONS (useScroll & useTransform)
// ============================================================================

export const SCROLL_PARALLAX_OFFSET = {
  mild: ["start end", "end start"],
  moderate: ["start 100%", "end -100%"],
  intense: ["start 150%", "end -150%"],
} as const;

// ============================================================================
// ENTRANCE ANIMATIONS (whileInView with thresholds)
// ============================================================================

export const whileInViewConfig = {
  threshold: 0.3,
  once: true,
} as const;

export const cardHoverVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -8,
    transition: SPRING_CONFIG.smooth,
  },
};

// ============================================================================
// MAGNETIC BUTTON EFFECTS
// ============================================================================

export const magneticButtonVariants: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    scale: 1.05,
    transition: SPRING_CONFIG.tight,
  },
  tap: {
    scale: 0.95,
    transition: SPRING_CONFIG.tight,
  },
};

// ============================================================================
// DEPTH & LAYERING ANIMATIONS
// ============================================================================

export const layerParallaxVariants = (depth: number): Variants => ({
  hidden: { opacity: 0, y: 20 * depth },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * depth,
      duration: 0.8,
      ease: [0.23, 1, 0.320, 1],
    },
  },
});

// ============================================================================
// NAVIGATION & INTERACTION EFFECTS
// ============================================================================

export const navLinkVariants: Variants = {
  rest: { color: "var(--color-muted-foreground)" },
  hover: { color: "var(--color-foreground)" },
};

export const backdropBlurVariants: Variants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: { duration: 0.3 },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate delay for staggered animations
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.05) =>
  index * baseDelay;

/**
 * Map scroll progress to parallax Y offset
 */
export const getParallaxY = (progress: number, intensity: number = 50) =>
  progress * intensity - intensity / 2;

/**
 * Convert px values to relative scroll transforms
 */
export const scrollTransformConfig = {
  image: {
    // For background images
    y: ["0%", "-15%"],
  },
  text: {
    // For text parallax
    y: ["0px", "-30px"],
  },
  elevation: {
    // For elevated elements
    y: ["0px", "20px"],
  },
} as const;
