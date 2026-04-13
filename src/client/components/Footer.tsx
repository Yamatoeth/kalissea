"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();

  const serviceLinks = [
    { key: "creation", path: "/services/website-creation" },
    { key: "ecommerce", path: "/services/e-commerce" },
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
              {t("footer.description")}
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("header.capabilities")}</h3>
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
            <h3 className="font-semibold text-foreground mb-4">{t("footer.navigation")}</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/#portfolio" className="hover:text-primary transition-colors">{t("header.work")}</Link>
              <Link href="/#services" className="hover:text-primary transition-colors">{t("header.capabilities")}</Link>
              <Link href="/#process" className="hover:text-primary transition-colors">{t("header.approach")}</Link>
              <Link href="/#about" className="hover:text-primary transition-colors">{t("header.about")}</Link>
              <Link href="/#contact" className="hover:text-primary transition-colors">{t("header.contact")}</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
