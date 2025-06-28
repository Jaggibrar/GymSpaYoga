
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, className = "" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Thumbnail Gallery */}
      <div className={`relative ${className}`}>
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt={title || "Image"}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(0)}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
            }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="relative">
              <img
                src={images[0]}
                alt={title || "Main image"}
                className="w-full h-full object-cover rounded-l-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(0)}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                }}
              />
            </div>
            <div className="grid gap-2">
              {images.slice(1, 3).map((image, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={image}
                    alt={`${title || "Image"} ${index + 2}`}
                    className="w-full h-full object-cover rounded-tr-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal(index + 1)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                    }}
                  />
                  {index === 1 && images.length > 3 && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-tr-lg flex items-center justify-center cursor-pointer"
                      onClick={() => openModal(index + 1)}
                    >
                      <span className="text-white font-semibold text-lg">
                        +{images.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-size Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <img
              src={images[selectedIndex]}
              alt={`${title || "Image"} ${selectedIndex + 1}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
              }}
            />
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
                {selectedIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden ${
                      selectedIndex === index ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
