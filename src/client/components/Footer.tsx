"use client";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold text-foreground">
            kalissea<span className="text-primary">.</span>
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
      </div>
    </footer>
  );
};

export default Footer;
