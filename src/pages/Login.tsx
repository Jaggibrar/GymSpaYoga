
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        navigate('/');
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          {/* Logo and Icon */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-blue-600">GymSpaYoga.com</h1>
          </div>

          {/* Login Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 text-base bg-gray-100 border-0 rounded-xl px-4 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:border-0"
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 text-base bg-gray-100 border-0 rounded-xl px-4 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:border-0"
                />
              </div>
              
              <div className="text-center mb-6">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Forgot password?
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? 'Please wait...' : 'Login'}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-600 text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Wellness Illustration */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 relative overflow-hidden">
        {/* Yoga Woman in Tree Pose (Foreground) */}
        <div className="absolute bottom-8 right-1/4 z-30">
          <div className="w-32 h-48 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-full rounded-b-lg shadow-lg relative">
            {/* Head */}
            <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
            {/* Hair */}
            <div className="w-6 h-6 bg-amber-800 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2"></div>
            {/* Arms in tree pose */}
            <div className="absolute top-8 left-0 w-6 h-2 bg-amber-200 rounded-full transform -rotate-45"></div>
            <div className="absolute top-8 right-0 w-6 h-2 bg-amber-200 rounded-full transform rotate-45"></div>
            {/* Standing leg */}
            <div className="absolute bottom-0 left-1/2 w-3 h-12 bg-blue-500 transform -translate-x-1/2"></div>
            {/* Bent leg */}
            <div className="absolute bottom-8 right-2 w-3 h-8 bg-blue-500 transform rotate-90"></div>
          </div>
        </div>

        {/* Gym Bench Press (Middle) */}
        <div className="absolute top-1/3 left-1/4 z-20">
          <div className="relative">
            {/* Bench */}
            <div className="w-20 h-6 bg-gray-300 rounded-lg shadow-md"></div>
            {/* Barbell */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-600 rounded-full"></div>
            {/* Weights */}
            <div className="absolute -top-3 left-0 w-3 h-4 bg-gray-700 rounded"></div>
            <div className="absolute -top-3 right-0 w-3 h-4 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Spa Massage Scene (Background) */}
        <div className="absolute top-1/2 left-1/3 z-10">
          <div className="relative">
            {/* Massage Table */}
            <div className="w-24 h-8 bg-purple-200 rounded-lg shadow-md"></div>
            {/* Person lying down */}
            <div className="absolute -top-2 left-2 right-2">
              <div className="w-20 h-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full"></div>
              {/* Head */}
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-amber-200 rounded-full"></div>
            </div>
            {/* Towels */}
            <div className="absolute -bottom-1 left-0 w-4 h-2 bg-white rounded opacity-80"></div>
            <div className="absolute -bottom-1 right-0 w-4 h-2 bg-white rounded opacity-80"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-purple-200 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-blue-300 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
