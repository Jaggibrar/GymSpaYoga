
import { Input } from "@/components/ui/input";
import { Upload, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { validateFile } = useImageUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const newPreviewUrls: string[] = [];
    
    files.forEach(file => {
      const validation = validateFile(file);
      if (!validation) {
        validFiles.push(file);
        const url = URL.createObjectURL(file);
        newPreviewUrls.push(url);
      }
    });
    
    setSelectedFiles(validFiles);
    setPreviewUrls(newPreviewUrls);
    onFileChange(e);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
    
    // Create a proper synthetic event for the file input
    const fileList = new DataTransfer();
    newFiles.forEach(file => fileList.items.add(file));
    
    const syntheticEvent = {
      target: {
        files: fileList.files,
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onFileChange(syntheticEvent);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Business Images
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        <p className="text-xl text-gray-600 mb-4">Upload business photos</p>
        <p className="text-gray-500 mb-6">Upload at least 1 high-quality image (JPG, PNG, WebP, max 2MB each)</p>
        
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4" />
          <span>Max file size: 2MB | Supported formats: JPG, PNG, GIF, WebP</span>
        </div>
        
        <Input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
          onChange={handleFileSelect}
          className="max-w-xs mx-auto text-lg"
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {selectedFiles[index]?.name.slice(0, 15)}...
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedFiles.length > 0 && (
        <p className="text-sm text-gray-600 text-center">
          {selectedFiles.length} image{selectedFiles.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
};
