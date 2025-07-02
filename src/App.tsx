
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import AppFooter from "./components/AppFooter";
import { AuthProvider } from "./hooks/useAuth";
import { LoadingProvider } from "./contexts/LoadingContext";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalLoadingIndicator from "./components/GlobalLoadingIndicator";

// Import all pages
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import Trainers from "./pages/Trainers";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import Explore from "./pages/Explore";
import BusinessDashboard from "./pages/BusinessDashboard";
import EditListing from "./pages/EditListing";
import BusinessDetails from "./pages/BusinessDetails";
import CreateListing from "./pages/CreateListing";
import NotFound from "./pages/NotFound";
import MainNavigation from "./components/MainNavigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <GlobalLoadingIndicator />
      <MainNavigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/spas" element={<Spas />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/business/:id" element={<BusinessDetails />} />
          <Route path="/gyms/:id" element={<BusinessDetails />} />
          <Route path="/spas/:id" element={<BusinessDetails />} />
          <Route path="/yoga/:id" element={<BusinessDetails />} />
          <Route path="/register-business" element={<RegisterBusiness />} />
          <Route path="/register-trainer" element={<RegisterTrainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/business-dashboard" element={
            <ProtectedRoute>
              <BusinessDashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-listing" element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          } />
          <Route path="/edit-listing/:id" element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AppFooter />
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <AuthProvider>
            <TooltipProvider>
              <Router>
                <AppContent />
              </Router>
            </TooltipProvider>
          </AuthProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
