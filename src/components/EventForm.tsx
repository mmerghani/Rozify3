import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { EventFormFields } from './events/EventFormFields';
import { TemplateSelector } from './TemplateSelector';
import { FileUpload } from './FileUpload';
import { SubmitButton } from './forms/SubmitButton';
import { EventService } from '../lib/events/eventService';
import { eventFormSchema } from '../lib/events/eventValidation';
import { useTranslation } from '../hooks/useTranslation';

export function EventForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; url: string; type: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(eventFormSchema)
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const newEvent = await EventService.createEvent({
        ...data,
        template: selectedTemplate,
        attachments,
      });
      navigate(`/event/${newEvent.id}`);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (files: FileList) => {
    Array.from(files).forEach(file => {
      const fileUrl = URL.createObjectURL(file);
      setAttachments(prev => [...prev, {
        id: crypto.randomUUID(),
        name: file.name,
        url: fileUrl,
        type: file.type
      }]);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('Create Your Event')}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('Choose an Event Template')}</h3>
        <TemplateSelector onSelect={setSelectedTemplate} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EventFormFields register={register} errors={errors} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('Event Attachments')}
          </label>
          <FileUpload
            onFileSelect={handleFileSelect}
            attachments={attachments}
            onRemove={(id) => setAttachments(prev => prev.filter(file => file.id !== id))}
          />
        </div>

        <SubmitButton
          isSubmitting={isSubmitting}
          text={t('Create Event')}
          loadingText={t('Creating Event...')}
        />
      </form>
    </div>
  );
}