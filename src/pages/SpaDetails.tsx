
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Clock, Phone, Waves, Users, Wifi, Car, Shield, Camera, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BookingModal from "@/components/BookingModal";

const SpaDetails = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const spaData = {
    1: {
      id: 1,
      name: "Serenity Spa & Wellness",
      category: "Luxury",
      rating: 4.9,
      reviews: 89,
      location: "Koregaon Park, Pune",
      address: "456 North Main Road, Koregaon Park, Pune 411001",
      price: "₹3,500/session",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      services: ["Swedish Massage", "Aromatherapy", "Facial", "Body Wrap", "Sauna", "Steam Bath", "Hot Stone Therapy", "Couples Massage"],
      hours: "9:00 AM - 9:00 PM",
      phone: "+91 98765 43220",
      email: "info@serenityspa.com",
      description: "Immerse yourself in tranquility at our luxury spa. We offer a comprehensive range of wellness treatments designed to rejuvenate your mind, body, and spirit in an atmosphere of pure serenity.",
      therapists: 12,
      facilities: ["Private Treatment Rooms", "Relaxation Lounge", "Hydrotherapy Pool", "Meditation Garden", "Herbal Steam Room"],
      packages: [
        { name: "Relaxation Package", price: "₹3,500", duration: "90 minutes", includes: "Swedish Massage + Facial" },
        { name: "Detox Package", price: "₹5,500", duration: "150 minutes", includes: "Body Wrap + Sauna + Massage" },
        { name: "Couples Retreat", price: "₹8,000", duration: "120 minutes", includes: "Couples Massage + Champagne" }
      ]
    }
  };

  const spaId = Number(id) || 1;
  const spa = spaData[spaId as keyof typeof spaData] || spaData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spas" className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Spas</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Waves className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
              <img src={spa.images[0]} alt={spa.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  {spa.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {spa.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden">
                  <img src={image} alt={`${spa.name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{spa.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{spa.rating}</span>
                    <span className="text-gray-500">({spa.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{spa.price}</p>
                  <p className="text-sm text-gray-500">Starting from</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{spa.location}</p>
                    <p className="text-sm text-gray-600">{spa.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{spa.hours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{spa.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>{spa.therapists} Expert Therapists</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <BookingModal
                  businessName={spa.name}
                  businessType="spa"
                  businessId={spa.id.toString()}
                  price={spa.price}
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Book Treatment
                    </Button>
                  }
                />
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 text-lg py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
              <h2 className="text-2xl font-bold mb-4">About {spa.name}</h2>
              <p className="text-gray-600 leading-relaxed">{spa.description}</p>
            </Card>

            {/* Facilities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Facilities</h2>
              <div className="grid grid-cols-1 gap-3">
                {spa.facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Services */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <div className="flex flex-wrap gap-2">
                {spa.services.map((service) => (
                  <Badge key={service} variant="outline" className="px-3 py-1">
                    {service}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Treatment Packages */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Popular Packages</h2>
              <div className="space-y-4">
                {spa.packages.map((pkg) => (
                  <div key={pkg.name} className="border rounded-lg p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <span className="text-xl font-bold text-blue-600">{pkg.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pkg.duration}</p>
                    <p className="text-sm text-gray-500">{pkg.includes}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaDetails;
