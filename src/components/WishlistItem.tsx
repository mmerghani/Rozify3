import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import type { WishlistItem as WishlistItemType } from '../types';

interface WishlistItemProps {
  item: WishlistItemType;
  onReserve: (id: string) => void;
}

export function WishlistItem({ item, onReserve }: WishlistItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-purple-600 font-medium">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-4">
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
        {!item.reserved ? (
          <button
            onClick={() => onReserve(item.id)}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Reserve
          </button>
        ) : (
          <span className="inline-flex items-center space-x-1 text-green-600">
            <Check className="h-5 w-5" />
            <span>Reserved</span>
          </span>
        )}
      </div>
    </div>
  );
}