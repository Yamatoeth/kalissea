"use client";
import { Globe, ShoppingBag, Wrench, Search, Palette, Bot, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  cardHoverVariants,
  whileInViewConfig,
} from "@/lib/animations";
import FlipCard from "./FlipCard";

const Services = () => {
  const { t } = useTranslation();

  const servicesList = [
    { key: "creation", icon: Globe, path: "/services/website-creation" },
    { key: "ecommerce", icon: ShoppingBag, path: "/services/e-commerce" },
    { key: "maintenance", icon: Wrench, path: "/services/maintenance" },
    { key: "seo", icon: Search, path: "/services/seo-growth" },
    { key: "branding", icon: Palette, path: "/services/branding" },
    { key: "automation", icon: Bot, path: "/services/automation-ai" },
  ];

  return (
    <section id="services" className="pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={whileInViewConfig}
        >
          {t("services.label")}
        </motion.div>

        <motion.h2
          className="text-2xl md:text-4xl font-bold text-foreground mb-12 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("services.title")}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {servicesList.map(({ key, icon: Icon, path }, index) => (
            <motion.div
              key={key}
              variants={fadeInUpChildVariants}
              className="h-80"
            >
              <FlipCard
                frontContent={
                  <a href={path} className="block h-full">
                    <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col justify-between group hover:border-primary/50 transition-colors">
                      <div>
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4"
                          whileHover={{
                            backgroundColor: "var(--color-primary-10)",
                            scale: 1.1,
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>

                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {t(`services.items.${key}.title`)}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {t(`services.items.${key}.description`)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4">
                        <p className="text-primary font-semibold">
                          {t(`services.items.${key}.price`)}
                        </p>
                        <ArrowRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </a>
                }
                backContent={
                  <div className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {t(`services.items.${key}.title`)}
                      </h3>
                      <ul className="space-y-2">
                        {(() => {
                          const details = t(`services.items.${key}.details`, {
                            returnObjects: true,
                          }) as string[] | string;
                          const detailsList = Array.isArray(details)
                            ? details
                            : typeof details === "string"
                              ? details.split("|").map((d: string) => d.trim())
                              : [];
                          return detailsList.map((detail: string, idx: number) => (
                            <li
                              key={idx}
                              className="text-sm text-foreground flex items-start gap-2"
                            >
                              <span className="text-primary font-bold mt-0.5">•</span>
                              <span>{detail}</span>
                            </li>
                          ));
                        })()}
                      </ul>
                    </div>
                  </div>
                }
                className="w-full h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
