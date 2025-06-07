
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import Trainers from "./pages/Trainers";
import GymDetails from "./pages/GymDetails";
import SpaDetails from "./pages/SpaDetails";
import YogaDetails from "./pages/YogaDetails";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterTrainer from "./pages/RegisterTrainer";
import ManageBookings from "./pages/ManageBookings";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/gyms" element={
              <ProtectedRoute>
                <Gyms />
              </ProtectedRoute>
            } />
            <Route path="/spas" element={
              <ProtectedRoute>
                <Spas />
              </ProtectedRoute>
            } />
            <Route path="/yoga" element={
              <ProtectedRoute>
                <Yoga />
              </ProtectedRoute>
            } />
            <Route path="/trainers" element={
              <ProtectedRoute>
                <Trainers />
              </ProtectedRoute>
            } />
            <Route path="/gym/:id" element={
              <ProtectedRoute>
                <GymDetails />
              </ProtectedRoute>
            } />
            <Route path="/spa/:id" element={
              <ProtectedRoute>
                <SpaDetails />
              </ProtectedRoute>
            } />
            <Route path="/yoga/:id" element={
              <ProtectedRoute>
                <YogaDetails />
              </ProtectedRoute>
            } />
            <Route path="/register-business" element={
              <ProtectedRoute>
                <RegisterBusiness />
              </ProtectedRoute>
            } />
            <Route path="/register-trainer" element={
              <ProtectedRoute>
                <RegisterTrainer />
              </ProtectedRoute>
            } />
            <Route path="/manage-bookings" element={
              <ProtectedRoute>
                <ManageBookings />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            <Route path="/blogs" element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            } />
            <Route path="/pricing" element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            } />
            <Route path="/support" element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTopButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
