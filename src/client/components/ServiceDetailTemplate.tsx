"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Benefit {
  title: string;
  description: string;
}

interface Result {
  type: "image" | "video";
  url: string;
  caption: string;
}

interface ServiceDetailTemplateProps {
  serviceKey: string;
  benefits: Benefit[];
  results: Result[];
}

const ServiceDetailTemplate = ({ serviceKey, benefits, results }: ServiceDetailTemplateProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 relative">
        {/* Sticky Back Button */}
        <a
          href="/#services"
          className="fixed top-24 left-6 z-40 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium group px-3 py-1.5 bg-background/60 backdrop-blur-md rounded-full border border-border/40 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors bg-background">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="pr-2">{t('header.services')}</span>
        </a>


        {/* Hero Section */}

        <section className="px-6 mb-20 text-center">
          <div className="container mx-auto max-w-4xl">
            <div className="section-label justify-center mb-6">
              {t(`services.items.${serviceKey}.title`)}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t(`services.details.${serviceKey}.heroTitle`)}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t(`services.details.${serviceKey}.heroDescription`)}
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="/#contact">
                {t('hero.startProject')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {t(`services.details.benefitsTitle`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-xl card-hover">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Showcase Section */}
        <section className="px-6 py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {t(`services.details.resultsTitle`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((result, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
                  {result.type === "image" ? (
                    <img
                      src={result.url}
                      alt={result.caption}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <video
                      src={result.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-foreground font-medium">{result.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="container mx-auto max-w-4xl p-12 bg-primary/10 rounded-3xl border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(`services.details.${serviceKey}.ctaTitle`)}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {t(`services.details.${serviceKey}.ctaDescription`)}
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="/#contact">
                {t('hero.startProject')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailTemplate;
