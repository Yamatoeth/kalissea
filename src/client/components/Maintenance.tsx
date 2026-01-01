"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Maintenance = () => {
  const { t } = useTranslation();
  const mainPlanKeys = ["basic", "business", "premium"];
  const additionalKeys = ["unlimited", "hosting"];

  return (
    <section id="maintenance" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('maintenance.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('maintenance.title')}
        </h2>

        {/* Main Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainPlanKeys.map((key) => (
            <div
              key={key}
              className={`relative bg-card border rounded-xl p-6 card-hover flex flex-col h-full ${
                key === "business" ? "border-primary" : "border-border"
              }`}
            >
              {key === "business" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t('maintenance.common.popular')}
                  </span>
                </div>
              )}

              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-2">
                ★ {t(`maintenance.plans.${key}.tier`)}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t(`maintenance.plans.${key}.name`)}
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">{t(`maintenance.plans.${key}.price`)}</span>
                <span className="text-muted-foreground">{t(`maintenance.plans.${key}.period`)}</span>
              </div>

              <div className="space-y-3 mb-6">
                {(t(`maintenance.plans.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={key === "business" ? "hero" : "outline"}
                className="w-full mt-auto"
                asChild
              >
                <a href="#contact">{t('maintenance.common.getStarted')}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalKeys.map((key) => (
            <div key={key} className="bg-card border border-border rounded-xl p-6 card-hover flex flex-col h-full">
              <div className="text-xs text-primary font-medium tracking-wider uppercase mb-2">
                {t(`maintenance.additional.${key}.tier`)}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t(`maintenance.additional.${key}.name`)}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {t(`maintenance.additional.${key}.description`)}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">{t(`maintenance.additional.${key}.price`)}</span>
                <span className="text-muted-foreground">{t(`maintenance.additional.${key}.period`)}</span>
              </div>

              <div className="space-y-3 mb-6">
                {(t(`maintenance.additional.${key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {key === "hosting" && (
                <p className="text-xs text-muted-foreground/70 mb-4 italic">
                  Note: {t(`maintenance.additional.${key}.note`)}
                </p>
              )}

              <Button variant="outline" className="w-full mt-auto" asChild>
                <a href="#contact">{t('maintenance.common.viewDetails')}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Maintenance;
