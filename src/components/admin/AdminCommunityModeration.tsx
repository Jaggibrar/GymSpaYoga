import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2, Shield, CheckCircle2, XCircle, ExternalLink, Flag, MessageSquare, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type ReportStatus = 'open' | 'resolved' | 'dismissed';

type Report = {
  id: string;
  reporter_id: string;
  target_id: string;
  target_type: string;
  reason: string;
  details: string | null;
  status: string;
  created_at: string;
};

const useReports = (status: ReportStatus) => useQuery({
  queryKey: ['admin-community-reports', status],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('community_reports')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data as Report[];
  },
});

const useCommunityStats = () => useQuery({
  queryKey: ['admin-community-stats'],
  queryFn: async () => {
    const countOf = async (table: 'community_posts' | 'community_comments' | 'community_reports' | 'community_follows', filter?: (q: any) => any) => {
      let q: any = supabase.from(table).select('*', { count: 'exact', head: true });
      if (filter) q = filter(q);
      const { count } = await q;
      return count ?? 0;
    };
    const [posts, comments, openReports, follows] = await Promise.all([
      countOf('community_posts', q => q.neq('moderation_status', 'removed')),
      countOf('community_comments', q => q.neq('moderation_status', 'removed')),
      countOf('community_reports', q => q.eq('status', 'open')),
      countOf('community_follows'),
    ]);
    return { posts, comments, openReports, follows };
  },
});

export default function AdminCommunityModeration() {
  const [status, setStatus] = useState<ReportStatus>('open');
  const reports = useReports(status);
  const stats = useCommunityStats();
  const qc = useQueryClient();

  const resolve = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: ReportStatus }) => {
      const { error } = await supabase
        .from('community_reports')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-community-reports'] });
      qc.invalidateQueries({ queryKey: ['admin-community-stats'] });
      toast.success('Report updated');
    },
    onError: (e: any) => toast.error(e.message || 'Failed to update'),
  });

  const removeTarget = useMutation({
    mutationFn: async ({ target_id, target_type }: { target_id: string; target_type: string }) => {
      const table = target_type === 'comment' ? 'community_comments' : 'community_posts';
      const { error } = await supabase.from(table).update({ is_active: false }).eq('id', target_id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Content removed from community');
      qc.invalidateQueries({ queryKey: ['admin-community-reports'] });
    },
    onError: (e: any) => toast.error(e.message || 'Failed to remove'),
  });

  const StatCard = ({ label, value, icon: Icon }: any) => (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Posts" value={stats.data?.posts ?? '—'} icon={FileText} />
        <StatCard label="Comments" value={stats.data?.comments ?? '—'} icon={MessageSquare} />
        <StatCard label="Open Reports" value={stats.data?.openReports ?? '—'} icon={Flag} />
        <StatCard label="Total Follows" value={stats.data?.follows ?? '—'} icon={Shield} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Community Moderation Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={status} onValueChange={v => setStatus(v as ReportStatus)}>
            <TabsList>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
            </TabsList>

            <TabsContent value={status} className="mt-5">
              {reports.isLoading ? (
                <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
              ) : !reports.data || reports.data.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-10">No {status} reports.</p>
              ) : (
                <div className="space-y-3">
                  {reports.data.map(r => {
                    const link = r.target_type === 'comment'
                      ? `#comment-${r.target_id}`
                      : `/community?post=${r.target_id}`;
                    return (
                      <div key={r.id} className="border border-border rounded-xl p-4 bg-card">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <Badge variant="secondary">{r.target_type}</Badge>
                              <Badge variant="outline">{r.reason}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            {r.details && <p className="text-sm text-foreground mb-2">{r.details}</p>}
                            <p className="text-xs text-muted-foreground break-all">
                              Target ID: {r.target_id} • Reporter: {r.reporter_id.slice(0, 8)}…
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link to={link} target="_blank">
                              <Button size="sm" variant="outline"><ExternalLink className="h-4 w-4 mr-1" />View</Button>
                            </Link>
                            {status === 'open' && (
                              <>
                                <Button size="sm" variant="destructive"
                                  onClick={() => removeTarget.mutate({ target_id: r.target_id, target_type: r.target_type })}>
                                  Remove content
                                </Button>
                                <Button size="sm"
                                  onClick={() => resolve.mutate({ id: r.id, newStatus: 'resolved' })}>
                                  <CheckCircle2 className="h-4 w-4 mr-1" /> Resolve
                                </Button>
                                <Button size="sm" variant="ghost"
                                  onClick={() => resolve.mutate({ id: r.id, newStatus: 'dismissed' })}>
                                  <XCircle className="h-4 w-4 mr-1" /> Dismiss
                                </Button>
                              </>
                            )}
                            {status !== 'open' && (
                              <Button size="sm" variant="ghost"
                                onClick={() => resolve.mutate({ id: r.id, newStatus: 'open' })}>
                                Reopen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
