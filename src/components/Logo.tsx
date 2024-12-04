import React from 'react';
import { Gift } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'medium' }: LogoProps) {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const textClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  return (
    <div className="flex items-center space-x-2">
      <Gift className={`${sizeClasses[size]} text-purple-600`} />
      <span className={`${textClasses[size]} font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}>
        Rozify
      </span>
    </div>
  );
}