import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FeaturedImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

const BUCKET = 'website-media';
const MAX_SIZE = 5 * 1024 * 1024;

const FeaturedImageUploader: React.FC<FeaturedImageUploaderProps> = ({ value, onChange }) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const upload = async (file: File) => {
    if (!user) {
      toast.error('Please log in to upload images');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file (JPG, PNG, WebP or GIF)');
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${user.id}/blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });

      if (error) {
        console.error('Blog image upload failed:', error);
        toast.error(`Upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success('Image uploaded');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-foreground">Featured image</Label>

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img src={value} alt="Featured image preview" className="h-40 w-full object-cover" loading="lazy" />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            aria-label="Remove featured image"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) upload(file);
          }}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-8 text-center transition-colors hover:border-primary/60 hover:bg-muted/50',
            dragging && 'border-primary bg-primary/5'
          )}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <UploadCloud className="h-6 w-6 text-primary" />
          )}
          <span className="text-sm font-medium text-foreground">
            {uploading ? 'Uploading…' : 'Drag & drop or click to upload'}
          </span>
          <span className="text-xs text-muted-foreground">JPG, PNG, WebP or GIF · max 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = '';
        }}
      />

      <details className="group">
        <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
          Or paste an image URL
        </summary>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="mt-2"
        />
      </details>
    </div>
  );
};

export default FeaturedImageUploader;
