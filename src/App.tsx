
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import AppFooter from "./components/AppFooter";
import { AuthProvider } from "./hooks/useAuth";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalLoadingIndicator from "./components/GlobalLoadingIndicator";
import FavoritesProvider from "./components/FavoritesProvider";
import Breadcrumbs from "./components/Breadcrumbs";

import AdminRoute from "./components/AdminRoute";
import TrainerRoute from "./components/TrainerRoute";
import BusinessRoute from "./components/BusinessRoute";

// Import all pages
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import GymDetails from "./pages/GymDetails";
import Spas from "./pages/Spas";
import SpaDetails from "./pages/SpaDetails";
import Yoga from "./pages/Yoga";
import YogaDetails from "./pages/YogaDetails";
import Trainers from "./pages/Trainers";
import TrainerDetails from "./pages/TrainerDetails";
import BookTrainer from "./pages/BookTrainer";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import MyBlogs from "./pages/MyBlogs";
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
import AdminDashboard from "./pages/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import UserBookings from "./pages/UserBookings";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <GlobalLoadingIndicator />
      <MainNavigation />
      <Breadcrumbs />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/spas" element={<Spas />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerDetails />} />
          <Route path="/book-trainer/:id" element={<BookTrainer />} />
          <Route path="/business/:id" element={<BusinessDetails />} />
          <Route path="/gyms/:id" element={<GymDetails />} />
          <Route path="/spas/:id" element={<SpaDetails />} />
          <Route path="/yoga/:id" element={<YogaDetails />} />
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
          <Route path="/my-blogs" element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/user-bookings" element={
            <ProtectedRoute>
              <UserBookings />
            </ProtectedRoute>
          } />
          <Route path="/business-dashboard" element={
            <ProtectedRoute>
              <BusinessRoute>
                <BusinessDashboard />
              </BusinessRoute>
            </ProtectedRoute>
          } />
          <Route path="/trainer-dashboard" element={
            <ProtectedRoute>
              <TrainerRoute>
                <TrainerDashboard />
              </TrainerRoute>
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
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
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
        <AuthProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Router>
                <AppContent />
              </Router>
            </TooltipProvider>
          </FavoritesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
