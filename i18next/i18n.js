import i18n from "i18next";
import { initReactI18next } from "react-i18next";
<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ukr } from "./languages/ukr";
import { eng } from "./languages/eng";

const LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en";

const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return savedLanguage || DEFAULT_LANGUAGE;
  } catch (error) {
    console.error("Error loading language:", error);
    return DEFAULT_LANGUAGE;
  }
};

loadLanguage().then((savedLanguage) => {
  i18n.use(initReactI18next).init({
    resources: {
      ...eng,
      ...ukr,
=======

import { ukr } from './languages/ukr';
import { eng } from './languages/eng';

const LANGUAGE_KEY = 'language';
const DEFAULT_LANGUAGE = 'en';

const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;

i18n.use(initReactI18next).init({
    resources: {
        ...eng,
        ...ukr,
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
<<<<<<< HEAD
      escapeValue: false,
    },
  });
});

export default i18n;
=======
        escapeValue: false,
    },
});

export default i18n;
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
