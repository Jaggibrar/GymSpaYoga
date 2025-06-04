
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gyms from "./pages/Gyms";
import Spas from "./pages/Spas";
import Yoga from "./pages/Yoga";
import GymDetails from "./pages/GymDetails";
import SpaDetails from "./pages/SpaDetails";
import YogaDetails from "./pages/YogaDetails";
import RegisterBusiness from "./pages/RegisterBusiness";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/spas" element={<Spas />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/gym/:id" element={<GymDetails />} />
          <Route path="/spa/:id" element={<SpaDetails />} />
          <Route path="/yoga/:id" element={<YogaDetails />} />
          <Route path="/register-business" element={<RegisterBusiness />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
