"use client";

import { ArrowRight, Bot, Globe, LayoutTemplate, Search, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpChildVariants, staggerContainerVariants, whileInViewConfig } from "@/lib/animations";

const Services = () => {
  const t = useTranslations();

  const servicesList = [
    { key: "creation", icon: Globe, path: "/services/website-creation" },
    { key: "ecommerce", icon: ShoppingBag, path: "/services/e-commerce" },
    { key: "seo", icon: Search, path: "/services/seo-growth" },
    { key: "automation", icon: Bot, path: "/services/custom-tools" },
    { key: "branding", icon: LayoutTemplate, path: "/services/branding" },
  ];

  return (
    <section id="services" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid gap-10 border-t border-white/8 pt-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
          variants={staggerContainerVariants}
        >
          <motion.div variants={fadeInUpChildVariants}>
            <div className="section-label mb-4">{t("services.label")}</div>
            <h2 className="text-3xl font-semibold text-foreground text-balance md:text-4xl">{t("services.title")}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("services.intro")}
            </p>
          </motion.div>

          <motion.div className="grid gap-5 md:grid-cols-2" variants={staggerContainerVariants}>
            {servicesList.map(({ key, icon: Icon, path }, index) => {
              const details = t.raw(`services.items.${key}.details`) as string[];

              return (
                <motion.a
                  key={key}
                  href={path}
                  className={`group flex min-h-[320px] flex-col rounded-[1.5rem] border border-white/8 bg-card/70 p-6 transition-colors duration-200 hover:border-primary/35 hover:bg-card ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                  variants={fadeInUpChildVariants}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary/90">
                      {t(`services.items.${key}.meta`)}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-foreground">{t(`services.items.${key}.title`)}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {t(`services.items.${key}.description`)}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {details.slice(0, 4).map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-foreground/88">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8 text-sm font-medium text-primary">
                    <span className="inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1">
                      {t("services.viewService")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
