import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';
import { toast } from 'sonner';

interface ImageUploadSectionProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  existingImageUrls?: string[];
  onExistingImagesChange?: (urls: string[]) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  existingImageUrls = [],
  onExistingImagesChange
}) => {
  const { uploading } = useBusinessImageUpload();
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Create previews for new files
    const newPreviews = images.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup old preview URLs
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = images.length + existingImageUrls.length;
    
    if (totalImages + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Only JPEG, PNG, and WebP files are allowed.`);
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`File too large: ${file.name}. Maximum size is 5MB.`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      const newImages = [...images, ...validFiles];
      onImagesChange(newImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const removeExistingImage = (index: number) => {
    if (onExistingImagesChange) {
      const newUrls = existingImageUrls.filter((_, i) => i !== index);
      onExistingImagesChange(newUrls);
    }
  };

  const totalImages = images.length + existingImageUrls.length;

  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Business Images</Label>
      <p className="text-sm text-gray-600">Upload up to {maxImages} high-quality images of your business</p>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || totalImages >= maxImages}
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${uploading || totalImages >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG or WebP (max. 5MB each)
            </p>
          </div>
        </label>
      </div>

      {/* Existing Images */}
      {existingImageUrls.length > 0 && (
        <div>
          <Label className="text-md font-medium text-gray-700 mb-3 block">Current Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {existingImageUrls.map((url, index) => (
              <div key={`existing-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={url}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeExistingImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Image Previews */}
      {images.length > 0 && (
        <div>
          <Label className="text-md font-medium text-gray-700 mb-3 block">New Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((file, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        {totalImages} of {maxImages} images selected
      </p>
    </div>
  );
};

export default ImageUploadSection;
