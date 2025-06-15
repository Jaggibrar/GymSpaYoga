
import React from 'react';
import { UploadCloud } from 'lucide-react';

interface TrainerUploadsProps {
  formData: any;
  handleFileChange: (field: "profileImage" | "certificationFile", file: File | null) => void;
}

const TrainerUploads: React.FC<TrainerUploadsProps> = ({ formData, handleFileChange }) => (
  <>
    <div className="mb-2">
      <label className="block font-medium mb-1">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => handleFileChange('profileImage', e.target.files && e.target.files[0] || null)}
      />
      {formData.profileImage && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(formData.profileImage)}
            alt="Preview"
            className="h-16 rounded"
          />
        </div>
      )}
    </div>
    <div className="mb-3">
      <label className="block font-medium mb-1">Certification Document</label>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={e => handleFileChange('certificationFile', e.target.files && e.target.files[0] || null)}
      />
      {formData.certificationFile && (
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-700">
          <UploadCloud className="w-4 h-4" /> {formData.certificationFile.name}
        </div>
      )}
    </div>
  </>
);

export default TrainerUploads;
