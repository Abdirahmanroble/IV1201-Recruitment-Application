import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as translationFiles from './locales';




/**
 * Represents a collection of translation resources for different languages.
 * @typedef {Object} TranslationResources
 * @property {Object} lang - An object containing translation resources for each language.
 */

type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

type TranslationResources = {
  [lang: string]: {
    translation: NestedTranslation;
  };
};

const resources: TranslationResources = Object.keys(translationFiles).reduce((acc, lang) => {
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
});

export default i18n;
