
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, className = "" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

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
    setIsZoomed(false);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && images.length > 1) {
        prevImage();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        nextImage();
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, images.length]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Thumbnail Gallery */}
      <div className={`relative ${className}`}>
        {images.length === 1 ? (
          <div className="relative group">
            <img
              src={images[0]}
              alt={title || "Image"}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(0)}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="relative group">
              <img
                src={images[0]}
                alt={title || "Main image"}
                className="w-full h-full object-cover rounded-l-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(0)}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-l-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              {images.slice(1, 3).map((image, index) => (
                <div key={index + 1} className="relative group">
                  <img
                    src={image}
                    alt={`${title || "Image"} ${index + 2}`}
                    className="w-full h-full object-cover rounded-tr-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openModal(index + 1)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-tr-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="h-4 w-4 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  {index === 1 && images.length > 3 && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-60 rounded-tr-lg flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all duration-300"
                      onClick={() => openModal(index + 1)}
                    >
                      <div className="text-center">
                        <span className="text-white font-bold text-lg block">
                          +{images.length - 3}
                        </span>
                        <span className="text-white/80 text-sm">more photos</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Full-size Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-[95vh] p-0 bg-black border-0 rounded-lg overflow-hidden">
          <div 
            className="relative w-full h-full bg-black rounded-lg overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[selectedIndex]}
              alt={`${title || "Image"} ${selectedIndex + 1}`}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-grab' : 'cursor-zoom-in'
              }`}
              onClick={toggleZoom}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';
              }}
            />
            
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {selectedIndex + 1} / {images.length}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full"
                  onClick={toggleZoom}
                >
                  {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full w-12 h-12 z-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full w-12 h-12 z-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Enhanced Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-w-4xl">
                <div className="flex justify-center space-x-2 overflow-x-auto pb-2 px-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                        selectedIndex === index 
                          ? 'border-white scale-110 shadow-lg' 
                          : 'border-white/30 hover:border-white/60 hover:scale-105'
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
              </div>
            )}

            {/* Swipe Indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm bg-black/50 px-3 py-1 rounded-full">
                Swipe or use arrow keys to navigate
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
