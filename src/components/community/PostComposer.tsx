import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image as ImageIcon, MapPin, Hash, X, Loader2, ChevronDown, Video as VideoIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCreatePost, useUserBusinessesAndTrainers } from '@/hooks/useCommunity';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PostComposer() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [showLoc, setShowLoc] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [identity, setIdentity] = useState<{ label: string; type: 'user' | 'business' | 'trainer'; id?: string; avatar?: string | null }>({
    label: 'Post as myself',
    type: 'user',
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();
  const createPost = useCreatePost();
  const { data: identities } = useUserBusinessesAndTrainers();

  if (!user) {
    return (
      <Card className="glass-card p-5 rounded-2xl">
        <p className="text-foreground/80 mb-3">Sign in to share with the community.</p>
        <Button asChild><Link to="/login">Sign in</Link></Button>
      </Card>
    );
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 4 - images.length);
    for (const f of arr) {
      const url = await uploadImage(f, 'website-media', 'community');
      if (url) setImages(prev => [...prev, url]);
    }
  };

  const handleVideo = async (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (!f.type.startsWith('video/')) return toast.error('Please choose a video file');
    if (f.size > 50 * 1024 * 1024) return toast.error('Video must be under 50MB');
    setVideoUploading(true);
    try {
      const ext = f.name.split('.').pop();
      const path = `${user.id}/community/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('website-media').upload(path, f, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from('website-media').getPublicUrl(path);
      setVideo(data.publicUrl);
      setImages([]); // videos are exclusive of images for a cleaner card
    } catch (e: any) {
      toast.error(e.message || 'Video upload failed');
    } finally {
      setVideoUploading(false);
    }
  };

  const extractHashtags = (text: string) =>
    Array.from(new Set((text.match(/#(\w+)/g) || []).map(h => h.slice(1).toLowerCase())));

  const submit = () => {
    if (!content.trim() && !images.length && !video) return;
    const mediaUrls: { url: string; type: 'image' | 'video' }[] = video
      ? [{ url: video, type: 'video' }]
      : images.map(url => ({ url, type: 'image' as const }));
    createPost.mutate(
      {
        content: content.trim(),
        hashtags: extractHashtags(content),
        location: location.trim() || undefined,
        mediaUrls,
        authorType: identity.type,
        businessId: identity.type === 'business' ? identity.id : null,
        trainerId: identity.type === 'trainer' ? identity.id : null,
      },
      {
        onSuccess: () => {
          setContent('');
          setLocation('');
          setShowLoc(false);
          setImages([]);
          setVideo(null);
          setIdentity({ label: 'Post as myself', type: 'user' });
        },
      }
    );
  };

  const hasIdentities = (identities?.businesses.length || 0) + (identities?.trainers.length || 0) > 0;

  return (
    <Card className="glass-card p-4 sm:p-5 rounded-2xl">
      <div className="flex gap-3">
        <Avatar className="h-11 w-11 flex-shrink-0">
          <AvatarImage src={identity.avatar || user.user_metadata?.avatar_url} />
          <AvatarFallback>{(user.email || 'U').slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-3">
          {hasIdentities && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full text-xs h-7">
                  {identity.label} <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setIdentity({ label: 'Post as myself', type: 'user' })}>
                  Post as myself
                </DropdownMenuItem>
                {identities?.businesses.map(b => (
                  <DropdownMenuItem key={b.id} onClick={() => setIdentity({ label: `As ${b.business_name}`, type: 'business', id: b.id, avatar: b.image_urls?.[0] })}>
                    As {b.business_name}
                  </DropdownMenuItem>
                ))}
                {identities?.trainers.map(t => (
                  <DropdownMenuItem key={t.id} onClick={() => setIdentity({ label: `As ${t.name}`, type: 'trainer', id: t.id, avatar: t.profile_image_url })}>
                    As {t.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your fitness journey, tips, or updates… use #hashtags"
            className="min-h-[90px] resize-none bg-transparent border-border focus-visible:ring-1"
            maxLength={2000}
          />
          {showLoc && (
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Add location"
              className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            />
          )}
          {images.length > 0 && (
            <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {images.map((url, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-video bg-secondary/30">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages(prev => prev.filter((_, ix) => ix !== i))}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
              <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading || images.length >= 4}>
                <ImageIcon className="h-4 w-4 mr-1" /> Photo
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowLoc(s => !s)}>
                <MapPin className="h-4 w-4 mr-1" /> Location
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setContent(c => c + ' #')}>
                <Hash className="h-4 w-4 mr-1" /> Tag
              </Button>
            </div>
            <Button onClick={submit} disabled={createPost.isPending || uploading || (!content.trim() && !images.length)} className="rounded-full">
              {createPost.isPending || uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
