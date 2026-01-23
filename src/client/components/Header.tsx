"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image"
import { motion } from "framer-motion";
import {
  magneticButtonVariants,
  backdropBlurVariants,
  staggerContainerFastVariants,
  fadeInUpChildVariants,
} from "@/lib/animations";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

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
        <motion.button
          className="md:hidden text-foreground"
          onClick={handleMenuToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <motion.a
          href="/"
          className="text-xl font-bold text-foreground absolute left-1/2 -translate-x-1/2 md:static md:transform-none"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
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
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="relative">
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </span>
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <motion.div
            variants={magneticButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="hero" size="default" asChild className="cursor-pointer">
              <a href="/#contact">{t('header.getQuote')}</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden bg-card border-b border-border overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.nav
          className="container mx-auto px-6 py-4 flex flex-col gap-4"
          variants={staggerContainerFastVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              onClick={() => handleMenuToggle()}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              variants={fadeInUpChildVariants}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            className="flex items-center justify-between mt-2 gap-2"
            variants={fadeInUpChildVariants}
          >
            <LanguageSwitcher />
            <motion.div
              variants={magneticButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex-1"
            >
              <Button variant="hero" size="default" className="flex-1 cursor-pointer" asChild>
                <a href="/#contact">{t('header.getQuote')}</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.nav>
      </motion.div>
    </header>
  );
};

export default Header;
