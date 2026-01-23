"use client";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";

const Features = () => {
  const { t } = useTranslation();
  const categoryKeys = ["design", "setup", "seo", "support"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
      },
    }),
    hover: {
      x: 8,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <section className="py-24 px-6 bg-card/50 relative overflow-hidden">
      {/* Animated background accents */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
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
          {t("features.label")}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("features.title")}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {categoryKeys.map((key, categoryIndex) => (
            <motion.div
              key={key}
              variants={categoryVariants}
              whileHover={{
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {/* Category Title */}
              <motion.h3
                className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"
                whileHover={{ x: 2 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    delay: categoryIndex * 0.15,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                {t(`features.categories.${key}.title`)}
              </motion.h3>

              {/* Features List with orchestrated stagger */}
              <motion.ul className="space-y-3">
                {(
                  t(`features.categories.${key}.features`, {
                    returnObjects: true,
                  }) as string[]
                ).map((feature, featureIdx) => (
                  <motion.li
                    key={featureIdx}
                    className="flex items-start gap-3 group"
                    variants={featureItemVariants}
                    custom={featureIdx}
                    whileHover="hover"
                    initial="hidden"
                    whileInView="visible"
                    viewport={whileInViewConfig}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-primary flex items-center justify-center mt-1 shrink-0 flex-none"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(var(--color-primary), 0.5)",
                          "0 0 0 8px rgba(var(--color-primary), 0)",
                        ],
                      }}
                      transition={{
                        delay: featureIdx * 0.1 + categoryIndex * 0.2,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        transition={SPRING_CONFIG.tight}
                      >
                        <Check className="w-3 h-3 text-background" />
                      </motion.div>
                    </motion.div>
                    <motion.span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {feature}
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
