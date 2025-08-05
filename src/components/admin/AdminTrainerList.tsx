
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, User, Star, Edit, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrainerProfileImageUpload } from '@/hooks/useTrainerProfileImageUpload';
import { Upload, Trash2, ImageIcon } from 'lucide-react';

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
  bio?: string;
  certifications?: string;
  status: string;
  created_at: string;
  profile_image_url?: string;
}

export const AdminTrainerList = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingTrainer, setEditingTrainer] = useState<TrainerProfile | null>(null);
  const [viewingTrainer, setViewingTrainer] = useState<TrainerProfile | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<TrainerProfile>>({});
  const { uploadTrainerProfileImage, deleteTrainerImage, uploading } = useTrainerProfileImageUpload();

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

  const handleEditTrainer = (trainer: TrainerProfile) => {
    setEditingTrainer(trainer);
    setEditFormData(trainer);
  };

  const handleSaveEdit = async () => {
    if (!editingTrainer) return;
    
    setUpdating(editingTrainer.id);
    try {
      console.log('Saving trainer data:', editFormData);
      const updateData = {
        ...editFormData,
        updated_at: new Date().toISOString()
      };
      console.log('Update data:', updateData);
      
      const { error, data } = await supabase
        .from('trainer_profiles')
        .update(updateData)
        .eq('id', editingTrainer.id)
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      console.log('Update successful:', data);

      setTrainers(prev => 
        prev.map(trainer => 
          trainer.id === editingTrainer.id ? { ...trainer, ...editFormData } : trainer
        )
      );

      toast.success('Trainer updated successfully');
      setEditingTrainer(null);
    } catch (error) {
      console.error('Error updating trainer:', error);
      toast.error('Failed to update trainer');
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
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {/* View Details button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingTrainer(trainer)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Trainer Details - {trainer.name}</DialogTitle>
                        <DialogDescription>
                          Complete trainer profile information and application details.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-6 py-4">
                        {/* Profile Image */}
                        {trainer.profile_image_url && (
                          <div className="flex justify-center">
                            <img
                              src={trainer.profile_image_url}
                              alt={`${trainer.name} profile`}
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="flex justify-center">
                          <Badge className={getStatusColor(trainer.status)}>
                            {trainer.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg border-b pb-2">Basic Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Name</p>
                              <p className="font-medium">{trainer.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Email</p>
                              <p className="font-medium">{trainer.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Phone</p>
                              <p className="font-medium">{trainer.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Location</p>
                              <p className="font-medium">{trainer.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Professional Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg border-b pb-2">Professional Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Category</p>
                              <Badge variant="outline" className="capitalize mt-1">
                                {trainer.category}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Trainer Tier</p>
                              <Badge className={getTierColor(trainer.trainer_tier) + " mt-1"}>
                                <Star className="h-3 w-3 mr-1" />
                                {trainer.trainer_tier}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Experience</p>
                              <p className="font-medium">{trainer.experience} years</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                              <p className="font-medium">₹{trainer.hourly_rate}/hour</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bio */}
                        {trainer.bio && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg border-b pb-2">Bio</h4>
                            <p className="text-sm leading-relaxed">{trainer.bio}</p>
                          </div>
                        )}
                        
                        {/* Certifications */}
                        {trainer.certifications && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg border-b pb-2">Certifications</h4>
                            <p className="text-sm leading-relaxed">{trainer.certifications}</p>
                          </div>
                        )}
                        
                        {/* Application Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg border-b pb-2">Application Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Applied On</p>
                              <p className="font-medium">{new Date(trainer.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Application ID</p>
                              <p className="font-mono text-xs">{trainer.id}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end pt-4">
                          <Button variant="outline" onClick={() => setViewingTrainer(null)}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Edit button for all trainers */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTrainer(trainer)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Trainer - {trainer.name}</DialogTitle>
                        <DialogDescription>
                          Update trainer information, manage profile image, and change approval status.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                              value={editFormData.name || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              value={editFormData.email || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Phone</label>
                            <Input
                              value={editFormData.phone || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <Select
                              value={editFormData.status || ''}
                              onValueChange={(value) => setEditFormData(prev => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Category</label>
                            <Input
                              value={editFormData.category || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, category: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Hourly Rate (₹)</label>
                            <Input
                              type="number"
                              value={editFormData.hourly_rate || ''}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, hourly_rate: parseInt(e.target.value) }))}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <Input
                            value={editFormData.location || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Bio</label>
                          <Textarea
                            value={editFormData.bio || ''}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, bio: e.target.value }))}
                            rows={3}
                          />
                        </div>

                         <div>
                           <label className="text-sm font-medium">Certifications</label>
                           <Textarea
                             value={editFormData.certifications || ''}
                             onChange={(e) => setEditFormData(prev => ({ ...prev, certifications: e.target.value }))}
                             rows={2}
                           />
                         </div>

                         {/* Profile Image Management */}
                         <div className="space-y-4 border-t pt-4">
                           <div>
                             <label className="text-sm font-medium mb-2 block">Profile Image</label>
                             
                             {/* Current Image Display */}
                             {editFormData.profile_image_url && (
                               <div className="mb-4">
                                 <div className="relative inline-block">
                                   <img
                                     src={editFormData.profile_image_url}
                                     alt="Profile"
                                     className="w-24 h-24 rounded-full object-cover"
                                   />
                                   <Button
                                     type="button"
                                     variant="destructive"
                                     size="sm"
                                     className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                                     onClick={async () => {
                                       if (await deleteTrainerImage(editFormData.profile_image_url!)) {
                                         setEditFormData(prev => ({ ...prev, profile_image_url: '' }));
                                       }
                                     }}
                                   >
                                     <Trash2 className="h-3 w-3" />
                                   </Button>
                                 </div>
                               </div>
                             )}

                             {/* Upload New Image */}
                             <div className="flex items-center gap-2">
                               <Input
                                 type="file"
                                 accept="image/*"
                                 onChange={async (e) => {
                                   const file = e.target.files?.[0];
                                   if (file) {
                                     const url = await uploadTrainerProfileImage(file);
                                     if (url) {
                                       setEditFormData(prev => ({ ...prev, profile_image_url: url }));
                                     }
                                   }
                                 }}
                                 className="hidden"
                                 id="trainer-image-upload"
                               />
                               <label
                                 htmlFor="trainer-image-upload"
                                 className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                               >
                                 <Upload className="h-4 w-4 mr-2" />
                                 {uploading ? 'Uploading...' : 'Upload Image'}
                               </label>
                             </div>
                           </div>
                         </div>

                         <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setEditingTrainer(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveEdit}
                            disabled={updating === editingTrainer?.id}
                          >
                            {updating === editingTrainer?.id ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Approve/Reject buttons only for pending */}
                  {trainer.status === 'pending' && (
                    <>
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
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
