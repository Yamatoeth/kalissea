"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const SEOPricing = () => {
  const { t } = useTranslation();

  const planKeys = ["audit", "monthly"];

  return (
    <section id="seo-pricing" className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('seoPricing.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('seoPricing.title')}
        </h2>

        {/* SEO Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {planKeys.map((key) => (
            <div
              key={key}
              className={`relative bg-card border rounded-xl p-8 card-hover flex flex-col h-full ${
                key === "audit" ? "border-primary" : "border-border"
              }`}
            >
              {key === "audit" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.common.popular')}
                  </span>
                </div>
              )}

              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-2">
                ★ {t(`seoPricing.plans.${key}.name`)}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t(`seoPricing.plans.${key}.name`)}
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-primary">
                   {t(`seoPricing.plans.${key}.price`)}
                </span>
                <span className="text-muted-foreground">/ {t(`seoPricing.plans.${key}.period`)}</span>
              </div>

              <div className="space-y-4 mb-8">
                {(t(`seoPricing.plans.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-base text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={key === "audit" ? "hero" : "outline"}
                className="w-full mt-auto"
                asChild
              >
                <a href="#contact">{t('seoPricing.common.getStarted')}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOPricing;
