import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Shield, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const QuickSetupPanel = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const createSampleBlogs = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setLoading('blogs');
    try {
      const { data, error } = await supabase.functions.invoke('create-sample-blogs');
      
      if (error) throw error;
      
      toast.success(`Successfully created ${data.blogs?.length || 0} sample blogs`);
    } catch (error: any) {
      console.error('Error creating sample blogs:', error);
      toast.error('Failed to create sample blogs: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  const grantAdminAccess = async () => {
    if (!user?.email) {
      toast.error('Please log in first');
      return;
    }

    setLoading('admin');
    try {
      const { data, error } = await supabase.functions.invoke('grant-admin-access');
      
      if (error) throw error;
      
      toast.success('Admin access granted successfully! Please refresh the page.');
      
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error('Error granting admin access:', error);
      toast.error('Failed to grant admin access: ' + error.message);
    } finally {
      setLoading(null);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-600" />
            Quick Setup
          </CardTitle>
          <CardDescription>
            Initialize sample data and admin access for testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Sample Blogs</span>
              </div>
              <p className="text-xs text-gray-600">Create 4 wellness blog posts</p>
            </div>
            <Button
              size="sm"
              onClick={createSampleBlogs}
              disabled={loading === 'blogs'}
              className="h-8"
            >
              {loading === 'blogs' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-sm">Admin Access</span>
              </div>
              <p className="text-xs text-gray-600">Grant super admin permissions</p>
            </div>
            <Button
              size="sm"
              onClick={grantAdminAccess}
              disabled={loading === 'admin'}
              className="h-8"
              variant="outline"
            >
              {loading === 'admin' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Grant'
              )}
            </Button>
          </div>

          <div className="pt-2 border-t">
            <Badge variant="secondary" className="text-xs">
              User: {user.email}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickSetupPanel;