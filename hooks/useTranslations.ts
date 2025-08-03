
import { useLanguage } from '../context/LanguageContext';

export const useTranslations = () => {
    const { language, translations } = useLanguage();
    return translations[language];
};
