import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./en.json";
import VN from "./vi.json";

const initI18n = () => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'vi',
    debug: true,
    resources: {
      en: {
        translation: EN,
      },
      vi: {
        translation: VN,
      },
    },
  });
};

export default initI18n;