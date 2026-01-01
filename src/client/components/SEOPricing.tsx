"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const SEOPricing = () => {
  const { t } = useTranslation();

  const monthlyKeys = ["local", "boost", "pro"];
  const annualKeys = ["local", "national"];

  return (
    <section id="seo-pricing" className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('seoPricing.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('seoPricing.title')}
        </h2>

        {/* Monthly Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {monthlyKeys.map((key, index) => (
            <div
              key={key}
              className={`relative bg-card border rounded-xl p-6 card-hover flex flex-col h-full ${
                key === "boost" ? "border-primary" : "border-border"
              }`}
            >
              {key === "boost" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.common.popular')}
                  </span>
                </div>
              )}

              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-2">
                ★ {t(`seoPricing.monthlyPlans.${key}.name`)}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t(`seoPricing.monthlyPlans.${key}.name`)}
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">
                   {/* Prices hardcoded for now or I can pull from translation if I added them */}
                   {key === "local" ? "$149" : key === "boost" ? "$299" : "$449"}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>

              <div className="space-y-3 mb-6">
                {(t(`seoPricing.monthlyPlans.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={key === "boost" ? "hero" : "outline"}
                className="w-full mt-auto"
                asChild
              >
                <a href="#contact">{t('seoPricing.common.getStarted')}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Annual Plans */}
        <h3 className="text-2xl font-bold text-foreground mb-6">{t('seoPricing.annualPlansTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {annualKeys.map((key, index) => (
            <div key={key} className="bg-card border border-border rounded-xl p-6 card-hover flex flex-col h-full">
              <div className="text-xs text-primary font-medium tracking-wider uppercase mb-2">
                {t(`seoPricing.annualPlans.${key}.name`)}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t(`seoPricing.annualPlans.${key}.name`)}
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {key === "local" ? "$1,499" : "$2,999"}
                </span>
                <span className="text-muted-foreground">/year</span>
              </div>

              <div className="space-y-3 mb-6">
                {(t(`seoPricing.annualPlans.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-auto" asChild>
                <a href="#contact">{t('seoPricing.common.viewDetails')}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOPricing;
