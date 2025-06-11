

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppFooter from "./components/AppFooter";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ErrorBoundary from "./components/ErrorBoundary";
import MainNavigation from "./components/MainNavigation";
import { AuthProvider } from "./hooks/useAuth";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Gyms from "./pages/Gyms";
import GymDetails from "./pages/GymDetails";
import Spas from "./pages/Spas";
import SpaDetails from "./pages/SpaDetails";
import Yoga from "./pages/Yoga";
import YogaDetails from "./pages/YogaDetails";
import Trainers from "./pages/Trainers";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import RegisterTrainer from "./pages/RegisterTrainer";
import RegisterBusiness from "./pages/RegisterBusiness";
import ManageBookings from "./pages/ManageBookings";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <MainNavigation />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/gyms" element={<Gyms />} />
                      <Route path="/gyms/:id" element={<GymDetails />} />
                      <Route path="/spas" element={<Spas />} />
                      <Route path="/spas/:id" element={<SpaDetails />} />
                      <Route path="/yoga" element={<Yoga />} />
                      <Route path="/yoga/:id" element={<YogaDetails />} />
                      <Route path="/trainers" element={<Trainers />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                      <Route path="/register-trainer" element={<ProtectedRoute><RegisterTrainer /></ProtectedRoute>} />
                      <Route path="/register-business" element={<ProtectedRoute><RegisterBusiness /></ProtectedRoute>} />
                      <Route path="/manage-bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
                      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                      <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
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
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

