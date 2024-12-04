import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { WishlistItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface WishlistFormProps {
  onAddItem: (item: WishlistItem) => void;
}

export function WishlistForm({ onAddItem }: WishlistFormProps) {
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: WishlistItem = {
      id: uuidv4(),
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      url: item.url,
      reserved: false,
    };
    onAddItem(newItem);
    setItem({ name: '', description: '', price: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Item Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">URL (optional)</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={item.url}
          onChange={(e) => setItem({ ...item, url: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Item</span>
      </button>
    </form>
  );
}