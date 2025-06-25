import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { AuthProvider } from "./hooks/useAuth";
import { useScrollToTop } from '@/hooks/useScrollToTop';

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
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import TrainerDashboard from "./pages/TrainerDashboard";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Blog from "./pages/Blog";
import WriteBlog from "./pages/WriteBlog";

const queryClient = new QueryClient();

const App = () => {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <AppHeader />
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/write-blog" element={<WriteBlog />} />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/business-dashboard" element={
                <ProtectedRoute requiredRole="business_owner">
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/trainer-dashboard" element={
                <ProtectedRoute requiredRole="trainer">
                  <TrainerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/edit-listing/:id" element={
                <ProtectedRoute requiredRole="business_owner">
                  <EditListing />
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <AppFooter />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
