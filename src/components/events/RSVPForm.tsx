import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../forms/FormInput';
import { SubmitButton } from '../forms/SubmitButton';
import { useTranslation } from '../../hooks/useTranslation';

const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  numberOfGuests: z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a number between 0 and 10',
      });
      return z.NEVER;
    }
    return parsed;
  }),
  dietaryRestrictions: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPFormProps {
  eventId: string;
  onSubmit: (data: RSVPFormData) => Promise<void>;
}

export function RSVPForm({ eventId, onSubmit }: RSVPFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      numberOfGuests: '1',
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('Will you attend?')}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label={t('Your Name')}
          name="name"
          register={register}
          error={errors.name?.message}
          required
        />
        
        <FormInput
          label={t('Email')}
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          required
        />
        
        <FormInput
          label={t('Number of Guests')}
          name="numberOfGuests"
          type="number"
          min="0"
          max="10"
          register={register}
          error={errors.numberOfGuests?.message}
          helperText={t('Including yourself, maximum 10 people')}
          required
        />
        
        <FormInput
          label={t('Dietary Restrictions')}
          name="dietaryRestrictions"
          register={register}
          error={errors.dietaryRestrictions?.message}
          helperText={t('Optional: Let us know about any dietary requirements')}
        />
        
        <SubmitButton
          isSubmitting={isSubmitting}
          text={t('Confirm Attendance')}
          loadingText={t('Sending...')}
        />
      </form>
    </div>
  );
}