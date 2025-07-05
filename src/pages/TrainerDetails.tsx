import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Phone, Mail, Award, Clock, Users, Calendar, ArrowLeft } from 'lucide-react';
import { useTrainers } from '@/hooks/useTrainers';
import BookingModal from '@/components/BookingModal';
import SEOHead from '@/components/SEOHead';

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
      
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/trainers')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trainers
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
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
                      
                      <div className="flex items-center gap-4 mb-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{trainer.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{trainer.experience} years experience</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span>{trainer.rating || 4.8} ({trainer.reviews_count || 12} reviews)</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {trainer.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {trainer.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{trainer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{trainer.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About {trainer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <p className="text-gray-600">{trainer.certifications || 'Certified Personal Trainer, Fitness Specialist'}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Training Categories</h4>
                      <p className="text-gray-600 capitalize">{trainer.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-center">Book a Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      ₹{trainer.hourly_rate}
                    </div>
                    <div className="text-gray-500">per session</div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white mb-4"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before session
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        <BookingModal
          businessName={trainer.name}
          businessType="trainer"
          businessId={trainer.id}
          price={`₹${trainer.hourly_rate}/session`}
          trigger={
            showBookingModal ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50" onClick={() => setShowBookingModal(false)}></div>
              </div>
            ) : <></>
          }
        />
      </div>
    </>
  );
};

export default TrainerDetails;