"use client";
import Image from "next/image";
import teclis from "../assets/teclis.avif";
import terrathread from "../assets/terrathread.avif";
import glc from "../assets/glc.avif";
import villa88 from "../assets/villa88.avif";
import alplomberie from "../assets/alplomberie.avif";
import upArena from "../assets/project-wf.avif";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";
import ParallaxSection from "./ParallaxSection";

const Portfolio = () => {
  const t = useTranslations();

  const projects = [
    {
      key: "upArena",
      image: upArena,
      link: "https://www.uparena.io/",
      depth: 0,
    },
    {
      key: "villa88",
      image: villa88,
      link: "https://villa88.vercel.app/",
      depth: 1,
    },
    {
      key: "glc",
      image: glc,
      link: "https://yamatoeth.github.io/GlcSolutions/",
      depth: 2,
    },
    {
      key: "terrathread",
      image: terrathread,
      link: "https://terraandthread.vercel.app/",
      depth: 1,
    },
    {
      key: "teclis",
      image: teclis,
      link: "https://teclis-scientific.vercel.app/",
      depth: 2,
    },
    {
      key: "alplomberie",
      image: alplomberie,
      link: "https://al-plomberie.vercel.app/",
      depth: 1,
    },
  ];

  const featuredCaseStudies = [
    {
      key: "teclis",
      image: teclis,
      link: "https://teclis-scientific.vercel.app/",
    },
    {
      key: "upArena",
      image: upArena,
      link: "https://www.uparena.io/",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.label")}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.title")}
        </motion.h2>

        <motion.p
          className="max-w-3xl text-base md:text-lg text-muted-foreground mb-12 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.description")}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {projects.map((project, index) => (
            <ParallaxSection
              key={project.key}
              speed="slow"
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <motion.div
                className="group bg-card border border-border rounded-xl overflow-hidden card-hover relative"
                variants={fadeInUpChildVariants}
                whileHover={{
                  y: -12,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                transition={SPRING_CONFIG.smooth}
                style={{
                  zIndex: 10 - project.depth,
                }}
              >
              {/* Depth layer background */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-3/2 overflow-hidden"
              >
                <motion.div
                  className="relative w-full h-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={project.image}
                    alt={t(`portfolio.projects.${project.key}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Content layer with depth stagger */}
              <motion.div
                className="p-5 relative z-20"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  duration: 0.6,
                }}
                viewport={whileInViewConfig}
              >
                <motion.h3
                  className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {t(`portfolio.projects.${project.key}.title`)}
                </motion.h3>
                <motion.p className="text-sm text-primary mb-3">
                  {t(`portfolio.projects.${project.key}.category`)}
                </motion.p>
                <motion.p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {t(`portfolio.projects.${project.key}.summary`)}
                </motion.p>

                <div className="space-y-3 mb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                      {t("portfolio.labels.challenge")}
                    </p>
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {t(`portfolio.projects.${project.key}.challenge`)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      {t("portfolio.labels.scope")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(t.raw(`portfolio.projects.${project.key}.scope`) as string[]).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs text-foreground/90"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {t("portfolio.liveLabel")}
                  <span aria-hidden="true">↗</span>
                </a>
              </motion.div>
              </motion.div>
            </ParallaxSection>
          ))}
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          <div className="mb-8">
            <p className="section-label mb-4">{t("portfolio.featured.label")}</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("portfolio.featured.title")}
            </h3>
            <p className="max-w-3xl text-muted-foreground text-balance">
              {t("portfolio.featured.description")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredCaseStudies.map((project, index) => (
              <motion.article
                key={project.key}
                className="overflow-hidden rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={whileInViewConfig}
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={t(`portfolio.projects.${project.key}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/25 to-transparent" />
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-sm text-primary mb-2">
                    {t(`portfolio.projects.${project.key}.category`)}
                  </p>
                  <h4 className="text-2xl font-semibold text-foreground">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h4>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(`portfolio.projects.${project.key}.summary`)}
                  </p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                        {t("portfolio.featured.labels.context")}
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {t(`portfolio.featured.projects.${project.key}.context`)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                        {t("portfolio.featured.labels.approach")}
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {t(`portfolio.featured.projects.${project.key}.approach`)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                        {t("portfolio.featured.labels.value")}
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {t(`portfolio.featured.projects.${project.key}.value`)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t("portfolio.liveLabel")}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
