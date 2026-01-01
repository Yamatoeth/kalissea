"use client";
import Image from "next/image";
import atelierParisien from "../assets/atelierparisien.png";
import kalissea from "../assets/kalissea.png";
import teclis from "../assets/teclis.png";
import terrathread from "../assets/terrathread.png";
import glc from "../assets/glc.png";
import villa88 from "../assets/villa88.png";
import { useTranslation } from "react-i18next";

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Atelier Parisien",
      categoryKey: "restaurant",
      image: atelierParisien,
      link: "https://latelier-parisien.vercel.app/",
    },
    {
      title: "Villa88",
      categoryKey: "hotel",
      image: villa88,
      link: "https://villa88.vercel.app/",
    },
    {
      title: "GLC",
      categoryKey: "company",
      image: glc,
      link: "#",
    },
    {
      title: "Terrathread",
      categoryKey: "personal",
      image: terrathread,
      link: "https://terraandthread.vercel.app/",
    },
    {
      title: "Kalissea",
      categoryKey: "onlineshop",
      image: kalissea,
      link: "https://kalissea.com/",
    },
    {
      title: "Teclis",
      categoryKey: "business",
      image: teclis,
      link: "https://teclis-scientific.vercel.app/",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('portfolio.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('portfolio.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl overflow-hidden card-hover"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[3/2] overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`portfolio.categories.${project.categoryKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
