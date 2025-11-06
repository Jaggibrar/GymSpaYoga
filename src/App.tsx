
import React from "react";
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
import SEORedirectHandler from "./components/SEORedirectHandler";
import { AdvancedSEOManager } from "./components/SEO/AdvancedSEOManager";
import AccessibilityEnhancer from "./components/SEO/AccessibilityEnhancer";
import PerformanceOptimizer from "./components/SEO/PerformanceOptimizer";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import ScrollProgressBar from "./components/ScrollProgressBar";

import PerformanceWrapper from "./components/PerformanceWrapper";

import AdminRoute from "./components/AdminRoute";
import TrainerRoute from "./components/TrainerRoute";
import BusinessRoute from "./components/BusinessRoute";
import MainNavigation from "./components/MainNavigation";
import ProtectedRoute from "./components/ProtectedRoute";
// Lazy-load pages to improve initial load performance
const Index = React.lazy(() => import("./pages/Index"));
const Gyms = React.lazy(() => import("./pages/Gyms"));
const GymDetails = React.lazy(() => import("./pages/GymDetails"));
const Spas = React.lazy(() => import("./pages/Spas"));
const SpaDetails = React.lazy(() => import("./pages/SpaDetails"));
const Yoga = React.lazy(() => import("./pages/Yoga"));
const YogaDetails = React.lazy(() => import("./pages/YogaDetails"));
const Trainers = React.lazy(() => import("./pages/Trainers"));
const Therapists = React.lazy(() => import("./pages/Therapists"));
const TherapistDetails = React.lazy(() => import("./pages/TherapistDetails"));
const TrainerDetails = React.lazy(() => import("./pages/TrainerDetails"));
const BookTrainer = React.lazy(() => import("./pages/BookTrainer"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const MyBlogs = React.lazy(() => import("./pages/MyBlogs"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const About = React.lazy(() => import("./pages/About"));
const Support = React.lazy(() => import("./pages/Support"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const RegisterBusiness = React.lazy(() => import("./pages/RegisterBusiness"));
const RegisterTrainer = React.lazy(() => import("./pages/RegisterTrainer"));
const Explore = React.lazy(() => import("./pages/Explore"));
const BusinessDashboard = React.lazy(() => import("./pages/BusinessDashboard"));
const EditListing = React.lazy(() => import("./pages/EditListing"));
const BusinessDetails = React.lazy(() => import("./pages/BusinessDetails"));
const CreateListing = React.lazy(() => import("./pages/CreateListing"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const TrainerDashboard = React.lazy(() => import("./pages/TrainerDashboard"));
const UserBookings = React.lazy(() => import("./pages/UserBookings"));
const Favorites = React.lazy(() => import("./pages/Favorites"));


const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background font-sans antialiased overflow-x-hidden max-w-full w-full">
      <ScrollProgressBar />
      <SEORedirectHandler />
      <AdvancedSEOManager />
      <AccessibilityEnhancer />
      <PerformanceOptimizer />
      <AnalyticsTracker />
      <GlobalLoadingIndicator />
      <MainNavigation />
      <Breadcrumbs />
      <main className="flex-1 overflow-x-hidden w-full" id="main-content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/spas" element={<Spas />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerDetails />} />
          <Route path="/book-trainer/:id" element={<BookTrainer />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/therapists/:id" element={<TherapistDetails />} />
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
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="/business-dashboard" element={
            <ProtectedRoute>
              <BusinessRoute>
                <ErrorBoundary>
                  <BusinessDashboard />
                </ErrorBoundary>
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
      <PerformanceWrapper>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FavoritesProvider>
              <TooltipProvider>
                <Router>
                  <AnalyticsProvider>
                    <React.Suspense fallback={<GlobalLoadingIndicator />}>
                      <AppContent />
                    </React.Suspense>
                  </AnalyticsProvider>
                </Router>
              </TooltipProvider>
            </FavoritesProvider>
          </AuthProvider>
        </QueryClientProvider>
      </PerformanceWrapper>
    </ErrorBoundary>
  );
};

export default App;
