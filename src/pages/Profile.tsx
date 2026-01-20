
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";
import { EnhancedProfile } from "@/components/EnhancedProfile";
import SEOHead from "@/components/SEOHead";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, loading } = useUserProfile();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 md:h-20 md:w-20 border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="text-muted-foreground font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="My Profile | GymSpaYoga"
        description="Manage your GymSpaYoga profile, preferences, and account settings. Update your fitness goals and wellness preferences."
        keywords="user profile, account settings, fitness goals, wellness preferences"
        noindex={true}
      />
      <div className="min-h-screen bg-muted/30">
      <div className="mobile-container py-6 md:py-10">
        <EnhancedProfile />
      </div>
    </div>
    </>
  );
};

export default Profile;
