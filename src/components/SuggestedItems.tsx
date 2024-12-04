import React from 'react';
import { PlusCircle } from 'lucide-react';
import type { WishlistItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface SuggestedItemsProps {
  items: string[];
  onAddItem: (item: WishlistItem) => void;
}

export function SuggestedItems({ items, onAddItem }: SuggestedItemsProps) {
  const handleAddItem = (itemName: string) => {
    const newItem: WishlistItem = {
      id: uuidv4(),
      name: itemName,
      description: `Suggested item: ${itemName}`,
      price: 0,
      reserved: false
    };
    onAddItem(newItem);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Items</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleAddItem(item)}
            className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <span className="text-gray-700">{item}</span>
            <PlusCircle className="h-5 w-5 text-purple-600" />
          </button>
        ))}
      </div>
    </div>
  );
}