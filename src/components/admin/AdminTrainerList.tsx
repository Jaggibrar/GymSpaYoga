
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, User, Star } from 'lucide-react';

interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  trainer_tier: string;
  experience: number;
  hourly_rate: number;
  location: string;
  status: string;
  created_at: string;
}

export const AdminTrainerList = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      toast.error('Failed to load trainers');
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

      setTrainers(prev => 
        prev.map(trainer => 
          trainer.id === trainerId ? { ...trainer, status } : trainer
        )
      );

      toast.success(`Trainer ${status} successfully`);
    } catch (error) {
      console.error('Error updating trainer status:', error);
      toast.error('Failed to update trainer status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
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

  if (loading) {
    return <div className="animate-pulse">Loading trainers...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <User className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Trainer Applications</h3>
      </div>
      
      {trainers.length === 0 ? (
        <p className="text-gray-500">No trainer applications found.</p>
      ) : (
        <div className="grid gap-4">
          {trainers.map((trainer) => (
            <Card key={trainer.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className={getTierColor(trainer.trainer_tier)}>
                        <Star className="h-3 w-3 mr-1" />
                        {trainer.trainer_tier}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {trainer.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(trainer.status)}>
                    {trainer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email:</strong> {trainer.email}</p>
                    <p><strong>Phone:</strong> {trainer.phone}</p>
                    <p><strong>Experience:</strong> {trainer.experience} years</p>
                  </div>
                  <div>
                    <p><strong>Rate:</strong> ₹{trainer.hourly_rate}/hour</p>
                    <p><strong>Location:</strong> {trainer.location}</p>
                    <p><strong>Applied:</strong> {new Date(trainer.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {trainer.status === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={() => updateTrainerStatus(trainer.id, 'approved')}
                      disabled={updating === trainer.id}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateTrainerStatus(trainer.id, 'rejected')}
                      disabled={updating === trainer.id}
                      variant="destructive"
                      size="sm"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
