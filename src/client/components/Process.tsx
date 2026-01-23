"use client";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";

const Process = () => {
  const { t } = useTranslation();
  const stepKeys = ["brief", "design", "development", "delivery", "followup"];

  const stepCircleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
      },
    }),
  };

  return (
    <section id="process" className="py-24 px-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
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
          {t("process.label")}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("process.title")}
        </motion.h2>

        <div className="relative">
          {/* Animated Connection Line */}
          <motion.div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              viewport={whileInViewConfig}
              style={{ opacity: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={whileInViewConfig}
          >
            {stepKeys.map((key, index) => (
              <motion.div
                key={key}
                className="relative"
                variants={fadeInUpChildVariants}
              >
                <div className="flex items-center gap-4 lg:flex-col lg:text-center">
                  {/* Step Circle */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 z-10 relative"
                    custom={index}
                    variants={stepCircleVariants}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 20px rgba(var(--color-primary), 0.4)",
                    }}
                    transition={SPRING_CONFIG.smooth}
                  >
                    {/* Pulsing background on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />

                    <motion.span
                      className="text-primary font-bold relative z-10"
                      animate={{
                        color: [
                          "var(--color-primary)",
                          "var(--color-primary)",
                          "var(--color-primary)",
                        ],
                      }}
                      transition={{
                        delay: index * 0.15,
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </motion.div>

                  {/* Step Content */}
                  <motion.div
                    className="lg:mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.08 + 0.3,
                      duration: 0.5,
                    }}
                    viewport={whileInViewConfig}
                    whileHover={{ x: 4 }}
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {t(`process.steps.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`process.steps.${key}.description`)}
                    </p>
                  </motion.div>
                </div>

                {/* Arrow Indicator (hidden on mobile) */}
                {index < stepKeys.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-8 -right-4 text-primary/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={whileInViewConfig}
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      delay: index * 0.15 + 0.7,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
