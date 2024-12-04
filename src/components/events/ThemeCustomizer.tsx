import React from 'react';
import { Palette } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Classic Purple',
    colors: {
      primary: 'from-purple-600 to-pink-600',
      secondary: 'purple-100',
      accent: 'purple-600'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: 'from-blue-600 to-teal-600',
      secondary: 'blue-100',
      accent: 'blue-600'
    }
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    colors: {
      primary: 'from-orange-600 to-red-600',
      secondary: 'orange-100',
      accent: 'orange-600'
    }
  }
];

interface ThemeCustomizerProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeCustomizer({ currentTheme, onThemeChange }: ThemeCustomizerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="h-6 w-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Customize Theme</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentTheme === theme.id
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className={`h-20 rounded-lg bg-gradient-to-r ${theme.colors.primary} mb-3`} />
            <p className="text-sm font-medium text-gray-900">{theme.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}