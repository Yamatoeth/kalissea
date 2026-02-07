"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
} from "@/lib/animations";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Problem = () => {
  const { t } = useTranslation();

  const problems = t("problem.problems", { returnObjects: true }) as string[];
  const solutions = t("problem.solutions", { returnObjects: true }) as string[];

  return (
    <section id="problem" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          <motion.div className="section-label justify-center mb-4">
            {t("problem.label")}
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("problem.title")}
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("problem.subtitle")}
          </motion.p>
        </motion.div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problems Column */}
          <motion.div
            className="bg-card border border-border rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={whileInViewConfig}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("problem.withoutUs")}
              </h3>
            </div>

            <motion.ul
              className="space-y-4"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={whileInViewConfig}
            >
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUpChildVariants}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <XCircle className="w-5 h-5 text-destructive/60 shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={whileInViewConfig}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("problem.withUs")}
              </h3>
            </div>

            <motion.ul
              className="space-y-4"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={whileInViewConfig}
            >
              {solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUpChildVariants}
                  className="flex items-start gap-3 text-foreground"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{solution}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={whileInViewConfig}
        >
          <p className="text-lg text-muted-foreground mb-6">
            {t("problem.ctaText")}
          </p>
          <Button variant="hero" size="lg" asChild className="cursor-pointer">
            <a href="#contact">
              {t("problem.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
