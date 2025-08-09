
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Dumbbell } from "lucide-react";
import loginIllustration from '@/assets/login-illustration.png';
import SEOHead from '@/components/SEOHead';
import { loginSchema, signupSchema } from '@/schemas/authSchemas';
import { z } from 'zod';

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
      // Validate input using schema
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: validation.data.email,
        password: validation.data.password,
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
    setLoading(true);

    try {
      // Validate input using schema
      const validation = signupSchema.safeParse({ 
        fullName: email.split('@')[0], // Use email prefix as temporary full name
        email, 
        password, 
        confirmPassword 
      });
      
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: validation.data.email,
        password: validation.data.password,
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
    <>
      <SEOHead
        title="Login to GymSpaYoga"
        description="Access your GymSpaYoga account to book gyms, spas, yoga studios and personal trainers across India."
        keywords="login, sign in, GymSpaYoga account, gym booking login, spa booking login"
        noindex={true}
      />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white font-sans">
      {/* Left Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-20">
        <div className="flex flex-col items-start max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">GymSpaYoga.com</h1>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {isSignUp ? 'Sign Up' : 'Login'}
          </h2>

          {/* Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="w-full space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              required
            />

            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                required
              />
            )}

            {!isSignUp && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                isSignUp ? 'Creating Account...' : 'Logging in...'
              ) : (
                isSignUp ? 'Sign Up' : 'Login'
              )}
            </button>
          </form>

          {/* Toggle between Login/Sign Up */}
          <div className="mt-6 text-center w-full">
            <p className="text-gray-600 mb-2">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-blue-500 font-semibold hover:underline"
            >
              {isSignUp ? 'Login here' : 'Sign up here'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-10 bg-gradient-to-br from-blue-50 to-purple-50">
        <img
          src={loginIllustration}
          alt="Wellness Illustration - Yoga, Gym, and Spa"
          className="max-w-full h-auto max-h-[600px] object-contain"
        />
      </div>
    </div>
    </>
  );
};

export default Login;
