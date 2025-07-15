import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Calendar, Users } from 'lucide-react';
import { useTrainers } from '@/hooks/useTrainers';
import SEOHead from '@/components/SEOHead';
import ListingLayout from '@/components/listing/ListingLayout';
import BookingPanel from '@/components/listing/BookingPanel';
import AboutSection from '@/components/listing/AboutSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trainers, loading } = useTrainers();
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const trainer = trainers.find(t => t.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Trainer Not Found</h2>
            <p className="text-gray-600 mb-6">The trainer you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/trainers')}>
              Back to Trainers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    const colors = {
      certified: 'bg-blue-100 text-blue-700',
      expert: 'bg-purple-100 text-purple-700',
      elite: 'bg-yellow-100 text-yellow-700'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <SEOHead
        title={`${trainer.name} - Personal Trainer | GymSpaYoga`}
        description={`Book a session with ${trainer.name}, a certified personal trainer with ${trainer.experience} years of experience. Specializing in ${trainer.specializations.join(', ')}.`}
        keywords={`personal trainer, ${trainer.name}, fitness coach, ${trainer.specializations.join(', ')}, ${trainer.location}`}
      />
      
      <ListingLayout
        backLink="/trainers"
        backText="Back to Trainers"
        brandIcon={<Users className="h-7 w-7 text-white" />}
        brandGradient="from-purple-500 to-indigo-600"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Trainer Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={trainer.profile_image_url || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-48 h-48 rounded-xl object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-3xl font-bold">{trainer.name}</h1>
                      <Badge className={`${getTierColor(trainer.trainer_tier)} border-0 font-medium capitalize`}>
                        {trainer.trainer_tier}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {trainer.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {trainer.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AboutSection
              businessName={trainer.name}
              description={`${trainer.certifications || 'Certified Personal Trainer'} with ${trainer.experience} years of experience in ${trainer.category}.`}
              icon={<Award className="h-5 w-5 text-white" />}
              gradient="from-purple-500 to-indigo-600"
            />
          </div>

          <div className="lg:col-span-1">
            <BookingPanel
              businessId={trainer.id}
              businessName={trainer.name}
              businessType="trainer"
              rating={trainer.rating || 4.8}
              reviewCount={trainer.reviews_count || 12}
              location={{
                city: trainer.location.split(',')[0] || trainer.location,
                state: trainer.location.split(',')[1] || '',
                address: trainer.location
              }}
              hours={{
                opening: "6:00",
                closing: "22:00"
              }}
              phone={trainer.phone}
              pricing={{
                hourly: trainer.hourly_rate
              }}
            />
          </div>
        </div>
      </ListingLayout>
    </>
  );
};

export default TrainerDetails;