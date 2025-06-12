
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Gyms from "./pages/Gyms";
import GymDetails from "./pages/GymDetails";
import Spas from "./pages/Spas";
import SpaDetails from "./pages/SpaDetails";
import Yoga from "./pages/Yoga";
import YogaDetails from "./pages/YogaDetails";
import Trainers from "./pages/Trainers";
import UserBookings from "./pages/UserBookings";
import BusinessBookings from "./pages/BusinessBookings";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import AdminDashboard from "./pages/AdminDashboard";
import ManageBookings from "./pages/ManageBookings";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import PasswordReset from "./components/auth/PasswordReset";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProtectedRoute from "./components/ProtectedRoute";
import MainNavigation from "./components/MainNavigation";
import AppFooter from "./components/AppFooter";
import ScrollToTopButton from "./components/ScrollToTopButton";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <MainNavigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/gyms" element={<Gyms />} />
                  <Route path="/gyms/:id" element={<GymDetails />} />
                  <Route path="/spas" element={<Spas />} />
                  <Route path="/spas/:id" element={<SpaDetails />} />
                  <Route path="/yoga" element={<Yoga />} />
                  <Route path="/yoga/:id" element={<YogaDetails />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/blogs" element={<BlogList />} />
                  <Route path="/blogs/:slug" element={<BlogPost />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/register-business" element={<RegisterBusiness />} />
                  <Route path="/register-trainer" element={<RegisterTrainer />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/user-bookings" 
                    element={
                      <ProtectedRoute>
                        <UserBookings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/business-bookings" 
                    element={
                      <ProtectedRoute>
                        <BusinessBookings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/manage-bookings" 
                    element={
                      <ProtectedRoute>
                        <ManageBookings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/calendar" 
                    element={
                      <ProtectedRoute>
                        <Calendar />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <AppFooter />
              <ScrollToTopButton />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
