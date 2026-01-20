
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users, Mail, User, MapPin, Calendar, Crown, Star, Edit3, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileImageUploader } from "@/components/profile/ProfileImageUploader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const EnhancedProfile = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();

  const getUserName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || "User";
  };

  const getJoinDate = () => {
    return new Date(user?.created_at || '').toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Modern Hero Header */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-primary/5 rounded-3xl"></div>
        <div className="absolute inset-0 bg-background/80 rounded-3xl"></div>
        
        <Card className="relative border-0 shadow-xl bg-background/95 backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-32 -translate-x-32"></div>
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <ProfileImageUploader 
                    currentImageUrl={profile?.avatar_url}
                    userName={getUserName()}
                  />
                  <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  <Crown className="h-4 w-4 mr-2" />
                  Premium Member
                </Badge>
              </div>

              {/* User Info Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {getUserName()}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-lg">{user?.email}</span>
                    </div>
                    <div className="hidden md:block w-1 h-1 bg-border rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Member since {getJoinDate()}</span>
                    </div>
                  </div>
                  {profile?.city && profile?.state && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.city}, {profile.state}</span>
                    </div>
                  )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-2xl">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-primary/80">Bookings</div>
                  </div>
                  <div className="text-center p-4 bg-[#E85D04]/10 rounded-2xl">
                    <div className="text-2xl font-bold text-[#E85D04]">4.9</div>
                    <div className="text-sm text-[#E85D04]/80 flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-[#2E7D32]/10 rounded-2xl">
                    <div className="text-2xl font-bold text-[#2E7D32]">8</div>
                    <div className="text-sm text-[#2E7D32]/80">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/register-business" className="group">
          <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 bg-[#E85D04]/5 rounded-2xl overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E85D04]/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-[#E85D04] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Register Your Business</h3>
                <p className="text-muted-foreground mb-4">List your gym, spa, or yoga studio and reach more customers</p>
                <Badge className="bg-[#E85D04]/10 text-[#E85D04] px-3 py-1 rounded-full text-sm">
                  Start Earning
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/register-trainer" className="group">
          <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 bg-primary/5 rounded-2xl overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Become a Trainer</h3>
                <p className="text-muted-foreground mb-4">Offer personal training services and build your client base</p>
                <Badge className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  Join Network
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Profile Form with Modern Styling */}
      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-background">
        <CardHeader className="bg-muted/50 p-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                Personal Information
              </CardTitle>
              <p className="text-muted-foreground mt-2">Manage your profile details and preferences</p>
            </div>
            <Button variant="outline" className="rounded-xl border-2 hover:border-primary hover:text-primary transition-colors">
              <Edit3 className="h-4 w-4 mr-2" />
              Quick Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
};
