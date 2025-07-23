import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnhancedImageGalleryProps {
  images: string[];
  name: string;
  category?: string;
  aspectRatio?: string;
  showThumbnails?: boolean;
  showControls?: boolean;
}

const EnhancedImageGallery: React.FC<EnhancedImageGalleryProps> = ({
  images,
  name,
  category,
  aspectRatio = "aspect-[16/9]",
  showThumbnails = true,
  showControls = true
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const displayImages = images.length > 0 ? images : ["/placeholder.svg"];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setIsLightboxOpen(false);
          break;
        case 'ArrowLeft':
          setSelectedImage(prev => prev > 0 ? prev - 1 : displayImages.length - 1);
          break;
        case 'ArrowRight':
          setSelectedImage(prev => prev < displayImages.length - 1 ? prev + 1 : 0);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, displayImages.length]);

  const nextImage = () => {
    setSelectedImage(prev => prev < displayImages.length - 1 ? prev + 1 : 0);
  };

  const prevImage = () => {
    setSelectedImage(prev => prev > 0 ? prev - 1 : displayImages.length - 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Main Image */}
        <div className={`relative ${aspectRatio} rounded-3xl overflow-hidden group cursor-pointer`}>
          <img 
            src={displayImages[selectedImage]} 
            alt={`${name} - Image ${selectedImage + 1}`} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
            onClick={() => setIsLightboxOpen(true)}
            loading="eager"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-6 right-6">
              <Badge className="bg-white/90 backdrop-blur-sm text-primary border-0 font-semibold capitalize px-4 py-2 text-sm shadow-lg">
                {category}
              </Badge>
            </div>
          )}

          {/* Controls Overlay */}
          {showControls && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="lg"
                className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white shadow-xl border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
              >
                <ZoomIn className="h-6 w-6 mr-2" />
                View Gallery
              </Button>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedImage 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {showThumbnails && displayImages.length > 1 && (
          <div className="grid grid-cols-5 gap-4">
            {displayImages.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  selectedImage === index 
                    ? 'ring-3 ring-primary shadow-lg' 
                    : 'ring-1 ring-gray-200 hover:ring-primary/50'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Action Buttons */}
            <div className="absolute top-6 left-6 flex gap-3 z-10">
              <button
                onClick={handleShare}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <a
                href={displayImages[selectedImage]}
                download={`${name}-image-${selectedImage + 1}`}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>

            {/* Main Image */}
            <div className="relative max-w-7xl max-h-full flex items-center justify-center">
              <img
                src={displayImages[selectedImage]}
                alt={`${name} - Image ${selectedImage + 1}`}
                className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
              {selectedImage + 1} / {displayImages.length}
            </div>

            {/* Thumbnail Strip */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 max-w-md overflow-x-auto">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-2 ring-white scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedImageGallery;