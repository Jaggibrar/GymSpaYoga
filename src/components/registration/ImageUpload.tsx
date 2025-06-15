
import { Input } from "@/components/ui/input";
import { Upload, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useBusinessImageUpload } from "@/hooks/useBusinessImageUpload";

interface ImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { validateFile } = useBusinessImageUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(`Selected ${files.length} files for upload`);
    
    if (files.length === 0) {
      clearPreviews();
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    const newPreviewUrls: string[] = [];
    
    files.forEach((file, index) => {
      const validation = validateFile(file);
      if (!validation) {
        validFiles.push(file);
        const url = URL.createObjectURL(file);
        newPreviewUrls.push(url);
        console.log(`File ${index + 1} validated successfully: ${file.name}`);
      } else {
        console.warn(`File ${index + 1} validation failed:`, validation);
      }
    });

    // Clear existing previews
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    setSelectedFiles(validFiles);
    setPreviewUrls(newPreviewUrls);
    
    console.log(`${validFiles.length} files ready for upload`);
    onFileChange(e);
  };

  const removeFile = (index: number) => {
    console.log(`Removing file at index ${index}`);
    
    // Revoke the URL for the removed file
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
    
    // Create a proper synthetic event for the updated file list
    const syntheticEvent = {
      target: {
        files: newFiles.length > 0 ? newFiles : null,
        value: newFiles.length > 0 ? '' : ''
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onFileChange(syntheticEvent);
  };

  const clearPreviews = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Business Images
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
        {previewUrls.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <p className="text-xl text-gray-600 mb-4">Upload business images</p>
            <p className="text-gray-500 mb-6">JPG, PNG, WebP up to 2MB each</p>
            
            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4" />
              <span>Max file size: 2MB per image | Supported formats: JPG, PNG, WebP</span>
            </div>
          </>
        )}
        
        <Input
          id="businessImages"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="max-w-xs mx-auto text-lg"
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <p className="text-sm text-gray-600 text-center">
          Selected: {selectedFiles.length} image(s)
        </p>
      )}
    </div>
  );
};
