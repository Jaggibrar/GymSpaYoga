
import React from 'react';

interface TrainerSuccessMessageProps {
  successMessage: string | null;
}

const TrainerSuccessMessage: React.FC<TrainerSuccessMessageProps> = ({ successMessage }) =>
  successMessage ? (
    <div className="bg-green-50 text-green-700 border border-green-200 rounded px-4 py-3 mb-4 text-center">
      {successMessage}
    </div>
  ) : null;

export default TrainerSuccessMessage;
