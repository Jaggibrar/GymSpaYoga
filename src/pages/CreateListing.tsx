
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import BusinessListingForm from '@/components/business/BusinessListingForm';
import { Card } from '@/components/ui/card';
import { Building } from 'lucide-react';

const CreateListing = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Your Business Listing
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <Building className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  Why List Your Business With Us?
                </h2>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Reach thousands of potential customers</li>
                  <li>• No commission fees - you keep 100% of your earnings</li>
                  <li>• Real-time booking notifications and management</li>
                  <li>• Professional dashboard to manage your business</li>
                  <li>• Free listing with premium promotion options</li>
                </ul>
              </div>
            </div>
          </Card>

          <BusinessListingForm />
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
