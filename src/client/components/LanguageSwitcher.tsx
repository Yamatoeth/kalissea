"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "fr" : "en";

    // With localePrefix: "as-needed", fr has no prefix and en has /en prefix
    if (newLocale === "fr") {
      // Remove /en prefix
      const newPath = pathname.replace(/^\/en(\/|$)/, "/") || "/";
      router.push(newPath);
    } else {
      // Add /en prefix
      const newPath = "/en" + (pathname.startsWith("/") ? pathname : "/" + pathname);
      router.push(newPath);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium text-muted-foreground hover:text-foreground"
    >
      {locale === "en" ? "EN" : "FR"}
    </Button>
  );
};

export default LanguageSwitcher;
