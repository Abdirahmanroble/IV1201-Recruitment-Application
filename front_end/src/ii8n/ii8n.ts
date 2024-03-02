// ii8n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as translationFiles from './locales';

type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

type TranslationResources = {
  [lang: string]: {
    translation: NestedTranslation;
  };
};

const resources: TranslationResources = Object.keys(translationFiles).reduce((acc, lang) => {
  // Assuming each translation file exports an object as default
  const translation = translationFiles[lang as keyof typeof translationFiles];
  acc[lang] = { translation: translation };
  return acc;
}, {} as TranslationResources);

i18n.use(initReactI18next).init({
  resources,
  lng: "en", 
  interpolation: {
    escapeValue: false 
  },
  // Add any additional i18n options here
});

export default i18n;
