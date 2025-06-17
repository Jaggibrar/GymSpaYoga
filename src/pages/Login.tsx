
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Dumbbell, Sparkles, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-emerald-600" />
              <Sparkles className="h-6 w-6 text-blue-600" />
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            GYMSPAYOGA
          </h1>
          <p className="text-gray-600 font-medium">Your Ultimate Wellness Destination</p>
        </div>

        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-black text-gray-900">Welcome Back</CardTitle>
            <p className="text-gray-600 font-medium">
              Sign in to your account to continue your wellness journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-bold text-gray-900">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 transition-colors bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-bold text-gray-900">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 transition-colors bg-white/80 backdrop-blur-sm pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
                <div className="text-right">
                  <Link to="/reset-password" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-black text-base shadow-2xl"
              >
                {loading ? 'Signing in...' : 'Sign In to GYMSPAYOGA'}
              </Button>

              <div className="text-center pt-4">
                <span className="text-sm text-gray-600 font-medium">Don't have an account? </span> 
                <Link to="/signup" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Join GYMSPAYOGA
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Brand Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <Dumbbell className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-900">Premium Gyms</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-900">Luxury Spas</p>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <Heart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-900">Yoga Studios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
