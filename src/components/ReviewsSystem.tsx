
import { Star, User, MapPin, Verified, ThumbsUp, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ReviewsSystem = () => {
  return (
    <div className="space-y-6">
      {/* Beta Launch Message */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="h-8 w-8 text-emerald-600" />
              <h3 className="text-2xl font-bold text-gray-800">Be Our First Success Story</h3>
            </div>
            <p className="text-gray-600 font-medium mb-4">
              We're launching soon and looking for pioneering fitness businesses to join our platform
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Zap className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">Early Access</div>
                <div className="text-sm text-gray-600">First 100 businesses</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2 fill-current" />
                <div className="text-lg font-bold text-gray-800">₹0 Setup</div>
                <div className="text-sm text-gray-600">Launch special offer</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Verified className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">Premium Support</div>
                <div className="text-sm text-gray-600">Direct founder access</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* What Early Partners Get */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold text-gray-800 mb-4">What Early Partners Get</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-emerald-500 rounded-full p-2">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Founder-Level Support</h4>
                <p className="text-gray-600 text-sm">Direct access to our founding team for setup, optimization, and growth strategy</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-500 rounded-full p-2">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Premium Profile Features</h4>
                <p className="text-gray-600 text-sm">Enhanced listings with priority placement, featured badges, and advanced analytics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-500 rounded-full p-2">
                <Star className="h-4 w-4 text-white fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Locked-in Pricing</h4>
                <p className="text-gray-600 text-sm">Keep the ₹20/lead rate even as we scale and prices adjust for new partners</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to be a Founding Partner?</h3>
        <p className="mb-6 opacity-90">Join us in revolutionizing how people discover fitness and wellness services</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-emerald-600 hover:bg-gray-100 font-bold px-8 py-3">
            Register Your Business
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/20 font-bold px-8 py-3">
            Schedule a Demo Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSystem;
