
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileImageUploader } from "@/components/profile/ProfileImageUploader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const EnhancedProfile = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();

  const getUserName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || "User";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <ProfileImageUploader 
              currentImageUrl={profile?.avatar_url}
              userName={getUserName()}
            />
            <div>
              <CardTitle className="text-2xl">
                {getUserName()}
              </CardTitle>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              <User className="h-3 w-3 mr-1" />
              Member since {new Date(user?.created_at || '').toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/register-business">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Register Your Business</h3>
              <p className="text-sm text-gray-600">List your gym, spa, or yoga studio</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/register-trainer">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Become a Trainer</h3>
              <p className="text-sm text-gray-600">Offer personal training services</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Profile Form */}
      <ProfileForm profile={profile} />
    </div>
  );
};
