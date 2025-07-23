import React from 'react';
import EnhancedImageGallery from '@/components/EnhancedImageGallery';

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
  return (
    <EnhancedImageGallery
      images={images}
      name={name}
      category={category}
      aspectRatio={aspectRatio}
      showThumbnails={true}
      showControls={true}
    />
  );
};

export default MediaGallery;