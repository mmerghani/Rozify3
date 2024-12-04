import React from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText: string;
}

export function SubmitButton({ isSubmitting, text, loadingText }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isSubmitting && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
      {isSubmitting ? loadingText : text}
    </button>
  );
}