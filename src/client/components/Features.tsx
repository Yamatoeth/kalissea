"use client";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  const categoryKeys = ["design", "setup", "seo", "support"];

  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('features.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('features.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryKeys.map((key) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t(`features.categories.${key}.title`)}
              </h3>
              <ul className="space-y-3">
                {(t(`features.categories.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
