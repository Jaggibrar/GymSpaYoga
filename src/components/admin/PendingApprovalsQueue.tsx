import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, User, Star, Eye, Clock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PendingTrainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  trainer_tier: string;
  experience: number;
  hourly_rate: number;
  location: string;
  bio?: string;
  certifications?: string;
  status: string;
  created_at: string;
  profile_image_url?: string;
}

interface PendingBusiness {
  id: string;
  business_name: string;
  email: string;
  phone: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  status: string;
  created_at: string;
}

export const PendingApprovalsQueue = () => {
  const [pendingTrainers, setPendingTrainers] = useState<PendingTrainer[]>([]);
  const [pendingBusinesses, setPendingBusinesses] = useState<PendingBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const fetchPendingItems = async () => {
    try {
      const [trainersRes, businessesRes] = await Promise.all([
        supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: true }),
        supabase
          .from('business_profiles')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
      ]);

      if (trainersRes.error) throw trainersRes.error;
      if (businessesRes.error) throw businessesRes.error;

      setPendingTrainers(trainersRes.data || []);
      setPendingBusinesses(businessesRes.data || []);
    } catch (error) {
      console.error('Error fetching pending items:', error);
      toast.error('Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  const updateTrainerStatus = async (trainerId: string, status: 'approved' | 'rejected') => {
    setUpdating(trainerId);
    try {
      const { error } = await supabase
        .from('trainer_profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', trainerId);

      if (error) throw error;

      setPendingTrainers(prev => prev.filter(t => t.id !== trainerId));
      toast.success(`Trainer ${status} successfully`);
    } catch (error) {
      console.error('Error updating trainer status:', error);
      toast.error('Failed to update trainer status');
    } finally {
      setUpdating(null);
    }
  };

  const updateBusinessStatus = async (businessId: string, status: 'approved' | 'rejected') => {
    setUpdating(businessId);
    try {
      const { error } = await supabase
        .from('business_profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', businessId);

      if (error) throw error;

      setPendingBusinesses(prev => prev.filter(b => b.id !== businessId));
      toast.success(`Business ${status} successfully`);
    } catch (error) {
      console.error('Error updating business status:', error);
      toast.error('Failed to update business status');
    } finally {
      setUpdating(null);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'elite': return 'bg-purple-100 text-purple-800';
      case 'pro': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalPending = pendingTrainers.length + pendingBusinesses.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPending}</p>
                <p className="text-sm text-muted-foreground">Total Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingTrainers.length}</p>
                <p className="text-sm text-muted-foreground">Pending Trainers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingBusinesses.length}</p>
                <p className="text-sm text-muted-foreground">Pending Businesses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {totalPending === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">All caught up!</h3>
            <p className="text-gray-500">No pending approvals at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="trainers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trainers" className="relative">
              Trainers
              {pendingTrainers.length > 0 && (
                <Badge className="ml-2 bg-orange-500">{pendingTrainers.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="businesses" className="relative">
              Businesses
              {pendingBusinesses.length > 0 && (
                <Badge className="ml-2 bg-orange-500">{pendingBusinesses.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trainers" className="space-y-4">
            {pendingTrainers.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">No pending trainer applications.</p>
                </CardContent>
              </Card>
            ) : (
              pendingTrainers.map((trainer) => (
                <Card key={trainer.id} className="border-l-4 border-l-orange-400">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        {trainer.profile_image_url ? (
                          <img
                            src={trainer.profile_image_url}
                            alt={trainer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{trainer.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getTierColor(trainer.trainer_tier)}>
                              <Star className="h-3 w-3 mr-1" />
                              {trainer.trainer_tier}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {trainer.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {getTimeAgo(trainer.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-medium text-muted-foreground">Email</p>
                        <p>{trainer.email}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Phone</p>
                        <p>{trainer.phone}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Experience</p>
                        <p>{trainer.experience} years</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Rate</p>
                        <p>₹{trainer.hourly_rate}/hour</p>
                      </div>
                    </div>

                    {trainer.bio && (
                      <div className="mb-4">
                        <p className="font-medium text-muted-foreground text-sm">Bio</p>
                        <p className="text-sm line-clamp-2">{trainer.bio}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateTrainerStatus(trainer.id, 'approved')}
                        disabled={updating === trainer.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateTrainerStatus(trainer.id, 'rejected')}
                        disabled={updating === trainer.id}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Trainer Application - {trainer.name}</DialogTitle>
                            <DialogDescription>
                              Review complete trainer profile before approval.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {trainer.profile_image_url && (
                              <div className="flex justify-center">
                                <img
                                  src={trainer.profile_image_url}
                                  alt={trainer.name}
                                  className="w-24 h-24 rounded-full object-cover"
                                />
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-muted-foreground">Name</p>
                                <p>{trainer.name}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Email</p>
                                <p>{trainer.email}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Phone</p>
                                <p>{trainer.phone}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Location</p>
                                <p>{trainer.location}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Category</p>
                                <p className="capitalize">{trainer.category}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Tier</p>
                                <Badge className={getTierColor(trainer.trainer_tier)}>
                                  {trainer.trainer_tier}
                                </Badge>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Experience</p>
                                <p>{trainer.experience} years</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Hourly Rate</p>
                                <p>₹{trainer.hourly_rate}</p>
                              </div>
                            </div>
                            {trainer.bio && (
                              <div>
                                <p className="font-medium text-muted-foreground">Bio</p>
                                <p className="text-sm">{trainer.bio}</p>
                              </div>
                            )}
                            {trainer.certifications && (
                              <div>
                                <p className="font-medium text-muted-foreground">Certifications</p>
                                <p className="text-sm">{trainer.certifications}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="businesses" className="space-y-4">
            {pendingBusinesses.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">No pending business applications.</p>
                </CardContent>
              </Card>
            ) : (
              pendingBusinesses.map((business) => (
                <Card key={business.id} className="border-l-4 border-l-orange-400">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{business.business_name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="capitalize">
                            {business.business_type}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {business.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {getTimeAgo(business.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-medium text-muted-foreground">Email</p>
                        <p>{business.email}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Phone</p>
                        <p>{business.phone}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">City</p>
                        <p>{business.city}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">State</p>
                        <p>{business.state}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateBusinessStatus(business.id, 'approved')}
                        disabled={updating === business.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateBusinessStatus(business.id, 'rejected')}
                        disabled={updating === business.id}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
