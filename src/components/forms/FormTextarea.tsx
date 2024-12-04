import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({ 
  label, 
  name, 
  register, 
  error,
  required = false,
  rows = 3 
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}