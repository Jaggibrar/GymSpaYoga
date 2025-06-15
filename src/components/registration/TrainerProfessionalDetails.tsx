
import React from 'react';
import { Dumbbell, Waves, Heart } from 'lucide-react';

interface TrainerProfessionalDetailsProps {
  formData: any;
  setFormData: (updater: (prev: any) => any) => void;
  categories: any[];
  specializations: Record<string, string[]>;
  onSpecializationChange: (spec: string, checked: boolean) => void;
}

const TrainerProfessionalDetails: React.FC<TrainerProfessionalDetailsProps> = ({
  formData, setFormData, categories, specializations, onSpecializationChange,
}) => (
  <>
    <div className="mb-2">
      <label className="block font-medium mb-1">Area of Expertise</label>
      <select className="input w-full" value={formData.category}
        onChange={e => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}>
        <option value="">Select...</option>
        {categories.map((cat: any) =>
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        )}
      </select>
    </div>
    <div className="flex gap-2 mb-2">
      <div className="flex-1">
        <label className="block font-medium mb-1">Experience (years)</label>
        <input className="input w-full" type="number" min={0}
          value={formData.experience}
          onChange={e => setFormData((prev: any) => ({ ...prev, experience: e.target.value }))}
        />
      </div>
      <div className="flex-1">
        <label className="block font-medium mb-1">Hourly Rate (₹)</label>
        <input className="input w-full" type="number" min={0}
          value={formData.hourlyRate}
          onChange={e => setFormData((prev: any) => ({ ...prev, hourlyRate: e.target.value }))}
        />
      </div>
    </div>
    <div className="mb-3">
      <label className="block font-medium mb-1">Specializations</label>
      <div className="flex flex-wrap gap-2">
        {(specializations[formData.category as keyof typeof specializations] || []).map(spec =>
          <label key={spec} className="flex items-center gap-1 text-xs border rounded px-2 py-1">
            <input
              type="checkbox"
              checked={formData.specializations.includes(spec)}
              onChange={e => onSpecializationChange(spec, e.target.checked)}
            />
            {spec}
          </label>
        )}
      </div>
    </div>
    <div className="mb-2">
      <label className="block font-medium mb-1">Short Bio</label>
      <textarea className="input w-full min-h-[60px]"
        value={formData.bio}
        onChange={e => setFormData((prev: any) => ({ ...prev, bio: e.target.value }))}
      />
    </div>
  </>
);

export default TrainerProfessionalDetails;
