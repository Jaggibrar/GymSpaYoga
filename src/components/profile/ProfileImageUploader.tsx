
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ProfileImageUploaderProps {
  currentImageUrl?: string;
  userName?: string;
  onImageUploaded?: (url: string) => void;
}

export const ProfileImageUploader = ({ 
  currentImageUrl, 
  userName = 'User',
  onImageUploaded 
}: ProfileImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadProfileImage, uploading } = useProfileImageUpload();
  const { updateProfile } = useUserProfile();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    const imageUrl = await uploadProfileImage(file);
    if (imageUrl) {
      // Update user profile with new image URL
      await updateProfile({ avatar_url: imageUrl });
      onImageUploaded?.(imageUrl);
      setPreviewUrl(null);
    }
  };

  const getUserInitials = () => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={previewUrl || currentImageUrl} />
          <AvatarFallback className="bg-[#0A45FF] text-white text-xl">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
        
        <Button
          size="sm"
          variant="outline"
          className="absolute bottom-0 right-0 rounded-full p-2 h-8 w-8"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A45FF]" />
          ) : (
            <Camera className="h-3 w-3" />
          )}
        </Button>
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="text-xs"
      >
        <Upload className="h-3 w-3 mr-1" />
        {uploading ? 'Uploading...' : 'Change Photo'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
