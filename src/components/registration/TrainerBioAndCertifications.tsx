
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TrainerBioAndCertificationsProps {
  bio: string;
  certifications: string;
  onBioChange: (bio: string) => void;
  onCertificationsChange: (certifications: string) => void;
}

export const TrainerBioAndCertifications = ({
  bio,
  certifications,
  onBioChange,
  onCertificationsChange
}: TrainerBioAndCertificationsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="bio" className="text-lg font-medium text-gray-700">Professional Bio *</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Tell us about your experience, training philosophy, and what makes you unique..."
          required
          className="min-h-[120px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="certifications" className="text-lg font-medium text-gray-700">Certifications</Label>
        <Textarea
          id="certifications"
          value={certifications}
          onChange={(e) => onCertificationsChange(e.target.value)}
          placeholder="List your certifications, separated by commas"
          className="min-h-[100px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};
