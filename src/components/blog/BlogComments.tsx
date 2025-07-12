import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageCircle, Send, Trash2, Edit3 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  blog_id: string;
  parent_id: string | null;
  user_profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface BlogCommentsProps {
  blogId: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      // First get comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Then get user profiles for all commenters
      const userIds = [...new Set(commentsData?.map(c => c.user_id) || [])];
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Combine the data
      const commentsWithProfiles = commentsData?.map(comment => ({
        ...comment,
        user_profiles: profilesData?.find(p => p.user_id === comment.user_id) || null
      })) || [];

      setComments(commentsWithProfiles);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .insert({
          blog_id: blogId,
          content: newComment.trim(),
          user_id: user.id,
          parent_id: replyTo
        });

      if (error) throw error;

      setNewComment('');
      setReplyTo(null);
      toast.success('Comment posted successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ 
          content: editContent.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', commentId);

      if (error) throw error;

      setEditingComment(null);
      setEditContent('');
      toast.success('Comment updated successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast.success('Comment deleted successfully!');
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const isAuthor = user?.id === comment.user_id;
    const userName = comment.user_profiles?.full_name || 'Anonymous User';
    const userInitials = userName.split(' ').map(name => name[0]).join('').toUpperCase();

    return (
      <div key={comment.id} className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.user_profiles?.avatar_url || ''} />
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{userName}</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                  {comment.updated_at !== comment.created_at && (
                    <span className="text-xs text-gray-400">(edited)</span>
                  )}
                </div>

                {isAuthor && (
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditing(comment)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {editingComment === comment.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={!editContent.trim()}
                    >
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              )}
            </div>

            {!isReply && (
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Reply
                </Button>
              </div>
            )}

            {/* Reply form */}
            {replyTo === comment.id && user && (
              <form onSubmit={handleSubmitComment} className="mt-3 space-y-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Reply to ${userName}...`}
                  rows={3}
                  className="text-sm"
                />
                <div className="flex space-x-2">
                  <Button type="submit" size="sm" disabled={submitting || !newComment.trim()}>
                    {submitting ? 'Posting...' : 'Reply'}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyTo(null);
                      setNewComment('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Render replies */}
        {comments
          .filter(reply => reply.parent_id === comment.id)
          .map(reply => renderComment(reply, true))}
      </div>
    );
  };

  const topLevelComments = comments.filter(comment => !comment.parent_id);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-emerald-600" />
          Comments ({topLevelComments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Comment form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user.user_metadata?.avatar_url || ''} />
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={submitting || !newComment.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {submitting ? 'Posting...' : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">Please log in to leave a comment.</p>
          </div>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : topLevelComments.length > 0 ? (
          <div className="space-y-6">
            {topLevelComments.map(comment => renderComment(comment))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogComments;