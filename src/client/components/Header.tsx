"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "/#services", label: t('header.services') },
    { href: "/#pricing", label: t('header.pricing') },
    { href: "/#portfolio", label: t('header.portfolio') },
    { href: "/#testimonials", label: t('header.testimonials') },
    { href: "/#contact", label: t('header.contact') },
    { href: "https://automation.kalissea.com", label: t('header.automationFlow'), external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <a href="/" className="text-xl font-bold text-foreground absolute left-1/2 -translate-x-1/2 md:static md:transform-none">
          <div className="relative h-16 w-16">
            <Image
              src="/kalissealogo.png"
              alt="Kalissea logo"
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="hero" size="default" asChild>
            <a href="/#contact">{t('header.getQuote')}</a>
          </Button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between mt-2">
               <LanguageSwitcher />
               <Button variant="hero" size="default" className="flex-1 ml-4" asChild>
                 <a href="/#contact">{t('header.getQuote')}</a>
               </Button>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
