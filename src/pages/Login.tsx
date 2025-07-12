
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { User, UserPlus } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.");
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center transition-all duration-700"
        style={{
          backgroundImage: "url('/lovable-uploads/04d91ea0-0319-4c44-a2cc-25bbf4d6b004.png')",
          backgroundSize: 'cover',
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
      
      {/* Left side - Login/Signup Form with Enhanced Glassmorphism */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-10 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 max-w-md w-full">
          <div className="w-full">
            {/* Enhanced Logo and Icon */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400/80 to-orange-500/80 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
                {isSignUp ? <UserPlus className="w-10 h-10 text-white drop-shadow-lg" /> : <User className="w-10 h-10 text-white drop-shadow-lg" />}
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
                GymSpaYoga.com
              </h1>
              <p className="text-white/70 text-sm mt-2 font-light">One Platform. Infinite Wellness.</p>
            </div>

            {/* Toggle between Login/Signup */}
            <div className="flex bg-white/10 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  !isSignUp 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isSignUp 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Enhanced Form */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg tracking-tight">
                {isSignUp ? 'Join Us' : 'Welcome Back'}
              </h2>
              
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium tracking-wide">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 text-base bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 placeholder:text-white/60 text-white focus:bg-white/25 focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300/50 transition-all duration-300 hover:bg-white/25"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium tracking-wide">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 text-base bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 placeholder:text-white/60 text-white focus:bg-white/25 focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300/50 transition-all duration-300 hover:bg-white/25"
                  />
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-white/90 text-sm font-medium tracking-wide">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-14 text-base bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 placeholder:text-white/60 text-white focus:bg-white/25 focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300/50 transition-all duration-300 hover:bg-white/25"
                    />
                  </div>
                )}
                
                {!isSignUp && (
                  <div className="text-center mb-8">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-amber-200 hover:text-amber-100 text-sm font-medium transition-colors duration-300 hover:underline decoration-amber-200"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-amber-500/90 to-orange-600/90 hover:from-amber-400 hover:to-orange-500 rounded-2xl text-white border-0 shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {isSignUp ? 'Creating Account...' : 'Signing in...'}
                    </div>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>
              
              <div className="mt-10 text-center">
                <Link
                  to="/"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300 inline-flex items-center hover:underline decoration-white/50"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Space for image visibility */}
      <div className="flex-1 hidden lg:block"></div>
    </div>
  );
};

export default Login;
