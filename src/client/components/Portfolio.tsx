"use client";
import Image from "next/image";
import teclis from "../assets/teclis.webp";
import terrathread from "../assets/terrathread.webp";
import glc from "../assets/glc.webp";
import villa88 from "../assets/villa88.webp";
import alplomberie from "../assets/alplomberie.webp";
import upArena from "../assets/project-wf.webp";
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
    <section id="portfolio" className="relative overflow-hidden px-6 py-28 md:py-32">
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

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="section-label mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.label")}
        </motion.div>

        <motion.h2
          className="mb-6 max-w-4xl text-3xl font-semibold text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.title")}
        </motion.h2>

        <motion.p
          className="mb-14 max-w-3xl text-base text-balance text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={whileInViewConfig}
        >
          {t("portfolio.description")}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                className="group relative overflow-hidden rounded-[1.4rem] border border-border bg-card card-hover"
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
                className="relative z-20 p-6"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  duration: 0.6,
                }}
                viewport={whileInViewConfig}
              >
                <motion.h3
                  className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
                  whileHover={{ x: 4 }}
                >
                  {t(`portfolio.projects.${project.key}.title`)}
                </motion.h3>
                <motion.p className="mb-4 text-sm text-primary">
                  {t(`portfolio.projects.${project.key}.category`)}
                </motion.p>
                <motion.p className="mb-5 text-sm leading-relaxed text-foreground/80">
                  {t(`portfolio.projects.${project.key}.summary`)}
                </motion.p>

                <div className="mb-6 space-y-4">
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
          className="mt-24 border-t border-white/8 pt-16 md:mt-28 md:pt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          <div className="mb-10">
            <p className="section-label mb-5">{t("portfolio.featured.label")}</p>
            <h3 className="mb-4 max-w-3xl text-2xl font-semibold text-foreground md:text-3xl">
              {t("portfolio.featured.title")}
            </h3>
            <p className="max-w-3xl text-balance text-muted-foreground">
              {t("portfolio.featured.description")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredCaseStudies.map((project, index) => (
              <motion.article
                key={project.key}
                className="overflow-hidden rounded-[1.75rem] border border-border bg-card"
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
                  <p className="mb-3 text-sm text-primary">
                    {t(`portfolio.projects.${project.key}.category`)}
                  </p>
                  <h4 className="text-2xl font-semibold text-foreground">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t(`portfolio.projects.${project.key}.summary`)}
                  </p>

                  <div className="mt-9 space-y-7">
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
