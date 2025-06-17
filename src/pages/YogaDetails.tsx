
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Heart, Users, Wifi, Car, Shield, Camera, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BookingModal from "@/components/BookingModal";

const YogaDetails = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const yogaData = {
    1: {
      id: 1,
      name: "Zen Yoga Studio",
      category: "Standard",
      rating: 4.7,
      reviews: 76,
      location: "Indiranagar, Bangalore",
      address: "789 100 Feet Road, Indiranagar, Bangalore 560038",
      price: "₹1,200/month",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      classes: ["Hatha Yoga", "Vinyasa", "Meditation", "Prenatal Yoga", "Yin Yoga", "Power Yoga", "Restorative Yoga"],
      hours: "6:00 AM - 9:00 PM",
      phone: "+91 98765 43230",
      email: "info@zenyoga.com",
      description: "Experience authentic yoga practice in a peaceful environment. Our studio offers traditional and modern yoga styles taught by certified instructors, focusing on mind-body harmony and spiritual well-being.",
      instructors: 8,
      features: ["Spacious Practice Halls", "Natural Lighting", "Meditation Garden", "Props Available", "Air Conditioning", "Sound System"],
      schedule: [
        { time: "6:00 AM", class: "Morning Hatha", instructor: "Priya Sharma" },
        { time: "7:30 AM", class: "Vinyasa Flow", instructor: "Arjun Patel" },
        { time: "6:00 PM", class: "Evening Meditation", instructor: "Meera Singh" },
        { time: "7:30 PM", class: "Restorative Yoga", instructor: "Vikram Rao" }
      ],
      memberships: [
        { name: "Monthly", price: "₹1,200", duration: "1 Month", classes: "Unlimited" },
        { name: "Quarterly", price: "₹3,200", duration: "3 Months", classes: "Unlimited", savings: "₹400" },
        { name: "Drop-in", price: "₹300", duration: "Single Class", classes: "1 Class" }
      ]
    }
  };

  const yogaId = Number(id) || 1;
  const studio = yogaData[yogaId as keyof typeof yogaData] || yogaData[1];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/yoga" className="flex items-center space-x-2 hover:text-green-600 transition-colors duration-300">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Yoga</span>
              </Link>
              <Link to="/" className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  GymSpaYoga
                </h1>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
                <img src={studio.images[0]} alt={studio.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    {studio.category}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {studio.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                    <img src={image} alt={`${studio.name} ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{studio.name}</h1>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{studio.rating}</span>
                      <span className="text-gray-500">({studio.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{studio.price}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{studio.location}</p>
                      <p className="text-sm text-gray-600">{studio.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{studio.hours}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{studio.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>{studio.instructors} Certified Instructors</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <BookingModal
                    businessName={studio.name}
                    businessType="yoga"
                    businessId={studio.id.toString()}
                    price={studio.price}
                    trigger={
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Book Class
                      </Button>
                    }
                  />
                  <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Call Now
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {studio.name}</h2>
                <p className="text-gray-600 leading-relaxed">{studio.description}</p>
              </Card>

              {/* Features */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Studio Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {studio.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Classes */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Yoga Classes</h2>
                <div className="flex flex-wrap gap-2">
                  {studio.classes.map((yogaClass) => (
                    <Badge key={yogaClass} variant="outline" className="px-3 py-1">
                      {yogaClass}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Schedule */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
                <div className="space-y-3">
                  {studio.schedule.map((session) => (
                    <div key={session.time} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{session.class}</p>
                        <p className="text-sm text-gray-600">with {session.instructor}</p>
                      </div>
                      <span className="font-semibold text-green-600">{session.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Membership Options */}
            <div>
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Membership Options</h2>
                <div className="space-y-4">
                  {studio.memberships.map((membership) => (
                    <div key={membership.name} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{membership.name}</h3>
                        <span className="text-xl font-bold text-green-600">{membership.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{membership.duration}</p>
                      <p className="text-sm text-gray-500 mb-2">{membership.classes}</p>
                      {membership.savings && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                          Save {membership.savings}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YogaDetails;
