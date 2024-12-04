export const translations = {
  en: {
    // ... existing translations ...
    'Join me at': 'Join me at',
    'View details here': 'View details here',
    'Event': 'Event'
  },
  ar: {
    // ... existing translations ...
    'Join me at': 'انضم إلي في',
    'View details here': 'شاهد التفاصيل هنا',
    'Event': 'المناسبة'
  }
};

export type TranslationKey = keyof typeof translations.en;