
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({ onFileChange }: ImageUploadProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Business Images
      </h3>
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        <p className="text-xl text-gray-600 mb-4">Upload business photos</p>
        <p className="text-gray-500 mb-6">Upload at least 5 high-quality images (JPG, PNG, max 5MB each)</p>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="max-w-xs mx-auto text-lg"
        />
      </div>
    </div>
  );
};
