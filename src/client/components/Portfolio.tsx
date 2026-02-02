"use client";
import Image from "next/image";
import atelierParisien from "../assets/atelierparisien.avif";
import teclis from "../assets/teclis.avif";
import terrathread from "../assets/terrathread.avif";
import glc from "../assets/glc.avif";
import villa88 from "../assets/villa88.avif";
import burkett from "../assets/burkett.avif";
import kitchen from "../assets/kitchen.png";
import mieng from "../assets/mieng.png";
import alplomberie from "../assets/alplomberie.png";
import hairsalon from "../assets/hairsalon.png";
import viced from "../assets/viced.png";
import music from "../assets/music.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";
import ParallaxSection from "./ParallaxSection";

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Atelier Parisien",
      categoryKey: "restaurant",
      image: atelierParisien,
      link: "https://latelier-parisien.vercel.app/",
      depth: 0,
    },
    {
      title: "Villa88",
      categoryKey: "hotel",
      image: villa88,
      link: "https://villa88.vercel.app/",
      depth: 1,
    },
    {
      title: "GLC",
      categoryKey: "company",
      image: glc,
      link: "https://yamatoeth.github.io/GlcSolutions/",
      depth: 2,
    },
    {
      title: "Terrathread",
      categoryKey: "personal",
      image: terrathread,
      link: "https://terraandthread.vercel.app/",
      depth: 1,
    },
    // {
    //   title: "Kalissea",
    //   categoryKey: "onlineshop",
    //   image: kalissea,
    //   link: "https://kalissea.com/",
    //   depth: 0,
    // },
    {
      title: "Teclis Scientific",
      categoryKey: "business",
      image: teclis,
      link: "https://teclis-scientific.vercel.app/",
      depth: 2,
    },
    {
      title: "Burkett",
      categoryKey: "business",
      image: burkett,
      link: "https://yamatoeth.github.io/Burkett-Co/",
      depth: 1,
    },
    {
      title: "Vi-Nha Kitchen",
      categoryKey: "restaurant",
      image: kitchen,
      link: "https://vi-nha-kitchen.vercel.app/",
      depth: 0,
    },
    {
      title: "Mieng Restaurant",
      categoryKey: "restaurant",
      image: mieng,
      link: "https://mieng-restaurant.vercel.app/",
      depth: 2,
    },
    {
      title: "AL Plomberie",
      categoryKey: "business",
      image: alplomberie,
      link: "https://al-plomberie.vercel.app/",
      depth: 1,
    },
    {
      title: "Salon de Coiffure",
      categoryKey: "business",
      image: hairsalon,
      link: "https://hairsalon-website.vercel.app/",
      depth: 2,
    },
    {
      title: "Viced",
      categoryKey: "business",
      image: viced,
      link: "https://viced.vercel.app/",
      depth: 1,
    },
    {
      title : "BlueInstruments",
      categoryKey : "business",
      image : music,
      link : "https://blue-instruments.vercel.app",
      depth : 2
    }
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {projects.map((project, index) => (
            <ParallaxSection
              key={index}
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
                    alt={project.title}
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
                className="p-4 relative z-20"
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
                  {project.title}
                </motion.h3>
                <motion.p className="text-sm text-muted-foreground">
                  {t(`portfolio.categories.${project.categoryKey}`)}
                </motion.p>
              </motion.div>
              </motion.div>
            </ParallaxSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
