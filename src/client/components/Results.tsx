"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
} from "@/lib/animations";
import { TrendingUp, Clock, Phone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const { t } = useTranslation();

  const beforeAfterStats = [
    {
      icon: Phone,
      before: t("results.stats.calls.before"),
      after: t("results.stats.calls.after"),
      label: t("results.stats.calls.label"),
    },
    {
      icon: Calendar,
      before: t("results.stats.bookings.before"),
      after: t("results.stats.bookings.after"),
      label: t("results.stats.bookings.label"),
    },
    {
      icon: Clock,
      before: t("results.stats.prospecting.before"),
      after: t("results.stats.prospecting.after"),
      label: t("results.stats.prospecting.label"),
    },
    {
      icon: TrendingUp,
      before: t("results.stats.revenue.before"),
      after: t("results.stats.revenue.after"),
      label: t("results.stats.revenue.label"),
    },
  ];

  return (
    <section id="results" className="py-24 px-6 bg-card/50 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          {t("results.label")}
        </motion.div>

        <motion.h2
          className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("results.title")}
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={whileInViewConfig}
        >
          {t("results.subtitle")}
        </motion.p>

        {/* Before/After Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {beforeAfterStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUpChildVariants}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </div>

              {/* Before */}
              <div className="mb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
                  {t("results.before")}
                </span>
                <div className="text-xl font-semibold text-muted-foreground line-through opacity-60">
                  {stat.before}
                </div>
              </div>

              {/* After */}
              <div>
                <span className="text-xs uppercase tracking-wider text-primary">
                  {t("results.after")}
                </span>
                <div className="text-2xl font-bold text-primary">
                  {stat.after}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Quote */}
        <motion.div
          className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <blockquote className="text-lg md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
                "{t("results.testimonial.quote")}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {t("results.testimonial.initials")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {t("results.testimonial.name")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("results.testimonial.role")}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button variant="hero" size="lg" asChild className="cursor-pointer">
                <a href="#contact">
                  {t("results.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
