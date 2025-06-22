
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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop" 
          alt="Fitness Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/70 to-purple-900/80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-emerald-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-20 w-full max-w-md">
        {/* Enhanced Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-full opacity-20 blur-lg"></div>
            </div>
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
              GYMSPAYOGA
            </span>
          </h1>
          <p className="text-white/90 font-semibold text-lg drop-shadow-lg">Your Ultimate Wellness Destination</p>
          <div className="mt-4 flex justify-center space-x-6 text-white/80">
            <div className="text-center">
              <div className="text-sm font-bold">Premium</div>
              <div className="text-xs">Gyms</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm font-bold">Luxury</div>
              <div className="text-xs">Spas</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm font-bold">Expert</div>
              <div className="text-xs">Yoga</div>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-black text-white">Welcome Back</CardTitle>
            <p className="text-white/80 font-medium">
              Sign in to continue your wellness journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-bold text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 text-base border-2 border-white/30 rounded-xl focus:border-emerald-400 transition-colors bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-base font-bold text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 text-base border-2 border-white/30 rounded-xl focus:border-emerald-400 transition-colors bg-white/10 backdrop-blur-sm pr-12 text-white placeholder:text-white/60"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/80 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
                <div className="text-right">
                  <Link to="/reset-password" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-black text-base shadow-2xl border-0"
              >
                {loading ? 'Signing in...' : 'Sign In to GYMSPAYOGA'}
              </Button>

              <div className="text-center pt-4">
                <span className="text-sm text-white/80 font-medium">Don't have an account? </span> 
                <Link to="/signup" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                  Join GYMSPAYOGA
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Brand Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Dumbbell className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Premium Gyms</p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Sparkles className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Luxury Spas</p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Yoga Studios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
