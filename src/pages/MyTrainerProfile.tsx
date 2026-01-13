import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TrainerProfile = {
  id: string;
  name: string;
  category: string;
  trainer_tier: string;
  status: string;
  location: string;
  bio: string;
  experience: number;
  hourly_rate: number;
  specializations: string[] | null;
  certifications: string | null;
  profile_image_url: string | null;
  created_at: string | null;
};

export default function MyTrainerProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<TrainerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("trainer_profiles")
          .select(
            "id,name,category,trainer_tier,status,location,bio,experience,hourly_rate,specializations,certifications,profile_image_url,created_at"
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          setError(error.message);
          return;
        }

        setProfile(data as TrainerProfile | null);
      } catch (e: any) {
        setError(e?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading your trainer profile…</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Trainer Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {error || "No trainer profile found for your account yet."}
            </p>
            <Button onClick={() => navigate("/register-trainer")}>Go to Registration</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const normalized = (profile.status || "pending").toLowerCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <p className="text-muted-foreground">{profile.location}</p>
              </div>
              <Badge variant={normalized === "approved" ? "default" : "secondary"} className="capitalize">
                {normalized}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {normalized !== "approved" && (
              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
                Your profile will appear publicly in the Trainers section only after approval.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{profile.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tier</p>
                <p className="font-medium capitalize">{profile.trainer_tier}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Experience</p>
                <p className="font-medium">{profile.experience} years</p>
              </div>
              <div>
                <p className="text-muted-foreground">Hourly Rate</p>
                <p className="font-medium">₹{profile.hourly_rate}/hour</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-sm mb-2">Bio</p>
              <p className="leading-relaxed">{profile.bio}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => navigate(`/trainers?refresh=${Date.now()}`)}>
                Go to Trainers
              </Button>
              {profile.status === "approved" && (
                <Button onClick={() => navigate(`/trainers/${profile.id}`)}>
                  View Public Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
