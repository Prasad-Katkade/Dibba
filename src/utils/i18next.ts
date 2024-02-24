import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "locales/en.json";
import hi from "locales/hi.json";
import mr from "locales/mr.json";
import kn from "locales/kn.json";

export const languageResources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  kn: { translation: kn },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: languageResources,
});

export const changeLanguage = (lang) => {
  i18next.changeLanguage(lang);
};

export const languages = {
  en: {
    name: "",
    nativeName: "English",
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी, हिंदी",
  },
  mr: {
    name: "Marathi",
    nativeName: "मराठी",
  },
  kn: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
};

export default i18next;
