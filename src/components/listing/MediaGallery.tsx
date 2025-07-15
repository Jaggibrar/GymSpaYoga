import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface MediaGalleryProps {
  images: string[];
  name: string;
  category: string;
  aspectRatio?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  name,
  category,
  aspectRatio = "aspect-[16/9]"
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const displayImages = images.length > 0 ? images : ["/placeholder.svg"];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden group`}>
        <img 
          src={displayImages[selectedImage]} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground capitalize font-semibold">
            {category}
          </Badge>
        </div>
        
        {/* Image Navigation Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedImage ? 'bg-white scale-110' : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {displayImages.slice(1, 5).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index + 1)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all hover:scale-105 ${
                selectedImage === index + 1 ? 'ring-2 ring-primary' : ''
              }`}
            >
              <img 
                src={image} 
                alt={`${name} ${index + 2}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;