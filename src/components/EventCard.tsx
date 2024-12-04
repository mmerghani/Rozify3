import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';
import type { Event } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguageStore } from '../stores/languageStore';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  return (
    <Link
      to={`/event/${event.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(event.date), 'PPP', {
                locale: language === 'ar' ? arSA : enUS
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-gray-600 line-clamp-2">{event.description}</p>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">{t('Hosted by')} {event.host}</p>
        </div>
      </div>
    </Link>
  );
}