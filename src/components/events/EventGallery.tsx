import React from 'react';
import { Camera, Upload } from 'lucide-react';

interface EventGalleryProps {
  photos: Array<{ id: string; url: string; caption?: string }>;
  onUpload: (files: FileList) => void;
}

export function EventGallery({ photos, onUpload }: EventGalleryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Event Gallery</h3>
        <label className="flex items-center space-x-2 cursor-pointer bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
          <Upload className="h-5 w-5" />
          <span>Upload Photos</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onUpload(e.target.files)}
          />
        </label>
      </div>
      
      {photos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No photos uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square">
              <img
                src={photo.url}
                alt={photo.caption || 'Event photo'}
                className="w-full h-full object-cover rounded-lg"
              />
              {photo.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 rounded-b-lg">
                  {photo.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}