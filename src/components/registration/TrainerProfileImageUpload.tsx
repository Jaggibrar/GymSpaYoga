
import { Input } from "@/components/ui/input";
import { Upload, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

interface TrainerProfileImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrainerProfileImageUpload = ({ onFileChange }: TrainerProfileImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { validateFile } = useProfileImageUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      clearPreview();
      return;
    }

    const validation = validateFile(file);
    if (!validation) {
      // Clear existing preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileChange(e);
    } else {
      console.warn(`File ${file.name} validation failed:`, validation);
      clearPreview();
    }
  };

  const removeFile = () => {
    clearPreview();
    
    // Create a proper synthetic event for clearing the file
    const syntheticEvent = {
      target: {
        files: null,
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onFileChange(syntheticEvent);
  };

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Profile Photo
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-200"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <p className="text-xl text-gray-600 mb-4">Upload your professional photo</p>
            <p className="text-gray-500 mb-6">JPG, PNG, WebP up to 2MB</p>
            
            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4" />
              <span>Max file size: 2MB | Supported formats: JPG, PNG, GIF, WebP</span>
            </div>
          </>
        )}
        
        <Input
          id="profileImage"
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
          onChange={handleFileSelect}
          className="max-w-xs mx-auto text-lg"
        />
      </div>
      
      {selectedFile && (
        <p className="text-sm text-gray-600 text-center">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
};
