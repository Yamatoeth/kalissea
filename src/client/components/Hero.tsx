"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="section-label justify-center mb-6">
          {t('hero.label')}
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
          {t('hero.titlePrefix')}
          <span className="text-primary">{t('hero.titleHighlight')}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" asChild>
            <a href="#contact">
              {t('hero.startProject')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <a href="#pricing">
              {t('hero.viewPricing')}
            </a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: t('hero.stats.projects') },
            { value: "100%", label: t('hero.stats.satisfaction') },
            { value: "5 days", label: t('hero.stats.delivery') },
            { value: "24/7", label: t('hero.stats.support') },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
