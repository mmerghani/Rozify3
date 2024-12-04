import React from 'react';
import { useLanguageStore } from '../stores/languageStore';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="px-3 py-1 rounded-md bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}