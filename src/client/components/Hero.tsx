"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { fadeInUpChildVariants, staggerContainerVariants, whileInViewConfig } from "@/lib/animations";

const Hero = ({ t }: { t: (key: string) => string }) => {
  const stats = [
    { value: "12+", label: t("hero.stats.projects") },
    { value: "5", label: t("hero.stats.sectors") },
    { value: "100%", label: t("hero.stats.responsive") },
    { value: "Custom", label: t("hero.stats.systems") },
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,182,65,0.16),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-10 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div
        className="container mx-auto max-w-6xl"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={whileInViewConfig}
      >
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div>
            <motion.div className="section-label mb-6 text-balance" variants={fadeInUpChildVariants}>
              {t("hero.label")}
            </motion.div>

            <motion.h1
              className="max-w-4xl text-4xl font-semibold leading-[0.98] text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl"
              variants={fadeInUpChildVariants}
            >
              <span className="block">{t("hero.titlePrefix").trim()}</span>
              <span className="mt-3 block font-serif text-primary">{t("hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              variants={fadeInUpChildVariants}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeInUpChildVariants}
            >
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <a href="#contact" className="justify-center">
                  {t("hero.startProject")}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
                <a href="#portfolio" className="justify-center">
                  {t("hero.viewPricing")}
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.aside
            className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8"
            variants={fadeInUpChildVariants}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />

            <p className="text-[11px] uppercase tracking-[0.24em] text-primary/80">{t("hero.panelLabel")}</p>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{t("hero.panelText")}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
