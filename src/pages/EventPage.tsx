import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { WishlistForm } from '../components/WishlistForm';
import { WishlistItem as WishlistItemComponent } from '../components/WishlistItem';
import { SuggestedItems } from '../components/SuggestedItems';
import { Map } from '../components/Map';
import { ShareOptions } from '../components/sharing/ShareOptions';
import { RSVPForm } from '../components/events/RSVPForm';
import { GiftProgressTracker } from '../components/events/GiftProgressTracker';
import { EventGallery } from '../components/events/EventGallery';
import { ThemeCustomizer } from '../components/events/ThemeCustomizer';
import { EventService } from '../lib/events/eventService';
import { getTemplate } from '../lib/templates';
import type { Event, WishlistItem } from '../types';

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; caption?: string }>>([]);

  useEffect(() => {
    if (!id) return;
    const eventData = EventService.getEvent(id);
    if (!eventData) {
      toast.error('Event not found');
      navigate('/');
      return;
    }
    setEvent(eventData);
  }, [id, navigate]);

  if (!event) return null;

  const template = event.template ? getTemplate(event.template) : null;

  const handleAddItem = (item: WishlistItem) => {
    if (!event) return;
    const updatedEvent = {
      ...event,
      wishlist: [...event.wishlist, item],
    };
    EventService.updateEvent(updatedEvent);
    setEvent(updatedEvent);
    toast.success('Item added to wishlist');
  };

  const handleReserveItem = (itemId: string) => {
    if (!event) return;
    const updatedWishlist = event.wishlist.map(item =>
      item.id === itemId ? { ...item, reserved: true } : item
    );
    const updatedEvent = { ...event, wishlist: updatedWishlist };
    EventService.updateEvent(updatedEvent);
    setEvent(updatedEvent);
    toast.success('Item reserved successfully');
  };

  const handleRSVP = async (data: any) => {
    try {
      // Here you would typically send this to your backend
      console.log('RSVP Data:', data);
      toast.success('RSVP sent successfully');
    } catch (error) {
      toast.error('Failed to send RSVP');
    }
  };

  const handlePhotoUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, {
          id: crypto.randomUUID(),
          url: reader.result as string,
        }]);
      };
      reader.readAsDataURL(file);
    });
    toast.success('Photos uploaded successfully');
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    toast.success('Theme updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-white rounded-lg shadow-md p-6 mb-8 ${
          currentTheme === 'ocean' ? 'bg-blue-50' : 
          currentTheme === 'sunset' ? 'bg-orange-50' : 
          'bg-purple-50'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {template && <span className="text-3xl">{template.icon}</span>}
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{format(new Date(event.date), 'PPP')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <ShareOptions event={event} />
          </div>
          
          <p className="mt-4 text-gray-600">{event.description}</p>
          <p className="mt-2 text-sm text-gray-500">Hosted by {event.host}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <RSVPForm eventId={event.id} onSubmit={handleRSVP} />
            <GiftProgressTracker wishlist={event.wishlist} />
          </div>
          
          <div className="space-y-8">
            <EventGallery photos={photos} onUpload={handlePhotoUpload} />
            <ThemeCustomizer currentTheme={currentTheme} onThemeChange={handleThemeChange} />
          </div>
        </div>

        {event.coordinates && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
            <Map
              position={[event.coordinates.lat, event.coordinates.lng]}
              address={event.location}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add to Wishlist</h2>
          <WishlistForm onAddItem={handleAddItem} />
          {template && (
            <SuggestedItems
              items={template.suggestedItems}
              onAddItem={handleAddItem}
            />
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
          {event.wishlist.length === 0 ? (
            <p className="text-gray-600">No items in the wishlist yet.</p>
          ) : (
            event.wishlist.map((item) => (
              <WishlistItemComponent
                key={item.id}
                item={item}
                onReserve={handleReserveItem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}