import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddComment, useComments, useDeleteComment } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Loader2 } from 'lucide-react';

export default function CommentThread({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { data: comments, isLoading } = useComments(postId);
  const add = useAddComment();
  const del = useDeleteComment(postId);
  const [text, setText] = useState('');

  const submit = () => {
    if (!text.trim()) return;
    add.mutate({ postId, content: text.trim() }, { onSuccess: () => setText('') });
  };

  return (
    <div className="border-t border-border pt-4 mt-2 space-y-4">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading comments…</p>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={c.author?.profile_image_url || undefined} />
                <AvatarFallback>{(c.author?.full_name || 'U').slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="bg-secondary/50 rounded-2xl px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">
                      {c.author?.full_name || 'Community member'}
                    </span>
                    {c.is_mine && (
                      <button
                        onClick={() => del.mutate(c.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Delete comment"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words">{c.content}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1 ml-3">
                  {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet — be the first to reply.</p>
      )}

      {user ? (
        <div className="flex gap-2 items-start pt-2">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a thoughtful comment…"
            className="min-h-[60px] resize-none bg-transparent border-border"
            maxLength={1000}
          />
          <Button size="sm" onClick={submit} disabled={add.isPending || !text.trim()}>
            {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Post'}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Sign in</Link> to join the conversation.
        </p>
      )}
    </div>
  );
}
