import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { Event } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguageStore } from '../../stores/languageStore';
import { SharingService } from '../../lib/sharing/sharingService';

interface ShareOptionsProps {
  event: Event;
}

export function ShareOptions({ event }: ShareOptionsProps) {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const handleEmailShare = () => {
    SharingService.shareViaEmail(event, language);
  };

  const handleWhatsAppShare = () => {
    SharingService.shareViaWhatsApp(event, language);
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleEmailShare}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Mail className="h-5 w-5" />
        <span>{t('Share via Email')}</span>
      </button>
      
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{t('Share via WhatsApp')}</span>
      </button>
    </div>
  );
}