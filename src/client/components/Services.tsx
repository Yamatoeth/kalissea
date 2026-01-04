"use client";
import { Globe, ShoppingBag, Wrench, Search, Palette, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";

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
        <div className="section-label mb-4">{t('services.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map(({ key, icon: Icon, path }) => (
            <a
              key={key}
              href={path}
              className="bg-card border border-border rounded-xl p-6 card-hover group block transition-all hover:border-primary/50"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                {t(`services.items.${key}.description`)}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-primary font-semibold">{t(`services.items.${key}.price`)}</p>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
                  {t('seoPricing.common.viewDetails')}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );

};

export default Services;
