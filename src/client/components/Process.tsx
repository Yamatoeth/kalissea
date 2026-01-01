"use client";
import { useTranslation } from "react-i18next";

const Process = () => {
  const { t } = useTranslation();
  const stepKeys = ["brief", "design", "development", "delivery", "followup"];

  return (
    <section id="process" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="section-label mb-4">{t('process.label')}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          {t('process.title')}
        </h2>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {stepKeys.map((key, index) => (
              <div key={key} className="relative">
                <div className="flex items-center gap-4 lg:flex-col lg:text-center">
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 z-10 relative">
                    <span className="text-primary font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="lg:mt-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {t(`process.steps.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`process.steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
