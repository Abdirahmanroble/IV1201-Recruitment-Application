import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type ResourceObject = {
  [key: string]: {
    translation: object;
  };
};

const languages = ['en', 'se'];

const loadResources = async (): Promise<ResourceObject> => {
  const resources: ResourceObject = {};
  for (const lang of languages) {
    const translations = await import(`./locales/${lang}/translation.json`);
    resources[lang] = { translation: translations.default };
  }
  return resources;
};

loadResources().then((loadedResources) => {
  i18n.use(initReactI18next).init({
    resources: loadedResources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;
