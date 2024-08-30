import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;
