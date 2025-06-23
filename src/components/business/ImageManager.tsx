
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinessImageUpload } from '@/hooks/useBusinessImageUpload';

interface ImageManagerProps {
  images: string[];
  onImagesUpdate: (images: string[]) => void;
  maxImages?: number;
}

const ImageManager: React.FC<ImageManagerProps> = ({ 
  images, 
  onImagesUpdate, 
  maxImages = 5 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { uploadMultipleImages, uploading } = useBusinessImageUpload();

  const handleImageUpload = async (files: File[]) => {
    if (images.length + files.length > maxImages) {
      toast.error(`You can upload maximum ${maxImages} images`);
      return;
    }

    try {
      const uploadedUrls = await uploadMultipleImages(files);
      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls];
        onImagesUpdate(newImages);
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    onImagesUpdate(newImages);
    toast.success('Image removed successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ImageIcon className="h-4 w-4 mr-2" />
          Manage Images ({images.length}/{maxImages})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Business Images</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Current Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Images ({images.length}/{maxImages})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((url, index) => (
                <Card key={index} className="relative group">
                  <CardContent className="p-2">
                    <img 
                      src={url} 
                      alt={`Business image ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upload New Images */}
          {images.length < maxImages && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Add New Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">
                    Upload Business Images
                  </h4>
                  <p className="text-gray-500 mb-4">
                    You can upload {maxImages - images.length} more image(s)
                  </p>
                  <label className="cursor-pointer">
                    <Button disabled={uploading} className="relative">
                      {uploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Choose Images
                    </Button>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          handleImageUpload(files);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {images.length >= maxImages && (
            <div className="text-center py-4">
              <p className="text-amber-600 font-medium">
                Maximum {maxImages} images reached. Remove some images to add new ones.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageManager;
