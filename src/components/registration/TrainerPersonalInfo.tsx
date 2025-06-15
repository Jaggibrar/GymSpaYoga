
import React from 'react';

interface TrainerPersonalInfoProps {
  formData: any;
  setFormData: (updater: (prev: any) => any) => void;
}

const TrainerPersonalInfo: React.FC<TrainerPersonalInfoProps> = ({ formData, setFormData }) => (
  <div>
    <div className="mb-2">
      <label className="block font-medium mb-1">Name</label>
      <input className="input w-full"
        value={formData.name}
        onChange={e => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
      />
    </div>
    <div className="mb-2">
      <label className="block font-medium mb-1">Phone</label>
      <input className="input w-full"
        value={formData.phone}
        onChange={e => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
      />
    </div>
    <div className="mb-2">
      <label className="block font-medium mb-1">Email</label>
      <input className="input w-full"
        value={formData.email}
        onChange={e => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
      />
    </div>
    <div className="mb-2">
      <label className="block font-medium mb-1">City</label>
      <input className="input w-full"
        value={formData.city}
        onChange={e => setFormData((prev: any) => ({ ...prev, city: e.target.value }))}
      />
    </div>
    <div className="mb-2">
      <label className="block font-medium mb-1">Location</label>
      <input className="input w-full"
        value={formData.location}
        onChange={e => setFormData((prev: any) => ({ ...prev, location: e.target.value }))}
      />
    </div>
  </div>
);

export default TrainerPersonalInfo;
