
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import PlatformAudit from '@/components/audit/PlatformAudit';
import PerformanceMonitor from '@/components/monitoring/PerformanceMonitor';
import AccessibilityHelper from '@/components/accessibility/AccessibilityHelper';
import SEOHead from '@/components/SEOHead';

const PlatformAuditPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Platform Audit - GymSpaYoga"
        description="Comprehensive audit tool for the GymSpaYoga platform to ensure all features work seamlessly"
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Platform Audit Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Test Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/register-business">
                <Button variant="outline" className="w-full">
                  Business Registration
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button variant="outline" className="w-full">
                  Trainer Registration
                </Button>
              </Link>
              <Link to="/dashboard/business">
                <Button variant="outline" className="w-full">
                  Business Dashboard
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" className="w-full">
                  User Discovery
                </Button>
              </Link>
              <Link to="/gyms">
                <Button variant="outline" className="w-full">
                  Gym Listings
                </Button>
              </Link>
              <Link to="/spas">
                <Button variant="outline" className="w-full">
                  Spa Listings
                </Button>
              </Link>
              <Link to="/yoga">
                <Button variant="outline" className="w-full">
                  Yoga Studios
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Authentication
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Feature Checklist */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feature Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ Registration Flow</h4>
                <ul className="text-sm space-y-1">
                  <li>• Business Owner Registration</li>
                  <li>• Trainer Registration</li>
                  <li>• Form Validation</li>
                  <li>• Post-submission Feedback</li>
                  <li>• Instant Listing Reflection</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ Tier-Based Listings</h4>
                <ul className="text-sm space-y-1">
                  <li>• Luxury Tier Selection</li>
                  <li>• Premium Tier Selection</li>
                  <li>• Budget Tier Selection</li>
                  <li>• Tier-based Filtering</li>
                  <li>• Mood-based Matching</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ Booking System</h4>
                <ul className="text-sm space-y-1">
                  <li>• Real-time Notifications</li>
                  <li>• Booking Management</li>
                  <li>• Accept/Cancel Functionality</li>
                  <li>• Database Synchronization</li>
                  <li>• User Dashboard Updates</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ User Experience</h4>
                <ul className="text-sm space-y-1">
                  <li>• Search & Discovery</li>
                  <li>• Mood-based Filtering</li>
                  <li>• Budget Filtering</li>
                  <li>• Seamless Booking</li>
                  <li>• Responsive Design</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ SEO & Accessibility</h4>
                <ul className="text-sm space-y-1">
                  <li>• Unique Page Titles</li>
                  <li>• Meta Descriptions</li>
                  <li>• Alt Text for Images</li>
                  <li>• Keyboard Navigation</li>
                  <li>• Screen Reader Support</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">✅ Performance</h4>
                <ul className="text-sm space-y-1">
                  <li>• Loading Indicators</li>
                  <li>• Error Handling</li>
                  <li>• Success Messages</li>
                  <li>• Real-time Updates</li>
                  <li>• No Console Errors</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Audit Component */}
        <PlatformAudit />

        {/* Improvement Suggestions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🧠 Suggested Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Mood-Based Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• "Relax / Sweat / Meditate" filter implemented ✅</li>
                  <li>• Visual mood tags for listings</li>
                  <li>• AI-based suggestions: "Feeling stressed? Try these spas"</li>
                  <li>• Emotional journey mapping</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Personalization</h4>
                <ul className="text-sm space-y-1">
                  <li>• "Popular in Your Area" homepage section</li>
                  <li>• "Budget Friendly for You" recommendations</li>
                  <li>• User preference learning</li>
                  <li>• Personalized dashboard widgets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Components */}
      <PerformanceMonitor />
      <AccessibilityHelper />
    </div>
  );
};

export default PlatformAuditPage;
