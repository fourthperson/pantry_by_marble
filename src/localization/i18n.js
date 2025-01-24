import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';

import translationsEN from './en/translations.json';

const resources = {
    en: {
        translation: translationsEN,
    },
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        const locale = Localization.getLocales()[0].languageTag;
        callback(locale);
    },
    init: () => {
    },
    cacheUserLanguage: () => {
    },
};

i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
