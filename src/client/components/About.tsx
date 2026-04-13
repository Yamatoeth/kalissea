"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpChildVariants, staggerContainerVariants, whileInViewConfig } from "@/lib/animations";

const About = () => {
  const t = useTranslations();
  const highlights = t.raw("about.highlights") as string[];

  return (
    <section id="about" className="bg-card/40 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]"
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
          variants={staggerContainerVariants}
        >
          <motion.div variants={fadeInUpChildVariants}>
            <div className="section-label mb-4">{t("about.label")}</div>
            <h2 className="max-w-3xl text-3xl font-semibold text-foreground text-balance md:text-4xl">
              {t("about.title")}
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>{t("about.paragraphs.first")}</p>
              <p>{t("about.paragraphs.second")}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 md:p-8"
            variants={fadeInUpChildVariants}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />
            <p className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              {t("about.quote")}
            </p>

            <div className="mt-8 border-t border-white/8 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
                {t("about.panelTitle")}
              </h3>
              <ul className="mt-5 space-y-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/88 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
