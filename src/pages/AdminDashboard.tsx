
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import MainNavigation from "@/components/MainNavigation";
import AppFooter from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Users, Building, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [pendingTrainers, setPendingTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchPendingApprovals();
    }
  }, [isAdmin, adminLoading, navigate]);

  const fetchPendingApprovals = async () => {
    try {
      const [businessesResult, trainersResult] = await Promise.all([
        supabase
          .from('business_profiles')
          .select('*')
          .eq('status', 'pending'),
        supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'pending')
      ]);

      if (businessesResult.error) {
        console.error('Error fetching businesses:', businessesResult.error);
      } else {
        setPendingBusinesses(businessesResult.data || []);
      }

      if (trainersResult.error) {
        console.error('Error fetching trainers:', trainersResult.error);
      } else {
        setPendingTrainers(trainersResult.data || []);
      }
    } catch (err) {
      console.error('Error fetching pending approvals:', err);
      toast.error('Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (type: 'business' | 'trainer', id: string, action: 'approve' | 'reject') => {
    try {
      const table = type === 'business' ? 'business_profiles' : 'trainer_profiles';
      const status = action === 'approve' ? 'approved' : 'rejected';
      
      const { error } = await supabase
        .from(table)
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success(`${type} ${action}d successfully!`);
      
      // Refresh the data
      if (type === 'business') {
        setPendingBusinesses(prev => prev.filter(item => item.id !== id));
      } else {
        setPendingTrainers(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(`Error ${action}ing ${type}:`, err);
      toast.error(`Failed to ${action} ${type}`);
    }
  };

  if (adminLoading || loading) {
    return <LoadingScreen category="admin" onComplete={() => setLoading(false)} />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage businesses, trainers, and platform operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Businesses</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingBusinesses.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Trainers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pendingTrainers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {pendingBusinesses.length + pendingTrainers.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="businesses">Pending Businesses</TabsTrigger>
            <TabsTrigger value="trainers">Pending Trainers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses" className="space-y-4">
            {pendingBusinesses.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">No pending business approvals</p>
                </CardContent>
              </Card>
            ) : (
              pendingBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{business.business_name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {business.city}, {business.state} • {business.business_type}
                        </p>
                        <Badge variant="outline" className="mt-2">{business.category}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleApproval('business', business.id, 'approve')}
                          className="bg-green-500 hover:bg-green-600"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleApproval('business', business.id, 'reject')}
                          variant="destructive"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Email:</strong> {business.email}</p>
                        <p><strong>Phone:</strong> {business.phone}</p>
                        <p><strong>Address:</strong> {business.address}</p>
                      </div>
                      <div>
                        <p><strong>Hours:</strong> {business.opening_time} - {business.closing_time}</p>
                        {business.monthly_price && (
                          <p><strong>Monthly Price:</strong> ₹{business.monthly_price}</p>
                        )}
                        {business.session_price && (
                          <p><strong>Session Price:</strong> ₹{business.session_price}</p>
                        )}
                      </div>
                    </div>
                    {business.description && (
                      <div className="mt-4">
                        <p><strong>Description:</strong> {business.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="trainers" className="space-y-4">
            {pendingTrainers.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">No pending trainer approvals</p>
                </CardContent>
              </Card>
            ) : (
              pendingTrainers.map((trainer) => (
                <Card key={trainer.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{trainer.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {trainer.location} • {trainer.category}
                        </p>
                        <Badge variant="outline" className="mt-2">{trainer.trainer_tier}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleApproval('trainer', trainer.id, 'approve')}
                          className="bg-green-500 hover:bg-green-600"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleApproval('trainer', trainer.id, 'reject')}
                          variant="destructive"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Email:</strong> {trainer.email}</p>
                        <p><strong>Phone:</strong> {trainer.phone}</p>
                        <p><strong>Experience:</strong> {trainer.experience} years</p>
                      </div>
                      <div>
                        <p><strong>Hourly Rate:</strong> ₹{trainer.hourly_rate}</p>
                        {trainer.certifications && (
                          <p><strong>Certifications:</strong> {trainer.certifications}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p><strong>Bio:</strong> {trainer.bio}</p>
                    </div>
                    {trainer.specializations && trainer.specializations.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {trainer.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <AppFooter />
    </div>
  );
};

export default AdminDashboard;
