import { UserProfile, Event } from '../types';

interface EmailTemplate {
  subject: string;
  body: string;
}

const templates = {
  eventCreated: (event: Event): EmailTemplate => ({
    subject: `New Event: ${event.title}`,
    body: `
      A new event "${event.title}" has been created!
      
      Date: ${event.date}
      Time: ${event.time}
      Location: ${event.location}
      
      View the event and RSVP here: ${window.location.origin}/event/${event.id}
    `
  }),
  
  itemReserved: (event: Event, itemName: string, reservedBy: string): EmailTemplate => ({
    subject: `Item Reserved - ${event.title}`,
    body: `
      ${reservedBy} has reserved "${itemName}" from your wishlist for ${event.title}.
      
      View your event details here: ${window.location.origin}/event/${event.id}
    `
  }),
  
  eventReminder: (event: Event): EmailTemplate => ({
    subject: `Reminder: ${event.title} is Coming Up!`,
    body: `
      Don't forget about the upcoming event "${event.title}"!
      
      Date: ${event.date}
      Time: ${event.time}
      Location: ${event.location}
      
      View event details here: ${window.location.origin}/event/${event.id}
    `
  })
};

export async function sendEmail(to: string, template: EmailTemplate) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: template.subject,
        body: template.body,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export const notifications = {
  templates,
  sendEmail,
};