"use client";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('testimonials.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('testimonials.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(t('testimonials.items', { returnObjects: true }) as any[]).map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 card-hover flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <blockquote className="text-foreground/90 text-sm leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-primary font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
