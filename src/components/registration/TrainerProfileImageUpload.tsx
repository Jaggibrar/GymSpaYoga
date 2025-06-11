
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface TrainerProfileImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrainerProfileImageUpload = ({ onFileChange }: TrainerProfileImageUploadProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Profile Photo
      </h3>
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-16 w-16 mx-auto text-gray-400 mb-6" />
        <p className="text-xl text-gray-600 mb-4">Upload your professional photo</p>
        <p className="text-gray-500 mb-6">JPG, PNG up to 5MB</p>
        <Input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="max-w-xs mx-auto text-lg"
        />
      </div>
    </div>
  );
};
