"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";
import FlipCard from "./FlipCard";
import Image from "next/image";

const Pricing = () => {
  const { t } = useTranslation();

  const pricingPlans = [
    {
      key: "essential",
      popular: false,
      image: "/images/results/terrathread.avif",
      alt: "Terra Thread Website",
    },
    {
      key: "popular",
      popular: true,
      image: "/images/results/kalissea.avif",
      alt: "Kalissea Website",
    },
    {
      key: "ultimate",
      popular: false,
      image: "/images/results/villa88.avif",
      alt: "Villa88 Website",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
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
          {t("pricing.label")}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("pricing.title")}
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={whileInViewConfig}
        >
          {t("pricing.paymentTerms")}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUpChildVariants}
              className="h-96"
            >
              <FlipCard
                frontContent={
                  <div
                    className={`relative bg-card border rounded-xl p-6 h-full flex flex-col justify-between transition-colors ${
                      plan.popular ? "border-primary" : "border-border"
                    }`}
                  >
                    {/* Portfolio Image */}
                    <div className="mb-4 rounded-lg overflow-hidden h-32 w-full relative">
                      <Image
                        src={plan.image}
                        alt={plan.alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Popular Badge */}
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <motion.span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                          {t("pricing.common.popular")}
                        </motion.span>
                      </motion.div>
                    )}

                    <div>
                      {/* Plan Badge */}
                      <motion.div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-2">
                        ★ {t(`pricing.plans.${plan.key}.name`)}
                      </motion.div>

                      {/* Plan Name */}
                      <motion.h3 className="text-xl font-bold text-foreground mb-4">
                        {t(`pricing.plans.${plan.key}.name`)}
                      </motion.h3>

                      {/* Price */}
                      <motion.div className="text-3xl font-bold text-primary mb-2">
                        {t(`pricing.plans.${plan.key}.price`)}
                      </motion.div>

                      <motion.p className="text-sm text-muted-foreground mb-4">
                        Payment after shipping
                      </motion.p>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      {t("pricing.flipHint")}
                    </p>
                  </div>
                }
                backContent={
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-6 h-full flex flex-col justify-between overflow-y-auto">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm">
                        {t("pricing.common.included")}
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {(
                          t(`pricing.plans.${plan.key}.features`, {
                            returnObjects: true,
                          }) as string[]
                        ).map((feature, idx) => (
                          <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Excluded Features */}
                      {(
                        t(`pricing.plans.${plan.key}.excluded`, {
                          returnObjects: true,
                        }) as string[]
                      ).length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-sm opacity-70">
                            {t("pricing.common.notIncluded")}
                          </h4>
                          <ul className="space-y-1 mb-4">
                            {(
                              t(`pricing.plans.${plan.key}.excluded`, {
                                returnObjects: true,
                              }) as string[]
                            ).map((item, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-muted-foreground/60 line-through flex items-start gap-2"
                              >
                                <span className="mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {t("pricing.flipBack")}
                    </p>
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

export default Pricing;
