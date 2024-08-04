import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/language/en.json';
import vi from './src/language/vi.json';

// import en from './en.json';
// import vi from './vi.json';

const resources = {
  en: en,
  vi: vi,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // <--- add this line
  lng: 'vi',
  fallbackLng: 'vi',
  resources: resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default {i18n};
