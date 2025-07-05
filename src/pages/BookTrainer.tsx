import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrainers } from '@/hooks/useTrainers';
import BookingModal from '@/components/BookingModal';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';

const BookTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trainers, loading } = useTrainers();
  const [showBookingModal, setShowBookingModal] = useState(true);
  
  const trainer = trainers.find(t => t.id === id);

  useEffect(() => {
    if (!loading && !trainer) {
      navigate('/trainers');
    }
  }, [trainer, loading, navigate]);

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    navigate(`/trainers/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!trainer) {
    return null;
  }

  return (
    <>
      <SEOHead
        title={`Book ${trainer.name} - Personal Training Session | GymSpaYoga`}
        description={`Book a personal training session with ${trainer.name}. Professional fitness coaching at ₹${trainer.hourly_rate} per session.`}
        keywords={`book trainer, personal training, ${trainer.name}, fitness booking`}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/trainers/${id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trainer Details
          </Button>
        </div>

        <BookingModal
          businessName={trainer.name}
          businessType="trainer"
          businessId={trainer.id}
          price={`₹${trainer.hourly_rate}/session`}
          trigger={
            showBookingModal ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50" onClick={handleCloseBooking}></div>
              </div>
            ) : <></>
          }
        />
      </div>
    </>
  );
};

export default BookTrainer;