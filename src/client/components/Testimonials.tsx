"use client";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeInUpChildVariants,
  whileInViewConfig,
  SPRING_CONFIG,
} from "@/lib/animations";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = t("testimonials.items", {
    returnObjects: true,
  }) as Testimonial[];

  return (
    <section id="testimonials" className="py-24 px-6 bg-card/50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
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
          {t("testimonials.label")}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={whileInViewConfig}
        >
          {t("testimonials.title")}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={whileInViewConfig}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 card-hover flex flex-col h-full relative overflow-hidden group"
              variants={fadeInUpChildVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                borderColor: "var(--color-primary)",
              }}
              transition={SPRING_CONFIG.smooth}
            >
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* Star Rating */}
              <motion.div
                className="flex gap-1 mb-4 relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  duration: 0.5,
                }}
                viewport={whileInViewConfig}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      delay: i * 0.1 + index * 0.15,
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                className="text-foreground/90 text-sm leading-relaxed mb-6 italic relative z-10"
                whileHover={{ x: 4 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>

              {/* Author Info */}
              <motion.div
                className="flex items-center gap-3 pt-4 border-t border-border mt-auto relative z-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.6,
                }}
                viewport={whileInViewConfig}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--color-primary)",
                  }}
                  transition={SPRING_CONFIG.tight}
                >
                  <span className="text-primary font-semibold text-sm group-hover:text-background">
                    {testimonial.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <motion.p
                    className="text-primary font-medium text-sm"
                    whileHover={{ x: 2 }}
                  >
                    {testimonial.name}
                  </motion.p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
