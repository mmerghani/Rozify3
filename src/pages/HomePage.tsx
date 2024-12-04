import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Share2, Gift } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';
import { Logo } from '../components/Logo';
import { useTranslation } from '../hooks/useTranslation';

export function HomePage() {
  const { t } = useTranslation();
  const { events } = useEvents();
  const eventList = Object.values(events);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {t('Create and share your gift registry')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('Make your special occasions even more memorable')}
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/create-event"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Calendar className="h-5 w-5" />
              <span>{t('Create Event')}</span>
            </Link>
          </div>
        </div>

        {eventList.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('Your Events')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventList.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('Create Your Event')}</h3>
            <p className="text-gray-600">
              {t('Set up your special occasion with all the important details')}
            </p>
          </div>
          <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('Add Your Wishes')}</h3>
            <p className="text-gray-600">
              {t('Create your perfect wishlist with items you\'d love to receive')}
            </p>
          </div>
          <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Share2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('Share with Loved Ones')}</h3>
            <p className="text-gray-600">
              {t('Share your wishlist instantly with friends and family')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}