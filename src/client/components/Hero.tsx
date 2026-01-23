"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import SplitText from "./SplitText";
import Typewriter from "./Typewriter";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  magneticButtonVariants,
  SPRING_CONFIG,
  SCROLL_PARALLAX_OFFSET,
  whileInViewConfig,
} from "@/lib/animations";

const Hero = ({ t }: { t: (key: string) => string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  // Parallax effects for depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  const stats = useMemo(
    () => [
      { value: "50+", label: t("hero.stats.projects") },
      { value: "100%", label: t("hero.stats.satisfaction") },
      { value: "5 days", label: t("hero.stats.delivery") },
      { value: "24/7", label: t("hero.stats.support") },
    ],
    [t]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-16 pb-20 px-6 overflow-hidden"
    >
      {/* Animated Background Layer */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none"
        style={{ y: bgY }}
      />

      {/* Foreground content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="container mx-auto max-w-4xl text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {/* Section Label */}
          <motion.div
            className="section-label justify-center mb-6"
            variants={fadeInUpChildVariants}
          >
            {t("hero.label")}
          </motion.div>

          {/* Main Headline with Split Text */}
          <motion.div
            className="mb-6"
            variants={fadeInUpChildVariants}
            initial="hidden"
            whileInView="visible"
            viewport={whileInViewConfig}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <Typewriter
                text={t("hero.titlePrefix")}
                className="block"
                delay={0.1}
                speed={25}
              />
              <motion.div
                className="text-primary mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: (t("hero.titlePrefix").length * 0.025) + 0.2,
                  duration: 0.5,
                }}
                viewport={whileInViewConfig}
              >
                <Typewriter
                  text={t("hero.titleHighlight")}
                  className="block"
                  delay={(t("hero.titlePrefix").length * 0.025) + 0.3}
                  speed={25}
                />
              </motion.div>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeInUpChildVariants}
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={whileInViewConfig}
          >
            <motion.div
              variants={fadeInUpChildVariants}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <motion.div
                variants={magneticButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="hero" size="xl" asChild className="cursor-pointer">
                  <a href="#contact">
                    {t("hero.startProject")}
                    <motion.span
                      className="ml-2 h-5 w-5"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeInUpChildVariants}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <motion.div
                variants={magneticButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="hero-outline" size="xl" asChild className="cursor-pointer">
                  <a href="#pricing">{t("hero.viewPricing")}</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Statistics with Staggered Animation */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={whileInViewConfig}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUpChildVariants}
                whileInView={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <motion.div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
