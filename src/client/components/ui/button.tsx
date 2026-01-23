"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SPRING_CONFIG } from "@/lib/animations";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        "hero-outline": "border-2 border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-muted",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const buttonContent = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    // Return animated version by default
    if (animated && !asChild) {
      const { onDrag, onDragStart, onDragEnd, ...safeProps } = props as any;
      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLButtonElement>}
          whileHover={{
            scale: 1.02,
            transition: SPRING_CONFIG.tight,
          }}
          whileTap={{
            scale: 0.98,
            transition: SPRING_CONFIG.tight,
          }}
          {...safeProps}
        />
      );
    }

    // For asChild or non-animated, return motion div wrapper
    if (animated && asChild) {
      return (
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: SPRING_CONFIG.tight,
          }}
          whileTap={{
            scale: 0.98,
            transition: SPRING_CONFIG.tight,
          }}
          style={{ display: "inline-block" }}
        >
          {buttonContent}
        </motion.div>
      );
    }

    return buttonContent;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
