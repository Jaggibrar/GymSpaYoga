
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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center transition-all duration-700 opacity-30"
        style={{
          backgroundImage: "url('/lovable-uploads/04d91ea0-0319-4c44-a2cc-25bbf4d6b004.png')",
          backgroundSize: 'cover',
          filter: 'brightness(0.7) contrast(1.2) saturate(1.1)'
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-amber-900/40"></div>
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="relative">
          {/* Glow Effect Behind Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-amber-500/30 rounded-3xl blur-xl transform rotate-1"></div>
          
          {/* Main Card */}
          <div className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-12 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 max-w-lg w-full transform hover:scale-[1.02] hover:-translate-y-1">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl rotate-45 opacity-60"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl rotate-12 opacity-60"></div>
            
            <div className="w-full">
              {/* Enhanced Logo Section */}
              <div className="text-center mb-12">
                <div className="relative mx-auto mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-amber-500/80 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-500 relative overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] animate-shimmer"></div>
                    {isSignUp ? 
                      <UserPlus className="w-12 h-12 text-white drop-shadow-lg z-10" /> : 
                      <User className="w-12 h-12 text-white drop-shadow-lg z-10" />
                    }
                  </div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent drop-shadow-lg tracking-wide mb-2">
                  GymSpaYoga.com
                </h1>
                <p className="text-white/70 text-base font-light tracking-wide">One Platform. Infinite Wellness.</p>
              </div>

              {/* Enhanced Toggle Section */}
              <div className="relative mb-10">
                <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10 shadow-inner">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-4 text-base font-medium rounded-xl transition-all duration-500 relative overflow-hidden ${
                      !isSignUp 
                        ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white shadow-lg border border-white/20' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="relative z-10">Sign In</span>
                    {!isSignUp && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl animate-pulse"></div>}
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-4 text-base font-medium rounded-xl transition-all duration-500 relative overflow-hidden ${
                      isSignUp 
                        ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white shadow-lg border border-white/20' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="relative z-10">Sign Up</span>
                    {isSignUp && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl animate-pulse"></div>}
                  </button>
                </div>
              </div>

              {/* Enhanced Form Section */}
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-12 text-center drop-shadow-lg tracking-tight">
                  {isSignUp ? 'Join Our Community' : 'Welcome Back'}
                </h2>
                
                <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-8">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <label className="text-white/90 text-sm font-medium tracking-wide block">Email Address</label>
                    <div className="relative group">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-16 text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 placeholder:text-white/50 text-white focus:bg-white/15 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50 transition-all duration-500 hover:bg-white/15 hover:border-white/30 group-hover:shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Password Field */}
                  <div className="space-y-3">
                    <label className="text-white/90 text-sm font-medium tracking-wide block">Password</label>
                    <div className="relative group">
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-16 text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 placeholder:text-white/50 text-white focus:bg-white/15 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50 transition-all duration-500 hover:bg-white/15 hover:border-white/30 group-hover:shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  {isSignUp && (
                    <div className="space-y-3">
                      <label className="text-white/90 text-sm font-medium tracking-wide block">Confirm Password</label>
                      <div className="relative group">
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="h-16 text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 placeholder:text-white/50 text-white focus:bg-white/15 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50 transition-all duration-500 hover:bg-white/15 hover:border-white/30 group-hover:shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Forgot Password */}
                  {!isSignUp && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-all duration-300 hover:underline decoration-purple-300 relative group"
                      >
                        <span className="relative z-10">Forgot password?</span>
                        <div className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      </button>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="relative">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-18 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 rounded-2xl text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group"
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-amber-600/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <span className="relative z-10">
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            {isSignUp ? 'Creating Account...' : 'Signing in...'}
                          </div>
                        ) : (
                          isSignUp ? 'Create Account' : 'Sign In'
                        )}
                      </span>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:animate-shimmer"></div>
                    </Button>
                  </div>
                </form>
                
                {/* Back to Home Link */}
                <div className="mt-12 text-center">
                  <Link
                    to="/"
                    className="text-white/60 hover:text-white text-sm transition-all duration-300 inline-flex items-center hover:underline decoration-white/50 group relative"
                  >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
                    <span className="relative">
                      Back to Home
                      <div className="absolute inset-0 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced space for image visibility */}
      <div className="flex-1 hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-900/20"></div>
      </div>
    </div>
  );
};

export default Login;
