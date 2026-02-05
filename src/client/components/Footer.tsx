"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-4 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="relative h-32 w-32">
              <Image
                src="/kalissealogo.png"
                alt="Kalissea logo"
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">{t('header.services')}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{t('header.pricing')}</a>
            <a href="#portfolio" className="hover:text-foreground transition-colors">{t('header.portfolio')}</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">{t('header.testimonials')}</a>
            <a href="#contact" className="hover:text-foreground transition-colors">{t('header.contact')}</a>
          </nav>

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
            
          </a>
          <a href="https://findly.tools/kalissea?utm_source=kalissea" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0">
            <img
              src="https://findly.tools/badges/findly-tools-badge-light.svg"
              alt="Featured on findly.tools"
              width={150}
              height={50}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
