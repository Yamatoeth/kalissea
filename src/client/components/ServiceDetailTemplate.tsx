"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

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

export interface RelatedService {
  key: string;
  title: string;
  path: string;
}

export interface ServiceDetailTemplateProps {
  title: string;
  heroTitle: string;
  heroDescription: string;
  longDescription?: string;
  includesTitle: string;
  includes: Feature[];
  approachTitle: string;
  approach: Benefit[];
  fitTitle: string;
  fitDescription: string;
  fitGoodTitle: string;
  fitGood: string[];
  fitNotTitle: string;
  fitNot: string[];
  relatedServicesTitle?: string;
  relatedServices?: RelatedService[];
  results?: Result[];
  ctaTitle: string;
  ctaDescription: string;
  backLabel: string;
  startProjectLabel: string;
  viewWorkLabel: string;
  learnMoreLabel: string;
}

const ServiceDetailTemplate = ({
  title,
  heroTitle,
  heroDescription,
  longDescription,
  includesTitle,
  includes,
  approachTitle,
  approach,
  fitTitle,
  fitDescription,
  fitGoodTitle,
  fitGood,
  fitNotTitle,
  fitNot,
  relatedServicesTitle,
  relatedServices,
  results = [],
  ctaTitle,
  ctaDescription,
  backLabel,
  startProjectLabel,
  viewWorkLabel,
  learnMoreLabel,
}: ServiceDetailTemplateProps) => {
  const leadVisual = results[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative pb-24 pt-24">
        <section className="px-6 pb-24 pt-10 md:pb-28">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/#services"
              className="mb-12 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{backLabel}</span>
            </Link>

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              <div>
                <div className="section-label mb-6">{title}</div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                  {heroTitle}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {heroDescription}
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/#contact" className="justify-center">
                      {startProjectLabel}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/#portfolio" className="justify-center">
                      {viewWorkLabel}
                    </Link>
                  </Button>
                </div>
              </div>

              {leadVisual && (
                <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-card/60 shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
                  {leadVisual.type === "image" ? (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={leadVisual.url}
                        alt={leadVisual.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/15 to-transparent" />
                    </div>
                  ) : (
                    <video
                      src={leadVisual.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <div className="border-t border-white/8 px-6 py-4 text-sm text-muted-foreground">{leadVisual.caption}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-card/35 px-6 py-24">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
              <div>
                {longDescription && (
                  <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">{longDescription}</p>
                )}
              </div>

              <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{approachTitle}</p>
                <div className="mt-5 space-y-5">
                  {approach.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{includesTitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {includes.map((feature) => (
                <div key={feature.title} className="rounded-[1.5rem] border border-white/8 bg-card p-7">
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card/35 px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{fitTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{fitDescription}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/8 bg-card p-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">{fitGoodTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {fitGood.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/88">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-white/8 bg-card p-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">{fitNotTitle}</h3>
                <ul className="mt-5 space-y-3">
                  {fitNot.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/88">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/55" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {relatedServices && relatedServices.length > 0 && (
          <section className="px-6 py-24">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
                {relatedServicesTitle}
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {relatedServices.map((service) => (
                  <Link
                    key={service.key}
                    href={service.path}
                    className="group rounded-[1.5rem] border border-white/8 bg-card p-7 transition-colors hover:border-primary/35"
                  >
                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      {learnMoreLabel}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-24">
          <div className="container mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-primary/8 p-8 text-center md:p-12">
            <h2 className="text-2xl font-semibold text-foreground md:text-4xl">{ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {ctaDescription}
            </p>
            <Button variant="hero" size="lg" asChild className="mt-8 w-full sm:w-auto">
              <Link href="/#contact" className="justify-center">
                {startProjectLabel}
                <ArrowRight className="h-5 w-5" />
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
