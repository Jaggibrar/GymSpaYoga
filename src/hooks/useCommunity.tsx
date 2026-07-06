import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type CommunityPost = {
  id: string;
  author_id: string;
  author_type: 'user' | 'business' | 'trainer';
  business_id: string | null;
  trainer_id: string | null;
  content: string;
  hashtags: string[];
  location: string | null;
  visibility: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  save_count: number;
  is_pinned: boolean;
  moderation_status: string;
  created_at: string;
  updated_at: string;
  media?: PostMedia[];
  author?: AuthorInfo | null;
  business?: { id: string; business_name: string; slug: string | null; image_url: string | null } | null;
  trainer?: { id: string; name: string; profile_image_url: string | null } | null;
  liked_by_me?: boolean;
  saved_by_me?: boolean;
};

export type PostMedia = {
  id: string;
  post_id: string;
  media_type: 'image' | 'video';
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
};

export type AuthorInfo = {
  user_id: string;
  full_name: string | null;
  avatar_url?: string | null;
};

const PAGE_SIZE = 10;

export type FeedTab = 'for-you' | 'following' | 'trending' | 'businesses' | 'transformations';

export const useCommunityFeed = (tab: FeedTab = 'for-you') => {
  const { user } = useAuth();
  return useInfiniteQuery({
    queryKey: ['community-feed', tab, user?.id],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let query = supabase
        .from('community_posts')
        .select('*')
        .eq('moderation_status', 'active');

      if (tab === 'trending') {
        query = query.order('like_count', { ascending: false }).order('created_at', { ascending: false });
      } else if (tab === 'businesses') {
        query = query.eq('author_type', 'business').order('created_at', { ascending: false });
      } else if (tab === 'transformations') {
        query = query.contains('hashtags', ['transformation']).order('created_at', { ascending: false });
      } else if (tab === 'following' && user) {
        const { data: follows } = await supabase
          .from('community_follows')
          .select('target_id, target_type')
          .eq('follower_id', user.id);
        const userIds = follows?.filter(f => f.target_type === 'user').map(f => f.target_id) || [];
        const bizIds = follows?.filter(f => f.target_type === 'business').map(f => f.target_id) || [];
        const trIds = follows?.filter(f => f.target_type === 'trainer').map(f => f.target_id) || [];
        if (userIds.length + bizIds.length + trIds.length === 0) return { posts: [], nextCursor: null };
        const orParts: string[] = [];
        if (userIds.length) orParts.push(`author_id.in.(${userIds.join(',')})`);
        if (bizIds.length) orParts.push(`business_id.in.(${bizIds.join(',')})`);
        if (trIds.length) orParts.push(`trainer_id.in.(${trIds.join(',')})`);
        query = query.or(orParts.join(',')).order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const from = pageParam as number;
      const to = from + PAGE_SIZE - 1;
      const { data: posts, error } = await query.range(from, to);
      if (error) throw error;
      const enriched = await enrichPosts(posts || [], user?.id);
      return {
        posts: enriched,
        nextCursor: (posts?.length || 0) < PAGE_SIZE ? null : from + PAGE_SIZE,
      };
    },
    getNextPageParam: (last) => last.nextCursor,
  });
};

async function enrichPosts(posts: any[], viewerId?: string): Promise<CommunityPost[]> {
  if (!posts.length) return [];
  const ids = posts.map(p => p.id);
  const authorIds = Array.from(new Set(posts.map(p => p.author_id)));
  const bizIds = Array.from(new Set(posts.map(p => p.business_id).filter(Boolean)));
  const trIds = Array.from(new Set(posts.map(p => p.trainer_id).filter(Boolean)));

  const [mediaRes, profilesRes, bizRes, trRes, likesRes, savesRes] = await Promise.all([
    supabase.from('community_post_media').select('*').in('post_id', ids).order('sort_order'),
    supabase.from('user_profiles').select('user_id, full_name, profile_image_url').in('user_id', authorIds),
    bizIds.length ? supabase.from('business_profiles').select('id, business_name, slug, image_url').in('id', bizIds) : Promise.resolve({ data: [] } as any),
    trIds.length ? supabase.from('trainer_profiles').select('id, name, profile_image_url').in('id', trIds) : Promise.resolve({ data: [] } as any),
    viewerId ? supabase.from('community_likes').select('target_id').eq('user_id', viewerId).eq('target_type', 'post').in('target_id', ids) : Promise.resolve({ data: [] } as any),
    viewerId ? supabase.from('community_saves').select('post_id').eq('user_id', viewerId).in('post_id', ids) : Promise.resolve({ data: [] } as any),
  ]);

  const mediaByPost = new Map<string, PostMedia[]>();
  (mediaRes.data || []).forEach((m: any) => {
    const arr = mediaByPost.get(m.post_id) || [];
    arr.push(m);
    mediaByPost.set(m.post_id, arr);
  });
  const profMap = new Map((profilesRes.data || []).map((p: any) => [p.user_id, { user_id: p.user_id, full_name: p.full_name, avatar_url: p.profile_image_url }]));
  const bizMap = new Map((bizRes.data || []).map((b: any) => [b.id, b]));
  const trMap = new Map((trRes.data || []).map((t: any) => [t.id, t]));
  const likedSet = new Set((likesRes.data || []).map((l: any) => l.target_id));
  const savedSet = new Set((savesRes.data || []).map((s: any) => s.post_id));

  return posts.map(p => ({
    ...p,
    media: mediaByPost.get(p.id) || [],
    author: profMap.get(p.author_id) || null,
    business: p.business_id ? bizMap.get(p.business_id) || null : null,
    trainer: p.trainer_id ? trMap.get(p.trainer_id) || null : null,
    liked_by_me: likedSet.has(p.id),
    saved_by_me: savedSet.has(p.id),
  }));
}

export const useCreatePost = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      content: string;
      hashtags: string[];
      location?: string;
      mediaUrls: { url: string; type: 'image' | 'video' }[];
      authorType?: 'user' | 'business' | 'trainer';
      businessId?: string | null;
      trainerId?: string | null;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const { data: post, error } = await supabase
        .from('community_posts')
        .insert({
          author_id: user.id,
          author_type: input.authorType || 'user',
          business_id: input.businessId || null,
          trainer_id: input.trainerId || null,
          content: input.content,
          hashtags: input.hashtags,
          location: input.location || null,
        })
        .select()
        .single();
      if (error) throw error;
      if (input.mediaUrls.length) {
        const { error: mErr } = await supabase.from('community_post_media').insert(
          input.mediaUrls.map((m, i) => ({
            post_id: post.id,
            media_type: m.type,
            url: m.url,
            sort_order: i,
          }))
        );
        if (mErr) throw mErr;
      }
      return post;
    },
    onSuccess: () => {
      toast.success('Posted to community');
      qc.invalidateQueries({ queryKey: ['community-feed'] });
      qc.invalidateQueries({ queryKey: ['community-profile-posts'] });
    },
    onError: (e: any) => toast.error(e.message || 'Failed to post'),
  });
};

export const useToggleLike = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, liked }: { postId: string; liked: boolean }) => {
      if (!user) throw new Error('Sign in to like posts');
      if (liked) {
        await supabase.from('community_likes').delete().match({ user_id: user.id, target_type: 'post', target_id: postId });
      } else {
        await supabase.from('community_likes').insert({ user_id: user.id, target_type: 'post', target_id: postId });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['community-feed'] });
      qc.invalidateQueries({ queryKey: ['community-profile-posts'] });
    },
    onError: (e: any) => toast.error(e.message),
  });
};

export const useToggleSave = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, saved }: { postId: string; saved: boolean }) => {
      if (!user) throw new Error('Sign in to save posts');
      if (saved) {
        await supabase.from('community_saves').delete().match({ user_id: user.id, post_id: postId });
      } else {
        await supabase.from('community_saves').insert({ user_id: user.id, post_id: postId });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['community-feed'] }),
    onError: (e: any) => toast.error(e.message),
  });
};

export const useToggleFollow = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ targetId, targetType, following }: { targetId: string; targetType: 'user' | 'business' | 'trainer'; following: boolean }) => {
      if (!user) throw new Error('Sign in to follow');
      if (following) {
        await supabase.from('community_follows').delete().match({ follower_id: user.id, target_type: targetType, target_id: targetId });
      } else {
        await supabase.from('community_follows').insert({ follower_id: user.id, target_type: targetType, target_id: targetId });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['community-follow'] });
      qc.invalidateQueries({ queryKey: ['community-feed'] });
      qc.invalidateQueries({ queryKey: ['community-profile'] });
    },
    onError: (e: any) => toast.error(e.message),
  });
};

export const useIsFollowing = (targetId?: string, targetType?: 'user' | 'business' | 'trainer') => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['community-follow', user?.id, targetType, targetId],
    enabled: !!user && !!targetId && !!targetType,
    queryFn: async () => {
      const { data } = await supabase
        .from('community_follows')
        .select('id')
        .match({ follower_id: user!.id, target_type: targetType!, target_id: targetId! })
        .maybeSingle();
      return !!data;
    },
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase.from('community_posts').delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Post deleted');
      qc.invalidateQueries({ queryKey: ['community-feed'] });
    },
    onError: (e: any) => toast.error(e.message),
  });
};

export const useComments = (postId: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['community-comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_comments')
        .select('*')
        .eq('post_id', postId)
        .eq('moderation_status', 'active')
        .order('created_at', { ascending: true });
      if (error) throw error;
      const authorIds = Array.from(new Set((data || []).map((c: any) => c.author_id)));
      const { data: profiles } = authorIds.length
        ? await supabase.from('user_profiles').select('user_id, full_name, profile_image_url').in('user_id', authorIds)
        : { data: [] as any[] };
      const map = new Map((profiles || []).map((p: any) => [p.user_id, p]));
      return (data || []).map((c: any) => ({
        ...c,
        author: map.get(c.author_id) || null,
        is_mine: user?.id === c.author_id,
      }));
    },
  });
};

export const useAddComment = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, content, parentId }: { postId: string; content: string; parentId?: string | null }) => {
      if (!user) throw new Error('Sign in to comment');
      const { error } = await supabase.from('community_comments').insert({
        post_id: postId,
        author_id: user.id,
        content,
        parent_comment_id: parentId || null,
      });
      if (error) throw error;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['community-comments', v.postId] });
      qc.invalidateQueries({ queryKey: ['community-feed'] });
    },
    onError: (e: any) => toast.error(e.message),
  });
};

export const useDeleteComment = (postId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase.from('community_comments').delete().eq('id', commentId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['community-comments', postId] }),
  });
};

export const useSuggested = () => {
  return useQuery({
    queryKey: ['community-suggested'],
    queryFn: async () => {
      const [biz, tr] = await Promise.all([
        supabase.from('business_profiles').select('id, business_name, slug, image_url, category').eq('status', 'approved').limit(4),
        supabase.from('trainer_profiles').select('id, name, profile_image_url, category').eq('status', 'approved').limit(4),
      ]);
      return { businesses: biz.data || [], trainers: tr.data || [] };
    },
  });
};

export const useUserBusinessesAndTrainers = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-post-identities', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const [biz, tr] = await Promise.all([
        supabase.from('business_profiles').select('id, business_name, image_url').eq('user_id', user!.id),
        supabase.from('trainer_profiles').select('id, name, profile_image_url').eq('user_id', user!.id),
      ]);
      return { businesses: biz.data || [], trainers: tr.data || [] };
    },
  });
};

export const useProfileHeader = (kind: 'user' | 'business' | 'trainer', id: string) => {
  return useQuery({
    queryKey: ['community-profile', kind, id],
    enabled: !!id,
    queryFn: async () => {
      let profile: any = null;
      if (kind === 'user') {
        const { data } = await supabase.from('user_profiles').select('user_id, full_name, profile_image_url, bio').eq('user_id', id).maybeSingle();
        profile = data ? { id: data.user_id, name: data.full_name, avatar: data.profile_image_url, bio: data.bio } : null;
      } else if (kind === 'business') {
        const { data } = await supabase.from('business_profiles').select('id, business_name, image_url, description, category, city').eq('id', id).maybeSingle();
        profile = data ? { id: data.id, name: data.business_name, avatar: data.image_url, bio: data.description, meta: `${data.category || ''} • ${data.city || ''}` } : null;
      } else {
        const { data } = await supabase.from('trainer_profiles').select('id, name, profile_image_url, bio, category, location').eq('id', id).maybeSingle();
        profile = data ? { id: data.id, name: data.name, avatar: data.profile_image_url, bio: data.bio, meta: `${data.category || ''} • ${data.location || ''}` } : null;
      }
      const { count: followerCount } = await supabase
        .from('community_follows')
        .select('*', { count: 'exact', head: true })
        .match({ target_type: kind, target_id: id });
      return { profile, followerCount: followerCount || 0 };
    },
  });
};

export const useProfilePosts = (kind: 'user' | 'business' | 'trainer', id: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['community-profile-posts', kind, id, user?.id],
    enabled: !!id,
    queryFn: async () => {
      const col = kind === 'user' ? 'author_id' : kind === 'business' ? 'business_id' : 'trainer_id';
      const { data } = await supabase
        .from('community_posts')
        .select('*')
        .eq(col, id)
        .eq('moderation_status', 'active')
        .order('created_at', { ascending: false })
        .limit(50);
      return enrichPosts(data || [], user?.id);
    },
  });
};
