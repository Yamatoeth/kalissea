"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link"; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Benefit {
  title: string;
  description: string;
}

export interface Result {
  type: "image" | "video";
  url: string;
  caption: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceDetailTemplateProps {
  // Content Props
  title: string; 
  heroTitle: string;
  heroDescription: string;
  benefitsTitle: string;
  benefits: Benefit[];
  resultsTitle: string;
  results: Result[];
  ctaTitle: string;
  ctaDescription: string;
  
  // New SEO sections
  longDescription?: string;
  featuresTitle?: string;
  featuresDescription?: string;
  features?: Feature[];
  faqTitle?: string;
  faq?: FAQItem[];

  // UI Labels
  backLabel: string;
  startProjectLabel: string;

  children?: React.ReactNode;
}

const ServiceDetailTemplate = ({
  title,
  heroTitle,
  heroDescription,
  longDescription,
  benefitsTitle,
  benefits,
  featuresTitle,
  featuresDescription,
  features,
  resultsTitle,
  results,
  faqTitle,
  faq,
  ctaTitle,
  ctaDescription,
  backLabel,
  startProjectLabel,
  children
}: ServiceDetailTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20 relative">
        {/* Sticky Back Button */}
        <Link
          href="/#services"
          className="fixed top-24 left-6 z-40 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium group px-3 py-1.5 bg-background/60 backdrop-blur-md rounded-full border border-border/40 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors bg-background">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="pr-2">{backLabel}</span>
        </Link>


        {/* Hero Section */}

        <section className="px-6 mb-20 text-center">
          <div className="container mx-auto max-w-4xl">
            <div className="section-label justify-center mb-6">
              {title}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {heroDescription}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link href="/#contact">
                {startProjectLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {benefitsTitle}
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
              {resultsTitle}
            </h2>
            <div className={`grid gap-8 ${results.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
              {results.map((result, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg border border-border bg-card">
                  {result.type === "image" ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={result.url}
                        alt={result.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
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

        {/* Long Description Section - SEO Content */}
        {longDescription && (
           <section className="px-6 py-20 bg-background">
             <div className="container mx-auto max-w-3xl">
               <div className="prose prose-lg dark:prose-invert mx-auto">
                 <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                   {longDescription}
                 </div>
               </div>
             </div>
           </section>
        )}

        {/* Features Grid Section */}
        {features && features.length > 0 && (
          <section className="px-6 py-20 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {featuresTitle || "Features"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {featuresDescription}
                </p>
              </div>
             
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="p-6 bg-card border border-border rounded-xl">
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faq && faq.length > 0 && (
          <section className="px-6 py-20 bg-background">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                {faqTitle || "FAQ"}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {children}

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="container mx-auto max-w-4xl p-12 bg-primary/10 rounded-xl border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {ctaTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {ctaDescription}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link href="/#contact">
                {startProjectLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailTemplate;
