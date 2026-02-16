"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation();

  const serviceLinks = [
    { key: "creation", path: "/services/website-creation" },
    { key: "ecommerce", path: "/services/e-commerce" },
    { key: "maintenance", path: "/services/maintenance" },
    { key: "seo", path: "/services/seo-growth" },
    { key: "branding", path: "/services/branding" },
    { key: "automation", path: "/services/automation-ai" },
  ];
  
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-24 w-24">
              <Image
                src="/kalissealogo.png"
                alt="Kalissea logo"
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center md:text-left">
              Agence web spécialisée en développement, SEO et automatisation.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('header.services')}</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              {serviceLinks.map(({ key, path }) => (
                <Link key={key} href={path} className="hover:text-primary transition-colors">
                  {t(`services.items.${key}.title`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/#services" className="hover:text-primary transition-colors">{t('header.services')}</Link>
              <Link href="/#pricing" className="hover:text-primary transition-colors">{t('header.pricing')}</Link>
              <Link href="/#portfolio" className="hover:text-primary transition-colors">{t('header.portfolio')}</Link>
              <Link href="/#testimonials" className="hover:text-primary transition-colors">{t('header.testimonials')}</Link>
              <Link href="/#contact" className="hover:text-primary transition-colors">{t('header.contact')}</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </div>
        </div>

        {/* Backlink Badges */}
        <div className="flex flex-row items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
          <a href="https://wired.business" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0">
            <img 
              src="https://wired.business/badge0-white.svg" 
              alt="Featured on Wired Business" 
              width={150} 
              height={45}
            />
          </a>
          <a href="https://submithunt.com" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0">
            {/* No badge image provided */}
          </a>
          <a href="https://findly.tools/kalissea?utm_source=kalissea" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0">
            <img
              src="https://findly.tools/badges/findly-tools-badge-light.svg"
              alt="Featured on findly.tools"
              width={150}
              height={50}
            />
          </a>
          <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0">
            <img
              src="https://twelve.tools/badge0-dark.svg"
              alt="Featured on Twelve Tools"
              width={200}
              height={54}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
