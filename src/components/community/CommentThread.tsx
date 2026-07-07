import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddComment, useComments, useDeleteComment, useReportContent } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Loader2, Flag, CornerDownRight } from 'lucide-react';

type CommentNode = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  parent_comment_id: string | null;
  is_mine?: boolean;
  author?: { user_id: string; full_name: string | null; avatar_url?: string | null } | null;
  children: CommentNode[];
};

function buildTree(list: any[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];
  list.forEach(c => map.set(c.id, { ...c, children: [] }));
  map.forEach(node => {
    if (node.parent_comment_id && map.has(node.parent_comment_id)) {
      map.get(node.parent_comment_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

function CommentItem({
  node, postId, depth = 0, onReply, onDelete, onReport,
}: {
  node: CommentNode; postId: string; depth?: number;
  onReply: (id: string) => void;
  onDelete: (id: string) => void;
  onReport: (id: string) => void;
}) {
  const { user } = useAuth();
  return (
    <div className={depth > 0 ? 'pl-6 border-l border-border/60 ml-2 space-y-3' : 'space-y-3'}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={node.author?.avatar_url || undefined} />
          <AvatarFallback>{(node.author?.full_name || 'U').slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-secondary/50 rounded-2xl px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm text-foreground truncate">
                {node.author?.full_name || 'Community member'}
              </span>
              <div className="flex items-center gap-2">
                {user && !node.is_mine && (
                  <button
                    onClick={() => onReport(node.id)}
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Report"
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                )}
                {node.is_mine && (
                  <button
                    onClick={() => onDelete(node.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Delete comment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words">{node.content}</p>
          </div>
          <div className="text-xs text-muted-foreground mt-1 ml-3 flex items-center gap-3">
            <span>{formatDistanceToNow(new Date(node.created_at), { addSuffix: true })}</span>
            {user && depth < 3 && (
              <button onClick={() => onReply(node.id)} className="hover:text-primary inline-flex items-center gap-1">
                <CornerDownRight className="h-3 w-3" /> Reply
              </button>
            )}
          </div>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="space-y-3">
          {node.children.map(child => (
            <CommentItem key={child.id} node={child} postId={postId} depth={depth + 1}
              onReply={onReply} onDelete={onDelete} onReport={onReport} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentThread({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { data: comments, isLoading } = useComments(postId);
  const add = useAddComment();
  const del = useDeleteComment(postId);
  const report = useReportContent();
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const submit = () => {
    if (!text.trim()) return;
    add.mutate({ postId, content: text.trim(), parentId: replyTo }, {
      onSuccess: () => { setText(''); setReplyTo(null); },
    });
  };

  const tree = comments ? buildTree(comments) : [];

  return (
    <div className="border-t border-border pt-4 mt-2 space-y-4">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading comments…</p>
      ) : tree.length > 0 ? (
        <div className="space-y-4">
          {tree.map(node => (
            <CommentItem key={node.id} node={node} postId={postId}
              onReply={setReplyTo}
              onDelete={id => del.mutate(id)}
              onReport={id => {
                const reason = window.prompt('Report reason?');
                if (reason && reason.trim()) report.mutate({ targetType: 'comment', targetId: id, reason: reason.trim() });
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet — be the first to reply.</p>
      )}

      {user ? (
        <div className="space-y-2 pt-2">
          {replyTo && (
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              Replying to a comment
              <button onClick={() => setReplyTo(null)} className="text-primary hover:underline">Cancel</button>
            </div>
          )}
          <div className="flex gap-2 items-start">
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={replyTo ? 'Write a reply…' : 'Write a thoughtful comment…'}
              className="min-h-[60px] resize-none bg-transparent border-border"
              maxLength={1000}
            />
            <Button size="sm" onClick={submit} disabled={add.isPending || !text.trim()}>
              {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (replyTo ? 'Reply' : 'Post')}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Sign in</Link> to join the conversation.
        </p>
      )}
    </div>
  );
}
