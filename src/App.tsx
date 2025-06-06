
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<Index />} />
            <Route path="/gyms" element={<Gyms />} />
            <Route path="/spas" element={<Spas />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/gym/:id" element={<GymDetails />} />
            <Route path="/spa/:id" element={<SpaDetails />} />
            <Route path="/yoga/:id" element={<YogaDetails />} />
            <Route path="/register-business" element={<RegisterBusiness />} />
            <Route path="/register-trainer" element={<RegisterTrainer />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
