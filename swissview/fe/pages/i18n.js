import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";


i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        supportedLngs: ['de','ch'],
        fallbackLng: 'de',
        ns: ['cantonDetails', 'cantonPopUp','login','profileForm', 'events', 'feedback', 'comment'],
        react: {
            wait: true,
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false
        },
    });

export default i18n;
