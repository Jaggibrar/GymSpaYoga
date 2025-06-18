
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedRedirect from "@/components/RoleBasedRedirect";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Gyms from "./pages/Gyms";
import GymDetails from "./pages/GymDetails";
import Spas from "./pages/Spas";
import SpaDetails from "./pages/SpaDetails";
import Yoga from "./pages/Yoga";
import YogaDetails from "./pages/YogaDetails";
import Trainers from "./pages/Trainers";
import About from "./pages/About";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Pricing from "./pages/Pricing";
import Explore from "./pages/Explore";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import BlogList from "./pages/BlogList";
import BusinessLanding from "./pages/BusinessLanding";
import PaymentSuccess from "./pages/PaymentSuccess";
import CTOTestPage from "./pages/CTOTestPage";
import SiteAudit from "./pages/SiteAudit";
import PlatformAuditPage from "./pages/PlatformAuditPage";
import NotFound from "./pages/NotFound";

// Protected Pages
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import UserBookings from "./pages/UserBookings";
import ManageBookings from "./pages/ManageBookings";
import BusinessBookings from "./pages/BusinessBookings";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

// Routes that should not show header/footer
const noLayoutRoutes = ["/login", "/signup", "/reset-password"];

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {showLayout && <AppHeader />}
      <main className={showLayout ? "" : "min-h-screen"}>
        {children}
      </main>
      {showLayout && <AppFooter />}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <AppLayout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/gyms" element={<Gyms />} />
                  <Route path="/gym/:id" element={<GymDetails />} />
                  <Route path="/spas" element={<Spas />} />
                  <Route path="/spa/:id" element={<SpaDetails />} />
                  <Route path="/yoga" element={<Yoga />} />
                  <Route path="/yoga/:id" element={<YogaDetails />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/blog-list" element={<BlogList />} />
                  <Route path="/business" element={<BusinessLanding />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/cto-test" element={<CTOTestPage />} />
                  <Route path="/site-audit" element={<SiteAudit />} />
                  <Route path="/platform-audit" element={<PlatformAuditPage />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/register-business" element={<RegisterBusiness />} />
                    <Route path="/register-trainer" element={<RegisterTrainer />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/business-dashboard" element={<BusinessDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-bookings" element={<UserBookings />} />
                    <Route path="/manage-bookings" element={<ManageBookings />} />
                    <Route path="/business-bookings" element={<BusinessBookings />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Route>

                  {/* Role-Based Redirect */}
                  <Route path="/dashboard" element={<RoleBasedRedirect />} />

                  {/* 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
