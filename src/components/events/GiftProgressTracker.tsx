import React from 'react';
import { Gift, Check } from 'lucide-react';
import { WishlistItem } from '../../types';

interface GiftProgressTrackerProps {
  wishlist: WishlistItem[];
}

export function GiftProgressTracker({ wishlist }: GiftProgressTrackerProps) {
  const totalItems = wishlist.length;
  const reservedItems = wishlist.filter(item => item.reserved).length;
  const progress = totalItems > 0 ? (reservedItems / totalItems) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Gift Progress</h3>
        <Gift className="h-6 w-6 text-purple-600" />
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-purple-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600 transition-all duration-500"
          />
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{reservedItems} items reserved</span>
        <span>{totalItems - reservedItems} items remaining</span>
      </div>
    </div>
  );
}