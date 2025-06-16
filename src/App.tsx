import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import MainNavigation from "@/components/MainNavigation";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import Trainers from "./pages/Trainers";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import UserBookings from "./pages/UserBookings";
import BusinessBookings from "./pages/BusinessBookings";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import BlogList from "./pages/BlogList";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import CTOTestPage from "./pages/CTOTestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <div className="min-h-screen bg-background">
                <MainNavigation />
                <main>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/gyms" element={<Gyms />} />
                    <Route path="/spas" element={<Spas />} />
                    <Route path="/yoga" element={<Yoga />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/register-business" element={<RegisterBusiness />} />
                    <Route path="/register-trainer" element={<RegisterTrainer />} />
                    <Route path="/user-bookings" element={<UserBookings />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/business-bookings" element={<BusinessBookings />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/blog-list" element={<BlogList />} />
                    <Route path="/cto-test" element={<CTOTestPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <ScrollToTopButton />
              </div>
              <Toaster />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
