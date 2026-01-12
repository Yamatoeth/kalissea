"use client";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.resolvedLanguage === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
        // Set cookie for server-side compatibility
        Cookies.set('i18next', newLang, { expires: 365, path: '/' });
        // Refresh to ensure server components re-render with new locale
        window.location.reload();
    };

    return (
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-medium text-muted-foreground hover:text-foreground">
            {i18n.resolvedLanguage === 'en' ? 'EN' : 'FR'}
        </Button>
    );
};

export default LanguageSwitcher;
