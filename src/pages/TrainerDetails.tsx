import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Calendar, Users, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useTrainers, Trainer } from '@/hooks/useTrainers';
import { useGeolocation } from '@/hooks/useGeolocation';
import SEOHead from '@/components/SEOHead';
import ListingLayout from '@/components/listing/ListingLayout';
import BookingPanel from '@/components/listing/BookingPanel';
import AboutSection from '@/components/listing/AboutSection';
import EnhancedImageGallery from '@/components/EnhancedImageGallery';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrainerById } = useTrainers();
  const { position, getCurrentPosition } = useGeolocation();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Generate short display ID from full UUID
  const getShortId = (fullId: string) => {
    return fullId.split('-')[0].toUpperCase();
  };
  
  useEffect(() => {
    const fetchTrainer = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const trainerData = await getTrainerById(id);
        setTrainer(trainerData);
      } catch (error) {
        console.error('Error fetching trainer:', error);
        setTrainer(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrainer();
  }, [id, getTrainerById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-muted-foreground mt-4">Loading trainer profile...</p>
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="text-center p-8">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Trainer Not Found</h2>
            <p className="text-muted-foreground mb-6">The trainer you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/trainers')} className="rounded-xl">
              Back to Trainers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTierInfo = (tier: string) => {
    const tiers = {
      certified: {
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
        icon: CheckCircle
      },
      expert: {
        color: 'bg-purple-50 text-purple-700 border-purple-200',
        gradient: 'from-purple-500 to-purple-600',
        icon: Award
      },
      elite: {
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        gradient: 'from-amber-500 to-amber-600',
        icon: Star
      }
    };
    return tiers[tier as keyof typeof tiers] || tiers.certified;
  };

  const tierInfo = getTierInfo(trainer.trainer_tier);
  const TierIcon = tierInfo.icon;

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Profile Gallery */}
            <div className="mb-8">
              <EnhancedImageGallery
                images={trainer.profile_image_url ? [trainer.profile_image_url] : []}
                name={trainer.name}
                category={trainer.category}
                aspectRatio="aspect-[16/10]"
                showThumbnails={false}
                showControls={true}
              />
            </div>

            {/* Enhanced Trainer Profile Card */}
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Header Section */}
                 <div className={`bg-gradient-to-r ${tierInfo.gradient} p-8 text-white`}>
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                       <TierIcon className="h-8 w-8" />
                       <div>
                         <h1 className="text-4xl font-bold">{trainer.name}</h1>
                         <p className="text-xl opacity-90 capitalize">{trainer.trainer_tier} Trainer</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                         <p className="text-xs opacity-80">Trainer ID</p>
                         <p className="font-mono font-semibold text-sm">{getShortId(trainer.id)}</p>
                       </div>
                     </div>
                   </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">{trainer.rating || 4.8}</p>
                        <p className="text-sm opacity-80">Rating</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">{trainer.experience} Years</p>
                        <p className="text-sm opacity-80">Experience</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-2">
                       <MapPin className="h-5 w-5" />
                       <div>
                         <p className="font-semibold">{trainer.location.split(',')[0]}</p>
                         <p className="text-sm opacity-80">
                           {position ? 'Near you' : 'Location'}
                         </p>
                         {position && (
                           <button 
                             onClick={getCurrentPosition}
                             className="text-xs opacity-60 hover:opacity-80 transition-opacity"
                           >
                             Update location
                           </button>
                         )}
                       </div>
                     </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground">About {trainer.name}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Specializations</h4>
                    <div className="flex flex-wrap gap-3">
                      {trainer.specializations.map((spec, index) => (
                        <Badge 
                          key={index} 
                          className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 text-sm font-medium"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {trainer.certifications && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-foreground">Certifications</h4>
                      <p className="text-muted-foreground">{trainer.certifications}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <AboutSection
              businessName={trainer.name}
              description={`Professional ${trainer.category} trainer with ${trainer.experience} years of experience helping clients achieve their fitness goals.`}
              icon={<Award className="h-5 w-5 text-white" />}
              gradient={tierInfo.gradient}
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