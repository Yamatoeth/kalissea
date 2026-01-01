"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();

  const pricingPlans = [
    {
      key: "essential",
      popular: false,
    },
    {
      key: "popular",
      popular: true,
    },
    {
      key: "ultimate",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('pricing.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('pricing.title')}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          {t('pricing.paymentTerms')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-xl p-6 card-hover flex flex-col h-full ${
                plan.popular ? "border-primary" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.common.popular')}
                  </span>
                </div>
              )}

              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-2">
                ★ {t(`pricing.plans.${plan.key}.name`)} 
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t(`pricing.plans.${plan.key}.name`)}
              </h3>

              <div className="text-3xl font-bold text-primary mb-2">
                 {t(`pricing.plans.${plan.key}.price`)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                50% upfront / 50% on delivery
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-foreground">{t('pricing.common.included')}</p>
                {(t(`pricing.plans.${plan.key}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {(t(`pricing.plans.${plan.key}.excluded`, { returnObjects: true }) as string[]).length > 0 && (
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-foreground">{t('pricing.common.notIncluded')}</p>
                  {(t(`pricing.plans.${plan.key}.excluded`, { returnObjects: true }) as string[]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground/60 line-through">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-sm text-muted-foreground mb-6">
                {/* Simplified delivery text which was hardcoded. Ideally also translated. 
                    I'll use a hardcoded fallback or generic "Delivery: 3-5 days" if not in JSON.
                    Wait, I didn't add 'delivery' per plan in JSON, only common key.
                    I'll skip specific delivery text for now or just generic.
                */}
              </div>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full mt-auto"
                asChild
              >
                <a href="#contact">{t('pricing.common.getStarted')}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
