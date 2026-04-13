"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpChildVariants, staggerContainerVariants, whileInViewConfig } from "@/lib/animations";

const Process = () => {
  const t = useTranslations();
  const stepKeys = ["brief", "design", "build", "refine"];

  return (
    <section id="process" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-6 md:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
          variants={staggerContainerVariants}
        >
          <motion.div className="mb-10 max-w-3xl" variants={fadeInUpChildVariants}>
            <div className="section-label mb-4">{t("process.label")}</div>
            <h2 className="text-3xl font-semibold text-foreground text-balance md:text-4xl">{t("process.title")}</h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-4">
            {stepKeys.map((key, index) => (
              <motion.div
                key={key}
                className="relative rounded-[1.5rem] border border-white/8 bg-card/80 p-6"
                variants={fadeInUpChildVariants}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-primary/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-14 bg-linear-to-r from-primary/60 to-transparent" />
                </div>

                <h3 className="text-xl font-semibold text-foreground">{t(`process.steps.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`process.steps.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
