import { Event } from '../../types';
import { format } from 'date-fns';
import { useTranslation } from '../../hooks/useTranslation';

export class SharingService {
  static getShareUrl(eventId: string): string {
    // Use window.location.origin to get the base URL of the application
    const baseUrl = window.location.origin;
    return `${baseUrl}/event/${eventId}`;
  }

  static getShareText(event: Event, language: 'en' | 'ar'): string {
    const shareUrl = this.getShareUrl(event.id);
    const translations = {
      en: {
        event: 'Event',
        date: 'Date',
        time: 'Time',
        location: 'Location',
        viewDetails: 'View details here'
      },
      ar: {
        event: 'المناسبة',
        date: 'التاريخ',
        time: 'الوقت',
        location: 'المكان',
        viewDetails: 'شاهد التفاصيل هنا'
      }
    };

    const t = translations[language];

    return `
${t.event}: ${event.title}
${t.date}: ${format(new Date(event.date), 'PPP')}
${t.time}: ${event.time}
${t.location}: ${event.location}

${t.viewDetails}: ${shareUrl}
    `.trim();
  }

  static shareViaWhatsApp(event: Event, language: 'en' | 'ar'): void {
    const text = encodeURIComponent(this.getShareText(event, language));
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  static shareViaEmail(event: Event, language: 'en' | 'ar'): void {
    const subject = encodeURIComponent(event.title);
    const body = encodeURIComponent(this.getShareText(event, language));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
}