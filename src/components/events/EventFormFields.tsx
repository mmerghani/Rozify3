import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';
import { FormTextarea } from '../forms/FormTextarea';
import { EventFormData } from '../../lib/events/eventValidation';
import { useTranslation } from '../../hooks/useTranslation';

interface EventFormFieldsProps {
  register: UseFormRegister<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

export function EventFormFields({ register, errors }: EventFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <FormInput
        label={t('Event Title')}
        name="title"
        register={register}
        error={errors.title?.message}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label={t('Date')}
          name="date"
          type="date"
          register={register}
          error={errors.date?.message}
          required
        />
        <FormInput
          label={t('Time')}
          name="time"
          type="time"
          register={register}
          error={errors.time?.message}
          required
        />
      </div>
      
      <FormTextarea
        label={t('Description')}
        name="description"
        register={register}
        error={errors.description?.message}
        required
      />
      
      <FormInput
        label={t('Host Name')}
        name="host"
        register={register}
        error={errors.host?.message}
        required
      />
      
      <FormInput
        label={t('Location')}
        name="location"
        register={register}
        error={errors.location?.message}
        required
      />
    </div>
  );
}