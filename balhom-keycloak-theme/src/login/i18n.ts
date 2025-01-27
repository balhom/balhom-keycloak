/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";
import i18n from "i18next";
import { initReactI18next } from "../../node_modules/react-i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import enTranslations from "./locales/en";
import esTranslations from "./locales/es";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder.withThemeName<ThemeName>().build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["navigator"],
    },
    supportedLngs: ["en", "es"],
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
