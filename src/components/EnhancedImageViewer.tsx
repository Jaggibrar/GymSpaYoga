
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Download, Share2, Heart, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedImageViewerProps {
  images: string[];
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const EnhancedImageViewer: React.FC<EnhancedImageViewerProps> = ({
  images,
  title,
  isOpen,
  onClose,
  initialIndex = 0
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || 'Image',
          url: images[selectedIndex]
        });
      } else {
        await navigator.clipboard.writeText(images[selectedIndex]);
        toast.success('Image URL copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share image');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[selectedIndex];
    link.download = `${title || 'image'}-${selectedIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white rounded-full"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
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
                onClick={onClose}
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
  );
};

export default EnhancedImageViewer;
