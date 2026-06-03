import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Share2, Grid3x3 } from 'lucide-react';
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
  showControls = true,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [showAllThumbs, setShowAllThumbs] = useState(false);

  const displayImages = images.length > 0 ? images : ["/placeholder.svg"];

  const next = () => {
    setSelectedImage((p) => (p < displayImages.length - 1 ? p + 1 : 0));
    resetZoom();
  };
  const prev = () => {
    setSelectedImage((p) => (p > 0 ? p - 1 : displayImages.length - 1));
    resetZoom();
  };
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 1));
      if (e.key === '0') resetZoom();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, displayImages.length]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `Check out ${name}`, url: window.location.href });
      } catch {}
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(1, Math.min(4, z + (e.deltaY < 0 ? 0.15 : -0.15))));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x),
      y: dragRef.current.oy + (e.clientY - dragRef.current.y),
    });
  };
  const onMouseUp = () => (dragRef.current = null);

  return (
    <>
      <div className="space-y-4">
        {/* Main */}
        <div
          data-watermark="true"
          className={`relative ${aspectRatio} rounded-3xl overflow-hidden group cursor-zoom-in bg-muted/30 border border-border/50`}
        >
          {displayImages.map((img, i) => {
            const isNeighbor = Math.abs(i - selectedImage) <= 1 || (selectedImage === 0 && i === displayImages.length - 1) || (selectedImage === displayImages.length - 1 && i === 0);
            if (!isNeighbor && i !== selectedImage) return null;
            return (
              <img
                key={i}
                src={img}
                alt={`${name} - Image ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'low'}
                onClick={() => i === selectedImage && setIsLightboxOpen(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  i === selectedImage ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              />
            );
          })}

          {/* Top overlays */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            {category && (
              <Badge className="bg-background/80 backdrop-blur-md text-foreground border border-border/50 font-semibold capitalize px-3 py-1.5 shadow-lg pointer-events-auto">
                {category}
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="bg-background/80 backdrop-blur-md text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 shadow-lg">
                {selectedImage + 1} / {displayImages.length}
              </span>
            </div>
          </div>

          {/* Center CTA */}
          {showControls && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Button
                size="lg"
                className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background border border-border/50 shadow-2xl pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
              >
                <Maximize2 className="h-5 w-5 mr-2" />
                View Gallery
              </Button>
            </div>
          )}

          {/* Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-background border border-border/50 shadow-lg z-10"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-background border border-border/50 shadow-lg z-10"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </>
          )}

          {/* Dots */}
          {displayImages.length > 1 && displayImages.length <= 8 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {displayImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selectedImage ? 'bg-primary w-8' : 'bg-background/70 w-1.5 hover:bg-background'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && displayImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  selectedImage === index
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                    : 'ring-1 ring-border/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={image} alt={`${name} thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex flex-col" data-watermark="true">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10">
            <div className="text-white">
              <div className="font-semibold text-sm md:text-base truncate max-w-[40vw]">{name}</div>
              <div className="text-xs text-white/60">
                {selectedImage + 1} of {displayImages.length}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-white/80 text-xs font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowAllThumbs((s) => !s)}
                className="hidden md:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition"
                aria-label="Toggle thumbnails"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={handleShare}
                className="hidden md:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-hidden select-none"
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{ cursor: zoom > 1 ? (dragRef.current ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              src={displayImages[selectedImage]}
              alt={`${name} - Image ${selectedImage + 1}`}
              draggable={false}
              className="max-w-full max-h-full object-contain transition-transform duration-200 pointer-events-none"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition backdrop-blur-md"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition backdrop-blur-md"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom thumbnail strip */}
          {displayImages.length > 1 && (showAllThumbs || true) && (
            <div className="border-t border-white/10 p-3 md:p-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-start md:justify-center">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      resetZoom();
                    }}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary scale-105' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EnhancedImageGallery;
