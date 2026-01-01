import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation resources directly
import enTranslation from '../../public/locales/en/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      }
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
