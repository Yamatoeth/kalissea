"use client";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.resolvedLanguage === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-medium text-muted-foreground hover:text-foreground">
            {i18n.resolvedLanguage === 'en' ? 'FR' : 'EN'}
        </Button>
    );
};

export default LanguageSwitcher;
