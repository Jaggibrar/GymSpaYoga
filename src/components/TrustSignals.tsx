
import { Shield, Star, Users, Award, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TrustSignals = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Trusted by Thousands</h3>
        <p className="text-sm text-gray-600">Join the fastest-growing wellness community in India</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-blue-500 mr-1" />
            <span className="text-2xl font-black text-gray-800">25K+</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">Active Users</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="h-5 w-5 text-emerald-500 mr-1" />
            <span className="text-2xl font-black text-gray-800">800+</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">Partner Businesses</p>
        </div>
        
        <div className="text-center lg:col-span-1 col-span-2">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
            <span className="text-2xl font-black text-gray-800">4.9</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">Average Rating</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span className="text-gray-700 font-medium">100% Verified Partners</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <span className="text-gray-700 font-medium">Secure Payment Processing</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span className="text-gray-700 font-medium">99% Customer Satisfaction</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className="bg-green-100 text-green-700 text-xs">SSL Secure</Badge>
          <Badge className="bg-blue-100 text-blue-700 text-xs">ISO Certified</Badge>
          <Badge className="bg-purple-100 text-purple-700 text-xs">Award Winner</Badge>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
