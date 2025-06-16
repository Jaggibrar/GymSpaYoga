
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './hooks/useAuth';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Gyms from './pages/Gyms';
import Spas from './pages/Spas';
import Yoga from './pages/Yoga';
import BusinessDashboard from './pages/BusinessDashboard';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterTrainer from './pages/RegisterTrainer';
import BusinessBookings from './pages/BusinessBookings';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import PlatformAuditPage from '@/pages/PlatformAuditPage';
import PerformanceMonitor from '@/components/monitoring/PerformanceMonitor';
import AccessibilityHelper from '@/components/accessibility/AccessibilityHelper';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/gyms" element={<Gyms />} />
                <Route path="/spas" element={<Spas />} />
                <Route path="/yoga" element={<Yoga />} />
                <Route path="/dashboard/business" element={<BusinessDashboard />} />
                <Route path="/register-business" element={<RegisterBusiness />} />
                <Route path="/register-trainer" element={<RegisterTrainer />} />
                <Route path="/business-bookings" element={<BusinessBookings />} />
                <Route path="/platform-audit" element={<PlatformAuditPage />} />
              </Routes>
              
              {/* Global Monitoring Components */}
              <PerformanceMonitor />
              <AccessibilityHelper />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
