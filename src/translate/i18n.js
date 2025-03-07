import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationAR from "./ar.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR }
};

const savedLang = localStorage.getItem("lang") || "en";
i18n.use(initReactI18next).init({
  resources,
  lng: savedLang, 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", 
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
