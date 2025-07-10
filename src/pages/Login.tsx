
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Dumbbell, Waves, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, navigate, authLoading]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signingIn) return;
    
    setSigningIn(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        throw error;
      }
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signingUp) return;
    
    setSigningUp(true);

    try {
      const { error } = await signUp(email, password);

      if (error) {
        throw error;
      }
      
      toast.success('Account created! Please check your email to verify your account.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setSigningUp(false);
    }
  };

  if (authLoading && !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Login - GymSpaYoga | Access Your Wellness Journey"
        description="Sign in to your GymSpaYoga account to book fitness centers, spas, yoga studios, and personal trainers. Join thousands in their wellness journey."
        keywords="gymspa yoga login, wellness account, fitness booking, spa booking, yoga booking"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20">
            <Dumbbell className="h-16 w-16 text-emerald-500 transform rotate-12 animate-bounce" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute top-40 right-32">
            <Waves className="h-12 w-12 text-blue-500 transform -rotate-12 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute bottom-32 left-40">
            <Heart className="h-14 w-14 text-pink-500 transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-20 right-20">
            <User className="h-10 w-10 text-purple-500 transform -rotate-12 animate-bounce" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* GymSpaYoga Branding */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-2xl p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center space-x-2">
                  <Dumbbell className="h-8 w-8 animate-pulse" />
                  <Waves className="h-8 w-8 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <Heart className="h-8 w-8 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              GymSpaYoga
            </h1>
            <p className="text-gray-600">Your wellness journey starts here</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your wellness dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                          disabled={signingIn}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                          disabled={signingIn}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          disabled={signingIn}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={signingIn || !email || !password}
                    >
                      {signingIn ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing in...
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                          disabled={signingUp}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                          disabled={signingUp}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                          disabled={signingUp}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          disabled={signingUp}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={signingUp || !email || !password || !fullName}
                    >
                      {signingUp ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <Link to="/terms-of-service" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Privacy Policy
              </Link>
            </p>
            <Link 
              to="/" 
              className="inline-block text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
