
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { AuthProvider } from "./hooks/useAuth";

// Import all pages
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import Trainers from "./pages/Trainers";
import Blogs from "./pages/Blogs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import About from "./pages/About";
import Support from "./pages/Support";
import Pricing from "./pages/Pricing";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import Explore from "./pages/Explore";
import BusinessDashboard from "./pages/BusinessDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gyms" element={<Gyms />} />
                <Route path="/spas" element={<Spas />} />
                <Route path="/yoga" element={<Yoga />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/register-business" element={<RegisterBusiness />} />
                <Route path="/register-trainer" element={<RegisterTrainer />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/business-dashboard" element={<BusinessDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                {navItems.map(({ to, page }) => (
                  <Route key={to} path={to} element={page} />
                ))}
                {/* Catch all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <AppFooter />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
