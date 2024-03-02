import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import translationEN from './locales/en/translation.json';
import translationSE from './locales/se/translation.json';
import translationSO from './locales/so/translation.json';


const resources = {
  en: {
    translation: translationEN
  },
  se: {
    translation: translationSE
  },

  so: {
    translation: translationSO
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;