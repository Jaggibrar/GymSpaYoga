
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';
import { toast } from 'sonner';

interface ImageUploadSectionProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  images,
  onImagesChange,
  maxImages = 5
}) => {
  const { uploading } = useBusinessImageUpload();
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > maxImages) {
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

      // Create previews
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    
    // Clean up preview URL
    if (previews[index]) {
      URL.revokeObjectURL(previews[index]);
    }
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

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
          disabled={uploading || images.length >= maxImages}
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
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

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
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
      )}

      <p className="text-xs text-gray-500">
        {images.length} of {maxImages} images selected
      </p>
    </div>
  );
};

export default ImageUploadSection;
