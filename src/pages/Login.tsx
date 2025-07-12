
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen flex relative">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-blue-500 mb-8">GymSpaYoga.com</h1>
          </div>

          {/* Login Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-16 text-lg bg-gray-100 border-0 rounded-2xl px-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-16 text-lg bg-gray-100 border-0 rounded-2xl px-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-500 hover:text-blue-600 text-base font-medium"
                >
                  Forgot password?
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 text-xl font-semibold bg-blue-500 hover:bg-blue-600 rounded-2xl text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
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

      {/* Right side - Background Image */}
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/1a2d2f88-ed4b-4d06-bdc6-380e716717c1.png')"
        }}
      />
    </div>
  );
};

export default Login;
