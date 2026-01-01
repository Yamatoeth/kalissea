"use client";
import { Globe, ShoppingBag, Wrench, Search, Palette, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const servicesList = [
    { key: "creation", icon: Globe },
    { key: "ecommerce", icon: ShoppingBag },
    { key: "maintenance", icon: Wrench },
    { key: "seo", icon: Search },
    { key: "branding", icon: Palette },
    { key: "automation", icon: Bot },
  ];

  return (
    <section id="services" className="pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('services.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {t(`services.items.${key}.description`)}
              </p>
              <p className="text-primary font-semibold">{t(`services.items.${key}.price`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
