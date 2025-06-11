
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useGyms } from "@/hooks/useGyms";
import FilteredListings from "@/components/FilteredListings";
import TrainersSection from "@/components/TrainersSection";
import LoadingScreen from "@/components/LoadingScreen";
import AppHeader from "@/components/AppHeader";
import PageHero from "@/components/PageHero";
import AppFooter from "@/components/AppFooter";

const Gyms = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { gyms, loading: gymsLoading, error } = useGyms();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  if (error) {
    toast.error(error);
  }

  if (isLoading || gymsLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <AppHeader onLogout={handleLogout} />
      
      <PageHero
        title="Find Your Perfect"
        subtitle="Gym"
        description="Discover state-of-the-art fitness centers near you."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <FilteredListings listings={gyms} pageType="gym" />
      <TrainersSection />
      <AppFooter />
    </div>
  );
};

export default Gyms;
