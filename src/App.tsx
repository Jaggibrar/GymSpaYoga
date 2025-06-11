
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import Trainers from "./pages/Trainers";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import ManageBookings from "./pages/ManageBookings";
import AdminDashboard from "./pages/AdminDashboard";
import GymDetails from "./pages/GymDetails";
import SpaDetails from "./pages/SpaDetails";
import YogaDetails from "./pages/YogaDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/gyms" element={<Gyms />} />
                  <Route path="/spas" element={<Spas />} />
                  <Route path="/yoga" element={<Yoga />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/register-business" element={<RegisterBusiness />} />
                  <Route path="/register-trainer" element={<RegisterTrainer />} />
                  <Route 
                    path="/manage-bookings" 
                    element={
                      <ProtectedRoute>
                        <ManageBookings />
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
                  <Route path="/gym/:id" element={<GymDetails />} />
                  <Route path="/spa/:id" element={<SpaDetails />} />
                  <Route path="/yoga/:id" element={<YogaDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
