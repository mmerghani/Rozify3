import { useCallback } from 'react';
import { translations } from '../lib/i18n/translations';
import { useLanguageStore } from '../stores/languageStore';

export function useTranslation() {
  const { language } = useLanguageStore();

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key] || key;
  }, [language]);

  return { t };
}