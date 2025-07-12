
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
    <div className="min-h-screen flex bg-white relative">
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/0d1bd916-06f9-4059-adf1-8eb8bcbabb8f.png')",
          backgroundSize: 'contain'
        }}
      />
      
      {/* Left side - Login Form with Blur */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="w-full max-w-sm">
          {/* Logo and Icon */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">GymSpaYoga.com</h1>
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
                  className="h-14 text-base bg-white border border-amber-200 rounded-xl px-4 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 text-base bg-white border border-amber-200 rounded-xl px-4 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />
              </div>
              
              <div className="text-center mb-6">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  Forgot password?
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-medium bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
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
      </div>

      {/* Right side - Empty for image visibility */}
      <div className="flex-1"></div>
    </div>
  );
};

export default Login;
