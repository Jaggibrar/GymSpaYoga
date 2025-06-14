
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  Eye, 
  IndianRupee, 
  CheckCircle, 
  XCircle, 
  Upload,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Settings,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const BusinessDashboard = () => {
  const { user } = useAuth();
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [businessStats, setBusinessStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBusinessData();
    }
  }, [user]);

  const fetchBusinessData = async () => {
    try {
      // Fetch business profile
      const { data: profile } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profile) {
        setBusinessProfile(profile);

        // Fetch business stats
        const { data: stats } = await supabase
          .from('business_stats')
          .select('*')
          .eq('business_id', profile.id)
          .single();

        setBusinessStats(stats);

        // Fetch customer inquiries
        const { data: inquiriesData } = await supabase
          .from('customer_inquiries')
          .select('*')
          .eq('business_id', profile.id)
          .order('created_at', { ascending: false });

        setInquiries(inquiriesData || []);

        // Fetch documents
        const { data: documentsData } = await supabase
          .from('business_documents')
          .select('*')
          .eq('business_id', profile.id)
          .order('uploaded_at', { ascending: false });

        setDocuments(documentsData || []);
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const markInquiryAsResponded = async (inquiryId: string) => {
    try {
      const { error } = await supabase
        .from('customer_inquiries')
        .update({ 
          status: 'responded',
          responded_at: new Date().toISOString()
        })
        .eq('id', inquiryId);

      if (error) throw error;

      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status: 'responded', responded_at: new Date().toISOString() }
            : inquiry
        )
      );

      toast.success('Inquiry marked as responded');
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast.error('Failed to update inquiry');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!businessProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">No Business Profile Found</h2>
            <p className="text-gray-600 mb-6">You need to register your business first to access the dashboard.</p>
            <Button asChild>
              <a href="/register-business">Register Your Business</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unreadInquiries = inquiries.filter(inquiry => inquiry.status === 'unread').length;
  const isVerified = businessProfile.status === 'approved';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Business Dashboard - GymSpaYoga"
        description="Manage your business profile, view analytics, and respond to customer inquiries"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{businessProfile.business_name}</h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {businessProfile.city}, {businessProfile.state}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={isVerified ? "default" : "secondary"} className="text-sm">
                {isVerified ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Pending Verification
                  </>
                )}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Profile Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businessStats?.profile_visits || 0}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Leads Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businessStats?.leads_received || 0}</div>
              <p className="text-xs text-gray-500 mt-1">₹20 per lead</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{businessStats?.monthly_revenue || 0}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                New Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadInquiries}</div>
              <p className="text-xs text-gray-500 mt-1">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries ({unreadInquiries})</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="growth">Growth Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Photos
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Request Reviews
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="text-sm font-medium">New inquiry</p>
                          <p className="text-xs text-gray-500">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={inquiry.status === 'unread' ? 'destructive' : 'secondary'}>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile Management</CardTitle>
                <p className="text-sm text-gray-600">Update your business information, photos, and services</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Business Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type:</span> {businessProfile.business_type}</p>
                      <p><span className="font-medium">Category:</span> {businessProfile.category}</p>
                      <p><span className="font-medium">Hours:</span> {businessProfile.opening_time} - {businessProfile.closing_time}</p>
                      <p><span className="font-medium">Monthly Price:</span> ₹{businessProfile.monthly_price}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Email:</span> {businessProfile.email}</p>
                      <p><span className="font-medium">Phone:</span> {businessProfile.phone}</p>
                      <p><span className="font-medium">Address:</span> {businessProfile.address}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <p className="text-sm text-gray-600">Manage customer contact requests and messages</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={inquiry.status === 'unread' ? 'destructive' : 'secondary'}>
                            {inquiry.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {inquiry.status === 'unread' && (
                          <Button 
                            size="sm" 
                            onClick={() => markInquiryAsResponded(inquiry.id)}
                          >
                            Mark as Responded
                          </Button>
                        )}
                      </div>
                      <p className="text-sm mb-2">{inquiry.message}</p>
                      {inquiry.phone && (
                        <p className="text-xs text-gray-600">Phone: {inquiry.phone}</p>
                      )}
                      {inquiry.email && (
                        <p className="text-xs text-gray-600">Email: {inquiry.email}</p>
                      )}
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No customer inquiries yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Documents</CardTitle>
                <p className="text-sm text-gray-600">Upload and manage your business verification documents</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium capitalize">{doc.document_type.replace('_', ' ')}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        doc.status === 'approved' ? 'default' : 
                        doc.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No documents uploaded yet</p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Tools</CardTitle>
                <p className="text-sm text-gray-600">Tools to help you grow your business and attract more customers</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Ranking & Visibility</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Upload high-quality photos regularly</li>
                      <li>• Keep your business hours updated</li>
                      <li>• Respond to customer inquiries quickly</li>
                      <li>• Encourage customers to leave reviews</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Share Your Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Generate Review Link
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
