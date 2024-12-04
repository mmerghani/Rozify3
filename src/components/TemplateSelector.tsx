import React from 'react';
import { eventTemplates } from '../lib/templates';
import { useLanguageStore } from '../stores/languageStore';
import { useTranslation } from '../hooks/useTranslation';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const { language } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventTemplates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{template.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {template.translations[language].title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            {template.translations[language].description}
          </p>
        </button>
      ))}
    </div>
  );
}